import { NextRequest, NextResponse } from 'next/server';
import { generateText } from '@/lib/gemini';
import { Prompt } from '@/types/types';

export async function POST(req: NextRequest) {
    try {
        const { input, style } = await req.json() as Prompt;

        if (!input || !style) {
            return NextResponse.json({ error: 'Invalid input or style' }, { status: 400 });
        }

        const res = await generateText(input, style);
        return NextResponse.json({ result: res });
    } catch (error) {
        console.error("Error in Gemini API:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}