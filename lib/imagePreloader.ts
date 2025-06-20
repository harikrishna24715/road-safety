import { replicateImageGenerator } from './replicateImageGenerator';

interface ImageData {
  id: string;
  url: string;
  isGenerated: boolean;
  generatedAt?: string;
}

export class ImagePreloader {
  private readonly STORAGE_KEY = 'preloadedImages';
  private readonly CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

  // Pre-generate all required images for the application using Replicate
  async preloadAllImages(): Promise<void> {
    try {
      await replicateImageGenerator.preloadAllImages();
      console.log('Images pre-loaded successfully with Replicate');
    } catch (error) {
      console.error('Error preloading images:', error);
    }
  }

  getStoredImages(): Record<string, ImageData> {
    return replicateImageGenerator.getStoredImages();
  }

  getImageUrl(imageId: string): string {
    return replicateImageGenerator.getImageUrl(imageId);
  }

  isImageGenerated(imageId: string): boolean {
    return replicateImageGenerator.isImageGenerated(imageId);
  }

  // Force refresh all images
  async refreshAllImages(): Promise<void> {
    await replicateImageGenerator.refreshAllImages();
  }
}

export const imagePreloader = new ImagePreloader();