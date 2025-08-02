import { NextRequest, NextResponse } from 'next/server';
import { generateTryOnImage, analyzeFit, TryOnRequest } from '@/lib/gemini';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { action, selfieImage, bodyImage, clothingDescription } = body;

    if (!selfieImage || !bodyImage) {
      return NextResponse.json(
        { error: 'Both selfie and body images are required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'generate-tryon':
        const tryOnRequest: TryOnRequest = {
          selfieImage,
          bodyImage,
          clothingDescription
        };
        
        const tryOnResult = await generateTryOnImage(tryOnRequest);
        
        if (!tryOnResult.success) {
          return NextResponse.json(
            { error: tryOnResult.error || 'Failed to generate try-on image' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          imageData: tryOnResult.imageData,
          imageUrl: tryOnResult.imageUrl
        });

      case 'analyze-fit':
        const fitResult = await analyzeFit(selfieImage, bodyImage);
        
        if (!fitResult.success) {
          return NextResponse.json(
            { error: fitResult.error || 'Failed to analyze fit' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          analysis: fitResult.analysis,
          recommendations: fitResult.recommendations
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use "generate-tryon" or "analyze-fit"' },
          { status: 400 }
        );
    }

  } catch (error: any) {
    console.error('Gemini API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Gemini AI Try-On API is running' },
    { status: 200 }
  );
}
