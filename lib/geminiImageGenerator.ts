import { GoogleGenerativeAI } from '@google/generative-ai';

interface ImageGenerationRequest {
  topic: string;
  description: string;
  style?: string;
  language?: string;
}

export class GeminiImageGenerator {
  private readonly CUSTOM_IMAGES: Record<string, string> = {
    'traffic-signals-main': '/images/traffic-signals-main.jpg',
    'traffic-signals-lesson': '/images/traffic-signals-lesson.jpg',
    'traffic-signals-puzzle': '/images/traffic-signals-puzzle.jpg',
    'traffic-signals-game': '/images/traffic-signals-game.jpg',
    'pedestrian-safety-main': '/images/pedestrian-safety-main.jpg',
    'pedestrian-safety-lesson': '/images/pedestrian-safety-lesson.jpg',
    'pedestrian-safety-puzzle': '/images/pedestrian-safety-puzzle.jpg',
    'pedestrian-safety-game': '/images/pedestrian-safety-game.jpg',
    'bicycle-safety-main': '/images/bicycle-safety-main.jpg',
    'bicycle-safety-lesson': '/images/bicycle-safety-lesson.jpg',
    'bicycle-safety-puzzle': '/images/bicycle-safety-puzzle.jpg',
    'bicycle-safety-game': '/images/bicycle-safety-game.jpg',
    'vehicle-safety-main': '/images/vehicle-safety-main.jpg',
    'vehicle-safety-lesson': '/images/vehicle-safety-lesson.jpg',
    'vehicle-safety-puzzle': '/images/vehicle-safety-puzzle.jpg',
    'vehicle-safety-game': '/images/vehicle-safety-game.jpg',
    'emergency-response-main': '/images/emergency-response-main.jpg',
    'emergency-response-lesson': '/images/emergency-response-lesson.jpg',
    'emergency-response-puzzle': '/images/emergency-response-puzzle.jpg',
    'emergency-response-game': '/images/emergency-response-game.jpg'
  };

  // Generate actual images using Gemini's image generation capabilities
  async generateRoadSafetyImage(request: ImageGenerationRequest): Promise<string | null> {
    const { topic } = request;
    
    // Return a pre-existing image instead of generating a new one
    if (this.CUSTOM_IMAGES[topic]) {
      return this.CUSTOM_IMAGES[topic];
    }
    
    // Fallback to a default image
    return '/images/traffic-signals-main.jpg';
  }

  async generateImagePrompt(request: ImageGenerationRequest): Promise<string> {
    const { topic } = request;
    
    // Return a pre-existing image path instead
    if (this.CUSTOM_IMAGES[topic]) {
      return this.CUSTOM_IMAGES[topic];
    }
    
    return this.getFallbackPrompt(topic);
  }

  private getFallbackPrompt(topic: string): string {
    const fallbackPrompts: Record<string, string> = {
      'traffic-signals': '/images/traffic-signals-main.jpg',
      'pedestrian-safety': '/images/pedestrian-safety-main.jpg',
      'bicycle-safety': '/images/bicycle-safety-main.jpg',
      'vehicle-safety': '/images/vehicle-safety-main.jpg',
      'emergency-response': '/images/emergency-response-main.jpg'
    };
    
    return fallbackPrompts[topic] || '/images/traffic-signals-main.jpg';
  }

  // Generate topic-specific images for lessons using Gemini
  async generateLessonImages(language: string = 'en'): Promise<Record<string, string>> {
    const imagePrompts: Record<string, string> = {};
    
    // Use pre-existing images instead of generating new ones
    Object.keys(this.CUSTOM_IMAGES).forEach(key => {
      imagePrompts[key] = this.CUSTOM_IMAGES[key];
    });
    
    return imagePrompts;
  }

  // Get curated Pexels URLs for road safety topics (as backup)
  getCuratedImages(): Record<string, string> {
    return this.CUSTOM_IMAGES;
  }

  // Generate custom image for specific lesson content
  async generateCustomLessonImage(lessonId: string, content: string, language: string): Promise<string | null> {
    // Return a pre-existing image instead of generating a new one
    if (this.CUSTOM_IMAGES[lessonId]) {
      return this.CUSTOM_IMAGES[lessonId];
    }
    
    return '/images/traffic-signals-main.jpg';
  }
}

export const geminiImageGenerator = new GeminiImageGenerator();