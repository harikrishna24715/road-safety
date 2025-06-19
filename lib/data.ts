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

// Enhanced language to locale mapping for speech synthesis with better voice support
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
  ru: "ru-RU",
  ar: "ar-SA",
  ko: "ko-KR",
  it: "it-IT",
  nl: "nl-NL",
  sv: "sv-SE",
  no: "no-NO",
  da: "da-DK",
  fi: "fi-FI",
  pl: "pl-PL",
  tr: "tr-TR",
  th: "th-TH",
  vi: "vi-VN",
  id: "id-ID",
  ms: "ms-MY"
};

// Enhanced country-language mapping with more comprehensive data and flags
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
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    languages: [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'fr', name: 'French', nativeName: 'Français' }
    ]
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
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
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    languages: [
      { code: 'it', name: 'Italian', nativeName: 'Italiano' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    languages: [
      { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'SE',
    name: 'Sweden',
    flag: '🇸🇪',
    languages: [
      { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'NO',
    name: 'Norway',
    flag: '🇳🇴',
    languages: [
      { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'DK',
    name: 'Denmark',
    flag: '🇩🇰',
    languages: [
      { code: 'da', name: 'Danish', nativeName: 'Dansk' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'FI',
    name: 'Finland',
    flag: '🇫🇮',
    languages: [
      { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
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
    code: 'KR',
    name: 'South Korea',
    flag: '🇰🇷',
    languages: [
      { code: 'ko', name: 'Korean', nativeName: '한국어' },
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
    code: 'TH',
    name: 'Thailand',
    flag: '🇹🇭',
    languages: [
      { code: 'th', name: 'Thai', nativeName: 'ไทย' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'VN',
    name: 'Vietnam',
    flag: '🇻🇳',
    languages: [
      { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'ID',
    name: 'Indonesia',
    flag: '🇮🇩',
    languages: [
      { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'MY',
    name: 'Malaysia',
    flag: '🇲🇾',
    languages: [
      { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
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
    code: 'MX',
    name: 'Mexico',
    flag: '🇲🇽',
    languages: [
      { code: 'es', name: 'Spanish', nativeName: 'Español' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'AR',
    name: 'Argentina',
    flag: '🇦🇷',
    languages: [
      { code: 'es', name: 'Spanish', nativeName: 'Español' },
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
  },
  {
    code: 'PL',
    name: 'Poland',
    flag: '🇵🇱',
    languages: [
      { code: 'pl', name: 'Polish', nativeName: 'Polski' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'TR',
    name: 'Turkey',
    flag: '🇹🇷',
    languages: [
      { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    languages: [
      { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    languages: [
      { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    languages: [
      { code: 'en', name: 'English', nativeName: 'English' }
    ]
  },
  {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    languages: [
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
    },
    ja: {
      welcome: 'おかえりなさい！',
      continueJourney: '道路安全の学習を続けましょう',
      points: 'ポイント',
      dayStreak: '連続日数',
      lessonsDone: '完了したレッスン',
      quizScore: 'クイズスコア',
      totalPoints: '総ポイント',
      learningActivities: '学習活動',
      interactiveLessons: 'インタラクティブレッスン',
      knowledgeQuiz: '知識クイズ',
      safetySimulation: '安全シミュレーション',
      achievements: '実績',
      quickActions: 'クイックアクション',
      continueLearning: '学習を続ける',
      takeQuiz: 'クイズを受ける',
      playSimulation: 'シミュレーションをプレイ',
      backToDashboard: 'ダッシュボードに戻る',
      startLearning: '学習を開始',
      chooseCountry: '国を選択',
      preferredLanguage: '希望言語',
      selectCountry: '国を選択してください',
      selectLanguage: '言語を選択してください',
      listenVoiceover: '🔊 音声を聞く',
      previousLesson: '⬅️ 前へ',
      nextLesson: '➡️ 次へ',
      lessonProgress: 'レッスンの進捗'
    },
    zh: {
      welcome: '欢迎回来！',
      continueJourney: '继续您的道路安全学习之旅',
      points: '积分',
      dayStreak: '连续天数',
      lessonsDone: '已完成课程',
      quizScore: '测验分数',
      totalPoints: '总积分',
      learningActivities: '学习活动',
      interactiveLessons: '互动课程',
      knowledgeQuiz: '知识测验',
      safetySimulation: '安全模拟',
      achievements: '成就',
      quickActions: '快速操作',
      continueLearning: '继续学习',
      takeQuiz: '参加测验',
      playSimulation: '开始模拟',
      backToDashboard: '返回仪表板',
      startLearning: '开始学习',
      chooseCountry: '选择您的国家',
      preferredLanguage: '首选语言',
      selectCountry: '选择您的国家',
      selectLanguage: '选择您的语言',
      listenVoiceover: '🔊 听语音',
      previousLesson: '⬅️ 上一个',
      nextLesson: '➡️ 下一个',
      lessonProgress: '课程进度'
    },
    pt: {
      welcome: 'Bem-vindo de volta!',
      continueJourney: 'Continue sua jornada de segurança no trânsito',
      points: 'Pontos',
      dayStreak: 'Sequência de dias',
      lessonsDone: 'Lições concluídas',
      quizScore: 'Pontuação do quiz',
      totalPoints: 'Pontos totais',
      learningActivities: 'Atividades de aprendizagem',
      interactiveLessons: 'Lições interativas',
      knowledgeQuiz: 'Quiz de conhecimento',
      safetySimulation: 'Simulação de segurança',
      achievements: 'Conquistas',
      quickActions: 'Ações rápidas',
      continueLearning: 'Continuar aprendendo',
      takeQuiz: 'Fazer quiz',
      playSimulation: 'Jogar simulação',
      backToDashboard: 'Voltar ao painel',
      startLearning: 'Começar a aprender',
      chooseCountry: 'Escolha seu país',
      preferredLanguage: 'Idioma preferido',
      selectCountry: 'Selecione seu país',
      selectLanguage: 'Selecione seu idioma',
      listenVoiceover: '🔊 Ouvir narração',
      previousLesson: '⬅️ Anterior',
      nextLesson: '➡️ Próximo',
      lessonProgress: 'Progresso da lição'
    },
    ru: {
      welcome: 'Добро пожаловать обратно!',
      continueJourney: 'Продолжите изучение безопасности дорожного движения',
      points: 'Очки',
      dayStreak: 'Дни подряд',
      lessonsDone: 'Уроки завершены',
      quizScore: 'Результат викторины',
      totalPoints: 'Общие очки',
      learningActivities: 'Учебные мероприятия',
      interactiveLessons: 'Интерактивные уроки',
      knowledgeQuiz: 'Викторина знаний',
      safetySimulation: 'Симуляция безопасности',
      achievements: 'Достижения',
      quickActions: 'Быстрые действия',
      continueLearning: 'Продолжить обучение',
      takeQuiz: 'Пройти викторину',
      playSimulation: 'Играть в симуляцию',
      backToDashboard: 'Вернуться к панели',
      startLearning: 'Начать обучение',
      chooseCountry: 'Выберите вашу страну',
      preferredLanguage: 'Предпочитаемый язык',
      selectCountry: 'Выберите вашу страну',
      selectLanguage: 'Выберите ваш язык',
      listenVoiceover: '🔊 Слушать озвучку',
      previousLesson: '⬅️ Предыдущий',
      nextLesson: '➡️ Следующий',
      lessonProgress: 'Прогресс урока'
    }
  },
  
  // Lesson Levels with multiple lessons per language
  lessonLevels: {
    en: [
      {
        title: "Traffic Signals and Signs",
        content: "Always cross at the zebra crossing when the green signal is on. Traffic signals are your guide to safe road navigation. Red means stop, green means go, and yellow means prepare to stop. Understanding these basic signals can save your life and the lives of others."
      },
      {
        title: "Pedestrian Safety Rules",
        content: "Look both ways before crossing the street. Use designated crosswalks and obey traffic signals. Stay alert and avoid distractions like mobile phones while walking. Make eye contact with drivers to ensure they see you before crossing."
      },
      {
        title: "Bicycle Safety Guidelines",
        content: "Always wear a helmet while riding a bicycle. Use hand signals to indicate turns and maintain proper distance from vehicles. Stay visible with reflective clothing and lights. Follow traffic rules as bicycles are considered vehicles on the road."
      },
      {
        title: "Vehicle Safety Basics",
        content: "Wear your seatbelt at all times. Maintain safe following distance and check your mirrors regularly. Never drive under the influence of alcohol or drugs. Keep your vehicle well-maintained and ensure all safety equipment is working properly."
      },
      {
        title: "Emergency Response",
        content: "In case of an accident, move to safety first. Call emergency services immediately. Provide first aid if trained and keep emergency numbers handy. Stay calm and help others while ensuring your own safety."
      }
    ],
    hi: [
      {
        title: "यातायात संकेत और चिह्न",
        content: "हमेशा हरे सिग्नल पर ज़ेबरा क्रॉसिंग से पार करें। यातायात संकेत सुरक्षित सड़क नेविगेशन के लिए आपके गाइड हैं। लाल का मतलब रुकना, हरा का मतलब जाना, और पीला का मतलब रुकने की तैयारी करना है। इन बुनियादी संकेतों को समझना आपकी और दूसरों की जान बचा सकता है।"
      },
      {
        title: "पैदल यात्री सुरक्षा नियम",
        content: "सड़क पार करने से पहले दोनों तरफ देखें। निर्दिष्ट क्रॉसवॉक का उपयोग करें और यातायात संकेतों का पालन करें। चलते समय मोबाइल फोन जैसे विकर्षणों से बचें और सतर्क रहें। पार करने से पहले ड्राइवरों से आंखों का संपर्क बनाएं।"
      },
      {
        title: "साइकिल सुरक्षा दिशानिर्देश",
        content: "साइकिल चलाते समय हमेशा हेलमेट पहनें। मोड़ के संकेत देने के लिए हाथ के संकेतों का उपयोग करें और वाहनों से उचित दूरी बनाए रखें। परावर्तक कपड़े और लाइट्स के साथ दिखाई दें। यातायात नियमों का पालन करें क्योंकि साइकिल को सड़क पर वाहन माना जाता है।"
      },
      {
        title: "वाहन सुरक्षा मूल बातें",
        content: "हमेशा अपनी सीटबेल्ट पहनें। सुरक्षित अनुसरण दूरी बनाए रखें और नियमित रूप से अपने दर्पण की जांच करें। कभी भी शराब या नशीली दवाओं के प्रभाव में गाड़ी न चलाएं। अपने वाहन को अच्छी तरह से बनाए रखें।"
      },
      {
        title: "आपातकालीन प्रतिक्रिया",
        content: "दुर्घटना की स्थिति में, पहले सुरक्षा की ओर बढ़ें। तुरंत आपातकालीन सेवाओं को कॉल करें। यदि प्रशिक्षित हैं तो प्राथमिक चिकित्सा प्रदान करें और आपातकालीन नंबर हाथ में रखें। शांत रहें और अपनी सुरक्षा सुनिश्चित करते हुए दूसरों की मदद करें।"
      }
    ],
    te: [
      {
        title: "ట్రాఫిక్ సిగ్నల్స్ మరియు సంకేతాలు",
        content: "హరిత సంకేతం వచ్చినప్పుడు జెబ్రా క్రాసింగ్ వద్ద దాటి పోవాలి। ట్రాఫిక్ సిగ్నల్స్ సురక్షిత రోడ్డు నావిగేషన్‌కు మీ గైడ్. ఎరుపు అంటే ఆగు, ఆకుపచ్చ అంటే వెళ్లు, పసుపు అంటే ఆగడానికి సిద్ధం అవ్వు। ఈ ప్రాథమిక సంకేతాలను అర్థం చేసుకోవడం మీ జీవితాన్ని మరియు ఇతరుల జీవితాలను కాపాడుతుంది।"
      },
      {
        title: "పాదచారుల భద్రతా నియమాలు",
        content: "రోడ్డు దాటే ముందు రెండు వైపులా చూడండి। నిర్దేశిత క్రాస్‌వాక్‌లను ఉపయోగించండి మరియు ట్రాఫిక్ సిగ్నల్‌లను పాటించండి। నడుస్తున్నప్పుడు మొబైల్ ఫోన్‌ల వంటి దృష్టి మరల్చే వాటిని నివారించండి మరియు అప్రమత్తంగా ఉండండి।"
      },
      {
        title: "సైకిల్ భద్రతా మార్గదర్శకాలు",
        content: "సైకిల్ తొక్కేటప్పుడు ఎల్లప్పుడూ హెల్మెట్ ధరించండి। మలుపులను సూచించడానికి చేతి సంకేతాలను ఉపయోగించండి మరియు వాహనాల నుండి సరైన దూరం ఉంచండి। ప్రతిబింబ దుస్తులు మరియు లైట్లతో కనిపించండి। ట్రాఫిక్ నియమాలను అనుసరించండి."
      },
      {
        title: "వాహన భద్రతా ప్రాథమికాలు",
        content: "ఎల్లప్పుడూ మీ సీట్‌బెల్ట్ ధరించండి। సురక్షితమైన అనుసరణ దూరాన్ని నిర్వహించండి మరియు మీ అద్దాలను క్రమం తప్పకుండా తనిఖీ చేయండి। మద్యం లేదా మాదకద్రవ్యాల ప్రభావంలో ఎప్పుడూ వాహనం నడపవద్దు।"
      },
      {
        title: "అత్యవసర ప్రతిస్పందన",
        content: "ప్రమాదం జరిగినప్పుడు, మొదట భద్రతకు వెళ్లండి। వెంటనే అత్యవసర సేవలకు కాల్ చేయండి। శిక్షణ పొందినట్లయితే ప్రథమ చికిత్స అందించండి మరియు అత్యవసర నంబర్లను చేతిలో ఉంచండి। ప్రశాంతంగా ఉండండి మరియు మీ భద్రతను నిర్ధారిస్తూ ఇతరులకు సహాయం చేయండి।"
      }
    ],
    es: [
      {
        title: "Señales y Semáforos de Tráfico",
        content: "Cruza solo en el paso de peatones cuando la señal esté en verde. Las señales de tráfico son tu guía para la navegación segura en carretera. Rojo significa parar, verde significa avanzar, y amarillo significa prepararse para parar. Entender estas señales básicas puede salvar tu vida y la de otros."
      },
      {
        title: "Reglas de Seguridad Peatonal",
        content: "Mira a ambos lados antes de cruzar la calle. Usa los cruces peatonales designados y obedece las señales de tráfico. Mantente alerta y evita distracciones como teléfonos móviles mientras caminas. Haz contacto visual con los conductores antes de cruzar."
      },
      {
        title: "Directrices de Seguridad en Bicicleta",
        content: "Siempre usa casco al andar en bicicleta. Usa señales de mano para indicar giros y mantén distancia adecuada de los vehículos. Mantente visible con ropa reflectante y luces. Sigue las reglas de tráfico ya que las bicicletas se consideran vehículos en la carretera."
      },
      {
        title: "Fundamentos de Seguridad Vehicular",
        content: "Usa siempre tu cinturón de seguridad. Mantén distancia de seguimiento segura y revisa tus espejos regularmente. Nunca conduzcas bajo la influencia del alcohol o drogas. Mantén tu vehículo en buen estado y asegúrate de que todo el equipo de seguridad funcione correctamente."
      },
      {
        title: "Respuesta de Emergencia",
        content: "En caso de accidente, muévete a un lugar seguro primero. Llama a los servicios de emergencia inmediatamente. Proporciona primeros auxilios si estás entrenado y mantén números de emergencia a mano. Mantén la calma y ayuda a otros mientras aseguras tu propia seguridad."
      }
    ],
    de: [
      {
        title: "Verkehrssignale und Zeichen",
        content: "Überqueren Sie die Straße nur an der Ampel mit grünem Licht. Verkehrssignale sind Ihr Leitfaden für sichere Straßennavigation. Rot bedeutet stoppen, grün bedeutet gehen, und gelb bedeutet sich auf das Stoppen vorbereiten. Das Verstehen dieser grundlegenden Signale kann Ihr Leben und das Leben anderer retten."
      },
      {
        title: "Fußgängersicherheitsregeln",
        content: "Schauen Sie vor dem Überqueren der Straße in beide Richtungen. Verwenden Sie ausgewiesene Zebrastreifen und befolgen Sie Verkehrssignale. Bleiben Sie aufmerksam und vermeiden Sie Ablenkungen wie Mobiltelefone beim Gehen. Stellen Sie Augenkontakt mit Fahrern her, bevor Sie überqueren."
      },
      {
        title: "Fahrrad-Sicherheitsrichtlinien",
        content: "Tragen Sie beim Fahrradfahren immer einen Helm. Verwenden Sie Handsignale für Abbiegungen und halten Sie angemessenen Abstand zu Fahrzeugen. Bleiben Sie mit reflektierender Kleidung und Lichtern sichtbar. Befolgen Sie Verkehrsregeln, da Fahrräder als Fahrzeuge auf der Straße gelten."
      },
      {
        title: "Fahrzeugsicherheit Grundlagen",
        content: "Tragen Sie immer Ihren Sicherheitsgurt. Halten Sie sicheren Folgeabstand ein und überprüfen Sie regelmäßig Ihre Spiegel. Fahren Sie niemals unter Alkohol- oder Drogeneinfluss. Halten Sie Ihr Fahrzeug gut instand und stellen Sie sicher, dass alle Sicherheitsausrüstungen ordnungsgemäß funktionieren."
      },
      {
        title: "Notfallreaktion",
        content: "Bei einem Unfall bewegen Sie sich zuerst in Sicherheit. Rufen Sie sofort den Notdienst. Leisten Sie Erste Hilfe, wenn Sie ausgebildet sind, und halten Sie Notrufnummern bereit. Bleiben Sie ruhig und helfen Sie anderen, während Sie Ihre eigene Sicherheit gewährleisten."
      }
    ],
    fr: [
      {
        title: "Signaux et Panneaux de Circulation",
        content: "Traversez uniquement au passage piéton lorsque le feu est vert. Les signaux de circulation sont votre guide pour une navigation routière sûre. Rouge signifie s'arrêter, vert signifie aller, et jaune signifie se préparer à s'arrêter. Comprendre ces signaux de base peut sauver votre vie et celle des autres."
      },
      {
        title: "Règles de Sécurité des Piétons",
        content: "Regardez des deux côtés avant de traverser la rue. Utilisez les passages piétons désignés et obéissez aux signaux de circulation. Restez vigilant et évitez les distractions comme les téléphones portables en marchant. Établissez un contact visuel avec les conducteurs avant de traverser."
      },
      {
        title: "Directives de Sécurité à Vélo",
        content: "Portez toujours un casque en faisant du vélo. Utilisez des signaux de la main pour indiquer les virages et maintenez une distance appropriée des véhicules. Restez visible avec des vêtements réfléchissants et des lumières. Suivez les règles de circulation car les vélos sont considérés comme des véhicules sur la route."
      },
      {
        title: "Bases de la Sécurité Véhiculaire",
        content: "Portez toujours votre ceinture de sécurité. Maintenez une distance de suivi sûre et vérifiez régulièrement vos rétroviseurs. Ne conduisez jamais sous l'influence de l'alcool ou de drogues. Maintenez votre véhicule en bon état et assurez-vous que tout l'équipement de sécurité fonctionne correctement."
      },
      {
        title: "Réponse d'Urgence",
        content: "En cas d'accident, déplacez-vous d'abord en sécurité. Appelez immédiatement les services d'urgence. Fournissez les premiers secours si vous êtes formé et gardez les numéros d'urgence à portée de main. Restez calme et aidez les autres tout en assurant votre propre sécurité."
      }
    ],
    ja: [
      {
        title: "交通信号と標識",
        content: "青信号の時に横断歩道を渡りましょう。交通信号は安全な道路ナビゲーションのガイドです。赤は止まれ、青は進め、黄色は止まる準備をすることを意味します。これらの基本的な信号を理解することで、あなたと他の人の命を救うことができます。"
      },
      {
        title: "歩行者安全ルール",
        content: "道路を渡る前に両方向を確認してください。指定された横断歩道を使用し、交通信号に従ってください。歩行中は携帯電話などの注意散漫を避け、警戒を怠らないでください。渡る前にドライバーとアイコンタクトを取ってください。"
      },
      {
        title: "自転車安全ガイドライン",
        content: "自転車に乗る時は常にヘルメットを着用してください。曲がる時は手信号を使い、車両との適切な距離を保ってください。反射材の服装とライトで視認性を確保してください。自転車は道路上の車両と見なされるため、交通ルールに従ってください。"
      },
      {
        title: "車両安全の基本",
        content: "常にシートベルトを着用してください。安全な車間距離を保ち、定期的にミラーをチェックしてください。アルコールや薬物の影響下では絶対に運転しないでください。車両を良好な状態に保ち、すべての安全装備が正常に機能することを確認してください。"
      },
      {
        title: "緊急時対応",
        content: "事故の場合は、まず安全な場所に移動してください。すぐに緊急サービスに電話してください。訓練を受けている場合は応急処置を行い、緊急連絡先を手元に置いてください。冷静を保ち、自分の安全を確保しながら他の人を助けてください。"
      }
    ],
    zh: [
      {
        title: "交通信号和标志",
        content: "绿灯亮时才能在斑马线上过马路。交通信号是您安全道路导航的指南。红灯表示停止，绿灯表示通行，黄灯表示准备停止。理解这些基本信号可以拯救您和他人的生命。"
      },
      {
        title: "行人安全规则",
        content: "过马路前要左右观察。使用指定的人行横道并遵守交通信号。保持警觉，步行时避免手机等分心物。过马路前与司机进行眼神交流以确保他们看到您。"
      },
      {
        title: "自行车安全指南",
        content: "骑自行车时始终佩戴头盔。使用手势信号指示转弯方向，与车辆保持适当距离。穿反光服装并使用灯光保持可见性。遵守交通规则，因为自行车在道路上被视为车辆。"
      },
      {
        title: "车辆安全基础",
        content: "始终系好安全带。保持安全跟车距离并定期检查后视镜。绝不在酒精或药物影响下驾驶。保持车辆良好状态，确保所有安全设备正常工作。"
      },
      {
        title: "紧急响应",
        content: "发生事故时，首先转移到安全地点。立即拨打紧急服务电话。如果受过训练则提供急救，并随身携带紧急联系电话。保持冷静，在确保自身安全的同时帮助他人。"
      }
    ],
    pt: [
      {
        title: "Sinais e Semáforos de Trânsito",
        content: "Atravesse apenas na faixa de pedestres quando o sinal estiver verde. Os sinais de trânsito são seu guia para navegação segura na estrada. Vermelho significa parar, verde significa ir, e amarelo significa se preparar para parar. Entender esses sinais básicos pode salvar sua vida e a vida de outros."
      },
      {
        title: "Regras de Segurança para Pedestres",
        content: "Olhe para ambos os lados antes de atravessar a rua. Use as faixas de pedestres designadas e obedeça aos sinais de trânsito. Mantenha-se alerta e evite distrações como telefones celulares ao caminhar. Faça contato visual com os motoristas antes de atravessar."
      },
      {
        title: "Diretrizes de Segurança para Bicicletas",
        content: "Sempre use capacete ao andar de bicicleta. Use sinais de mão para indicar curvas e mantenha distância adequada dos veículos. Mantenha-se visível com roupas refletivas e luzes. Siga as regras de trânsito, pois bicicletas são consideradas veículos na estrada."
      },
      {
        title: "Fundamentos de Segurança Veicular",
        content: "Sempre use seu cinto de segurança. Mantenha distância segura de seguimento e verifique seus espelhos regularmente. Nunca dirija sob influência de álcool ou drogas. Mantenha seu veículo em bom estado e certifique-se de que todos os equipamentos de segurança funcionem adequadamente."
      },
      {
        title: "Resposta de Emergência",
        content: "Em caso de acidente, mova-se para segurança primeiro. Chame os serviços de emergência imediatamente. Forneça primeiros socorros se treinado e mantenha números de emergência à mão. Mantenha a calma e ajude outros enquanto garante sua própria segurança."
      }
    ],
    ru: [
      {
        title: "Дорожные сигналы и знаки",
        content: "Переходите дорогу только по пешеходному переходу при зеленом сигнале. Дорожные сигналы - ваш путеводитель для безопасного движения по дороге. Красный означает стоп, зеленый означает идти, а желтый означает приготовиться к остановке. Понимание этих основных сигналов может спасти вашу жизнь и жизни других."
      },
      {
        title: "Правила безопасности пешеходов",
        content: "Посмотрите в обе стороны перед переходом улицы. Используйте обозначенные пешеходные переходы и соблюдайте дорожные сигналы. Оставайтесь бдительными и избегайте отвлекающих факторов, таких как мобильные телефоны, во время ходьбы. Установите зрительный контакт с водителями перед переходом."
      },
      {
        title: "Рекомендации по безопасности велосипедистов",
        content: "Всегда носите шлем при езде на велосипеде. Используйте сигналы рукой для указания поворотов и поддерживайте правильное расстояние от транспортных средств. Оставайтесь видимыми в светоотражающей одежде и с фонарями. Соблюдайте правила дорожного движения, поскольку велосипеды считаются транспортными средствами на дороге."
      },
      {
        title: "Основы безопасности транспортных средств",
        content: "Всегда пристегивайтесь ремнем безопасности. Поддерживайте безопасную дистанцию следования и регулярно проверяйте зеркала. Никогда не водите под воздействием алкоголя или наркотиков. Поддерживайте свой автомобиль в хорошем состоянии и убедитесь, что все оборудование безопасности работает правильно."
      },
      {
        title: "Реагирование на чрезвычайные ситуации",
        content: "В случае аварии сначала переместитесь в безопасное место. Немедленно вызовите службы экстренного реагирования. Оказывайте первую помощь, если обучены, и держите номера экстренных служб под рукой. Сохраняйте спокойствие и помогайте другим, обеспечивая собственную безопасность."
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