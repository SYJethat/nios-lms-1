export interface CourseLesson {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'pdf' | 'quiz' | 'flipbook' | 'live';
  done?: boolean;
  videoUrl?: string;
  description?: string;
}

export interface LanguageTrack {
  code: string;
  name: string;
  nativeName: string;
  speechCode: string; // e.g. hi-IN, en-US
  title: string;
  summary: string;
  transcript: string;
  videoUrl: string;
}

export interface Course {
  id: string;
  titleHindi: string;
  titleEnglish: string;
  subjectHindi: string;
  subjectEnglish: string;
  category: string;
  level: 'Secondary' | 'Senior Secondary' | 'Vocational' | 'Foundational';
  rating: number;
  reviewsCount: number;
  duration: string;
  lessonsCount: number;
  price: number;
  originalPrice: number;
  instructor: {
    name: string;
    designation: string;
    avatar: string;
    verified: boolean;
  };
  thumbnail: string;
  badge?: string;
  isEnrolledDefault?: boolean;
  overview: string;
  objectives: string[];
  lessons: CourseLesson[];
  languageTracks: Record<string, LanguageTrack>;
}

// 23 Scheduled Indian Languages with native script and voice code
export const INDIAN_LANGUAGES_22 = [
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', voice: 'hi-IN' },
  { code: 'en', name: 'English', native: 'English', voice: 'en-US' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', voice: 'as-IN' },
  { code: 'bn', name: 'Bangla', native: 'বাংলা', voice: 'bn-IN' },
  { code: 'bh', name: 'Bhojpuri', native: 'भोजपुरी', voice: 'hi-IN' },
  { code: 'brx', name: 'Bodo', native: "बर'/बड़ो", voice: 'hi-IN' },
  { code: 'doi', name: 'Dogri', native: 'डोगरी', voice: 'hi-IN' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', voice: 'gu-IN' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', voice: 'kn-IN' },
  { code: 'ks', name: 'Kashmiri', native: 'کٲشُر', voice: 'ks-IN' },
  { code: 'kok', name: 'Konkani', native: 'कोंकणी', voice: 'kok-IN' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली', voice: 'hi-IN' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', voice: 'ml-IN' },
  { code: 'mni', name: 'Manipuri', native: 'মণিপুরী', voice: 'bn-IN' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', voice: 'mr-IN' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली', voice: 'ne-NP' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', voice: 'or-IN' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', voice: 'pa-IN' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्', voice: 'sa-IN' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', voice: 'hi-IN' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي', voice: 'sd-IN' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', voice: 'ta-IN' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', voice: 'te-IN' },
  { code: 'ur', name: 'Urdu', native: 'اردو', voice: 'ur-PK' },
];

export const COURSES_DATA: Course[] = [
  // ── 1ST SUBJECT (EXPLICIT USER REQUEST) ──
  {
    id: 'course-env-001',
    titleHindi: 'गिलहरी को अपनी धारियां कैसे मिलीं – एक नैतिक कथा',
    titleEnglish: 'How the Squirrel Got His Stripes – A Moral Tale',
    subjectHindi: 'माध्यमिक अंग्रेजी (Secondary English – Lesson 2)',
    subjectEnglish: 'Secondary English – How the Squirrel Got His Stripes',
    category: 'साहित्य, कथाएं एवं नैतिक मूल्य (Fiction, Tales, Myths and Epics)',
    level: 'Secondary',
    rating: 4.98,
    reviewsCount: 2150,
    duration: '12 Hours 45 Mins',
    lessonsCount: 8,
    price: 499,
    originalPrice: 1999,
    badge: 'NIOS Secondary English',
    isEnrolledDefault: true,
    thumbnail: 'https://images.unsplash.com/photo-1507666405895-422eee7d517f?w=1200&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Prof. Ananya Sen & Dr. R. K. Sharma',
      designation: 'Senior Faculty, Department of English & Indian Literature, NIOS',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      verified: true
    },
    overview: 'यह प्रसिद्ध पाठ "How the Squirrel Got His Stripes" रामायण की एक अत्यंत प्रेरक कथा पर आधारित है। जब भगवान राम और वानर सेना लंका तक सेतु का निर्माण कर रहे थे, तब एक नन्हीं गिलहरी ने अपने छोटे-छोटे पंजों और मुंह से कंकड़ उठाकर समुद्र में डालना शुरू किया। वानरों द्वारा उसका उपहास उड़ाने पर भगवान राम ने प्रेमपूर्वक समझाया कि कोई भी कार्य या सेवा छोटी नहीं होती यदि वह सच्ची निष्ठा और भक्ति से की जाए। भगवान राम ने गिलहरी की पीठ पर स्नेह से अपनी उंगलियां फेरीं, जिससे उसकी पीठ पर तीन पवित्र धारियां बन गईं। यह पाठ विद्यार्थियों को निःस्वार्थ समर्पण, कर्मनिष्ठा और साहित्य के गहरे नैतिक संदेशों की शिक्षा देता है। शिक्षार्थी 22 भारतीय भाषाओं में डब वीडियो, ऑडियो व्याख्या एवं इंटरएक्टिव अभ्यास सामग्री का लाभ उठा सकते हैं।',
    objectives: [
      'कहानी के मुख्य नैतिक संदेश "कोई भी प्रयास छोटा नहीं होता" (No effort is small if done with true love and devotion) को समझना।',
      'साहित्यिक विधाओं: कथा, मिथक, दंतकथा एवं महाकाव्य (Fiction, Tales, Myths and Epics) के स्वरूप और उनके संदेशों का विश्लेषण करना।',
      'अंग्रेजी भाषा, नई शब्दावली, मुहावरों, उपसर्ग-प्रत्यय और व्याकरण नियमों का सही प्रयोग सीखना।',
      'निस्वार्थ सेवा भाव, करुणा, विनम्रता और समर्पण जैसे मानवीय नैतिक मूल्यों को जीवन में आत्मसात करना।',
      '22 भारतीय भाषाओं में अनुवाद, संवाद एवं माध्यमिक अंग्रेजी परीक्षा के अभ्यास प्रश्नों का सटीक समाधान करना।'
    ],
    lessons: [
      {
        id: 1,
        title: 'पाठ 1: कथा परिचय - सेतु निर्माण और नन्हीं गिलहरी का श्रम',
        duration: '18 min',
        type: 'video',
        done: true,
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/hindi.mp4',
        description: 'राम सेतु निर्माण की पृष्ठभूमि, वानर सेना का विशाल श्रम और नन्हीं गिलहरी का निःस्वार्थ योगदान।'
      },
      {
        id: 2,
        title: 'पाठ 2: वानरों का उपहास एवं भगवान राम का स्नेह',
        duration: '20 min',
        type: 'video',
        done: true,
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/hindi.mp4',
        description: 'वानरों द्वारा गिलहरी का उपहास और भगवान राम द्वारा उसकी सेवा भावना की सराहना।'
      },
      {
        id: 3,
        title: 'पाठ 3: तीन पवित्र धारियां - निःस्वार्थ सेवा का प्रतीक',
        duration: '22 min',
        type: 'video',
        done: false,
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/hindi.mp4',
        description: 'भगवान राम के स्नेह स्पर्श से गिलहरी की पीठ पर तीन धारियां बनने की कथा और नैतिक सार।'
      },
      {
        id: 4,
        title: 'पाठ 4: अंग्रेजी शब्दावली एवं व्याकरण विश्लेषण',
        duration: '25 min',
        type: 'video',
        done: false,
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/english.mp4',
        description: 'पाठ में प्रयुक्त कठिन शब्द, मुहावरे, प्रत्यय-उपसर्ग और व्याकरण के नियम।'
      },
      {
        id: 5,
        title: 'पाठ 5: अध्ययन सामग्री (SLM) - पाठ्यपुस्तक एवं अभ्यास प्रश्न',
        duration: '15 min',
        type: 'pdf',
        done: false,
        description: 'राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान (NIOS) की आधिकारिक अंग्रेजी अध्ययन पुस्तिका।'
      },
      {
        id: 6,
        title: 'पाठ 6: संवादात्मक फ्लिपबुक - रामायण प्रसंग एवं सचित्र कथा',
        duration: '12 min',
        type: 'flipbook',
        done: false,
        description: 'सचित्र डिजिटल फ्लिपबुक द्वारा रामायण की इस पावन कथा का दृश्य-श्रव्य अवलोकन।'
      },
      {
        id: 7,
        title: 'पाठ 7: बहुविकल्पीय प्रश्नोत्तरी (MCQ Quiz) - स्व-मूल्यांकन',
        duration: '20 min',
        type: 'quiz',
        done: false,
        description: 'पाठ की समझ और व्याकरणिक दक्षता की जांच के लिए 15 महत्वपूर्ण प्रश्नों का क्विज।'
      },
      {
        id: 8,
        title: 'पाठ 8: लाइव शंका समाधान सत्र (Live Doubt Clearing)',
        duration: '45 min',
        type: 'live',
        done: false,
        description: 'अंग्रेजी विषय विशेषज्ञों के साथ लाइव संवाद एवं परीक्षा उपयोगी टिप्स।'
      }
    ],
    languageTracks: {
      hi: {
        code: 'hi',
        name: 'Hindi',
        nativeName: 'हिन्दी',
        speechCode: 'hi-IN',
        title: 'गिलहरी को अपनी धारियां कैसे मिलीं – एक नैतिक कथा',
        summary: 'रामायण की प्रेरक कथा: भगवान राम द्वारा नन्हीं गिलहरी के निःस्वार्थ समर्पण को आशीर्वाद देकर उसकी पीठ पर तीन धारियां अंकित करने का नैतिक पाठ।',
        transcript: 'नमस्ते विद्यार्थियों, राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान (NIOS) के माध्यमिक अंग्रेजी पाठ्यक्रम में आपका स्वागत है। आज का हमारा पाठ है "How the Squirrel Got His Stripes – A Moral Tale"। यह पाठ हमें सिखाता है कि कोई भी काम छोटा नहीं होता। जब भगवान राम लंका तक सेतु का निर्माण कर रहे थे, तब एक नन्हीं गिलहरी ने भी कंकड़ लाकर समुद्र में डाले...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/hindi.mp4'
      },
      en: {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        speechCode: 'en-US',
        title: 'How the Squirrel Got His Stripes – A Moral Tale',
        summary: 'The timeless moral tale from the Ramayana where Lord Rama blesses a humble squirrel helping build the bridge to Lanka, leaving three sacred stripes on its back.',
        transcript: 'Welcome students to NIOS Secondary English Lesson 2: "How the Squirrel Got His Stripes – A Moral Tale"। Today we study how dedication and love surpass physical might. While monkeys carried massive boulders, a tiny squirrel carried pebbles in its mouth. Lord Rama gently stroked its back, immortalizing its devotion with three white stripes...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/english.mp4'
      },
      bn: {
        code: 'bn',
        name: 'Bengali',
        nativeName: 'বাংলা',
        speechCode: 'bn-IN',
        title: 'কাঠবেড়ালি কীভাবে তার গায়ের ডোরা দাগ পেল – একটি নীতিমূলক গল্প',
        summary: 'রামায়ণের অমর নীতিশিক্ষা: রাম সেতু নির্মাণে ক্ষুদ্র কাঠবেড়ালির নিঃস্বার্থ অবদান এবং প্রভু রামের আঙুলের স্নেহের স্পর্শে পিঠে তিনটি সাদা দাগ প্রাপ্তি।',
        transcript: 'প্রিয় শিক্ষার্থীবৃন্দ, এনআইওএস মাধ্যমিক ইংরেজি পাঠে স্বাগতম। আজকের পাঠ কাঠবেড়ালির দাগ পাওয়ার নীতিমূলক গল্প। বড় পাথর নয়, আন্তরিক ভালোবাসাই কাজের আসল শক্তি...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/bengali.mp4'
      },
      bh: {
        code: 'bh',
        name: 'Bhojpuri',
        nativeName: 'भोजपुरी',
        speechCode: 'hi-IN',
        title: 'गिलहरी के आपन पीठ पर धारी कइसे मिलल – एगो नीतिकथा',
        summary: 'रामायण के प्रेरक कथा: भगवान राम द्वारा नन्हीं गिलहरी के निःस्वार्थ समर्पण के आशीर्वाद देके पीठ पर तीन गो धारी अंकित करे के पाठ।',
        transcript: 'सभ बिद्यार्थी लोगन के प्रणाम। आज के पाठ में हमनी के सीखब कि कवनो काम छोट ना होला...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/hindi.mp4'
      },
      te: {
        code: 'te',
        name: 'Telugu',
        nativeName: 'తెలుగు',
        speechCode: 'te-IN',
        title: 'ఉడుతకు వీపుపై చారలు ఎలా వచ్చాయి – ఒక నీతి కథ',
        summary: 'రామాయణంలోని ఉడుత భక్తి కథ: సేతు నిర్మాణంలో ఉడుత చేసిన చిన్న సాయాన్ని మెచ్చి శ్రీరాముడు వీపుపై తన వేళ్ళతో స్పృశించి మూడు చారలను ప్రసాదించడం.',
        transcript: 'విద్యార్థులందరికీ స్వాగతం. "ఉడుత భక్తి" అనే నానుడి వెనుక ఉన్న గొప్ప సందేశం ఇది. ఏ పనీ చిన్నది కాదు, భక్తితో చేసే ప్రతి ప్రయత్నం గొప్పదే...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/telugu.mp4'
      },
      mr: {
        code: 'mr',
        name: 'Marathi',
        nativeName: 'मराठी',
        speechCode: 'mr-IN',
        title: 'खारुताईला तिच्या पाठीवर पट्टे कसे मिळाले – एक बोधकथा',
        summary: 'रामायणातील सुप्रसिद्ध खारुताईची गोष्ट: प्रभू रामांच्या प्रेमाने खारुताईच्या पाठीवर पडलेले तीन शुभ्र पट्टे आणि निःस्वार्थ सेवेचा संदेश.',
        transcript: 'विद्यार्थी मित्रांनो, एनआयओएसच्या इंग्रजी वर्गात आपले स्वागत आहे. आज आपण शिकणार आहोत की कार्य कितीही लहान असले तरी त्यामागील निष्ठा किती मौल्यवान असते...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/marathi.mp4'
      },
      ta: {
        code: 'ta',
        name: 'Tamil',
        nativeName: 'தமிழ்',
        speechCode: 'ta-IN',
        title: 'அணிலுக்கு முதுகில் கோடுகள் எவ்வாறு கிடைத்தன – ஒரு நீதி போதனை கதை',
        summary: 'இராமாயணத்தில் அணிலின் பக்தி: சேது பாலம் கட்டும்போது அணில் செய்த சிறு உதவியை பாராட்டி, ஸ்ரீராமர் அதன் முதுகைத் தடவி மூன்று வரிகளை அருளிய கதை.',
        transcript: 'மாணவர்களுக்கு வணக்கம். "அணில் செய்த உதவி" என்ற புகழ்பெற்ற கதையின் மூலம் அன்புடனும் அர்ப்பணிப்புடனும் செய்யப்படும் எந்தவொரு பணியும் மேன்மையானது என்பதை நாம் அறிகிறோம்...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/tamil.mp4'
      },
      gu: {
        code: 'gu',
        name: 'Gujarati',
        nativeName: 'ગુજરાતી',
        speechCode: 'gu-IN',
        title: 'ખિસકોલીને તેની પીઠ પર પટ્ટા કેવી રીતે મળ્યા – એક બોધપ્રદ વાર્તા',
        summary: 'રામાયણની પ્રેરણાદાયી ખિસકોલીની ભક્તિની વાર્તા: પ્રભુ રામના વરદાનથી ખિસકોલીની પીઠ પર પડેલા ત્રણ પવિત્ર પટ્ટા.',
        transcript: 'નમસ્તે વિદ્યાર્થીઓ, આજના સત્રમાં આપણે રામાયણની એ બોધકથા શીખીશું જેમાં ખિસકોલીએ સેતુ નિર્માણમાં પોતાનું યથાશક્તિ યોગદાન આપ્યું હતું...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/gujarati.mp4'
      },
      kn: {
        code: 'kn',
        name: 'Kannada',
        nativeName: 'ಕನ್ನಡ',
        speechCode: 'kn-IN',
        title: 'ಅಳಿಲಿಗೆ ತನ್ನ ಬೆನ್ನಿನ ಮೇಲೆ ಪಟ್ಟೆಗಳು ಹೇಗೆ ಬಂದವು – ಒಂದು ನೀತಿ ಕಥೆ',
        summary: 'ಅಳಿಲು ಸೇವೆ ಮತ್ತು ಭಕ್ತಿಯ ಕಥೆ: ಸೇತು ನಿರ್ಮಾಣದಲ್ಲಿ ಪುಟ್ಟ ಅಳಿಲಿನ ಶ್ರದ್ಧೆಯನ್ನು ಮೆಚ್ಚಿ ಶ್ರೀರಾಮಚಂದ್ರನು ಬೆನ್ನನ್ನು ನೇವರಿಸಿ ಮೂರು ಗೆರೆಗಳನ್ನು ಕರುಣಿಸಿದ ಪ್ರಸಂಗ.',
        transcript: 'ಎನ್ಐಒಎಸ್ ತರಗತಿಗೆ ಸ್ವಾಗತ. "ಅಳಿಲು ಸೇವೆ" ಎಂಬ ಜನಪ್ರಿಯ ನಾಣ್ಣುಡಿಯಂತೆ, ಯಾವುದೇ ಕೆಲಸವು ಚಿಕ್ಕದಲ್ಲ. ಭಕ್ತಿ ಮತ್ತು ಶ್ರದ್ಧೆಯೇ ಶ್ರೇಷ್ಠ...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/kannada.mp4'
      },
      ml: {
        code: 'ml',
        name: 'Malayalam',
        nativeName: 'മലയാളം',
        speechCode: 'ml-IN',
        title: 'അണ്ണാറക്കണ്ണന് മുതുകിലെ വരകൾ എങ്ങനെ ലഭിച്ചു – ഒരു ഗുണപാഠ കഥ',
        summary: 'രാമായണത്തിലെ അണ്ണാറക്കണ്ണന്റെ ഭക്തി: സേതു നിർമ്മാണത്തിൽ പങ്കാളിയായ കൊച്ചു അണ്ണാനെ അനുഗ്രഹിച്ച് ശ്രീരാമൻ തഴുകിയപ്പോൾ മുതുകിൽ ഉണ്ടായ മൂന്ന് വരകൾ.',
        transcript: 'പ്രിയ വിദ്യാർത്ഥികളെ സ്വാഗതം. "അണ്ണാറക്കണ്ണനും തന്നാലായത്" എന്ന ചൊല്ലിന്റെ പൊരുൾ വ്യക്തമാക്കുന്നതാണ് ഈ കഥ. നിസ്വാർത്ഥ സേവനമാണ് ഏറ്റവും മഹത്തരം...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/malayalam.mp4'
      },
      pa: {
        code: 'pa',
        name: 'Punjabi',
        nativeName: 'ਪੰਜਾਬੀ',
        speechCode: 'pa-IN',
        title: "ਗਿਲਹਿਰੀ ਨੂੰ ਆਪਣੀ ਪਿੱਠ 'ਤੇ ਧਾਰੀਆਂ ਕਿਵੇਂ ਮਿਲੀਆਂ – ਇਕ ਨੈਤਿਕ ਕਹਾਣੀ",
        summary: "ਰਾਮਾਇਣ ਦੀ ਪ੍ਰੇਰਨਾਦਾਇਕ ਕਹਾਣੀ: ਨਿੱਕੀ ਜਿਹੀ ਗਿਲਹਿਰੀ ਦੀ ਸੇਵਾ ਭਾਵਨਾ ਅਤੇ ਭਗਵਾਨ ਰਾਮ ਦੇ ਹੱਥਾਂ ਦੀ ਛੋਹ ਨਾਲ ਪਿੱਠ 'ਤੇ ਪਈਆਂ ਤਿੰਨ ਪਵਿੱਤਰ ਧਾਰੀਆਂ।",
        transcript: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਵਿਦਿਆਰਥੀਓ, ਅੱਜ ਦਾ ਪਾਠ ਸਾਨੂੰ ਸਿਖਾਉਂਦਾ ਹੈ ਕਿ ਪ੍ਰੇਮ ਅਤੇ ਸ਼ਰਧਾ ਨਾਲ ਕੀਤਾ ਕੋਈ ਵੀ ਕੰਮ ਛੋਟਾ ਨਹੀਂ ਹੁੰਦਾ...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/punjabi.mp4'
      },
      or: {
        code: 'or',
        name: 'Odia',
        nativeName: 'ଓଡ଼ିଆ',
        speechCode: 'or-IN',
        title: "ଗୁଣ୍ଡୁଚିମୂଷା ତା' ପିଠିରେ ଗାର କିପରି ପାଇଲା – ଏକ ନୀତିଶିକ୍ଷା ମୂଳକ କାହାଣୀ",
        summary: 'ରାମାୟଣର ଗୁଣ୍ଡୁଚି ମୂଷାର ସେବା: ସେତୁ ନିର୍ମାଣରେ ତାହାର ନିଷ୍ଠାପର ଅବଦାନକୁ ଦେଖି ପ୍ରଭୁ ରାମଚନ୍ଦ୍ର ସ୍ନେହରେ ପିଠି ଆଉଁସି ଦେବାରୁ ତିନୋଟି ଧଳା ଗାର ସୃଷ୍ଟି ହେବା।',
        transcript: 'ନମସ୍କାର ଛାତ୍ରଛାତ୍ରୀମାନେ, ଆଜି ଆମେ ପଢ଼ିବା କିପରି ନିଷ୍ଠା ଓ ଭକ୍ତି ବଳରେ ଏକ କ୍ଷୁଦ୍ର ଗୁଣ୍ଡୁଚି ମୂଷା ଭଗବାନଙ୍କ ଆଶୀର୍ବାଦ ଲାଭ କରିଥିଲା...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/odia.mp4'
      },
      as: {
        code: 'as',
        name: 'Assamese',
        nativeName: 'অসমীয়া',
        speechCode: 'as-IN',
        title: 'কেৰ্কেটুৱাটোৱে কেনেকৈ তাৰ পিঠিৰ দাগবোৰ পালে – এটা নীতিশিক্ষা কাহিনী',
        summary: 'ৰামায়ণৰ অনুপ্ৰেৰণামূলক কাহিনী: ৰাম সেতু নিৰ্মাণত সৰু কেৰ্কেটুৱাটোৰ নিঃস্বাৰ্থ সেৱা আৰু ভগৱান ৰামৰ আশীৰ্বাদত পিঠিত তিনিটা দাগ পোৱাৰ বিৱৰণ।',
        transcript: 'ছাত্ৰ-ছাত্ৰীসকলক স্বাগতম। আজিৰ পাঠত আমি শিকিম যে একাগ্ৰতা আৰু ভক্তিয়েহে কামৰ প্ৰকৃত মহত্ত্ব নিৰ্ণয় কৰে, আকাৰে নহয়...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/assamese.mp4'
      },
      ur: {
        code: 'ur',
        name: 'Urdu',
        nativeName: 'اردو',
        speechCode: 'ur-PK',
        title: 'گلہری کو اپنی پشت پر دھاریاں کیسے ملیں – ایک اخلاقی کہانی',
        summary: 'رامائن کا تاریخی اخلاقی سبق: ننھی گلہری کی بے لوث محنت اور خدمت پر پربھو رام کی محبت سے پشت پر تین دھاریاں بننے کی داستان۔',
        transcript: 'عزیز طلبہ، این آئی او ایس کے انگلش لیسن میں آپ کا خیر مقدم ہے۔ آج ہم ایک سبق آموز کہانی پڑھیں گے جو ہمیں سکھاتی ہے کہ خلوص نیت سے کیا گیا کوئی کام چھوٹا نہیں ہوتا...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/hindi.mp4'
      },
      sa: {
        code: 'sa',
        name: 'Sanskrit',
        nativeName: 'संस्कृतम्',
        speechCode: 'sa-IN',
        title: 'कथं चिक्रोडः स्वपृष्ठे रेखाः अलभत – एका नीतिपूर्णा कथा',
        summary: 'रामायणस्य चिक्रोडसेवाप्रसङ्गः: सेतुनिर्माणे लघुकायस्य चिक्रोडस्य समर्पणं दृष्ट्वा भगवता श्रीरामेण तस्य पृष्ठे अङ्गुलीभिः रेखात्रयं वरदानरूपेण दत्तम्।',
        transcript: 'सर्वेभ्यः छात्रेभ्यः सादरं नमः। अस्मिन् पाठे वयं पठामः यत् कर्मणि निष्ठा एव श्रेष्ठा भवति, न तु शरीरस्य बलम्। चिक्रोडस्य सेवा अस्मान् प्रेरयति...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/sanskrit.mp4'
      },
      ks: {
        code: 'ks',
        name: 'Kashmiri',
        nativeName: 'کٲشُر',
        speechCode: 'ks-IN',
        title: 'گلہری کتھکن لٔبی پننس پٹھس پیٹھ لکیرہٕ – اکھ اخلاقی دٔلیل',
        summary: 'رامائن ہنز نصیحت آموز دٔلیل: ننہِ گلہری ہند خلوص تہٕ سیوا ہند سبق۔',
        transcript: 'خوش آمدید، از چھی اسہٕ پران یہ دٔلیل زِ محبتس منز چھُنہ کانہہ تہِ کامہِ لۄکٹ آسان...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/kashmiri.mp4'
      },
      kok: {
        code: 'kok',
        name: 'Konkani',
        nativeName: 'कोंकणी',
        speechCode: 'kok-IN',
        title: 'खारुतेक तिचे फाटीर पट्टे कसे मेळ्ळे – एक नीतिकथा',
        summary: 'रामायणांतली खारुतेची कथा: प्रभू रामाच्या आशीर्वादान खारुतेच्या फाटीर तीन पट्टे मेळपाची देखणी कथा.',
        transcript: 'विद्यार्थ्यांनो येवकार. निस्वार्थ भावनेन केल्लें ल्हान काम लेगीत व्हड आसता हें ही कथा शिकयता...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/konkani.mp4'
      },
      mai: {
        code: 'mai',
        name: 'Maithili',
        nativeName: 'मैथिली',
        speechCode: 'hi-IN',
        title: 'गिलहरी केँ अपन पीठ पर धारी कोना भेटलै – एकटा नीतिकथा',
        summary: 'रामायणक गिलहरी सेवा: भगवान राम द्वारा नन्ही गिलहरी केँ पीठ पर हाथ फेरि तीनटा पावन धारी प्रदान करबाक कथा।',
        transcript: 'मिथिलाक समस्त विद्यार्थीगणकेँ प्रणाम। आजुक पाठ मे हम सब पढ़ब जे कोनो काज छोट नै होइत अछि...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/maithili.mp4'
      },
      mni: {
        code: 'mni',
        name: 'Manipuri',
        nativeName: 'মণিপুরী',
        speechCode: 'bn-IN',
        title: 'তেনৱানা মহাক্কী মথক্তা মচু-মচু মচাং করম্না ফংখিবগে – ৱারী অমসুং পাউতাক',
        summary: 'ৰামায়ণগী তেনৱাগী কৎথোকপগী ৱারী অমসুং মহাক্না ফংখিবা থৌজাল।',
        transcript: 'মহৈরোইশিংবু তরাম্না ওকচরি। থম্মোই সেন্না তৌবা থবক অদুদি কৈদৌনুংদা অপীকপা ওইদে...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/manipuri.mp4'
      },
      ne: {
        code: 'ne',
        name: 'Nepali',
        nativeName: 'नेपाली',
        speechCode: 'ne-NP',
        title: 'लोखर्केले आफ्नो ढाडमा धर्काहरू कसरी पायो – एक नैतिक कथा',
        summary: 'रामायणको प्रसिद्ध लोखर्केको कथा: निःस्वार्थ भक्ति र भगवान रामको आशीर्वादले ढाडमा परेका तीन पवित्र धर्काहरू।',
        transcript: 'नमस्ते विद्यार्थीहरू, आज हामी अंग्रेजी पाठ २ "How the Squirrel Got His Stripes" अध्ययन गर्नेछौं...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/nepali.mp4'
      },
      brx: {
        code: 'brx',
        name: 'Bodo',
        nativeName: 'बड़ो',
        speechCode: 'hi-IN',
        title: "उन्दै खिरिआ बबेहाय बिखायाव दागफोर मोनखो – मोनसे मोजां सल'",
        summary: "रामायणनि खिरिनि बिहोमा आरो भगवान रामनि अननायनि सानस्रि सल'।",
        transcript: 'गासैबो फरायसुलाफोरखौ बरायबाय। जेबो मावनायानो उन्दै नङा जुदि अननाय आरो सिबियोब्ला...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/bodo.mp4'
      },
      sat: {
        code: 'sat',
        name: 'Santali',
        nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ',
        speechCode: 'hi-IN',
        title: 'ᱪᱮᱫ ᱞᱮᱠᱟᱛᱮ ᱛᱩᱲᱩ ᱫᱚ ᱟᱡᱟᱜ ᱫᱮᱭᱟ ᱨᱮ ᱜᱟᱨ ᱠᱚᱭ ᱧᱟᱢ ᱠᱮᱫᱟ – ᱢᱤᱫ ᱱᱤᱛᱤ ᱠᱟᱹᱦᱱᱤ',
        summary: 'ᱨᱟᱢᱟᱭᱚᱬ ᱨᱮᱱᱟᱜ ᱛᱩᱲᱩ ᱟᱜ ᱥᱮᱵᱟ ᱟᱨ ᱵᱷᱚᱜᱽᱵᱟᱱ ᱨᱟᱢ ᱟᱜ ᱟᱥᱤᱨᱵᱟᱫᱽ ᱠᱟᱹᱦᱱᱤ।',
        transcript: 'ᱡᱚᱛᱚ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ। ᱱᱤᱭᱟᱹ ᱠᱟᱹᱦᱱᱤ ᱫᱚ ᱵᱚᱱ ᱪᱮᱫᱚᱜ ᱠᱟᱱᱟ ᱡᱮ ᱠᱩᱨᱩᱢᱩᱴᱩ ᱫᱚ ᱛᱤᱥ ᱦᱚᱸ ᱦᱩᱰᱤᱧ ᱵᱟᱝ ᱠᱟᱱᱟ...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/santhali.mp4'
      },
      doi: {
        code: 'doi',
        name: 'Dogri',
        nativeName: 'डोगरी',
        speechCode: 'hi-IN',
        title: 'गलैह्ड़ी गी अपनी पिठ पर धारियां किन्नें लब्बियां – इक नीतिकथा',
        summary: 'रामायण दी प्रेरणादायी गलैह्ड़ी दी कथा: भगवान राम दे वरदान कन्नै पिठ पर पाइयां त्रै धारियां।',
        transcript: 'सारे विद्यार्थीएं गी प्यार भरा नमस्ते। सच्चे मन कन्नै कीता कोई वी कम्म निक्का नेईं हुंदा...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/dogri.mp4'
      },
      sd: {
        code: 'sd',
        name: 'Sindhi',
        nativeName: 'سنڌي',
        speechCode: 'sd-IN',
        title: 'گلھريءَ کي پنهنجي پٺيءَ تي پٽيون ڪيئن مليون – هڪ اخلاقي ڪهاڻي',
        summary: 'رامائن جي مشهور نيتڪ ڪهاڻي: سچي خلوص سان ڪيل محنت ۽ ڀਗوان رام جي هٿ ڦيرڻ سان گلھريءَ جي پٺيءَ تي نڪتل ٽي مبارڪ پٽيون.',
        transcript: 'پيارا شاگردو، هن سبق ۾ اسان پڙهنداسين ته خلوص سان ڪيل ڪو به ڪم ننڍو ناهي هوندو...',
        videoUrl: '/courses/how-the-squirrel-got-his-stripes/sindhi.mp4'
      }
    }
  },

  // ── 2ND SUBJECT ──
  {id:"course-bio-001",titleHindi:"मानव जीवन में पशु-पक्षियों एवं वनस्पतियों का महत्व",titleEnglish:"Importance of Animals, Birds, and Plants in Human Life",subjectHindi:"पर्यावरण एवं जैव विविधता अध्ययन",subjectEnglish:"Environmental Studies & Biodiversity",category:"पर्यावरण एवं जीवन विज्ञान (Environmental & Life Sciences)",level:"Secondary",rating:4.95,reviewsCount:1420,duration:"14 Hours 30 Mins",lessonsCount:8,price:499,originalPrice:1999,badge:"NIOS Featured",isEnrolledDefault:true,thumbnail:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80",instructor:{name:"Dr. Ramesh Chandra Sharma",designation:"Senior Faculty, Environmental Sciences, NIOS",avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",verified:true},overview:"यह पाठ्यक्रम मानव अस्तित्व और प्रकृति के बीच गहरे संबंध को रेखांकित करता है। इसमें पशु-पक्षियों द्वारा परागण, खाद्य श्रृंखला संतुलन, वनस्पतियों से प्राप्त औषधीय संसाधन, वायु शुद्धिकरण एवं कृषि संवर्धन पर विस्तार से प्रकाश डाला गया है। शिक्षार्थी 22 भारतीय भाषाओं में वीडियो, ऑडियो व्याख्या और अभ्यास सामग्री का लाभ उठा सकते हैं।",objectives:["मानव जीवन और पारिस्थितिकीय तंत्र में पशु-पक्षियों का अपरिहार्य योगदान समझना।","आयुर्वेद एवं आधुनिक चिकित्सा में विभिन्न वनस्पतियों के औषधीय गुणों का विश्लेषण।","परागण, मृदा संरक्षण एवं बीजों के प्रकीर्णन में पक्षियों और कीटों की भूमिका।","पर्यावरणीय असंतुलन, प्रजातियों के विलुप्त होने के खतरे और संरक्षण के व्यावहारिक उपाय।","भारतीय संविधान में वन्यजीव संरक्षण अधिनियम व प्रत्येक नागरिक के मौलिक कर्तव्य।"],lessons:[{id:1,title:"पाठ 1: प्रस्तावना - मानव और प्रकृति का आदिम सह-अस्तित्व",duration:"18 min",type:"video",done:true,videoUrl:"/courses/importance-of-animals-and-plants/hindi.mp4",description:"पारिस्थितिक संतुलन की आधारशिला एवं मानव सभ्यता के विकास में जीव-जंतुओं की भूमिका।"},{id:2,title:"पाठ 2: वनस्पतियाँ - प्राणवायु, भोजन एवं औषधीय भंडार",duration:"22 min",type:"video",done:true,videoUrl:"https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0",description:"प्रकाश संश्लेषण, तुलसी, नीम, गिलोय जैसे औषधीय पौधों का वैज्ञानिक एवं पारंपरिक महत्व।"},{id:3,title:"पाठ 3: पक्षियों की भूमिका - परागण, बीज प्रकीर्णन एवं कीट नियंत्रण",duration:"25 min",type:"video",done:false,videoUrl:"https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0",description:"कृषि में कीटनाशक का प्राकृतिक विकल्प और वन विस्तार में प्रवासी पक्षियों का योगदान।"},{id:4,title:"पाठ 4: पशु-जगत और मानवीय अर्थव्यवस्था",duration:"20 min",type:"video",done:false,videoUrl:"https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0",description:"दुग्ध उत्पादन, कृषि कार्य, रेशम कीट पालन, मधुमक्खी पालन एवं आजीविका।"},{id:5,title:"पाठ 5: अध्ययन सामग्री (SLM) - जैव विविधता एवं वन संरक्षण",duration:"15 min",type:"pdf",done:false,description:"राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान (NIOS) की आधिकारिक अध्ययन पुस्तिका।"},{id:6,title:"पाठ 6: संवादात्मक 3D फ्लिपबुक - भारतीय वनस्पतियाँ एवं पक्षी प्रजातियाँ",duration:"12 min",type:"flipbook",done:false,description:"3D दृश्य-श्रव्य फ्लिपबुक द्वारा दुर्लभ पक्षियों व औषधीय जड़ी-बूटियों की पहचान।"},{id:7,title:"पाठ 7: अभ्यास प्रश्नोत्तरी (MCQ) - पारिस्थितिकी एवं संरक्षण",duration:"15 min",type:"quiz",done:false,description:"त्वरित स्व-मूल्यांकन एवं तत्काल अंक तालिका।"},{id:8,title:"पाठ 8: लाइव परिचर्चा एवं प्रश्नोत्तर रिकॉर्डिंग",duration:"40 min",type:"live",done:false,videoUrl:"https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0",description:"विषय विशेषज्ञों के साथ शंका समाधान एवं पर्यावरण संरक्षण प्रोजेक्ट कार्य।"}],languageTracks:{hi:{code:"hi",name:"Hindi",nativeName:"हिन्दी",speechCode:"hi-IN",title:"मानव जीवन में पशु-पक्षियों एवं वनस्पतियों का महत्व",summary:"मानव अस्तित्व, पारिस्थितिकी संतुलन, आयुर्वेद, कृषि एवं पर्यावरण के लिए पशु-पक्षियों और वनस्पतियों के अमूल्य योगदान का समग्र अध्ययन।",transcript:"नमस्ते विद्यार्थियों, राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान के इस विशेष सत्र में आपका स्वागत है। आज हम अध्ययन करेंगे कि किस प्रकार पशु, पक्षी और वनस्पतियाँ मानव जीवन की सांसों से जुड़े हुए हैं। बिना पेड़-पौधों के हमें प्राणवायु ऑक्सीजन नहीं मिल सकती और बिना पक्षियों के कृषि में परागण असंभव है...",videoUrl:"/courses/importance-of-animals-and-plants/hindi.mp4"},en:{code:"en",name:"English",nativeName:"English",speechCode:"en-US",title:"Importance of Animals, Birds, and Plants in Human Life",summary:"A comprehensive study of the invaluable contributions of fauna and flora to human sustenance, biodiversity, medicine, and ecological harmony.",transcript:"Welcome students to this special NIOS lecture session. Today, we delve into how animals, birds, and botanical flora form the indispensable bedrock of human civilization. Photosynthesis sustains atmospheric balance while avian pollinators ensure food security across the globe...",videoUrl:"/courses/importance-of-animals-and-plants/english.mp4"},bn:{code:"bn",name:"Bengali",nativeName:"বাংলা",speechCode:"bn-IN",title:"মানব জীবনে পশুপাখি ও উদ্ভিদের গুরুত্ব",summary:"মানব অস্তিত্ব ও পরিবেশগত ভারসাম্যের জন্য প্রাণী ও উদ্ভিদের অমূল্য অবদানের বিস্তারিত বিশ্লেষণ।",transcript:"প্রিয় শিক্ষার্থীবৃন্দ, এনআইওএসের এই বিশেষ পাঠে স্বাগতম। গাছপালা ছাড়া প্রাণবায়ু অক্সিজেন অসম্ভব এবং পশুপাখিরা আমাদের খাদ্যশৃঙ্খল ও পরাগায়ন প্রক্রিয়ার প্রধান চালিকাশক্তি...",videoUrl:"/courses/importance-of-animals-and-plants/bengali.mp4"},te:{code:"te",name:"Telugu",nativeName:"తెలుగు",speechCode:"te-IN",title:"మానవ జీవితంలో జంతువులు, పక్షులు మరియు వృక్షాల ప్రాముఖ్యత",summary:"మానవ మనుగడకు పర్యావరణ సమతుల్యతను అందించే పక్షులు, జంతువులు మరియు మొక్కల సమగ్ర పాత్ర.",transcript:"విద్యార్థులందరికీ స్వాగతం. మొక్కలు మనకు ప్రాణవాయువును అందిస్తాయి, మరియు పక్షులు విత్తన వ్యాప్తి ద్వారా పర్యావరణాన్ని కాపాడతాయి...",videoUrl:"/courses/importance-of-animals-and-plants/telugu.mp4"},mr:{code:"mr",name:"Marathi",nativeName:"मराठी",speechCode:"mr-IN",title:"मानवी जीवनात प्राणी, पक्षी आणि वनस्पतींचे महत्त्व",summary:"मानवी जीवन व निसर्गाचा समतोल राखण्यात प्राणी, पक्षी आणि वनस्पतींच्या अद्वितीय योगदानाचा अभ्यास.",transcript:"विद्यार्थी मित्रांनो, एनआयओएसच्या या वर्गात आपले स्वागत आहे. वनस्पती आपल्याला ऑक्सिजन व औषधे देतात आणि पक्षी शेतीमध्ये कीटक नियंत्रणाचे मोलाचे कार्य करतात...",videoUrl:"/courses/importance-of-animals-and-plants/marathi.mp4"},ta:{code:"ta",name:"Tamil",nativeName:"தமிழ்",speechCode:"ta-IN",title:"மனித வாழ்வில் விலங்குகள், பறவைகள் மற்றும் தாவரங்களின் முக்கியத்துவம்",summary:"மனித வாழ்வாதாரத்திற்கும் இயற்கை சமநிலைக்கும் தாவரங்கள் மற்றும் விலங்கினங்களின் பங்கு.",transcript:"மாணவர்களுக்கு வணக்கம். மனித நாகரிகத்தின் தொடக்கத்திலிருந்தே தாவரங்களும் பறவைகளும் மனித வாழ்க்கையோடு பின்னிப்பிணைந்துள்ளன...",videoUrl:"/courses/importance-of-animals-and-plants/tamil.mp4"},gu:{code:"gu",name:"Gujarati",nativeName:"ગુજરાતી",speechCode:"gu-IN",title:"માનવ જીવનમાં પશુ-પક્ષીઓ અને વનસ્પતિઓનું મહત્વ",summary:"માનવ અસ્તિત્વ અને પર્યાવરણ સંતુલન માટે વનસ્પતિ અને પ્રાણી જગતનું અમૂલ્ય પ્રદાન.",transcript:"નમસ્તે વિદ્યાર્થીઓ, આજના સત્રમાં આપણે પશુ, પક્ષી અને વનસ્પતિઓના ઔષધીય અને કૃષિ ક્ષેત્રે મહત્વ વિશે જાણીશું...",videoUrl:"/courses/importance-of-animals-and-plants/gujarati.mp4"},kn:{code:"kn",name:"Kannada",nativeName:"ಕನ್ನಡ",speechCode:"kn-IN",title:"ಮಾನವ ಜೀವನದಲ್ಲಿ ಪ್ರಾಣಿಗಳು, ಪಕ್ಷಿಗಳು ಮತ್ತು ಸಸ್ಯಗಳ ಮಹತ್ವ",summary:"ಮಾನವನ ಅಸ್ತಿತ್ವಕ್ಕೆ ಸಸ್ಯ ಸಂಪತ್ತು ಮತ್ತು ಪ್ರಾಣಿ ಸಂಕುಲ ನೀಡುವ ಕೊಡುಗೆಯ ಸಮಗ್ರ ವಿವರಣೆ.",transcript:"ಎನ್ಐಒಎಸ್ ತರಗತಿಗೆ ಸ್ವಾಗತ. ಪ್ರಕೃತಿಯ ಸಮತೋಲನವನ್ನು ಕಾಪಾಡಲು ಪಕ್ಷಿಗಳು ಮತ್ತು ಮರಗಿಡಗಳು ಅತ್ಯಂತ ಪ್ರಮುಖವಾಗಿವೆ...",videoUrl:"/courses/importance-of-animals-and-plants/kannada.mp4"},ml:{code:"ml",name:"Malayalam",nativeName:"മലയാളം",speechCode:"ml-IN",title:"മനുഷ്യജീവിതത്തിൽ മൃഗങ്ങളുടെയും പക്ഷികളുടെയും സസ്യങ്ങളുടെയും പ്രാധാന്യം",summary:"പ്രകൃതി സന്തുലിതാവസ്ഥയിലും ആയുർവേദത്തിലും സസ്യ-ജന്തുജാലങ്ങളുടെ പ്രാധാന്യം.",transcript:"പ്രിയ വിദ്യാർത്ഥികളെ സ്വാഗതം. മനുഷ്യൻറെ നിലനിൽപ്പിന് സസ്യജാലങ്ങളും മൃഗങ്ങളും എത്രമാത്രം അത്യന്താപേക്ഷിതമാണെന്ന് ഇന്ന് നാം പഠിക്കുന്നു...",videoUrl:"/courses/importance-of-animals-and-plants/malayalam.mp4"},pa:{code:"pa",name:"Punjabi",nativeName:"ਪੰਜਾਬੀ",speechCode:"pa-IN",title:"ਮਨੁੱਖੀ ਜੀਵਨ ਵਿੱਚ ਪਸ਼ੂ-ਪੰਛੀਆਂ ਅਤੇ ਬਨਸਪਤੀ ਦਾ ਮਹੱਤਵ",summary:"ਮਨੁੱਖੀ ਹੋਂਦ ਅਤੇ ਕੁਦਰਤੀ ਸੰਤੁਲਨ ਲਈ ਪਸ਼ੂ-ਪੰਛੀਆਂ ਅਤੇ ਰੁੱਖਾਂ-ਬੂਟਿਆਂ ਦੇ ਅਨਮੋਲ ਯੋਗਦਾਨ ਦੀ ਪੜਚੋਲ।",transcript:"ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਵਿਦਿਆਰਥੀਓ, ਕੁਦਰਤ ਅਤੇ ਜੀਵ-ਜੰਤੂ ਸਾਡੀ ਖੇਤੀਬਾੜੀ ਅਤੇ ਵਾਤਾਵਰਣ ਦੀ ਜਿੰਦ-ਜਾਨ ਹਨ...",videoUrl:"/courses/importance-of-animals-and-plants/punjabi.mp4"},or:{code:"or",name:"Odia",nativeName:"ଓଡ଼ିଆ",speechCode:"or-IN",title:"ମାନବ ଜୀବନରେ ପଶୁପକ୍ଷୀ ଏବଂ ବୃକ୍ଷଲତାର ମହତ୍ତ୍ୱ",summary:"ମାନବ ଜୀବନ ଓ ପ୍ରକୃତିର ସୁରକ୍ଷା ପାଇଁ ବୃକ୍ଷଲତା ଏବଂ ଜୀବଜନ୍ତୁଙ୍କ ଭୂମିକା।",transcript:"ନମସ୍କାର ଛାତ୍ରଛାତ୍ରୀମାନେ, ପ୍ରକୃତିର ଭାରସାମ୍ୟ ରକ୍ଷା କରିବା ପାଇଁ ଉଦ୍ଭିଦ ଓ ପଶୁପକ୍ଷୀ ଅତ୍ୟନ୍ତ ଆବଶ୍ୟକ...",videoUrl:"/courses/importance-of-animals-and-plants/odia.mp4"},as:{code:"as",name:"Assamese",nativeName:"অসমীয়া",speechCode:"as-IN",title:"মানৱ জীৱনত জীৱ-জন্তু, চৰাই-চিৰিকটি আৰু উদ্ভিদৰ গুৰুত্ব",summary:"প্ৰাকৃতিক ভাৰসাম্য ৰক্ষাত উদ্ভিদ আৰু প্ৰাণীৰ অপৰিহাৰ্য অৱদানৰ আলোচনা।",transcript:"ছাত্ৰ-ছাত্ৰীসকলক স্বাগতম। মানৱ সভ্যতা আৰু প্ৰকৃতিৰ মাজত থকা গভীৰ সম্পৰ্কৰ বিষয়ে আজি আমি বুজি লম...",videoUrl:"/courses/importance-of-animals-and-plants/assamese.mp4"},ur:{code:"ur",name:"Urdu",nativeName:"اردو",speechCode:"ur-PK",title:"انسانی زندگی میں جانوروں، پرندوں اور نباتات کی اہمیت",summary:"ماحولیاتی توازن اور انسانی صحت کے لیے پیڑ پودوں اور چرند پرند کی بے پناہ افادیت۔",transcript:"عزیز طلبہ، این آئی او ایس کے اس خصوصی لیکچر میں آپ کا استقبال ہے۔ نباتات اور چرند پرند ہماری بقا کے لیے ناگزیر ہیں...",videoUrl:"/courses/importance-of-animals-and-plants/urdu.mp4"},sa:{code:"sa",name:"Sanskrit",nativeName:"संस्कृतम्",speechCode:"sa-IN",title:"मानवजीवने पशुपक्षिणां वनस्पतीनां च महत्त्वम्",summary:"प्रकृतिसंरक्षणे, औषधिशास्त्रे, जीवनयापने च वनस्पतीनां प्राणिनां च योगदानम्।",transcript:'सर्वेभ्यः छात्रेभ्यः सादरं नमः। अस्माकं वेदेषु उच्यते - "माता भूमिः पुत्रोऽहं पृथिव्याः"। वनस्पतयः प्राणिनां जीवनं रक्षन्ति...',videoUrl:"/courses/importance-of-animals-and-plants/sanskrit.mp4"},ks:{code:"ks",name:"Kashmiri",nativeName:"کٲشُر",speechCode:"ks-IN",title:"انسانس منز جانورن، جانورن تہ کُلن ہند اہمیت",summary:"ماحولیاتی سنتولن تہ قدرتس بچاونہ باپتھ نباتاتن ہند خاص کردار۔",transcript:"خوش آمدید طالب علمو، یمن کُلن تہ جانورن بغیر چھُنہ انسانن ہند گزارہ ممکن...",videoUrl:"/courses/importance-of-animals-and-plants/kashmiri.mp4"},kok:{code:"kok",name:"Konkani",nativeName:"कोंकणी",speechCode:"kok-IN",title:"मनीस जिण्येन्तु मोनजात, सुकणीं आनी वनस्पतींचें म्हत्व",summary:"पर्यावरणाचो समतोल राखपाक मोनजात आनी वनस्पत कशो उपेगी पडटात हाचो अभ्यास.",transcript:"विद्यार्थ्यांनो येवकार. पर्यावरणाच्या संरक्षणा खातीर झाडां आनी सुकणीं खूब गरजेचीं आसात...",videoUrl:"/courses/importance-of-animals-and-plants/konkani.mp4"},mai:{code:"mai",name:"Maithili",nativeName:"मैथिली",speechCode:"hi-IN",title:"मानव जीवन मे पशु-पक्षी आ वनस्पति क महत्व",summary:"प्रकृति संवर्धन आ मानव जीवनक आधारभूत अंगक रूप मे जीव-जंतुक अध्ययन।",transcript:"मिथिलाक समस्त विद्यार्थीगणकेँ प्रणाम। पेड़-पौधा आ पशु-पक्षी हमरा सभक प्राण थीक...",videoUrl:"/courses/importance-of-animals-and-plants/maithili.mp4"},mni:{code:"mni",name:"Manipuri",nativeName:"মণিপুরী",speechCode:"bn-IN",title:"মীওইবগী পুন্সিদা শা-উচেক অমসুং পাম্বীশিংগী মরুওইবা",summary:"মহৌশাগী শক্লোন অমসুং পুন্সি হিংবদা উ-ৱা অমসুং শা-উচেকশিংগী থৌদাং।",transcript:"মহৈরোইশিংবু তরাম্না ওকচরি। মহৌশাগী অকোইবগী শক্তমবু ঙাক-শেন্দুনা থমবদা শা-উচেকশিংনা অচৌবা থৌদাং লৌই...",videoUrl:"/courses/importance-of-animals-and-plants/manipuri.mp4"},ne:{code:"ne",name:"Nepali",nativeName:"नेपाली",speechCode:"ne-NP",title:"मानव जीवनमा पशुपन्छी र वनस्पतिहरूको महत्त्व",summary:"पारिस्थितिकीय सन्तुलन र मानव अस्तित्वमा वनस्पति र प्राणी जगतको योगदान।",transcript:"नमस्ते विद्यार्थीहरू, वनस्पतिले हामीलाई अक्सिजन दिन्छ र पशुपन्छीले प्रकृतिको सन्तुलन कायम राख्छन्...",videoUrl:"/courses/importance-of-animals-and-plants/nepali.mp4"},brx:{code:"brx",name:"Bodo",nativeName:"बड़ो",speechCode:"hi-IN",title:"सुबुं जिउआव जुनार, दाव-दै आरो बिफां-लाइफांनि गोनांथि",summary:"मिथिंगायारि समानथि लाखिनायाव बिफां-लाइफां आरो जुनारफोरनि अनगायै बिहोमा।",transcript:"गासैबो फरायसुलाफोरखौ बरायबाय। मिथिंगानि रैखाथि आरो जिउ खुंनायाव बिफां-लाइफांआ जोबोर गोनां...",videoUrl:"/courses/importance-of-animals-and-plants/bodo.mp4"},sat:{code:"sat",name:"Santali",nativeName:"ᱥᱟᱱᱛᱟᱲᱤ",speechCode:"hi-IN",title:"ᱢᱟᱹᱱᱢᱤ ᱡᱤᱭᱚᱱ ᱨᱮ ᱡᱤᱵᱽ-ᱡᱤᱭᱟᱹᱞᱤ, ᱪᱮᱬᱮ ᱟᱨ ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ ᱨᱮᱱᱟᱜ ᱢᱩᱦᱤᱛ",summary:"ᱯᱨᱚᱠᱨᱤᱛᱤ ᱨᱮᱱᱟᱜ ᱵᱷᱟᱨᱥᱟᱢ ᱫᱚᱦᱚᱭ ᱞᱟᱹᱜᱤᱫ ᱡᱤᱵᱽ-ᱡᱤᱭᱟᱹᱞᱤ ᱟᱨ ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ ᱨᱮᱱᱟᱜ ᱮᱱᱮᱢ।",transcript:"ᱡᱚᱛᱚ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ। ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ ᱵᱮᱜᱚᱨ ᱦᱚᱭ-ᱦᱤᱥᱤᱫ ᱵᱟᱝ ᱧᱟᱢᱚᱜ-ᱟ...",videoUrl:"/courses/importance-of-animals-and-plants/santhali.mp4"},doi:{code:"doi",name:"Dogri",nativeName:"डोगरी",speechCode:"hi-IN",title:"मानुक्खी जिंदगी च पशु-पंछियें ते बूटे-घाएं दा महत्तव",summary:"कुदरत दे संतुलन ते सेहत लेई पेड़-पौधे ते पशु-पंछी किन्ने जरूरी न, इसदा अध्ययन।",transcript:"सारे विद्यार्थीएं गी प्यार भरा नमस्ते। कुदरत दी खूबसूरती ते साढ़ी जिंदगी दा आधार ऐ जीव-जंतू न...",videoUrl:"/courses/importance-of-animals-and-plants/dogri.mp4"},sd:{code:"sd",name:"Sindhi",nativeName:"سنڌي",speechCode:"sd-IN",title:"انساني زندگيءَ ۾ جانورن، پکين ۽ ٻوٽن جي اهميت",summary:"ماحولياتي توازن ۽ انساني بقا لاءِ جانورن، پکين ۽ ٻوٽن جو بنيادي ڪردار.",transcript:"پيارا شاگردو، اين آءِ او ايس جي هن سبق ۾ ڀلي ڪري آيا. ٻوٽن ۽ پکين کان سواءِ انساني زندگي ناممڪن آهي...",videoUrl:"/courses/importance-of-animals-and-plants/sindhi.mp4"}}},

  // ── 3RD SUBJECT ──
  {
    id: 'course-sci-002',
    titleHindi: 'पर्यावरण संरक्षण, पारिस्थितिकी एवं जलवायु परिवर्तन',
    titleEnglish: 'Environmental Conservation, Ecology & Climate Action',
    subjectHindi: 'पर्यावरण विज्ञान एवं संधारणीयता',
    subjectEnglish: 'Environmental Science & Sustainability',
    category: 'पर्यावरण एवं भूगोल (Earth & Environment)',
    level: 'Senior Secondary',
    rating: 4.88,
    reviewsCount: 980,
    duration: '16 Hours',
    lessonsCount: 9,
    price: 499,
    originalPrice: 1799,
    badge: 'Popular',
    isEnrolledDefault: true,
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Dr. Sunita Narain Rao',
      designation: 'Ecology Researcher & Climate Educator',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      verified: true
    },
    overview: 'वैश्विक जलवायु परिवर्तन, ग्रीनहाउस प्रभाव, नवीकरणीय ऊर्जा और संधारणीय विकास लक्ष्यों (SDGs) पर केंद्रित आधिकारिक पाठ्यक्रम।',
    objectives: [
      'जलवायु परिवर्तन के वैज्ञानिक कारणों और प्रभावों का अध्ययन।',
      'जल संरक्षण, वर्षा जल संचयन और अपशिष्ट प्रबंधन की आधुनिक तकनीकें।',
      'सौर एवं पवन ऊर्जा का विस्तार और कार्बन पदचिह्न कम करने के उपाय।'
    ],
    lessons: [
      { id: 1, title: 'पाठ 1: जलवायु संकट एवं वैश्विक तापमान वृद्धि', duration: '20 min', type: 'video', done: true, videoUrl: 'https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0' },
      { id: 2, title: 'पाठ 2: ओजोन परत का क्षरण एवं सुरक्षात्मक संधियाँ', duration: '24 min', type: 'video', done: false, videoUrl: 'https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0' },
      { id: 3, title: 'पाठ 3: नवीकरणीय ऊर्जा स्रोत - भविष्य की आवश्यकता', duration: '18 min', type: 'video', done: false, videoUrl: 'https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0' }
    ],
    languageTracks: {
      hi: {
        code: 'hi',
        name: 'Hindi',
        nativeName: 'हिन्दी',
        speechCode: 'hi-IN',
        title: 'पर्यावरण संरक्षण, पारिस्थितिकी एवं जलवायु परिवर्तन',
        summary: 'जलवायु संकट, नवीकरणीय ऊर्जा और सतत विकास पर गहन वैज्ञानिक व्याख्यान।',
        transcript: 'नमस्कार विद्यार्थियों, जलवायु परिवर्तन आज की सदी की सबसे बड़ी चुनौती है...',
        videoUrl: 'https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0'
      },
      en: {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        speechCode: 'en-US',
        title: 'Environmental Conservation, Ecology & Climate Action',
        summary: 'Comprehensive analysis of climate dynamics, sustainability, and green technologies.',
        transcript: 'Welcome students. Today we analyze ecological footprints, global climate treaties, and renewable alternatives...',
        videoUrl: 'https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0'
      }
    }
  },

  // ── 4TH SUBJECT ──
  {
    id: 'course-math-003',
    titleHindi: 'गणित एवं ज्यामिति की मूल अवधारणाएं',
    titleEnglish: 'Core Foundations of Mathematics, Algebra & Geometry',
    subjectHindi: 'माध्यमिक गणित (Secondary Mathematics)',
    subjectEnglish: 'Secondary Mathematics',
    category: 'गणित एवं तार्किक विश्लेषण (Mathematics & Logic)',
    level: 'Secondary',
    rating: 4.92,
    reviewsCount: 2150,
    duration: '22 Hours',
    lessonsCount: 12,
    price: 599,
    originalPrice: 2499,
    badge: 'Bestseller',
    isEnrolledDefault: false,
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Prof. K. Srinivasa Raman',
      designation: 'Chair of Applied Mathematics, NIOS Board',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      verified: true
    },
    overview: 'बीजगणित, त्रिकोणमिति, निर्देशांक ज्यामिति और सांख्यिकी को सरल व संवादात्मक 22 भाषाओं में समझने का सबसे विश्वसनीय मंच।',
    objectives: [
      'द्विघात समीकरण एवं बहुपद का दैनिक जीवन में अनुप्रयोग।',
      'पाइथागोरस प्रमेय और त्रिकोणमितीय अनुपातों की आसान संकल्पना।',
      'क्षेत्रमिति (Mensuration) और ज्यामितीय रचनाओं का रेखांकन।'
    ],
    lessons: [
      { id: 1, title: 'पाठ 1: संख्या प्रणाली एवं वास्तविक संख्याएं', duration: '25 min', type: 'video', done: true, videoUrl: 'https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0' },
      { id: 2, title: 'पाठ 2: द्विघात समीकरण हल करने की आधुनिक विधियां', duration: '30 min', type: 'video', done: true, videoUrl: 'https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0' },
      { id: 3, title: 'पाठ 3: त्रिकोणमिति के बुनियादी अनुप्रयोग व ऊंचाई-दूरी', duration: '28 min', type: 'video', done: false, videoUrl: 'https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0' }
    ],
    languageTracks: {
      hi: {
        code: 'hi',
        name: 'Hindi',
        nativeName: 'हिन्दी',
        speechCode: 'hi-IN',
        title: 'गणित एवं ज्यामिति की मूल अवधारणाएं',
        summary: 'संख्या पद्धति, बीजगणित और ज्यामिति की आसान समझ 22 भाषाओं में।',
        transcript: 'गणित तार्किक चिंतन की भाषा है। आज हम संख्याओं के मूलभूत स्वरूप से प्रारंभ करते हैं...',
        videoUrl: 'https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0'
      },
      en: {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        speechCode: 'en-US',
        title: 'Core Foundations of Mathematics, Algebra & Geometry',
        summary: 'Master algebraic proofs, coordinate geometry, and real-world math problem solving.',
        transcript: 'Welcome to foundational mathematics. Today we master polynomial factorization and geometrical axioms...',
        videoUrl: 'https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0'
      }
    }
  },

  // ── 5TH SUBJECT ──
  {
    id: 'course-cs-004',
    titleHindi: 'कंप्यूटर विज्ञान, कोडिंग एवं कृत्रिम बुद्धिमत्ता (AI)',
    titleEnglish: 'Computer Science, Python Coding & Artificial Intelligence',
    subjectHindi: 'कंप्यूटर विज्ञान एवं सूचना प्रौद्योगिकी',
    subjectEnglish: 'Computer Science & AI Literacy',
    category: 'सूचना प्रौद्योगिकी एवं एआई (Tech & Computer Science)',
    level: 'Senior Secondary',
    rating: 4.97,
    reviewsCount: 3100,
    duration: '28 Hours',
    lessonsCount: 14,
    price: 699,
    originalPrice: 2999,
    badge: 'Trending AI',
    isEnrolledDefault: false,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Er. Aakash Verma',
      designation: 'AI Architect & STEM Curriculum Director',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      verified: true
    },
    overview: 'डिजिटल इंडिया के अंतर्गत पायथन प्रोग्रामिंग, एल्गोरिदम, डेटा साइंस और जनरेटिव एआई की आधारशिला तैयार करने वाला आधुनिक कोर्स।',
    objectives: [
      'कंप्यूटर के आंतरिक घटक, ऑपरेटिंग सिस्टम और नेटवर्किंग सिद्धांत।',
      'पायथन में कोडिंग, लूप्स, फंक्शंस और डेटा संरचनाएं।',
      'मशीन लर्निंग के मूल सिद्धांत एवं नैतिक एआई (Ethical AI) का परिप्रेक्ष्य।'
    ],
    lessons: [
      { id: 1, title: 'पाठ 1: कंप्यूटर वास्तुकला एवं डिजिटल क्रांति', duration: '22 min', type: 'video', done: true, videoUrl: 'https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0' },
      { id: 2, title: 'पाठ 2: पायथन कोडिंग की शुरुआत - वेरिएबल्स एवं डेटा टाइप्स', duration: '35 min', type: 'video', done: false, videoUrl: 'https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0' },
      { id: 3, title: 'पाठ 3: आर्टिफिशियल इंटेलिजेंस एवं न्यूरल नेटवर्क क्या हैं?', duration: '30 min', type: 'video', done: false, videoUrl: 'https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0' }
    ],
    languageTracks: {
      hi: {
        code: 'hi',
        name: 'Hindi',
        nativeName: 'हिन्दी',
        speechCode: 'hi-IN',
        title: 'कंप्यूटर विज्ञान, कोडिंग एवं कृत्रिम बुद्धिमत्ता (AI)',
        summary: 'पायथन, एल्गोरिदम एवं एआई तकनीक की व्यवहारिक शिक्षा।',
        transcript: 'आज के डिजिटल युग में कंप्यूटर कोडिंग एक नई साक्षरता बन चुकी है। इस सत्र में हम पायथन सिंटैक्स को समझेंगे...',
        videoUrl: 'https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0'
      },
      en: {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        speechCode: 'en-US',
        title: 'Computer Science, Python Coding & Artificial Intelligence',
        summary: 'Practical Python programming, algorithms, and artificial intelligence fundamentals.',
        transcript: 'Welcome to modern computing. We start with computational thinking and fundamental Python abstractions...',
        videoUrl: 'https://www.youtube.com/embed/PBUP8ghRjrA?autoplay=0&rel=0'
      }
    }
  }
];

