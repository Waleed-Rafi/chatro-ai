import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { AzureOpenAI } from 'openai';
import type { ChatCompletionCreateParams } from 'openai/resources/chat/completions';

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
    const { userId, chatMessage } = await request.json();

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

    // Step 1: Generate chat title using AI
    const titleParams: ChatCompletionCreateParams = {
      messages: [
        {
          role: 'system',
          content:
            'Generate a short, descriptive title for the following user message. Do not exceed 6 words.',
        },
        { role: 'user', content: chatMessage },
      ],
      max_completion_tokens: 20,
      model: modelName,
    };

    const titleResponse = await client.chat.completions.create(titleParams);
    const chatTitle =
      titleResponse.choices[0]?.message?.content?.trim() || 'New Chat';

    // Step 2: Create new chat with title
    const { data: chat, error: chatError } = await supabase
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

    // Step 4: Call Azure OpenAI for reply
    const params: ChatCompletionCreateParams = {
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: chatMessage },
      ],
      max_completion_tokens: 500,
      model: modelName,
    };

    const response = await client.chat.completions.create(params);
    const botReply = response.choices[0]?.message?.content ?? '';

    // Step 3: Insert user message
    const { error: userMsgError } = await supabase
      .from('chat_messages')
      .insert([
        {
          chat_id: chat.id,
          user_id: userId,
          prompt: chatMessage,
          model_output: botReply,
          created_at: new Date().toISOString(),
        },
      ]);

    if (userMsgError) {
      console.error('Error inserting user message:', userMsgError);
      return NextResponse.json(
        { error: 'Chat created but failed to add user message' },
        { status: 500 }
      );
    }

    // Step 5: Insert bot reply into chat_messages
    const { error: botMsgError } = await supabase.from('chat_messages').insert([
      {
        chat_id: chat.id,
        user_id: null, // null means system/bot
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
    });
  } catch (error) {
    console.error('Error in chat creation:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
