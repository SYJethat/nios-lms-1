import { NextResponse } from 'next/server';
import { generateNIOSAssistantResponse } from '@/lib/nios-ai-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, user, language } = body;

    const lastMessage = messages?.[messages.length - 1];
    const userQuery = lastMessage?.content || lastMessage?.text || 'Hello';

    const aiResult = generateNIOSAssistantResponse(userQuery, user, messages);

    return NextResponse.json({
      content: aiResult.text,
      text: aiResult.text,
      suggestedActions: aiResult.suggestedActions,
      type: aiResult.type || 'text',
      language: language || 'en'
    });
  } catch (error: any) {
    console.error('API /api/chat error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response', content: 'Namaste! I am your NIOS Academic Assistant. Please ask about your courses, SLM textbooks, TMAs, or examinations.' },
      { status: 500 }
    );
  }
}

