import { LearningModule, PuzzleQuestion, GameScenario } from '../src/types/learning';

export const learningModules: Record<string, LearningModule[]> = {
  en: [
    {
      id: 'traffic-signals',
      title: 'Traffic Signals and Signs',
      description: 'Learn about traffic lights, road signs, and their meanings',
      imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=800',
      isCompleted: false,
      progress: 0,
      steps: [
        {
          id: 'lesson-traffic-signals',
          type: 'lesson',
          title: 'Understanding Traffic Signals',
          description: 'Learn the meaning of red, yellow, and green lights',
          imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
          content: 'Traffic signals are essential for road safety. RED means STOP - you must come to a complete stop and wait. YELLOW means CAUTION - prepare to stop if safe to do so, do not speed up. GREEN means GO - proceed when safe, but always look both ways. Traffic lights control the flow of vehicles and pedestrians at intersections, preventing accidents and ensuring orderly movement. Always obey traffic signals and never run red lights.',
          difficulty: 'easy',
          estimatedTime: '5 minutes',
          isCompleted: false,
          isUnlocked: true
        },
        {
          id: 'puzzle-traffic-signals',
          type: 'puzzle',
          title: 'Traffic Light Puzzle',
          description: 'Match traffic light colors with their meanings',
          imageUrl: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=600',
          difficulty: 'easy',
          estimatedTime: '3 minutes',
          isCompleted: false,
          isUnlocked: false,
          requiredSteps: ['lesson-traffic-signals']
        },
        {
          id: 'game-traffic-signals',
          type: 'game',
          title: 'Traffic Light Simulator',
          description: 'Practice responding to traffic signals in real-time',
          imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
          difficulty: 'easy',
          estimatedTime: '7 minutes',
          isCompleted: false,
          isUnlocked: false,
          requiredSteps: ['lesson-traffic-signals', 'puzzle-traffic-signals']
        }
      ]
    },
    {
      id: 'pedestrian-safety',
      title: 'Pedestrian Safety',
      description: 'Essential safety rules for walking near traffic',
      imageUrl: 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=800',
      isCompleted: false,
      progress: 0,
      steps: [
        {
          id: 'lesson-pedestrian-safety',
          type: 'lesson',
          title: 'Safe Walking Rules',
          description: 'Learn how to walk safely near roads and traffic',
          imageUrl: 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=600',
          content: 'Pedestrian safety is crucial for everyone who walks near roads. Always use sidewalks when available. Look both ways before crossing any street - left, right, then left again. Use designated crosswalks and zebra crossings. Obey pedestrian signals and wait for the walk signal. Make eye contact with drivers to ensure they see you. Stay visible with bright clothing, especially at night. Never assume drivers see you - always be alert and defensive. Avoid distractions like phones while crossing.',
          difficulty: 'easy',
          estimatedTime: '6 minutes',
          isCompleted: false,
          isUnlocked: false,
          requiredSteps: ['game-traffic-signals']
        },
        {
          id: 'puzzle-pedestrian-safety',
          type: 'puzzle',
          title: 'Crosswalk Challenge',
          description: 'Identify safe and unsafe crossing behaviors',
          imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
          difficulty: 'medium',
          estimatedTime: '4 minutes',
          isCompleted: false,
          isUnlocked: false,
          requiredSteps: ['lesson-pedestrian-safety']
        },
        {
          id: 'game-pedestrian-safety',
          type: 'game',
          title: 'Street Crossing Game',
          description: 'Navigate busy streets safely in this interactive game',
          imageUrl: 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=600',
          difficulty: 'medium',
          estimatedTime: '8 minutes',
          isCompleted: false,
          isUnlocked: false,
          requiredSteps: ['lesson-pedestrian-safety', 'puzzle-pedestrian-safety']
        }
      ]
    }
  ],
  hi: [
    {
      id: 'traffic-signals',
      title: 'यातायात संकेत और चिह्न',
      description: 'ट्रैफिक लाइट, सड़क के संकेत और उनके अर्थ के बारे में जानें',
      imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=800',
      isCompleted: false,
      progress: 0,
      steps: [
        {
          id: 'lesson-traffic-signals',
          type: 'lesson',
          title: 'यातायात संकेतों को समझना',
          description: 'लाल, पीली और हरी बत्ती का अर्थ जानें',
          imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
          content: 'यातायात संकेत सड़क सुरक्षा के लिए आवश्यक हैं। लाल का मतलब रुकना - आपको पूरी तरह रुकना होगा और इंतज़ार करना होगा। पीला का मतलब सावधानी - यदि सुरक्षित हो तो रुकने की तैयारी करें, तेज़ी न करें। हरा का मतलब जाना - सुरक्षित होने पर आगे बढ़ें, लेकिन हमेशा दोनों तरफ देखें। ट्रैफिक लाइट चौराहों पर वाहनों और पैदल चलने वालों के प्रवाह को नियंत्रित करती है।',
          difficulty: 'easy',
          estimatedTime: '5 मिनट',
          isCompleted: false,
          isUnlocked: true
        },
        {
          id: 'puzzle-traffic-signals',
          type: 'puzzle',
          title: 'ट्रैफिक लाइट पहेली',
          description: 'ट्रैफिक लाइट के रंगों को उनके अर्थ से मिलाएं',
          imageUrl: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=600',
          difficulty: 'easy',
          estimatedTime: '3 मिनट',
          isCompleted: false,
          isUnlocked: false,
          requiredSteps: ['lesson-traffic-signals']
        },
        {
          id: 'game-traffic-signals',
          type: 'game',
          title: 'ट्रैफिक लाइट सिमुलेटर',
          description: 'वास्तविक समय में ट्रैफिक सिग्नल का जवाब देने का अभ्यास करें',
          imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
          difficulty: 'easy',
          estimatedTime: '7 मिनट',
          isCompleted: false,
          isUnlocked: false,
          requiredSteps: ['lesson-traffic-signals', 'puzzle-traffic-signals']
        }
      ]
    }
  ],
  te: [
    {
      id: 'traffic-signals',
      title: 'ట్రాఫిక్ సిగ్నల్స్ మరియు సంకేతాలు',
      description: 'ట్రాఫిక్ లైట్లు, రోడ్డు సంకేతాలు మరియు వాటి అర్థాలను తెలుసుకోండి',
      imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=800',
      isCompleted: false,
      progress: 0,
      steps: [
        {
          id: 'lesson-traffic-signals',
          type: 'lesson',
          title: 'ట్రాఫిక్ సిగ్నల్స్ అర్థం చేసుకోవడం',
          description: 'ఎరుపు, పసుపు మరియు ఆకుపచ్చ లైట్ల అర్థం తెలుసుకోండి',
          imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
          content: 'ట్రాఫిక్ సిగ్నల్స్ రోడ్డు భద్రతకు అవసరం। ఎరుపు అంటే ఆగు - మీరు పూర్తిగా ఆగాలి మరియు వేచి ఉండాలి। పసుపు అంటే జాగ్రత్త - సురక్షితంగా ఉంటే ఆగడానికి సిద్ధం అవ్వండి, వేగం పెంచవద్దు। ఆకుపచ్చ అంటే వెళ్లు - సురక్షితంగా ఉన్నప్పుడు ముందుకు వెళ్లండి, కానీ ఎల్లప్పుడూ రెండు వైపులా చూడండి। ట్రాఫిక్ లైట్లు కూడళ్లలో వాహనాలు మరియు పాదచారుల ప్రవాహాన్ని నియంత్రిస్తాయి।',
          difficulty: 'easy',
          estimatedTime: '5 నిమిషాలు',
          isCompleted: false,
          isUnlocked: true
        },
        {
          id: 'puzzle-traffic-signals',
          type: 'puzzle',
          title: 'ట్రాఫిక్ లైట్ పజిల్',
          description: 'ట్రాఫిక్ లైట్ రంగులను వాటి అర్థాలతో సరిపోల్చండి',
          imageUrl: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=600',
          difficulty: 'easy',
          estimatedTime: '3 నిమిషాలు',
          isCompleted: false,
          isUnlocked: false,
          requiredSteps: ['lesson-traffic-signals']
        },
        {
          id: 'game-traffic-signals',
          type: 'game',
          title: 'ట్రాఫిక్ లైట్ సిమ్యులేటర్',
          description: 'రియల్ టైమ్‌లో ట్రాఫిక్ సిగ్నల్‌లకు ప్రతిస్పందించడం అభ్యసించండి',
          imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
          difficulty: 'easy',
          estimatedTime: '7 నిమిషాలు',
          isCompleted: false,
          isUnlocked: false,
          requiredSteps: ['lesson-traffic-signals', 'puzzle-traffic-signals']
        }
      ]
    }
  ]
};

