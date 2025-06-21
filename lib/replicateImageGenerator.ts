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
  private readonly API_TOKEN = 'r8_FLsOZZ313LtaHCelV8ktySjnTiWgPo14AizYv';
  private readonly STORAGE_KEY = 'replicateGeneratedImages';
  private readonly CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

  // Custom images provided by user
  private readonly CUSTOM_IMAGES: Record<string, string> = {
    'traffic-signals-main': '/WhatsApp Image 2025-06-21 at 15.07.16_d2467d85.jpg',
    'traffic-signals-lesson': '/WhatsApp Image 2025-06-21 at 15.07.15_1cb2c828.jpg',
    'traffic-signals-puzzle': '/WhatsApp Image 2025-06-21 at 15.07.15_700f4f23.jpg',
    'traffic-signals-game': '/WhatsApp Image 2025-06-21 at 15.07.14_4eb4fd33.jpg',
    'pedestrian-safety-main': '/WhatsApp Image 2025-06-21 at 15.07.16_d2467d85.jpg', // Using intersection image
    'pedestrian-safety-lesson': '/WhatsApp Image 2025-06-21 at 15.07.16_d2467d85.jpg', // Using intersection image
    'pedestrian-safety-puzzle': '/WhatsApp Image 2025-06-21 at 15.07.16_d2467d85.jpg', // Using intersection image
    'pedestrian-safety-game': '/WhatsApp Image 2025-06-21 at 15.07.16_d2467d85.jpg' // Using intersection image
  };

  // Generate images using Replicate's FLUX model
  async generateRoadSafetyImage(request: ImageGenerationRequest): Promise<string | null> {
    const { topic, description, style = 'educational illustration', language = 'en' } = request;
    
    const prompt = this.createPrompt(topic, description, style, language);
    
    try {
      const response = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: "black-forest-labs/flux-schnell:bf2f2e683d03a9549f484a37a0df1581514b28b3b8c4c5d8766d5521c1c9dafe",
          input: {
            prompt: prompt,
            num_outputs: 1,
            aspect_ratio: "16:9",
            output_format: "webp",
            output_quality: 80,
            num_inference_steps: 4
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const prediction = await response.json();
      
      // Poll for completion
      const imageUrl = await this.pollForCompletion(prediction.id);
      return imageUrl;
      
    } catch (error) {
      console.error('Error generating image with Replicate:', error);
      return null;
    }
  }

  private async pollForCompletion(predictionId: string): Promise<string | null> {
    const maxAttempts = 30; // 5 minutes max
    const pollInterval = 10000; // 10 seconds
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
          headers: {
            'Authorization': `Token ${this.API_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const prediction = await response.json();
        
        if (prediction.status === 'succeeded' && prediction.output && prediction.output.length > 0) {
          return prediction.output[0];
        } else if (prediction.status === 'failed') {
          console.error('Prediction failed:', prediction.error);
          return null;
        }
        
        // Wait before next poll
        await new Promise(resolve => setTimeout(resolve, pollInterval));
        
      } catch (error) {
        console.error('Error polling prediction:', error);
        return null;
      }
    }
    
    console.error('Prediction timed out');
    return null;
  }

  private createPrompt(topic: string, description: string, style: string, language: string): string {
    const basePrompt = `Create a high-quality, educational illustration for road safety learning about "${topic}".

Requirements:
- Topic: ${topic}
- Description: ${description}
- Style: ${style}, clean, professional, educational
- Educational and clear representation
- Accurate road safety details
- Professional quality suitable for learning
- Safe for all ages
- Realistic but instructional
- Clear visibility of safety elements
- Bright, clear lighting
- High contrast for visibility

The image should clearly demonstrate the road safety concept with accurate details, proper colors, and strong educational value. Focus on clarity, accuracy, and educational impact.`;

    return basePrompt;
  }

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
      'traffic-signals-main': 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=800',
      'traffic-signals-lesson': 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
      'traffic-signals-puzzle': 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=600',
      'traffic-signals-game': 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
      'pedestrian-safety-main': 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=800',
      'pedestrian-safety-lesson': 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=600',
      'pedestrian-safety-puzzle': 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
      'pedestrian-safety-game': 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=600'
    };
    
    return fallbackImages[imageId] || 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600';
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
    const request: ImageGenerationRequest = {
      topic: lessonId,
      description: `Educational image for lesson: ${content}`,
      style: 'realistic educational illustration',
      language
    };

    return await this.generateRoadSafetyImage(request);
  }
}

export const replicateImageGenerator = new ReplicateImageGenerator();