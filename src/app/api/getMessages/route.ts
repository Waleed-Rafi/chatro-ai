import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Supabase config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get('chatId');

    if (!chatId) {
      return NextResponse.json(
        { error: 'chatId query parameter is required' },
        { status: 400 }
      );
    }

    const { data: messages, error } = await supabase
      .from('chat_messages')
      .select(
        `
        id,
        chat_id,
        prompt,
        created_at,
        model_output
      `
      )
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching chat messages:', error);
      return NextResponse.json(
        { error: 'Failed to fetch chat messages' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error('Error in fetching chat messages:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
