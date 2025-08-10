import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    models: [
      {
        id: 1,
        name: 'gpt-4o',
      },
      {
        id: 2,
        name: 'gpt-4o-mini',
      },
      {
        id: 3,
        name: 'o3-mini',
      },
    ],
  });
}
