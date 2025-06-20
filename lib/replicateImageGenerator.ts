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

  // Pre-generate all required images for the application
  async preloadAllImages(): Promise<void> {
    const existingImages = this.getStoredImages();
    const currentTime = Date.now();
    
    // Check if we need to refresh images
    const needsRefresh = Object.values(existingImages).some(img => 
      !img.generatedAt || (currentTime - new Date(img.generatedAt).getTime()) > this.CACHE_DURATION
    );

    if (Object.keys(existingImages).length > 0 && !needsRefresh) {
      console.log('Using cached Replicate images');
      return;
    }

    console.log('Generating images with Replicate AI...');
    
    const imagePrompts = [
      {
        id: 'traffic-signals-main',
        topic: 'traffic-signals',
        description: 'A professional educational illustration of a traffic light intersection with clear red, yellow, and green lights. Show cars and pedestrians properly following traffic signals. High quality, realistic style, educational purpose.'
      },
      {
        id: 'traffic-signals-lesson',
        topic: 'traffic-signals',
        description: 'Close-up view of a traffic light showing all three colors (red, yellow, green) clearly visible. Educational diagram style showing the meaning of each light color for road safety learning.'
      },
      {
        id: 'traffic-signals-puzzle',
        topic: 'traffic-signals',
        description: 'Multiple traffic lights in different states for interactive learning. Show various traffic light combinations with clear color visibility for educational puzzle activities.'
      },
      {
        id: 'traffic-signals-game',
        topic: 'traffic-signals',
        description: 'Realistic intersection scene with traffic lights, vehicles, and pedestrians for simulation game. Show proper traffic flow and signal compliance in an urban setting.'
      },
      {
        id: 'pedestrian-safety-main',
        topic: 'pedestrian-safety',
        description: 'Pedestrians safely crossing at a zebra crossing with proper crosswalk markings. Show people looking both ways and following pedestrian safety rules. Educational illustration style.'
      },
      {
        id: 'pedestrian-safety-lesson',
        topic: 'pedestrian-safety',
        description: 'Educational diagram showing proper pedestrian crossing techniques. Include zebra crossing, pedestrian signals, and people demonstrating safe crossing behaviors.'
      },
      {
        id: 'pedestrian-safety-puzzle',
        topic: 'pedestrian-safety',
        description: 'Side-by-side comparison showing correct and incorrect pedestrian crossing behaviors. Educational illustration for learning safe vs unsafe practices.'
      },
      {
        id: 'pedestrian-safety-game',
        topic: 'pedestrian-safety',
        description: 'Busy street scene with crosswalks, traffic signals, and pedestrians making safe crossing decisions. Interactive game environment showing urban pedestrian safety.'
      }
    ];

    const newImages: Record<string, ImageData> = {};

    for (const imagePrompt of imagePrompts) {
      try {
        console.log(`Generating image for ${imagePrompt.id}...`);
        
        const generatedUrl = await this.generateRoadSafetyImage({
          topic: imagePrompt.topic,
          description: imagePrompt.description,
          style: 'educational illustration',
          language: 'en'
        });
        
        newImages[imagePrompt.id] = {
          id: imagePrompt.id,
          url: generatedUrl || this.getFallbackImage(imagePrompt.id),
          isGenerated: !!generatedUrl,
          generatedAt: new Date().toISOString()
        };
        
        console.log(`${imagePrompt.id}: ${generatedUrl ? 'Generated successfully' : 'Using fallback'}`);
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
        
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
    console.log('Images generated and cached successfully');
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