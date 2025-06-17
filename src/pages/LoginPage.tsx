import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Globe, ChevronDown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { countries, getTranslation, type Country, type Language } from '../../lib/data';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [showCountries, setShowCountries] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  // Default to English for initial UI
  const currentLang = selectedLanguage?.code || 'en';

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    // Auto-select English if available, otherwise first language
    const defaultLang = country.languages.find(lang => lang.code === 'en') || country.languages[0];
    setSelectedLanguage(defaultLang);
    setShowCountries(false);
    setShowLanguages(false);
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setShowLanguages(false);
  };

  const handleContinue = () => {
    if (selectedCountry && selectedLanguage) {
      // Store selections in localStorage for later use
      localStorage.setItem('selectedCountry', JSON.stringify(selectedCountry));
      localStorage.setItem('selectedLanguage', JSON.stringify(selectedLanguage));
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Road Safety 2.0</h1>
          <p className="text-gray-600">Learn road safety in your language</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Get Started
            </CardTitle>
            <CardDescription>
              Select your country and preferred language to begin your road safety journey.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Country Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getTranslation(currentLang, 'ui', 'chooseCountry', 'Choose your Country')}
              </label>
              <button
                onClick={() => setShowCountries(!showCountries)}
                className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <span className="flex items-center gap-2">
                  {selectedCountry ? (
                    <>
                      <span className="text-xl">{selectedCountry.flag}</span>
                      <span>{selectedCountry.name}</span>
                    </>
                  ) : (
                    <span className="text-gray-500">
                      {getTranslation(currentLang, 'ui', 'selectCountry', 'Select your country')}
                    </span>
                  )}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showCountries ? 'rotate-180' : ''}`} />
              </button>
              
              {showCountries && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                >
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span>{country.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Language Selection */}
            {selectedCountry && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="relative"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getTranslation(currentLang, 'ui', 'preferredLanguage', 'Preferred Language')}
                </label>
                <button
                  onClick={() => setShowLanguages(!showLanguages)}
                  className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <span className="flex items-center gap-2">
                    {selectedLanguage ? (
                      <>
                        <span>{selectedLanguage.nativeName}</span>
                        <span className="text-sm text-gray-500">({selectedLanguage.name})</span>
                      </>
                    ) : (
                      <span className="text-gray-500">
                        {getTranslation(currentLang, 'ui', 'selectLanguage', 'Select your language')}
                      </span>
                    )}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showLanguages ? 'rotate-180' : ''}`} />
                </button>
                
                {showLanguages && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
                  >
                    {selectedCountry.languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageSelect(language)}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <span>{language.nativeName}</span>
                        <span className="text-sm text-gray-500">{language.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}

            <Button
              onClick={handleContinue}
              disabled={!selectedCountry || !selectedLanguage}
              className="w-full mt-6"
              size="lg"
            >
              {getTranslation(currentLang, 'ui', 'startLearning', 'Start Learning')}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;