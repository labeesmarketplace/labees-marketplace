import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Initialize Google GenAI for Imagen
const googleGenAI = process.env.GOOGLE_GENAI_USE_VERTEXAI ? 
  new GoogleGenAI({
    project: process.env.GOOGLE_CLOUD_PROJECT,
    location: process.env.GOOGLE_CLOUD_LOCATION,
  }) : 
  new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

export interface TryOnRequest {
  selfieImage: string; // base64 or URL
  bodyImage: string; // base64 or URL
  clothingDescription?: string;
}

export interface TryOnResponse {
  success: boolean;
  imageUrl?: string;
  imageData?: string; // base64
  error?: string;
}

/**
 * Process images with Google Imagen API to generate realistic try-on photos
 */
export async function generateTryOnImage(request: TryOnRequest): Promise<TryOnResponse> {
  try {
    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }

    // Handle both data URLs and regular URLs
    let selfieData = request.selfieImage;
    let bodyData = request.bodyImage;
    
    // Extract base64 data from data URLs if needed
    if (request.selfieImage.startsWith('data:image')) {
      selfieData = request.selfieImage.replace(/^data:image\/[a-z]+;base64,/, '');
    }
    
    if (request.bodyImage.startsWith('data:image')) {
      bodyData = request.bodyImage.replace(/^data:image\/[a-z]+;base64,/, '');
    }

    // Create a detailed prompt for the Imagen API
    const prompt = `A person wearing ${request.clothingDescription || 'clothing'} in a realistic style. ` +
      `The person has facial features similar to the reference face image and a body shape similar to the reference body image. ` +
      `The clothing should fit naturally on the body with proper draping and realistic textures. ` +
      `Professional fashion photography style with studio lighting.`;

    // Use Imagen API for image generation
    const response = await googleGenAI.models.generateImages({
      model: 'imagen-4.0-generate-preview-06-06',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        sampleCount: 1,
        parameters: {
          guidanceScale: 12,
          seed: Math.floor(Math.random() * 1000000),
        }
      },
      referenceImages: [
        {
          image: {
            imageBytes: selfieData
          },
          referenceType: 'FACE'
        },
        {
          image: {
            imageBytes: bodyData
          },
          referenceType: 'BODY'
        }
      ]
    });

    // Extract the generated image
    if (response.generatedImages && response.generatedImages.length > 0) {
      const generatedImage = response.generatedImages[0];
      const imageData = generatedImage.image?.imageBytes;
      
      if (imageData) {
        return {
          success: true,
          imageData: imageData,
          error: undefined
        };
      }
    }

    throw new Error('Failed to generate image with Imagen API');

  } catch (error: any) {
    console.error('Imagen API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Analyze clothing fit and provide recommendations
 */
export async function analyzeFit(selfieImage: string, bodyImage: string): Promise<{
  success: boolean;
  analysis?: string;
  recommendations?: string[];
  error?: string;
}> {
  try {
    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    // Handle both data URLs and regular URLs
    let selfieData = selfieImage;
    let bodyData = bodyImage;
    
    // Extract base64 data from data URLs if needed
    if (selfieImage.startsWith('data:image')) {
      selfieData = selfieImage.replace(/^data:image\/[a-z]+;base64,/, '');
    }
    
    if (bodyImage.startsWith('data:image')) {
      bodyData = bodyImage.replace(/^data:image\/[a-z]+;base64,/, '');
    }

    const selfieImagePart = {
      inlineData: {
        data: selfieData,
        mimeType: 'image/jpeg'
      }
    };

    const bodyImagePart = {
      inlineData: {
        data: bodyData,
        mimeType: 'image/jpeg'
      }
    };

    const prompt = `
      Analyze these photos of a person and provide fashion fit recommendations:
      
      1. Assess body type and proportions
      2. Suggest clothing styles that would be most flattering
      3. Recommend colors that complement their skin tone
      4. Provide sizing guidance
      
      Please provide practical, helpful fashion advice in a friendly tone.
    `;

    const result = await model.generateContent([prompt, selfieImagePart, bodyImagePart]);
    const response = await result.response;
    const analysis = response.text();

    return {
      success: true,
      analysis,
      recommendations: analysis.split('\n').filter(line => line.trim().length > 0)
    };

  } catch (error: any) {
    console.error('Gemini fit analysis error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to analyze fit'
    };
  }
}
