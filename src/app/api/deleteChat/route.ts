import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Supabase config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function DELETE(request: NextRequest) {
  try {
    const { chatId, userId } = await request.json();

    if (!chatId || !userId) {
      return NextResponse.json(
        { error: 'chatId and userId are required' },
        { status: 400 }
      );
    }

    // First, delete all messages in the chat
    const { error: messagesError } = await supabase
      .from('chat_messages')
      .delete()
      .eq('chat_id', chatId);

    if (messagesError) {
      console.error('Error deleting chat messages:', messagesError);
      return NextResponse.json(
        { error: 'Failed to delete chat messages' },
        { status: 500 }
      );
    }

    // Then, delete the chat itself
    const { error: chatError } = await supabase
      .from('chats')
      .delete()
      .eq('id', chatId)
      .eq('user_id', userId);

    if (chatError) {
      console.error('Error deleting chat:', chatError);
      return NextResponse.json(
        { error: 'Failed to delete chat' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Chat deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleting chat:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