// Helper to get enrolled courses (2 courses enrolled by default, others require purchase)
export function getStoredEnrolledIds(): string[] {
  const defaultEnrolled = COURSES_DATA.filter(c => c.isEnrolledDefault).map(c => c.id);
  if (typeof window === 'undefined') {
    return defaultEnrolled;
  }
  try {
    const raw = localStorage.getItem('nios_enrolled_courses_v3');
    if (!raw) {
      localStorage.setItem('nios_enrolled_courses_v3', JSON.stringify(defaultEnrolled));
      return defaultEnrolled;
    }
    const stored: string[] = JSON.parse(raw);
    return Array.from(new Set([...defaultEnrolled, ...stored]));
  } catch (e) {
    return defaultEnrolled;
  }
}

export function saveEnrolledCourseId(id: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getStoredEnrolledIds();
    if (!current.includes(id)) {
      const updated = [...current, id];
      localStorage.setItem('nios_enrolled_courses_v3', JSON.stringify(updated));
      return updated;
    }
    return current;
  } catch (e) {
    return [];
  }
}

export function getStoredEnrollmentOrders(): any[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('nios_enrollment_orders');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveEnrollmentOrder(order: any) {
  if (typeof window === 'undefined') return;
  try {
    const orders = getStoredEnrollmentOrders();
    orders.unshift(order);
    localStorage.setItem('nios_enrollment_orders', JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save order', e);
  }
}

export function getStoredBilateralCourses(): Course[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('nios_enrolled_bilateral_courses_v1');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveBilateralCourse(course: Course): Course[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getStoredBilateralCourses();
    const filtered = existing.filter(c => c.id !== course.id);
    const updated = [course, ...filtered];
    localStorage.setItem('nios_enrolled_bilateral_courses_v1', JSON.stringify(updated));
    saveEnrolledCourseId(course.id);
    return updated;
  } catch (e) {
    return [];
  }
}

export function getLanguageVideoUrl(langName: string): string {
  const norm = langName.toLowerCase().trim();
  const map: Record<string, string> = {
    'hindi': 'hindi.mp4',
    'english': 'english.mp4',
    'bengali': 'bengali.mp4',
    'telugu': 'telugu.mp4',
    'marathi': 'marathi.mp4',
    'tamil': 'tamil.mp4',
    'gujarati': 'gujarati.mp4',
    'kannada': 'kannada.mp4',
    'malayalam': 'malayalam.mp4',
    'punjabi': 'punjabi.mp4',
    'odia': 'odia.mp4',
    'assamese': 'assamese.mp4',
    'urdu': 'urdu.mp4',
    'sanskrit': 'sanskrit.mp4',
    'kashmiri': 'kashmiri.mp4',
    'konkani': 'konkani.mp4',
    'maithili': 'maithili.mp4',
    'manipuri': 'manipuri.mp4',
    'nepali': 'nepali.mp4',
    'bodo': 'bodo.mp4',
    'santali': 'santhali.mp4',
    'sindhi': 'sindhi.mp4',
    'dogri': 'dogri.mp4',
  };
  const filename = map[norm] || `${norm}.mp4`;
  const folders = [
    '/courses/importance-of-animals-and-plants/',
    '/courses/how-the-squirrel-got-his-stripes/'
  ];
  const chosenFolder = folders[Math.floor(Math.random() * folders.length)];
  return `${chosenFolder}${filename}`;
}

export function createBilateralCourse(sourceLang: string, targetLang: string): Course {
  const sourceCode = (INDIAN_LANGUAGES_22.find(l => l.name.toLowerCase() === sourceLang.toLowerCase())?.code || sourceLang.toLowerCase().slice(0, 2));
  const targetCode = (INDIAN_LANGUAGES_22.find(l => l.name.toLowerCase() === targetLang.toLowerCase())?.code || targetLang.toLowerCase().slice(0, 2));
  const courseId = `bilateral-${sourceCode}-${targetCode}`;
  const videoUrl = getLanguageVideoUrl(targetLang);

  return {
    id: courseId,
    titleEnglish: `Learn ${targetLang} via ${sourceLang}: Conversational Hub`,
    titleHindi: `${sourceLang} के माध्यम से ${targetLang} सीखें: संवादात्मक केंद्र`,
    subjectEnglish: `Bilateral Indian Language Learning (${sourceLang} ➔ ${targetLang})`,
    subjectHindi: `द्विभाषी भाषा अधिगम (${sourceLang} ➔ ${targetLang})`,
    category: 'भाषा एवं बहुभाषी शिक्षा (Languages & Multilingual Education)',
    level: 'Secondary',
    rating: 4.96,
    reviewsCount: 1840,
    duration: '16 Hours 30 Mins',
    lessonsCount: 8,
    price: 499,
    originalPrice: 1999,
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&auto=format&fit=crop&q=80',
    badge: 'NEP Bilateral Certified',
    instructor: {
      name: `Dr. Priya Mehta & ${targetLang} Faculty`,
      designation: `Senior Bilingual Specialist, NIOS Language Bureau`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      verified: true
    },
    overview: `Comprehensive bilateral conversational curriculum designed specifically for native ${sourceLang} speakers to master spoken and written ${targetLang} under the National Education Policy (NEP 2020). Includes video lectures dubbed in ${targetLang}, phonetic guides, and native dialogues.`,
    objectives: [
      `Master authentic spoken phonetics and script conventions of ${targetLang} explained through ${sourceLang}.`,
      `Engage in 200+ practical daily conversational scenarios, greetings, and marketplace dialogues.`,
      `Understand comparative grammar: syntax, noun cases, tense structures, and verb conjugations.`,
      `Complete interactive listening labs and AI-evaluated pronunciation drills in ${targetLang}.`,
      `Earn an official NIOS Bilingual Proficiency Certificate upon final assessment.`
    ],
    lessons: [
      {
        id: 1,
        title: `पाठ 1: ${targetLang} Alphabet & Phonetics via ${sourceLang} (ध्वनि एवं वर्णमाला)`,
        duration: '18 min',
        type: 'video',
        done: true,
        videoUrl: videoUrl,
        description: `Introduction to ${targetLang} script, vowel-consonant combinations and vocal pronunciation with native comparisons.`
      },
      {
        id: 2,
        title: `पाठ 2: Essential Greetings & Daily Phrases (दैनिक अभिवादन एवं सामान्य वाक्य)`,
        duration: '22 min',
        type: 'video',
        done: false,
        videoUrl: videoUrl,
        description: `How to introduce oneself, formal and informal greetings, asking questions and common courtesy expressions in ${targetLang}.`
      },
      {
        id: 3,
        title: `पाठ 3: Grammar Foundations - Nouns & Pronouns (संज्ञा, सर्वनाम एवं लिंग-वचन)`,
        duration: '20 min',
        type: 'video',
        done: false,
        videoUrl: videoUrl,
        description: `Comparative grammatical rules between ${sourceLang} and ${targetLang} with clear visual charts.`
      },
      {
        id: 4,
        title: `पाठ 4: Verbs & Tense Conjugations (क्रिया एवं काल रचना)`,
        duration: '25 min',
        type: 'video',
        done: false,
        videoUrl: videoUrl,
        description: `Present, past, and future tense verb forms in everyday conversational usage.`
      },
      {
        id: 5,
        title: `पाठ 5: Marketplace, Travel & Direction Dialogues (संवादात्मक परिदृश्य)`,
        duration: '24 min',
        type: 'video',
        done: false,
        videoUrl: videoUrl,
        description: `Real-life practical dialogues for navigating train stations, markets, and public spaces in ${targetLang}.`
      },
      {
        id: 6,
        title: `पाठ 6: Cultural Idioms & Proverbs (लोकोक्तियाँ एवं सांस्कृतिक मुहावरे)`,
        duration: '19 min',
        type: 'video',
        done: false,
        videoUrl: videoUrl,
        description: `Rich cultural expressions, folk wisdom, and literary nuances of ${targetLang}.`
      },
      {
        id: 7,
        title: `पाठ 7: Listening Comprehension Lab & Oral Viva (श्रवण एवं मौखिक अभ्यास)`,
        duration: '30 min',
        type: 'live',
        done: false,
        videoUrl: videoUrl,
        description: `Interactive listening quiz and pronunciation score feedback powered by AI speech analysis.`
      },
      {
        id: 8,
        title: `पाठ 8: Final Bilingual Evaluation & Certification (अंतिम मूल्यांकन)`,
        duration: '35 min',
        type: 'quiz',
        done: false,
        videoUrl: videoUrl,
        description: `Comprehensive 50-mark bilingual evaluation to unlock your verified NIOS completion certificate.`
      }
    ],
    languageTracks: {
      [targetCode]: {
        code: targetCode,
        name: targetLang,
        nativeName: targetLang,
        speechCode: `${targetCode}-IN`,
        title: `Learn ${targetLang} via ${sourceLang}: Conversational Hub`,
        summary: `Spoken ${targetLang} lectures for native ${sourceLang} speakers`,
        transcript: `Welcome to the NIOS bilateral language classroom. In this module, you will learn authentic ${targetLang} expressions through ${sourceLang}.`,
        videoUrl: videoUrl
      }
    }
  };
}
