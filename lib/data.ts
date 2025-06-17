export interface Country {
  code: string;
  name: string;
  flag: string;
  languages: Language[];
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface LessonContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  videoUrl?: string;
  animationUrl?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Language to locale mapping for speech synthesis
export const languageMap: Record<string, string> = {
  en: "en-US",
  hi: "hi-IN",
  te: "te-IN",
  ta: "ta-IN",
  bn: "bn-IN",
  mr: "mr-IN",
  es: "es-ES",
  de: "de-DE",
  fr: "fr-FR",
  ja: "ja-JP",
  zh: "zh-CN",
  pt: "pt-BR",
  ru: "ru-RU"
};

// Enhanced country-language mapping with more comprehensive data
export const countries: Country[] = [
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    languages: [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
      { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
      { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
      { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
      { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
    ]
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    languages: [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'es', name: 'Spanish', nativeName: 'Español' }
    ]
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    languages: [
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    languages: [
      { code: 'de', name: 'German', nativeName: 'Deutsch' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    languages: [
      { code: 'fr', name: 'French', nativeName: 'Français' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    languages: [
      { code: 'es', name: 'Spanish', nativeName: 'Español' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    languages: [
      { code: 'ja', name: 'Japanese', nativeName: '日本語' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'CN',
    name: 'China',
    flag: '🇨🇳',
    languages: [
      { code: 'zh', name: 'Chinese', nativeName: '中文' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    languages: [
      { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'RU',
    name: 'Russia',
    flag: '🇷🇺',
    languages: [
      { code: 'ru', name: 'Russian', nativeName: 'Русский' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  }
];

// Multilingual content structure with lesson levels
export const translations = {
  // UI Text Translations
  ui: {
    en: {
      welcome: 'Welcome back!',
      continueJourney: 'Continue your road safety journey',
      points: 'Points',
      dayStreak: 'Day Streak',
      lessonsDone: 'Lessons Done',
      quizScore: 'Quiz Score',
      totalPoints: 'Total Points',
      learningActivities: 'Learning Activities',
      interactiveLessons: 'Interactive Lessons',
      knowledgeQuiz: 'Knowledge Quiz',
      safetySimulation: 'Safety Simulation',
      achievements: 'Achievements',
      quickActions: 'Quick Actions',
      continueLearning: 'Continue Learning',
      takeQuiz: 'Take Quiz',
      playSimulation: 'Play Simulation',
      backToDashboard: 'Back to Dashboard',
      startLearning: 'Start Learning',
      chooseCountry: 'Choose your Country',
      preferredLanguage: 'Preferred Language',
      selectCountry: 'Select your country',
      selectLanguage: 'Select your language',
      listenVoiceover: '🔊 Listen to Voiceover',
      previousLesson: '⬅️ Previous',
      nextLesson: '➡️ Next',
      lessonProgress: 'Lesson Progress'
    },
    hi: {
      welcome: 'वापस आपका स्वागत है!',
      continueJourney: 'अपनी सड़क सुरक्षा यात्रा जारी रखें',
      points: 'अंक',
      dayStreak: 'दिन की लकीर',
      lessonsDone: 'पाठ पूरे',
      quizScore: 'क्विज़ स्कोर',
      totalPoints: 'कुल अंक',
      learningActivities: 'सीखने की गतिविधियां',
      interactiveLessons: 'इंटरैक्टिव पाठ',
      knowledgeQuiz: 'ज्ञान प्रश्नोत्तरी',
      safetySimulation: 'सुरक्षा सिमुलेशन',
      achievements: 'उपलब्धियां',
      quickActions: 'त्वरित कार्य',
      continueLearning: 'सीखना जारी रखें',
      takeQuiz: 'क्विज़ लें',
      playSimulation: 'सिमुलेशन खेलें',
      backToDashboard: 'डैशबोर्ड पर वापस',
      startLearning: 'सीखना शुरू करें',
      chooseCountry: 'अपना देश चुनें',
      preferredLanguage: 'पसंदीदा भाषा',
      selectCountry: 'अपना देश चुनें',
      selectLanguage: 'अपनी भाषा चुनें',
      listenVoiceover: '🔊 आवाज़ सुनें',
      previousLesson: '⬅️ पिछला',
      nextLesson: '➡️ अगला',
      lessonProgress: 'पाठ की प्रगति'
    },
    te: {
      welcome: 'తిరిగి స్వాగతం!',
      continueJourney: 'మీ రోడ్ సేఫ్టీ ప్రయాణాన్ని కొనసాగించండి',
      points: 'పాయింట్లు',
      dayStreak: 'రోజుల వరుస',
      lessonsDone: 'పాఠాలు పూర్తి',
      quizScore: 'క్విజ్ స్కోర్',
      totalPoints: 'మొత్తం పాయింట్లు',
      learningActivities: 'నేర్చుకునే కార్యకలాపాలు',
      interactiveLessons: 'ఇంటరాక్టివ్ పాఠాలు',
      knowledgeQuiz: 'జ్ఞాన క్విజ్',
      safetySimulation: 'భద్రతా అనుకరణ',
      achievements: 'విజయాలు',
      quickActions: 'త్వరిత చర్యలు',
      continueLearning: 'నేర్చుకోవడం కొనసాగించండి',
      takeQuiz: 'క్విజ్ తీసుకోండి',
      playSimulation: 'అనుకరణ ఆడండి',
      backToDashboard: 'డాష్‌బోర్డ్‌కు తిరిగి',
      startLearning: 'నేర్చుకోవడం ప్రారంభించండి',
      chooseCountry: 'మీ దేశాన్ని ఎంచుకోండి',
      preferredLanguage: 'ప్రాధాన్య భాష',
      selectCountry: 'మీ దేశాన్ని ఎంచుకోండి',
      selectLanguage: 'మీ భాషను ఎంచుకోండి',
      listenVoiceover: '🔊 వాయిస్‌ఓవర్ వినండి',
      previousLesson: '⬅️ మునుపటిది',
      nextLesson: '➡️ తదుపరి',
      lessonProgress: 'పాఠ పురోగతి'
    },
    es: {
      welcome: '¡Bienvenido de vuelta!',
      continueJourney: 'Continúa tu viaje de seguridad vial',
      points: 'Puntos',
      dayStreak: 'Racha de días',
      lessonsDone: 'Lecciones completadas',
      quizScore: 'Puntuación del quiz',
      totalPoints: 'Puntos totales',
      learningActivities: 'Actividades de aprendizaje',
      interactiveLessons: 'Lecciones interactivas',
      knowledgeQuiz: 'Quiz de conocimiento',
      safetySimulation: 'Simulación de seguridad',
      achievements: 'Logros',
      quickActions: 'Acciones rápidas',
      continueLearning: 'Continuar aprendiendo',
      takeQuiz: 'Hacer quiz',
      playSimulation: 'Jugar simulación',
      backToDashboard: 'Volver al panel',
      startLearning: 'Comenzar a aprender',
      chooseCountry: 'Elige tu país',
      preferredLanguage: 'Idioma preferido',
      selectCountry: 'Selecciona tu país',
      selectLanguage: 'Selecciona tu idioma',
      listenVoiceover: '🔊 Escuchar narración',
      previousLesson: '⬅️ Anterior',
      nextLesson: '➡️ Siguiente',
      lessonProgress: 'Progreso de la lección'
    },
    de: {
      welcome: 'Willkommen zurück!',
      continueJourney: 'Setzen Sie Ihre Verkehrssicherheitsreise fort',
      points: 'Punkte',
      dayStreak: 'Tage-Serie',
      lessonsDone: 'Lektionen abgeschlossen',
      quizScore: 'Quiz-Punktzahl',
      totalPoints: 'Gesamtpunkte',
      learningActivities: 'Lernaktivitäten',
      interactiveLessons: 'Interaktive Lektionen',
      knowledgeQuiz: 'Wissensquiz',
      safetySimulation: 'Sicherheitssimulation',
      achievements: 'Erfolge',
      quickActions: 'Schnelle Aktionen',
      continueLearning: 'Weiter lernen',
      takeQuiz: 'Quiz machen',
      playSimulation: 'Simulation spielen',
      backToDashboard: 'Zurück zum Dashboard',
      startLearning: 'Lernen beginnen',
      chooseCountry: 'Wählen Sie Ihr Land',
      preferredLanguage: 'Bevorzugte Sprache',
      selectCountry: 'Wählen Sie Ihr Land',
      selectLanguage: 'Wählen Sie Ihre Sprache',
      listenVoiceover: '🔊 Sprachausgabe anhören',
      previousLesson: '⬅️ Vorherige',
      nextLesson: '➡️ Nächste',
      lessonProgress: 'Lektionsfortschritt'
    },
    fr: {
      welcome: 'Bon retour !',
      continueJourney: 'Continuez votre parcours de sécurité routière',
      points: 'Points',
      dayStreak: 'Série de jours',
      lessonsDone: 'Leçons terminées',
      quizScore: 'Score du quiz',
      totalPoints: 'Points totaux',
      learningActivities: 'Activités d\'apprentissage',
      interactiveLessons: 'Leçons interactives',
      knowledgeQuiz: 'Quiz de connaissances',
      safetySimulation: 'Simulation de sécurité',
      achievements: 'Réalisations',
      quickActions: 'Actions rapides',
      continueLearning: 'Continuer l\'apprentissage',
      takeQuiz: 'Faire le quiz',
      playSimulation: 'Jouer la simulation',
      backToDashboard: 'Retour au tableau de bord',
      startLearning: 'Commencer l\'apprentissage',
      chooseCountry: 'Choisissez votre pays',
      preferredLanguage: 'Langue préférée',
      selectCountry: 'Sélectionnez votre pays',
      selectLanguage: 'Sélectionnez votre langue',
      listenVoiceover: '🔊 Écouter la narration',
      previousLesson: '⬅️ Précédent',
      nextLesson: '➡️ Suivant',
      lessonProgress: 'Progrès de la leçon'
    }
  },
  
  // Lesson Levels with multiple lessons per language
  lessonLevels: {
    en: [
      {
        title: "Traffic Signals and Signs",
        content: "Always cross at the zebra crossing when the green signal is on. Traffic signals are your guide to safe road navigation. Red means stop, green means go, and yellow means prepare to stop."
      },
      {
        title: "Pedestrian Safety Rules",
        content: "Look both ways before crossing the street. Use designated crosswalks and obey traffic signals. Stay alert and avoid distractions like mobile phones while walking."
      },
      {
        title: "Bicycle Safety Guidelines",
        content: "Always wear a helmet while riding a bicycle. Use hand signals to indicate turns and maintain proper distance from vehicles. Stay visible with reflective clothing."
      },
      {
        title: "Vehicle Safety Basics",
        content: "Wear your seatbelt at all times. Maintain safe following distance and check your mirrors regularly. Never drive under the influence of alcohol or drugs."
      },
      {
        title: "Emergency Response",
        content: "In case of an accident, move to safety first. Call emergency services immediately. Provide first aid if trained and keep emergency numbers handy."
      }
    ],
    hi: [
      {
        title: "यातायात संकेत और चिह्न",
        content: "हमेशा हरे सिग्नल पर ज़ेबरा क्रॉसिंग से पार करें। यातायात संकेत सुरक्षित सड़क नेविगेशन के लिए आपके गाइड हैं। लाल का मतलब रुकना, हरा का मतलब जाना, और पीला का मतलब रुकने की तैयारी करना है।"
      },
      {
        title: "पैदल यात्री सुरक्षा नियम",
        content: "सड़क पार करने से पहले दोनों तरफ देखें। निर्दिष्ट क्रॉसवॉक का उपयोग करें और यातायात संकेतों का पालन करें। चलते समय मोबाइल फोन जैसे विकर्षणों से बचें।"
      },
      {
        title: "साइकिल सुरक्षा दिशानिर्देश",
        content: "साइकिल चलाते समय हमेशा हेलमेट पहनें। मोड़ के संकेत देने के लिए हाथ के संकेतों का उपयोग करें और वाहनों से उचित दूरी बनाए रखें।"
      },
      {
        title: "वाहन सुरक्षा मूल बातें",
        content: "हमेशा अपनी सीटबेल्ट पहनें। सुरक्षित अनुसरण दूरी बनाए रखें और नियमित रूप से अपने दर्पण की जांच करें।"
      },
      {
        title: "आपातकालीन प्रतिक्रिया",
        content: "दुर्घटना की स्थिति में, पहले सुरक्षा की ओर बढ़ें। तुरंत आपातकालीन सेवाओं को कॉल करें। यदि प्रशिक्षित हैं तो प्राथमिक चिकित्सा प्रदान करें।"
      }
    ],
    te: [
      {
        title: "ట్రాఫిక్ సిగ్నల్స్ మరియు సంకేతాలు",
        content: "హరిత సంకేతం వచ్చినప్పుడు జెబ్రా క్రాసింగ్ వద్ద దాటి పోవాలి। ట్రాఫిక్ సిగ్నల్స్ సురక్షిత రోడ్డు నావిగేషన్‌కు మీ గైడ్. ఎరుపు అంటే ఆగు, ఆకుపచ్చ అంటే వెళ్లు, పసుపు అంటే ఆగడానికి సిద్ధం అవ్వు."
      },
      {
        title: "పాదచారుల భద్రతా నియమాలు",
        content: "రోడ్డు దాటే ముందు రెండు వైపులా చూడండి। నిర్దేశిత క్రాస్‌వాక్‌లను ఉపయోగించండి మరియు ట్రాఫిక్ సిగ్నల్‌లను పాటించండి।"
      },
      {
        title: "సైకిల్ భద్రతా మార్గదర్శకాలు",
        content: "సైకిల్ తొక్కేటప్పుడు ఎల్లప్పుడూ హెల్మెట్ ధరించండి। మలుపులను సూచించడానికి చేతి సంకేతాలను ఉపయోగించండి మరియు వాహనాల నుండి సరైన దూరం ఉంచండి।"
      },
      {
        title: "వాహన భద్రతా ప్రాథమికాలు",
        content: "ఎల్లప్పుడూ మీ సీట్‌బెల్ట్ ధరించండి। సురక్షితమైన అనుసరణ దూరాన్ని నిర్వహించండి మరియు మీ అద్దాలను క్రమం తప్పకుండా తనిఖీ చేయండి।"
      },
      {
        title: "అత్యవసర ప్రతిస్పందన",
        content: "ప్రమాదం జరిగినప్పుడు, మొదట భద్రతకు వెళ్లండి. వెంటనే అత్యవసర సేవలకు కాల్ చేయండి। శిక్షణ పొందినట్లయితే ప్రథమ చికిత్స అందించండి।"
      }
    ],
    es: [
      {
        title: "Señales y Semáforos de Tráfico",
        content: "Cruza solo en el paso de peatones cuando la señal esté en verde. Las señales de tráfico son tu guía para la navegación segura en carretera."
      },
      {
        title: "Reglas de Seguridad Peatonal",
        content: "Mira a ambos lados antes de cruzar la calle. Usa los cruces peatonales designados y obedece las señales de tráfico."
      },
      {
        title: "Directrices de Seguridad en Bicicleta",
        content: "Siempre usa casco al andar en bicicleta. Usa señales de mano para indicar giros y mantén distancia adecuada de los vehículos."
      },
      {
        title: "Fundamentos de Seguridad Vehicular",
        content: "Usa siempre tu cinturón de seguridad. Mantén distancia de seguimiento segura y revisa tus espejos regularmente."
      },
      {
        title: "Respuesta de Emergencia",
        content: "En caso de accidente, muévete a un lugar seguro primero. Llama a los servicios de emergencia inmediatamente."
      }
    ],
    de: [
      {
        title: "Verkehrssignale und Zeichen",
        content: "Überqueren Sie die Straße nur an der Ampel mit grünem Licht. Verkehrssignale sind Ihr Leitfaden für sichere Straßennavigation."
      },
      {
        title: "Fußgängersicherheitsregeln",
        content: "Schauen Sie vor dem Überqueren der Straße in beide Richtungen. Verwenden Sie ausgewiesene Zebrastreifen."
      },
      {
        title: "Fahrrad-Sicherheitsrichtlinien",
        content: "Tragen Sie beim Fahrradfahren immer einen Helm. Verwenden Sie Handsignale für Abbiegungen."
      },
      {
        title: "Fahrzeugsicherheit Grundlagen",
        content: "Tragen Sie immer Ihren Sicherheitsgurt. Halten Sie sicheren Folgeabstand ein."
      },
      {
        title: "Notfallreaktion",
        content: "Bei einem Unfall bewegen Sie sich zuerst in Sicherheit. Rufen Sie sofort den Notdienst."
      }
    ],
    fr: [
      {
        title: "Signaux et Panneaux de Circulation",
        content: "Traversez uniquement au passage piéton lorsque le feu est vert. Les signaux de circulation sont votre guide pour une navigation routière sûre."
      },
      {
        title: "Règles de Sécurité des Piétons",
        content: "Regardez des deux côtés avant de traverser la rue. Utilisez les passages piétons désignés."
      },
      {
        title: "Directives de Sécurité à Vélo",
        content: "Portez toujours un casque en faisant du vélo. Utilisez des signaux de la main pour indiquer les virages."
      },
      {
        title: "Bases de la Sécurité Véhiculaire",
        content: "Portez toujours votre ceinture de sécurité. Maintenez une distance de suivi sûre."
      },
      {
        title: "Réponse d'Urgence",
        content: "En cas d'accident, déplacez-vous d'abord en sécurité. Appelez immédiatement les services d'urgence."
      }
    ]
  },

  // Quiz Questions Translations
  quiz: {
    en: [
      {
        id: '1',
        question: 'What should you do when you see a red traffic light?',
        options: ['Speed up to get through', 'Come to a complete stop', 'Slow down and proceed', 'Honk your horn'],
        correctAnswer: 1,
        explanation: 'A red traffic light means you must come to a complete stop and wait for the light to turn green.',
        difficulty: 'easy' as const
      },
      {
        id: '2',
        question: 'When crossing the street as a pedestrian, you should:',
        options: ['Look left only', 'Look right only', 'Look both ways', 'Run across quickly'],
        correctAnswer: 2,
        explanation: 'Always look both ways before crossing to ensure no vehicles are approaching from either direction.',
        difficulty: 'easy' as const
      }
    ],
    hi: [
      {
        id: '1',
        question: 'जब आप लाल ट्रैफिक लाइट देखते हैं तो आपको क्या करना चाहिए?',
        options: ['तेज़ी से निकलने के लिए रफ़्तार बढ़ाएं', 'पूरी तरह रुकें', 'धीमा करें और आगे बढ़ें', 'हॉर्न बजाएं'],
        correctAnswer: 1,
        explanation: 'लाल ट्रैफिक लाइट का मतलब है कि आपको पूरी तरह रुकना होगा और हरी बत्ती का इंतज़ार करना होगा।',
        difficulty: 'easy' as const
      },
      {
        id: '2',
        question: 'पैदल यात्री के रूप में सड़क पार करते समय, आपको चाहिए:',
        options: ['केवल बाएं देखें', 'केवल दाएं देखें', 'दोनों तरफ देखें', 'जल्दी से दौड़कर पार करें'],
        correctAnswer: 2,
        explanation: 'पार करने से पहले हमेशा दोनों तरफ देखें ताकि यह सुनिश्चित हो सके कि कोई वाहन किसी भी दिशा से नहीं आ रहा।',
        difficulty: 'easy' as const
      }
    ],
    te: [
      {
        id: '1',
        question: 'మీరు ఎరుపు ట్రాఫిక్ లైట్ చూసినప్పుడు మీరు ఏమి చేయాలి?',
        options: ['వేగంగా వెళ్లడానికి స్పీడ్ పెంచండి', 'పూర్తిగా ఆగండి', 'నెమ్మదిగా వెళ్లి ముందుకు సాగండి', 'హార్న్ కొట్టండి'],
        correctAnswer: 1,
        explanation: 'ఎరుపు ట్రాఫిక్ లైట్ అంటే మీరు పూర్తిగా ఆగి, లైట్ ఆకుపచ్చగా మారే వరకు వేచి ఉండాలి.',
        difficulty: 'easy' as const
      },
      {
        id: '2',
        question: 'పాదచారిగా రోడ్డు దాటేటప్పుడు, మీరు:',
        options: ['ఎడమవైపు మాత్రమే చూడండి', 'కుడివైపు మాత్రమే చూడండి', 'రెండు వైపులా చూడండి', 'త్వరగా పరుగెత్తి దాటండి'],
        correctAnswer: 2,
        explanation: 'దాటే ముందు ఎల్లప్పుడూ రెండు వైపులా చూడండి, ఏ దిశ నుండి అయినా వాహనాలు రాకుండా ఉండేలా.',
        difficulty: 'easy' as const
      }
    ]
  }
};

// Helper function to get translation
export const getTranslation = (language: string, section: string, key: string, fallback?: string): string => {
  const langCode = language.toLowerCase();
  const translation = translations[section as keyof typeof translations]?.[langCode as keyof typeof translations.ui]?.[key as keyof typeof translations.ui.en];
  return translation || fallback || key;
};

// Enhanced lesson data with multilingual support
export const sampleLessons: LessonContent[] = [
  {
    id: '1',
    title: 'Traffic Signs and Signals',
    description: 'Learn about different traffic signs, their meanings, and how to respond to them properly.',
    duration: '15 min',
    difficulty: 'beginner',
    topics: ['Stop Signs', 'Traffic Lights', 'Warning Signs', 'Regulatory Signs'],
    animationUrl: '/animations/traffic-signs.json'
  },
  {
    id: '2',
    title: 'Pedestrian Safety',
    description: 'Essential safety rules for pedestrians crossing streets and walking near traffic.',
    duration: '12 min',
    difficulty: 'beginner',
    topics: ['Crosswalks', 'Looking Both Ways', 'Traffic Signals', 'Safe Walking'],
    animationUrl: '/animations/pedestrian-safety.json'
  },
  {
    id: '3',
    title: 'Bicycle Safety Rules',
    description: 'Important safety guidelines for cyclists sharing the road with vehicles.',
    duration: '18 min',
    difficulty: 'intermediate',
    topics: ['Helmet Safety', 'Hand Signals', 'Road Positioning', 'Visibility'],
    animationUrl: '/animations/bicycle-safety.json'
  },
  {
    id: '4',
    title: 'Vehicle Safety Basics',
    description: 'Fundamental safety practices for new drivers and vehicle passengers.',
    duration: '20 min',
    difficulty: 'intermediate',
    topics: ['Seatbelts', 'Mirrors', 'Blind Spots', 'Safe Following Distance'],
    animationUrl: '/animations/vehicle-safety.json'
  },
  {
    id: '5',
    title: 'Emergency Situations',
    description: 'How to respond to various emergency situations on the road.',
    duration: '25 min',
    difficulty: 'advanced',
    topics: ['Accident Response', 'Emergency Vehicles', 'Breakdown Procedures', 'First Aid'],
    animationUrl: '/animations/emergency-response.json'
  }
];

// Enhanced quiz questions with multilingual support
export const sampleQuizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What should you do when you see a red traffic light?',
    options: ['Speed up to get through', 'Come to a complete stop', 'Slow down and proceed', 'Honk your horn'],
    correctAnswer: 1,
    explanation: 'A red traffic light means you must come to a complete stop and wait for the light to turn green.',
    difficulty: 'easy'
  },
  {
    id: '2',
    question: 'When crossing the street as a pedestrian, you should:',
    options: ['Look left only', 'Look right only', 'Look both ways', 'Run across quickly'],
    correctAnswer: 2,
    explanation: 'Always look both ways before crossing to ensure no vehicles are approaching from either direction.',
    difficulty: 'easy'
  },
  {
    id: '3',
    question: 'What is the recommended following distance behind another vehicle?',
    options: ['1 second', '2 seconds', '3 seconds', '5 seconds'],
    correctAnswer: 2,
    explanation: 'The 3-second rule provides adequate time to react and stop safely if the vehicle ahead stops suddenly.',
    difficulty: 'medium'
  },
  {
    id: '4',
    question: 'When should you use your turn signal?',
    options: ['Only when turning left', 'Only when turning right', 'Before any turn or lane change', 'Only on highways'],
    correctAnswer: 2,
    explanation: 'Turn signals should be used before any turn or lane change to communicate your intentions to other drivers.',
    difficulty: 'medium'
  },
  {
    id: '5',
    question: 'What should you do if you encounter an emergency vehicle with flashing lights?',
    options: ['Speed up to get out of the way', 'Pull over to the right and stop', 'Continue driving normally', 'Follow closely behind it'],
    correctAnswer: 1,
    explanation: 'When you see an emergency vehicle with flashing lights, pull over to the right side of the road and stop to allow it to pass.',
    difficulty: 'hard'
  }
];

export const gameScenarios = [
  {
    id: '1',
    title: 'Intersection Navigation',
    description: 'Practice navigating through a busy intersection with traffic lights and pedestrians.',
    difficulty: 'beginner'
  },
  {
    id: '2',
    title: 'Highway Merging',
    description: 'Learn how to safely merge onto a highway with fast-moving traffic.',
    difficulty: 'intermediate'
  },
  {
    id: '3',
    title: 'Emergency Response',
    description: 'Handle various emergency situations including accidents and vehicle breakdowns.',
    difficulty: 'advanced'
  }
];

// Sample Lottie animation data (placeholder)
export const roadSafetyAnimation = {
  "v": "5.7.4",
  "fr": 30,
  "ip": 0,
  "op": 90,
  "w": 400,
  "h": 400,
  "nm": "Road Safety Animation",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Traffic Light",
      "sr": 1,
      "ks": {
        "o": {"a": 0, "k": 100},
        "r": {"a": 0, "k": 0},
        "p": {"a": 0, "k": [200, 200, 0]},
        "a": {"a": 0, "k": [0, 0, 0]},
        "s": {"a": 0, "k": [100, 100, 100]}
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": {"a": 0, "k": [60, 120]},
              "p": {"a": 0, "k": [0, 0]},
              "r": {"a": 0, "k": 10}
            },
            {
              "ty": "fl",
              "c": {"a": 0, "k": [0.2, 0.2, 0.2, 1]},
              "o": {"a": 0, "k": 100}
            }
          ]
        }
      ],
      "ip": 0,
      "op": 90,
      "st": 0
    }
  ]
};