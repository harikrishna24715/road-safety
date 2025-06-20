import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyCTK6i0B4554jLwUx2IbnZcYVlb2mAD7sw';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

interface ImageData {
  id: string;
  url: string;
  isGenerated: boolean;
  generatedAt?: string;
}

export class ImagePreloader {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  private readonly STORAGE_KEY = 'preloadedImages';
  private readonly CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

  // Pre-generate all required images for the application
  async preloadAllImages(): Promise<void> {
    const existingImages = this.getStoredImages();
    const currentTime = Date.now();
    
    // Check if we need to refresh images
    const needsRefresh = Object.values(existingImages).some(img => 
      !img.generatedAt || (currentTime - new Date(img.generatedAt).getTime()) > this.CACHE_DURATION
    );

    if (Object.keys(existingImages).length > 0 && !needsRefresh) {
      console.log('Using cached images');
      return;
    }

    console.log('Pre-generating images with Gemini AI...');
    
    const imagePrompts = [
      {
        id: 'traffic-signals-main',
        prompt: 'A professional educational illustration of a traffic light intersection with clear red, yellow, and green lights. Show cars and pedestrians properly following traffic signals. High quality, realistic style, educational purpose.'
      },
      {
        id: 'traffic-signals-lesson',
        prompt: 'Close-up view of a traffic light showing all three colors (red, yellow, green) clearly visible. Educational diagram style showing the meaning of each light color for road safety learning.'
      },
      {
        id: 'traffic-signals-puzzle',
        prompt: 'Multiple traffic lights in different states for interactive learning. Show various traffic light combinations with clear color visibility for educational puzzle activities.'
      },
      {
        id: 'traffic-signals-game',
        prompt: 'Realistic intersection scene with traffic lights, vehicles, and pedestrians for simulation game. Show proper traffic flow and signal compliance in an urban setting.'
      },
      {
        id: 'pedestrian-safety-main',
        prompt: 'Pedestrians safely crossing at a zebra crossing with proper crosswalk markings. Show people looking both ways and following pedestrian safety rules. Educational illustration style.'
      },
      {
        id: 'pedestrian-safety-lesson',
        prompt: 'Educational diagram showing proper pedestrian crossing techniques. Include zebra crossing, pedestrian signals, and people demonstrating safe crossing behaviors.'
      },
      {
        id: 'pedestrian-safety-puzzle',
        prompt: 'Side-by-side comparison showing correct and incorrect pedestrian crossing behaviors. Educational illustration for learning safe vs unsafe practices.'
      },
      {
        id: 'pedestrian-safety-game',
        prompt: 'Busy street scene with crosswalks, traffic signals, and pedestrians making safe crossing decisions. Interactive game environment showing urban pedestrian safety.'
      }
    ];

    const newImages: Record<string, ImageData> = {};

    for (const imagePrompt of imagePrompts) {
      try {
        const generatedUrl = await this.generateImageWithGemini(imagePrompt.prompt);
        
        newImages[imagePrompt.id] = {
          id: imagePrompt.id,
          url: generatedUrl || this.getFallbackImage(imagePrompt.id),
          isGenerated: !!generatedUrl,
          generatedAt: new Date().toISOString()
        };
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`Failed to generate image for ${imagePrompt.id}:`, error);
        newImages[imagePrompt.id] = {
          id: imagePrompt.id,
          url: this.getFallbackImage(imagePrompt.id),
          isGenerated: false,
          generatedAt: new Date().toISOString()
        };
      }
    }

    // Store all images
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newImages));
    console.log('Images pre-loaded and cached successfully');
  }

  private async generateImageWithGemini(prompt: string): Promise<string | null> {
    try {
      // Note: Gemini's text-to-image generation would be used here
      // For now, we'll simulate the process and return a placeholder
      const result = await this.model.generateContent([
        `Create a detailed description for generating this image: ${prompt}
        
        Return only a JSON object with this structure:
        {
          "description": "detailed image description",
          "style": "educational illustration",
          "quality": "high resolution"
        }`
      ]);
      
      const response = await result.response;
      const text = response.text();
      
      // In a real implementation, this would generate an actual image
      // For now, we'll return null to use fallback images
      return null;
      
    } catch (error) {
      console.error('Error generating image with Gemini:', error);
      return null;
    }
  }

  private getFallbackImage(imageId: string): string {
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
    const images = this.getStoredImages();
    return images[imageId]?.url || this.getFallbackImage(imageId);
  }

  isImageGenerated(imageId: string): boolean {
    const images = this.getStoredImages();
    return images[imageId]?.isGenerated || false;
  }

  // Force refresh all images
  async refreshAllImages(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
    await this.preloadAllImages();
  }
}

export const imagePreloader = new ImagePreloader();