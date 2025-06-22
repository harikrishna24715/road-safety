import { createClient } from '@supabase/supabase-js';

interface ImageGenerationRequest {
  topic: string;
  description: string;
  style?: string;
  language?: string;
}

interface ImageData {
  id: string;
  url: string;
  isGenerated: boolean;
  generatedAt?: string;
}

export class ReplicateImageGenerator {
  private readonly STORAGE_KEY = 'replicateGeneratedImages';
  private readonly CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

  // Custom images provided by user
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

  // Pre-load custom images instead of generating new ones
  async preloadAllImages(): Promise<void> {
    console.log('Loading custom road safety images...');
    
    const customImages: Record<string, ImageData> = {};

    // Use the custom images provided by the user
    Object.entries(this.CUSTOM_IMAGES).forEach(([imageId, imagePath]) => {
      customImages[imageId] = {
        id: imageId,
        url: imagePath,
        isGenerated: true, // Mark as generated since these are custom educational images
        generatedAt: new Date().toISOString()
      };
    });

    // Store all images
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(customImages));
    console.log('Custom images loaded successfully');
  }

  private getFallbackImage(imageId: string): string {
    // First try to use custom images
    if (this.CUSTOM_IMAGES[imageId]) {
      return this.CUSTOM_IMAGES[imageId];
    }

    // Fallback to stock images if needed
    const fallbackImages: Record<string, string> = {
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
    
    return fallbackImages[imageId] || '/images/traffic-signals-main.jpg';
  }

  getStoredImages(): Record<string, ImageData> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  getImageUrl(imageId: string): string {
    // First check if we have custom images
    if (this.CUSTOM_IMAGES[imageId]) {
      return this.CUSTOM_IMAGES[imageId];
    }

    // Then check stored images
    const images = this.getStoredImages();
    return images[imageId]?.url || this.getFallbackImage(imageId);
  }

  isImageGenerated(imageId: string): boolean {
    // Custom images are considered "generated" since they're specifically created for education
    if (this.CUSTOM_IMAGES[imageId]) {
      return true;
    }

    const images = this.getStoredImages();
    return images[imageId]?.isGenerated || false;
  }

  // Force refresh all images
  async refreshAllImages(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
    await this.preloadAllImages();
  }

  // Generate custom image for specific lesson content
  async generateCustomLessonImage(lessonId: string, content: string, language: string): Promise<string | null> {
    // Return a pre-existing image instead of generating a new one
    return this.getFallbackImage(lessonId);
  }
}

export const replicateImageGenerator = new ReplicateImageGenerator();