export const puzzleQuestions: Record<string, Record<string, PuzzleQuestion[]>> = {
  en: {
    'puzzle-traffic-signals': [
      {
        id: 'q1',
        question: 'What does a red traffic light mean?',
        type: 'multiple-choice',
        options: ['Go slowly', 'Stop completely', 'Speed up', 'Turn left only'],
        correctAnswer: 1,
        explanation: 'Red light means you must come to a complete stop and wait for the green light. Never run a red light as it can cause serious accidents.',
        imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 'q2',
        question: 'When can you proceed at a traffic light?',
        type: 'multiple-choice',
        options: ['Red light', 'Yellow light', 'Green light', 'No light'],
        correctAnswer: 2,
        explanation: 'Green light means it is safe to proceed, but always check for other vehicles and pedestrians before moving.',
        imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 'q3',
        question: 'What should you do when you see a yellow traffic light?',
        type: 'multiple-choice',
        options: ['Speed up to get through', 'Stop immediately', 'Prepare to stop if safe', 'Turn around'],
        correctAnswer: 2,
        explanation: 'Yellow light means caution - prepare to stop if it is safe to do so. Do not speed up to beat the light.',
        imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    'puzzle-pedestrian-safety': [
      {
        id: 'q1',
        question: 'Where should pedestrians cross the road?',
        type: 'multiple-choice',
        options: ['Anywhere convenient', 'At crosswalks', 'Between parked cars', 'In the middle of the block'],
        correctAnswer: 1,
        explanation: 'Always use designated crosswalks for safety. They are marked and visible to drivers.',
        imageUrl: 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 'q2',
        question: 'Before crossing the street, you should:',
        type: 'multiple-choice',
        options: ['Look left only', 'Look right only', 'Look both ways', 'Just listen for cars'],
        correctAnswer: 2,
        explanation: 'Always look both ways before crossing to check for vehicles coming from either direction.',
        imageUrl: 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]
  },
  hi: {
    'puzzle-traffic-signals': [
      {
        id: 'q1',
        question: 'लाल ट्रैफिक लाइट का क्या मतलब है?',
        type: 'multiple-choice',
        options: ['धीरे जाएं', 'पूरी तरह रुकें', 'तेज़ी से जाएं', 'केवल बाएं मुड़ें'],
        correctAnswer: 1,
        explanation: 'लाल बत्ती का मतलब है कि आपको पूरी तरह रुकना होगा और हरी बत्ती का इंतज़ार करना होगा। कभी भी लाल बत्ती न तोड़ें।',
        imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 'q2',
        question: 'ट्रैफिक लाइट पर आप कब आगे बढ़ सकते हैं?',
        type: 'multiple-choice',
        options: ['लाल बत्ती', 'पीली बत्ती', 'हरी बत्ती', 'कोई बत्ती नहीं'],
        correctAnswer: 2,
        explanation: 'हरी बत्ती का मतलब है कि आगे बढ़ना सुरक्षित है, लेकिन हमेशा अन्य वाहनों की जांच करें।',
        imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]
  },
  te: {
    'puzzle-traffic-signals': [
      {
        id: 'q1',
        question: 'ఎరుపు ట్రాఫిక్ లైట్ అంటే ఏమిటి?',
        type: 'multiple-choice',
        options: ['నెమ్మదిగా వెళ్లండి', 'పూర్తిగా ఆగండి', 'వేగంగా వెళ్లండి', 'ఎడమవైపు మాత్రమే తిరుగు'],
        correctAnswer: 1,
        explanation: 'ఎరుపు లైట్ అంటే మీరు పూర్తిగా ఆగి ఆకుపచ్చ లైట్ కోసం వేచి ఉండాలి। ఎప్పుడూ ఎరుపు లైట్ ను ఉల్లంఘించవద్దు.',
        imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 'q2',
        question: 'ట్రాఫిక్ లైట్ వద్ద మీరు ఎప్పుడు ముందుకు వెళ్లవచ్చు?',
        type: 'multiple-choice',
        options: ['ఎరుపు లైట్', 'పసుపు లైట్', 'ఆకుపచ్చ లైట్', 'లైట్ లేకపోతే'],
        correctAnswer: 2,
        explanation: 'ఆకుపచ్చ లైట్ అంటే ముందుకు వెళ్లడం సురక్షితం, కానీ ఎల్లప్పుడూ ఇతర వాహనాలను తనిఖీ చేయండి.',
        imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]
  }
};

export const gameScenarios: Record<string, Record<string, GameScenario>> = {
  en: {
    'game-traffic-signals': {
      id: 'traffic-light-sim',
      title: 'Traffic Light Simulator',
      description: 'Practice responding to traffic signals in different scenarios',
      type: 'traffic-light',
      imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
      instructions: [
        'Watch the traffic light carefully',
        'Click STOP when light is red',
        'Click GO when light is green',
        'Click PREPARE when light is yellow'
      ],
      objectives: [
        'React correctly to all signals',
        'Complete 10 scenarios',
        'Achieve 90% accuracy'
      ]
    },
    'game-pedestrian-safety': {
      id: 'crossing-game',
      title: 'Safe Crossing Game',
      description: 'Help pedestrians cross the street safely',
      type: 'crossing',
      imageUrl: 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=600',
      instructions: [
        'Guide pedestrians to crosswalks',
        'Wait for safe crossing signals',
        'Watch for oncoming traffic',
        'Help everyone cross safely'
      ],
      objectives: [
        'Get all pedestrians across safely',
        'Use proper crosswalks',
        'Follow traffic signals'
      ]
    }
  },
  hi: {
    'game-traffic-signals': {
      id: 'traffic-light-sim',
      title: 'ट्रैफिक लाइट सिमुलेटर',
      description: 'विभिन्न परिस्थितियों में ट्रैफिक सिग्नल का जवाब देने का अभ्यास करें',
      type: 'traffic-light',
      imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
      instructions: [
        'ट्रैफिक लाइट को ध्यान से देखें',
        'लाल बत्ती पर STOP दबाएं',
        'हरी बत्ती पर GO दबाएं',
        'पीली बत्ती पर PREPARE दबाएं'
      ],
      objectives: [
        'सभी संकेतों पर सही प्रतिक्रिया दें',
        '10 परिदृश्य पूरे करें',
        '90% सटीकता प्राप्त करें'
      ]
    }
  },
  te: {
    'game-traffic-signals': {
      id: 'traffic-light-sim',
      title: 'ట్రాఫిక్ లైట్ సిమ్యులేటర్',
      description: 'వివిధ పరిస్థితులలో ట్రాఫిక్ సిగ్నల్‌లకు ప్రతిస్పందించడం అభ్యసించండి',
      type: 'traffic-light',
      imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
      instructions: [
        'ట్రాఫిక్ లైట్‌ను జాగ్రత్తగా చూడండి',
        'ఎరుపు లైట్‌లో STOP నొక్కండి',
        'ఆకుపచ్చ లైట్‌లో GO నొక్కండి',
        'పసుపు లైట్‌లో PREPARE నొక్కండి'
      ],
      objectives: [
        'అన్ని సిగ్నల్‌లకు సరిగ్గా స్పందించండి',
        '10 దృశ్యాలను పూర్తి చేయండి',
        '90% ఖచ్చితత్వం సాధించండి'
      ]
    }
  }
};