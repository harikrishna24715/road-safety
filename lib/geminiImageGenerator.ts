import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyCTK6i0B4554jLwUx2IbnZcYVlb2mAD7sw';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

interface ImageGenerationRequest {
  topic: string;
  description: string;
  style?: string;
  language?: string;
}

export class GeminiImageGenerator {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Generate actual images using Gemini's image generation capabilities
  async generateRoadSafetyImage(request: ImageGenerationRequest): Promise<string | null> {
    const { topic, description, style = 'educational illustration', language = 'en' } = request;
    
    const prompt = `Generate a high-quality, educational image for road safety learning about "${topic}".

Requirements:
- Topic: ${topic}
- Description: ${description}
- Style: ${style}
- Language context: ${language}
- Educational and clear
- Accurate road safety representation
- Professional quality
- Safe for all ages
- Realistic but instructional

Create an image that clearly shows the road safety concept with accurate details, proper colors, and educational value.`;

    try {
      // Note: This uses Gemini's image generation capability
      const result = await this.model.generateContent([prompt]);
      const response = await result.response;
      
      // If Gemini returns image data, convert to base64 or URL
      if (response.candidates && response.candidates[0]) {
        // Extract image data from response
        const imageData = response.candidates[0];
        // Convert to usable format (this would depend on Gemini's actual response format)
        return this.processImageResponse(imageData);
      }
      
      return null;
    } catch (error) {
      console.error('Error generating image with Gemini:', error);
      return null;
    }
  }

  private processImageResponse(imageData: any): string {
    // Process the image data returned by Gemini
    // This would convert the response to a usable image URL or base64
    // The exact implementation depends on Gemini's response format
    
    if (imageData.parts && imageData.parts[0] && imageData.parts[0].inlineData) {
      const base64Data = imageData.parts[0].inlineData.data;
      const mimeType = imageData.parts[0].inlineData.mimeType;
      return `data:${mimeType};base64,${base64Data}`;
    }
    
    return '';
  }

  async generateImagePrompt(request: ImageGenerationRequest): Promise<string> {
    const { topic, description, style = 'educational illustration', language = 'en' } = request;
    
    const prompt = `Create a detailed, educational image prompt for road safety learning content about "${topic}".

Context: ${description}
Style: ${style}
Language context: ${language}

Generate a detailed prompt for creating an image that shows:
- Clear, accurate representation of the road safety concept
- Educational value for learners
- Appropriate for ${language} speaking audience
- Professional, clean design
- Realistic but safe-for-learning content

The image should be informative, visually clear, and directly related to the topic. Focus on accuracy and educational value.

Return only the image generation prompt, no additional text.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating image prompt:', error);
      return this.getFallbackPrompt(topic);
    }
  }

  private getFallbackPrompt(topic: string): string {
    const fallbackPrompts: Record<string, string> = {
      'traffic-signals': 'A clear, educational illustration of a traffic light with red, yellow, and green lights clearly visible, showing proper traffic signal positioning at an intersection with cars and pedestrians following the signals correctly',
      'pedestrian-safety': 'An educational illustration showing a pedestrian crosswalk with zebra stripes, pedestrian crossing signs, and people safely crossing the street while looking both ways',
      'bicycle-safety': 'An educational illustration of a cyclist wearing a helmet, following traffic rules, with proper hand signals and safety equipment visible on a bike lane',
      'vehicle-safety': 'An educational illustration showing vehicle safety features like seatbelts, mirrors, and proper driving posture with dashboard indicators',
      'emergency-response': 'An educational illustration showing emergency vehicles, first aid procedures, and proper emergency response protocols on a road'
    };
    
    return fallbackPrompts[topic] || 'Educational road safety illustration';
  }

  // Generate topic-specific images for lessons using Gemini
  async generateLessonImages(language: string = 'en'): Promise<Record<string, string>> {
    const topics = [
      {
        id: 'traffic-signals-lesson',
        topic: 'traffic-signals',
        description: 'Traffic light signals showing red (stop), yellow (caution), and green (go) with clear meanings for road safety education. Show a realistic traffic light at an intersection with proper colors and positioning.'
      },
      {
        id: 'traffic-signals-puzzle',
        topic: 'traffic-signals',
        description: 'Interactive puzzle showing different traffic light colors and their corresponding actions for learning. Display multiple traffic lights in different states with clear visual indicators.'
      },
      {
        id: 'traffic-signals-game',
        topic: 'traffic-signals',
        description: 'Game simulation of traffic lights with realistic intersection scenario for practice. Show an intersection with traffic lights, cars, and pedestrians responding correctly to signals.'
      },
      {
        id: 'pedestrian-safety-lesson',
        topic: 'pedestrian-safety',
        description: 'Pedestrian crossing safely at designated crosswalks with proper safety procedures. Show people using zebra crossings, looking both ways, and following pedestrian signals.'
      },
      {
        id: 'pedestrian-safety-puzzle',
        topic: 'pedestrian-safety',
        description: 'Puzzle showing safe vs unsafe pedestrian crossing behaviors for learning. Display correct and incorrect ways to cross streets with clear visual differences.'
      },
      {
        id: 'pedestrian-safety-game',
        topic: 'pedestrian-safety',
        description: 'Interactive game showing pedestrians navigating busy streets safely. Show a street scene with crosswalks, traffic, and pedestrians making safe crossing decisions.'
      }
    ];

    const imagePrompts: Record<string, string> = {};
    
    for (const topicData of topics) {
      try {
        // Try to generate actual image first
        const generatedImage = await this.generateRoadSafetyImage({
          topic: topicData.topic,
          description: topicData.description,
          style: 'educational illustration',
          language
        });
        
        if (generatedImage) {
          imagePrompts[topicData.id] = generatedImage;
        } else {
          // Fallback to prompt generation
          const prompt = await this.generateImagePrompt({
            topic: topicData.topic,
            description: topicData.description,
            style: 'educational illustration',
            language
          });
          imagePrompts[topicData.id] = prompt;
        }
      } catch (error) {
        console.error(`Error generating content for ${topicData.id}:`, error);
        imagePrompts[topicData.id] = this.getFallbackPrompt(topicData.topic);
      }
    }
    
    return imagePrompts;
  }

  // Get curated Pexels URLs for road safety topics (as backup)
  getCuratedImages(): Record<string, string> {
    return {
      'traffic-signals-main': 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=800',
      'traffic-signals-lesson': 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
      'traffic-signals-puzzle': 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=600',
      'traffic-signals-game': 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
      'pedestrian-safety-main': 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=800',
      'pedestrian-safety-lesson': 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=600',
      'pedestrian-safety-puzzle': 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
      'pedestrian-safety-game': 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=600'
    };
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

export const geminiImageGenerator = new GeminiImageGenerator();