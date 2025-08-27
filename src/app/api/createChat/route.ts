import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { AzureOpenAI } from 'openai';
import type { ChatCompletionCreateParams } from 'openai/resources/chat/completions';

import type { Chat, OpenAIMessage } from '@/types/database';

// Supabase config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Azure OpenAI config
const endpoint: string = process.env.AZURE_OPENAI_ENDPOINT!;
const apiKey: string = process.env.AZURE_OPENAI_KEY!;
const modelName: string = 'o3-mini';
const deployment: string = 'o3-mini';
const apiVersion: string = '2024-12-01-preview';

export async function POST(request: NextRequest) {
  try {
    const { userId, chatMessage, chatId } = await request.json();

    if (!userId || !chatMessage) {
      return NextResponse.json(
        { error: 'userId and chatMessage are required' },
        { status: 400 }
      );
    }

    const client = new AzureOpenAI({
      endpoint,
      apiKey,
      deployment,
      apiVersion,
    });

    let chat: Chat;
    let isNewChat = false;

    if (!chatId) {
      // Create new chat
      isNewChat = true;

      // Step 1: Generate chat title using AI
      const titleParams: ChatCompletionCreateParams = {
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant. You are given a user message and you need to generate a short, descriptive title for the input message.',
          },
          { role: 'user', content: chatMessage },
        ],
        max_completion_tokens: 500,
        model: 'gpt-4o',
      };

      const titleResponse = await client.chat.completions.create(titleParams);
      console.log('titleResponse', titleResponse.choices[0]?.message);
      const chatTitle = titleResponse.choices[0]?.message?.content;

      // Step 2: Create new chat with title
      const { data: newChat, error: chatError } = await supabase
        .from('chats')
        .insert([
          {
            user_id: userId,
            title: chatTitle,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (chatError) {
        console.error('Error creating chat:', chatError);
        return NextResponse.json(
          { error: 'Failed to create chat' },
          { status: 500 }
        );
      }

      chat = newChat;
    } else {
      // Continue existing chat - verify chat exists and belongs to user
      const { data: existingChat, error: chatError } = await supabase
        .from('chats')
        .select('*')
        .eq('id', chatId)
        .eq('user_id', userId)
        .single();

      if (chatError || !existingChat) {
        console.error('Error fetching existing chat:', chatError);
        return NextResponse.json(
          { error: 'Chat not found or access denied' },
          { status: 404 }
        );
      }

      chat = existingChat;

      // Update the chat's updated_at timestamp
      await supabase
        .from('chats')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', chatId);
    }

    // Step 3: Call Azure OpenAI for reply
    // If continuing existing chat, we need to get conversation history for context
    const messages: OpenAIMessage[] = [];

    if (!isNewChat) {
      // Get existing messages for context
      const { data: existingMessages } = await supabase
        .from('chat_messages')
        .select('prompt, model_output, user_id')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (existingMessages) {
        // Convert existing messages to OpenAI format
        existingMessages.forEach(msg => {
          if (msg.prompt) {
            messages.push({ role: 'user', content: msg.prompt });
          }
          if (msg.model_output) {
            messages.push({ role: 'assistant', content: msg.model_output });
          }
        });
      }
    }

    // Add current user message and system message
    messages.unshift({
      role: 'system',
      content: 'You are a helpful assistant.',
    });
    messages.push({ role: 'user', content: chatMessage });

    const params: ChatCompletionCreateParams = {
      messages,
      max_completion_tokens: 1000,
      model: modelName,
    };

    const response = await client.chat.completions.create(params);
    const botReply = response.choices[0]?.message?.content ?? '';

    // Step 5: Insert bot reply into chat_messages
    const { error: botMsgError } = await supabase.from('chat_messages').insert([
      {
        chat_id: chat.id,
        prompt: chatMessage,
        model_output: botReply,
        created_at: new Date().toISOString(),
      },
    ]);

    if (botMsgError) {
      console.error('Error inserting bot reply:', botMsgError);
    }

    // Step 6: Return response with both messages
    return NextResponse.json({
      success: true,
      chatId: chat.id,
      userMessage: chatMessage,
      botMessage: botReply,
      isNewChat,
    });
  } catch (error) {
    console.error('Error in chat creation:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
