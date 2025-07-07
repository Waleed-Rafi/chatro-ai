import { NextResponse } from 'next/server';

// Dummy chat data
const conversations = [
  {
    id: 1,
    title: 'AI Assistant Help',
    messages: [
      {
        id: 1,
        content: 'Hello! How can I help you today?',
        role: 'assistant',
        timestamp: '2024-02-20T10:00:00Z',
      },
      {
        id: 2,
        content: 'I need help with my project',
        role: 'user',
        timestamp: '2024-02-20T10:01:00Z',
      },
      {
        id: 3,
        content:
          "I'd be happy to help! What kind of project are you working on?",
        role: 'assistant',
        timestamp: '2024-02-20T10:01:30Z',
      },
    ],
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-02-20T10:01:30Z',
  },
  {
    id: 2,
    title: 'Code Review Discussion',
    messages: [
      {
        id: 4,
        content: 'Can you review this React component?',
        role: 'user',
        timestamp: '2024-02-19T15:30:00Z',
      },
      {
        id: 5,
        content: "Sure! Please share the code you'd like me to review.",
        role: 'assistant',
        timestamp: '2024-02-19T15:30:30Z',
      },
    ],
    createdAt: '2024-02-19T15:30:00Z',
    updatedAt: '2024-02-19T15:30:30Z',
  },
];

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));

  return NextResponse.json({
    success: true,
    data: conversations,
    total: conversations.length,
    message: 'Conversations retrieved successfully',
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.message || !body.conversationId) {
      return NextResponse.json(
        { success: false, message: 'Message and conversationId are required' },
        { status: 400 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find conversation
    const conversation = conversations.find(c => c.id === body.conversationId);

    if (!conversation) {
      return NextResponse.json(
        { success: false, message: 'Conversation not found' },
        { status: 404 }
      );
    }

    // Add user message
    const userMessage = {
      id: conversation.messages.length + 1,
      content: body.message,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    conversation.messages.push(userMessage);

    // Generate AI response (dummy response)
    const aiResponses = [
      'I understand your question. Let me help you with that.',
      "That's an interesting point! Here's what I think...",
      'I can definitely assist you with this. Let me break it down...',
      'Great question! The answer involves several factors...',
      "I'd be happy to help you solve this problem.",
      "This is a common issue. Here's how to approach it...",
      'Let me provide you with a detailed explanation...',
      "I can see what you're asking about. Here's my response...",
    ];

    const randomResponse =
      aiResponses[Math.floor(Math.random() * aiResponses.length)];

    const aiMessage = {
      id: conversation.messages.length + 1,
      content: randomResponse,
      role: 'assistant',
      timestamp: new Date().toISOString(),
    };

    conversation.messages.push(aiMessage);
    conversation.updatedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      data: {
        conversation,
        userMessage,
        aiMessage,
      },
      message: 'Message sent and response generated successfully',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body' },
      { status: 400 }
    );
  }
}

// Create new conversation
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const newConversation = {
      id: conversations.length + 1,
      title: body.title || 'New Conversation',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    conversations.push(newConversation);

    return NextResponse.json(
      {
        success: true,
        data: newConversation,
        message: 'Conversation created successfully',
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body' },
      { status: 400 }
    );
  }
}
