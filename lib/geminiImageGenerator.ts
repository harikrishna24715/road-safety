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
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });

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
      'traffic-signals': 'A clear, educational illustration of a traffic light with red, yellow, and green lights clearly visible, showing proper traffic signal positioning at an intersection',
      'pedestrian-safety': 'An educational illustration showing a pedestrian crosswalk with zebra stripes, pedestrian crossing signs, and people safely crossing the street',
      'bicycle-safety': 'An educational illustration of a cyclist wearing a helmet, following traffic rules, with proper hand signals and safety equipment visible',
      'vehicle-safety': 'An educational illustration showing vehicle safety features like seatbelts, mirrors, and proper driving posture',
      'emergency-response': 'An educational illustration showing emergency vehicles, first aid procedures, and proper emergency response protocols'
    };
    
    return fallbackPrompts[topic] || 'Educational road safety illustration';
  }

  // Generate topic-specific images for lessons
  async generateLessonImages(language: string = 'en'): Promise<Record<string, string>> {
    const topics = [
      {
        id: 'traffic-signals-lesson',
        topic: 'traffic-signals',
        description: 'Traffic light signals showing red (stop), yellow (caution), and green (go) with clear meanings for road safety education'
      },
      {
        id: 'traffic-signals-puzzle',
        topic: 'traffic-signals',
        description: 'Interactive puzzle showing different traffic light colors and their corresponding actions for learning'
      },
      {
        id: 'traffic-signals-game',
        topic: 'traffic-signals',
        description: 'Game simulation of traffic lights with realistic intersection scenario for practice'
      },
      {
        id: 'pedestrian-safety-lesson',
        topic: 'pedestrian-safety',
        description: 'Pedestrian crossing safely at designated crosswalks with proper safety procedures'
      },
      {
        id: 'pedestrian-safety-puzzle',
        topic: 'pedestrian-safety',
        description: 'Puzzle showing safe vs unsafe pedestrian crossing behaviors for learning'
      },
      {
        id: 'pedestrian-safety-game',
        topic: 'pedestrian-safety',
        description: 'Interactive game showing pedestrians navigating busy streets safely'
      }
    ];

    const imagePrompts: Record<string, string> = {};
    
    for (const topicData of topics) {
      try {
        const prompt = await this.generateImagePrompt({
          topic: topicData.topic,
          description: topicData.description,
          style: 'educational illustration',
          language
        });
        imagePrompts[topicData.id] = prompt;
      } catch (error) {
        console.error(`Error generating prompt for ${topicData.id}:`, error);
        imagePrompts[topicData.id] = this.getFallbackPrompt(topicData.topic);
      }
    }
    
    return imagePrompts;
  }

  // Get curated Pexels URLs for road safety topics
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
}

export const geminiImageGenerator = new GeminiImageGenerator();