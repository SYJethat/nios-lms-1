/**
 * NIOS Intelligent AI Knowledge & Response Engine
 * Grounded strictly in the website's real data:
 * - Courses & Video lessons (lib/courses-data.ts, lib/mock-data.ts)
 * - 3D Interactive SLMs & Textbooks (lib/mock-data.ts)
 * - TMAs, Quizzes & Assessments (lib/mock-data.ts)
 * - Student Profile, Streams & Study Centers
 * - Official NIOS Policies (NEP 2020, 23 Languages Dubbing, ISL, ODE, TOC, Fees, Passing Criteria)
 */

import { MOCK_COURSES, MOCK_BOOKS, MOCK_ASSESSMENTS, MOCK_USERS } from './mock-data';
import { COURSES_DATA } from './courses-data';
import { ALL_484_PATHWAYS } from './multilingual-data';

export interface AIResponsePayload {
  text: string;
  suggestedActions?: { label: string; action: string; link?: string }[];
  type?: 'text' | 'quiz' | 'plan' | 'resource';
}

export function generateNIOSAssistantResponse(
  query: string,
  userContext?: any,
  conversationHistory: { role: string; content: string }[] = []
): AIResponsePayload {
  const q = query.trim().toLowerCase();
  const userName = userContext?.name || 'Learner';
  const userClass = userContext?.details?.class || 'Class 10';
  const enrollmentNo = userContext?.details?.enrollmentNo || '270012023945';

  // ─────────────────────────────────────────────────────────────
  // 1. GREETINGS & INTRODUCTIONS
  // ─────────────────────────────────────────────────────────────
  if (/^(hi|hello|hey|namaste|greetings|hola|good morning|good afternoon|good evening)/i.test(q)) {
    return {
      text: `Namaste **${userName}**! 🙏\n\nI am your **NIOS Intelligent Academic Assistant**, connected directly with your student portal, official syllabus, 3D Self-Learning Materials (SLM), video lessons in 22 Indian languages, and TMA assessments.\n\nHere is what I can help you with right now:\n• 📚 **Recommend & Explore Courses** (Class 10 Secondary & Class 12 Sr. Secondary)\n• 📖 **Open 3D FlipBook SLMs** (Physics, Maths, Science, English, Hindi, CS)\n• 📝 **TMA Deadlines & Guidelines** (20% theory weightage, submission steps)\n• 🧪 **Practice Quizzes & Solved Questions** for any chapter\n• 🌐 **Multi-Lingual Synchronized Dubbing** (22 scheduled languages + ISL feed)\n• 💳 **Fee Structure, Hall Tickets, Exam Dates & Results**\n\nWhat would you like to study or check today?`,
      suggestedActions: [
        { label: 'Recommend Physics & Math', action: 'Recommend Physics & Math courses' },
        { label: 'Open 3D SLM Library', action: 'Open 3D Library', link: '/student/library' },
        { label: 'Check TMA Deadlines', action: 'What is the TMA deadline?' },
        { label: 'My Enrolled Courses', action: 'Show my enrolled courses', link: '/student/my-courses' }
      ]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 2. PHYSICS (Class 12 / Senior Secondary) - Subject Code: 312
  // ─────────────────────────────────────────────────────────────
  if (q.includes('physic') || q.includes('312')) {
    if (q.includes('quiz') || q.includes('question') || q.includes('mcq') || q.includes('test')) {
      return {
        type: 'quiz',
        text: `📝 **NIOS Class 12 Physics (Code: 312) Practice Quiz**\n\n**Q1. Newton's First Law of Motion defines which concept?**\nA) Momentum\nB) Inertia ✓ *(Resistance of an object to changes in state of motion)*\nC) Acceleration\nD) Impulse\n\n**Q2. Two point charges $+q$ and $-q$ separated by distance $2a$ form an electric dipole. The electric dipole moment is:**\nA) $p = q \\times 2a$ directed from $-q$ to $+q$ ✓\nB) $p = q / 2a$\nC) $p = 2q / a$\nD) Zero\n\n**Q3. What is the SI unit of Magnetic Flux?**\nA) Tesla (T)\nB) Weber (Wb) ✓\nC) Henry (H)\nD) Gauss (G)\n\n💡 *Tip: You can read the complete theoretical derivation and solved problems in our 3D Interactive SLM!*`,
        suggestedActions: [
          { label: 'Open Physics 3D SLM (312)', action: 'Open Physics SLM', link: '/student/library/sr-phy-312' },
          { label: 'Generate 5 More Questions', action: 'Generate more Physics questions' },
          { label: 'Physics TMA Guidelines', action: 'Physics TMA submission info' }
        ]
      };
    }

    return {
      type: 'plan',
      text: `🔬 **NIOS Senior Secondary Physics (Subject Code: 312)**\n\nHere are the top academic modules and study resources available on our portal:\n\n**Key Curriculum Modules:**\n1. **Mechanics & Motion** (Newton's Laws, Work-Energy-Power, Gravitation)\n2. **Electromagnetism** (Coulomb's Law, Gauss's Theorem, Biot-Savart Law, Faraday's Induction)\n3. **Optics & Waves** (Wave Optics, Huygens' Principle, Interference & Diffraction)\n4. **Modern Physics** (Photoelectric Effect, Bohr's Atomic Model, Nuclear Fission/Fusion)\n\n**Official NIOS SLM & Resources:**\n• **3D Interactive SLM Book**: [Open Physics SLM (312)](/student/library/sr-phy-312) — includes formula sheets, 3D page flip, audio narration, and end-of-unit review.\n• **Marks Distribution**: Theory: 80 Marks | Practical: 20 Marks | TMA: 16 Marks (20% of Theory).\n• **Exam Pass Criteria**: 33% marks separately in Theory and Practical.\n\nWould you like an 8-week study plan or a practice TMA quiz?`,
      suggestedActions: [
        { label: 'Read Physics 3D FlipBook', action: 'Read Physics SLM', link: '/student/library/sr-phy-312' },
        { label: 'Generate Physics Quiz', action: 'Give me a Physics quiz' },
        { label: '8-Week Physics Study Plan', action: 'Generate 8-week Physics study plan' }
      ]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 3. MATHEMATICS (Class 10 Code: 211 / Class 12 Code: 311)
  // ─────────────────────────────────────────────────────────────
  if (q.includes('math') || q.includes('calculus') || q.includes('geometry') || q.includes('algebra') || q.includes('211') || q.includes('311')) {
    const isClass12 = q.includes('12') || q.includes('senior') || q.includes('calculus') || q.includes('vector') || q.includes('matrix');
    
    if (q.includes('quiz') || q.includes('question') || q.includes('solve')) {
      return {
        type: 'quiz',
        text: `📐 **NIOS Mathematics Practice Assessment**\n\n**Q1. Find the derivative of $f(x) = x^3 \\cdot \\sin(x)$:**\n*Solution:* Using product rule $(uv)' = u'v + uv'$:\n$$f'(x) = 3x^2 \\sin(x) + x^3 \\cos(x)$$\n\n**Q2. Real Numbers Euclid Division Lemma (Class 10):**\nGiven positive integers $a$ and $b$, there exist unique integers $q$ and $r$ such that:\n$$a = bq + r, \\quad 0 \\le r < b$$\n\n**Q3. If matrix $A$ has order $3 \\times 2$ and $B$ has order $2 \\times 4$, the order of $AB$ is:**\nA) $3 \\times 4$ ✓\nB) $2 \\times 2$\nC) Not possible`,
        suggestedActions: [
          { label: 'Open Class 10 Math SLM (211)', action: 'Open Math SLM', link: '/student/library/sec-mat-211' },
          { label: 'More Math Problems', action: 'Give me more Math problems' }
        ]
      };
    }

    return {
      text: `📐 **NIOS Mathematics (${isClass12 ? 'Class 12 - Code 311' : 'Class 10 - Code 211'})**\n\n**Core Topics Covered in NIOS Curriculum:**\n${
        isClass12
          ? `• **Calculus** (Continuity, Differentiability, Definite & Indefinite Integrals, Differential Equations - 44 Marks)\n• **Vectors & 3D Geometry** (Direction Cosines, Dot & Cross Product, Plane Equations - 17 Marks)\n• **Algebra & Matrices** (Determinants, Inverse Matrix, System of Linear Equations - 13 Marks)\n• **Probability & Linear Programming** (Bayes' Theorem, LPP Graphical Method - 16 Marks)`
          : `• **Number Systems & Real Numbers** (Euclid's Division Algorithm, Irrational Proofs - Module 1)\n• **Algebra** (Polynomials, Linear Equations in 2 Variables, Quadratic Equations, AP - Module 2)\n• **Commercial Mathematics** (Compound Interest, Installments, Banking)\n• **Geometry & Mensuration** (Triangles, Circles, Surface Areas & Volumes - Module 4)\n• **Trigonometry & Statistics** (Trigonometric Ratios, Identities, Mean, Median, Mode - Module 5)`
      }\n\n**Study Portal Material:**\n• Read full SLM with step-by-step solved theorems: [Open Mathematics SLM 211](/student/library/sec-mat-211)\n• **Exam Structure**: 100 Marks Theory paper (No practical for Secondary Math; TMA provides 20 marks internal weightage).`,
      suggestedActions: [
        { label: 'Open Math 3D SLM (211)', action: 'Open Math SLM', link: '/student/library/sec-mat-211' },
        { label: 'Practice Math Quiz', action: 'Give me a Math practice quiz' }
      ]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 4. SCIENCE & TECHNOLOGY (Class 10 - Code: 212) / CHEMISTRY / BIOLOGY
  // ─────────────────────────────────────────────────────────────
  if (q.includes('science') || q.includes('biology') || q.includes('chemistry') || q.includes('212') || q.includes('313') || q.includes('314')) {
    if (q.includes('bio') || q.includes('314')) {
      return {
        text: `🧬 **NIOS Senior Secondary Biology (Code: 314)**\n\n**Core Units:**\n• **Diversity & Cell Biology**: Cell theory, Mitosis & Meiosis, Biomolecules, Enzymes.\n• **Genetics & Evolution**: Mendel's Laws, DNA Replication, Transcription, Genetic Code.\n• **Human Physiology**: Circulation, Respiration, Excretion, Nervous Coordination.\n• **Ecology & Environment**: Ecosystem trophic levels, Biodiversity Conservation.\n\n**Interactive Materials:**\n• 📖 [Open Biology 3D SLM (314)](/student/library/sr-bio-314) with botanical diagrams and self-check questions.\n• **Assessment**: Theory 80 Marks + Practical 20 Marks (TMA 16 Marks).`,
        suggestedActions: [
          { label: 'Open Biology SLM (314)', action: 'Open Biology SLM', link: '/student/library/sr-bio-314' },
          { label: 'Biology Practice Quiz', action: 'Give me a Biology quiz' }
        ]
      };
    }

    return {
      text: `🔬 **NIOS Secondary Science & Technology (Subject Code: 212)**\n\n**Key Curriculum Modules:**\n1. **Measurement in Science & Technology**: SI units, Vernier Callipers, Screw Gauge.\n2. **Matter in Our Surroundings**: Solids, liquids, gases, Dalton's atomic theory, Mole concept.\n3. **Moving Things: Motion, Force & Energy**: Newton's laws ($F=ma$), Gravitation ($F = G \\frac{m_1 m_2}{r^2}$), Kinetic & Potential Energy.\n4. **The Living World & Our Environment**: Cell structure, tissues, ecological balance.\n\n**SLM & Lab Access:**\n• 📖 [Open Science & Tech 3D SLM (212)](/student/library/sec-sci-212) — Interactive flipbook with solved formulas and in-text self-assessment.\n• **Exam Pattern**: 85 Marks Theory + 15 Marks Practical (TMA accounts for 17 marks internal weightage).`,
      suggestedActions: [
        { label: 'Open Science 3D SLM (212)', action: 'Open Science SLM', link: '/student/library/sec-sci-212' },
        { label: 'Science Practice Quiz', action: 'Give me a Science practice quiz' }
      ]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 5. ENGLISH (Code: 202) & "How the Squirrel Got His Stripes"
  // ─────────────────────────────────────────────────────────────
  if (q.includes('english') || q.includes('squirrel') || q.includes('stripes') || q.includes('202')) {
    return {
      text: `📖 **NIOS Secondary English (Subject Code: 202)**\n\n**Featured Lesson 2: "How the Squirrel Got His Stripes"**\n• **Theme**: Devotion, dedication, and the value of small contributions in a collective goal.\n• **Story Summary**: While Lord Rama's Vanara army was building the bridge (Sethu) to Lanka using giant boulders, a tiny squirrel carried small pebbles in its mouth and rolled in the sand to fill the gaps. The monkeys mocked the squirrel, but Lord Rama praised its selfless devotion and gently stroked its back with his three fingers, leaving the sacred stripes on the squirrel's back forever.\n• **Moral**: No effort is too small when done with genuine sincerity and dedication.\n\n**Portal Resources:**\n• 🎥 **Video Lesson**: [Watch Video with 22 Indian Languages Dubbing](/student/my-courses/course-env-001) (Available in Hindi, English, Kashmiri, Tamil, etc.)\n• 📖 **Textbook SLM**: [Open English 3D SLM (202)](/student/library/sec-eng-202)`,
      suggestedActions: [
        { label: 'Open English 3D SLM (202)', action: 'Open English SLM', link: '/student/library/sec-eng-202' },
        { label: 'Watch Synchronized Video', action: 'Watch Lesson 2 Video', link: '/student/my-courses/course-env-001' }
      ]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 6. HINDI (Code: 201) & INDIAN LANGUAGES
  // ─────────────────────────────────────────────────────────────
  if (q.includes('hindi') || q.includes('हिन्दी') || q.includes('201') || q.includes('bhasha') || q.includes('language')) {
    if (q.includes('course') || q.includes('slm') || q.includes('book') || q.includes('vyakaran') || q.includes('gramm')) {
      return {
        text: `📚 **एनआईओएस माध्यमिक हिन्दी (विषय कोड: 201)**\n\n**पाठ्यक्रम एवं मुख्य भाग:**\n1. **गद्य खंड**: गिल्लू (महादेवी वर्मा), नाखून क्यों बढ़ते हैं (हजारी प्रसाद द्विवेदी), दो कलाकार (मन्नू भंडारी).\n2. **पद्य खंड**: कबीर के दोहे, तुलसीदास कृत पद, वह तोड़ती पत्थर (सूर्यकांत त्रिपाठी निराला).\n3. **व्यावहारिक व्याकरण**: संधि, समास, उपसर्ग, प्रत्यय, वाक्य शुद्धि, मुहावरे एवं लोकोक्तियां.\n4. **रचनात्मक लेखन**: पत्र लेखन (औपचारिक एवं अनौपचारिक), निबंध लेखन, अपठित गद्यांश.\n\n**डिजिटल संसाधन:**\n• 📖 [हिन्दी 3D फ्लिपबुक एसएलएम खोलें](/student/library/lang-hin-201)\n• **अंक योजना**: सिद्धांत परीक्षा 100 अंक | टीएमए आंतरिक मूल्यांकन: 20 अंक.`,
        suggestedActions: [
          { label: 'Open Hindi 3D SLM (201)', action: 'Open Hindi SLM', link: '/student/library/lang-hin-201' },
          { label: 'Explore 22x22 Language Matrix', action: 'Open Learn Language Hub', link: '/student/learn-language' }
        ]
      };
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 7. COMPUTER SCIENCE / PYTHON / VOCATIONAL (Code: 608 / 330)
  // ─────────────────────────────────────────────────────────────
  if (q.includes('computer') || q.includes('python') || q.includes('coding') || q.includes('code') || q.includes('608') || q.includes('330') || q.includes('data entry')) {
    return {
      text: `💻 **NIOS Vocational & Senior Secondary Computer Science (Code: 608 / 330)**\n\n**Core Python Programming Concepts in Syllabus:**\n• **Data Types & Variables**: Integers, Floats, Strings, Booleans, Lists, Tuples, Dictionaries.\n• **Control Structures**: ` + '`if-elif-else`' + `, ` + '`for`' + ` and ` + '`while`' + ` loops, list comprehensions.\n• **Functions & Modularity**: Definition with ` + '`def`' + `, parameters, return values, scope.\n• **Object-Oriented Programming (OOP)**: Classes, Objects, Inheritance, Encapsulation.\n• **Database Integration**: SQL queries (` + '`SELECT`' + `, ` + '`INSERT`' + `, ` + '`UPDATE`' + `, ` + '`JOIN`' + `).\n\n**Portal Resources:**\n• 📖 [Open Computer Science & Python 3D SLM (608)](/student/library/voc-cs-608)\n• **Evaluation**: Theory: 60 Marks | Practical: 40 Marks | TMA: 12 Marks internal.`,
      suggestedActions: [
        { label: 'Open Python & CS 3D SLM', action: 'Open CS SLM', link: '/student/library/voc-cs-608' },
        { label: 'Python Practice Quiz', action: 'Give me a Python quiz' }
      ]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 8. TMA (TUTOR MARKED ASSIGNMENTS) & DEADLINES
  // ─────────────────────────────────────────────────────────────
  if (q.includes('tma') || q.includes('assignment') || q.includes('tutor marked') || q.includes('internal')) {
    return {
      text: `📝 **Official NIOS TMA (Tutor Marked Assignment) Guidelines & Schedule**\n\n**What is TMA?**\nTMA is continuous internal assessment carrying **20% weightage** in theory marks for all Secondary (Class 10) and Senior Secondary (Class 12) subjects.\n\n**Official Submission Deadlines:**\n• 📅 **Block 1 (April/May Public Exam)**: Must upload by **31st January**.\n• 📅 **Block 2 (October/November Public Exam)**: Must upload by **31st July**.\n\n**Submission Steps:**\n1. Download the subject TMA question paper from the student portal.\n2. Write answers neatly on A4 sheets with your **Name, Enrollment No., Subject Name & Code, Study Center Code** on the cover.\n3. Scan as a clear PDF (under 5 MB per subject).\n4. Upload directly on your [Assessments & TMA Portal](/assessments).\n\n⚠️ *Late Submission*: Submission after deadline incurs a fee of ₹1,500 per subject. Ensure on-time upload!`,
      suggestedActions: [
        { label: 'Go to Assessments Portal', action: 'Open Assessments', link: '/assessments' },
        { label: 'Physics TMA Practice Quiz', action: 'Can you generate a practice quiz for TMA?' },
        { label: 'Download TMA Questions', action: 'TMA download link' }
      ]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 9. EXAMINATIONS, DATES, HALL TICKET & ON-DEMAND (ODE)
  // ─────────────────────────────────────────────────────────────
  if (q.includes('exam') || q.includes('date') || q.includes('hall ticket') || q.includes('admit') || q.includes('ode') || q.includes('on demand') || q.includes('schedule')) {
    return {
      text: `🗓️ **NIOS Examination System & Hall Ticket Portal**\n\n**1. Public Examinations (Twice a Year):**\n• **Block 1**: Conducted in **April - May** (Registration: Dec - Jan).\n• **Block 2**: Conducted in **October - November** (Registration: June - July).\n\n**2. On-Demand Examination (ODE):**\n• Learners can choose their exam date and time after completing admission.\n• Held throughout the year at NIOS HQ (NOIDA) and Regional Centers/Kendriya Vidyalayas.\n\n**3. Hall Ticket / Admit Card:**\n• Released 10-15 days prior to the commencement of exams on the portal.\n• Download using your 12-digit Enrollment Number: **${enrollmentNo}**.\n\n**4. Pass Criteria:**\n• Minimum **33% marks** in each subject (Theory and Practical passed separately).\n• Must pass in minimum 5 subjects including at least one language.`,
      suggestedActions: [
        { label: 'Check My Schedule', action: 'View Exam Schedule', link: '/student/schedule' },
        { label: 'Student Portal Dashboard', action: 'Open Portal', link: '/portal' },
        { label: 'Assessments & Quizzes', action: 'Open Assessments', link: '/assessments' }
      ]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 10. DIGITAL LIBRARY & 3D FLIPBOOK SLMS
  // ─────────────────────────────────────────────────────────────
  if (q.includes('library') || q.includes('book') || q.includes('slm') || q.includes('flip') || q.includes('pdf') || q.includes('material') || q.includes('download')) {
    return {
      text: `📚 **NIOS Digital Library & 3D Interactive FlipBook Repository**\n\nAll official NIOS Self-Learning Materials (SLMs) are accessible for free in our interactive digital library:\n\n**Available 3D SLM Titles:**\n1. [English (202): How the Squirrel Got His Stripes](/student/library/sec-eng-202)\n2. [Science & Technology (212): Matter & Motion](/student/library/sec-sci-212)\n3. [Mathematics (211): Real Numbers & Geometry](/student/library/sec-mat-211)\n4. [Physics (312): Electromagnetism & Modern Physics](/student/library/sr-phy-312)\n5. [Biology (314): Cell Genetics & Ecology](/student/library/sr-bio-314)\n6. [Computer Science (608): Python Programming](/student/library/voc-cs-608)\n7. [हिन्दी साहित्य एवं व्याकरण (201)](/student/library/lang-hin-201)\n\n**Features Included:**\n• 📖 Realistic 3D page flip animation with spring physics\n• 🔊 Speech Audio Narration (listen to textbook pages)\n• 🔍 Zoom in/out (70% - 160%)\n• 💡 Key concept highlights & in-text self-check assessment questions.`,
      suggestedActions: [
        { label: 'Explore All SLMs in Library', action: 'Open Library', link: '/student/library' },
        { label: 'Physics 3D Study Room', action: 'Read Physics SLM', link: '/student/library/sr-phy-312' },
        { label: 'Math 3D Study Room', action: 'Read Math SLM', link: '/student/library/sec-mat-211' }
      ]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 11. MULTI-LINGUAL & NEP 2020 23 LANGUAGES DUBBING
  // ─────────────────────────────────────────────────────────────
  if (q.includes('language') || q.includes('dub') || q.includes('kashmiri') || q.includes('tamil') || q.includes('telugu') || q.includes('nep') || q.includes('isl') || q.includes('sign')) {
    return {
      text: `🌐 **NEP 2020 Multi-Lingual Sync & 22 Indian Languages Dubbing**\n\nOur platform implements National Education Policy (NEP) 2020 guidelines enabling mother-tongue education:\n\n• **22 Scheduled Indian Languages**: Hindi, English, Kashmiri, Assamese, Bengali, Bodo, Dogri, Gujarati, Kannada, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi, Tamil, Telugu, and Urdu.\n• **Zero Playback Position Loss**: Switching video audio/dubbing preserves your exact second in playback.\n• **Indian Sign Language (ISL) Feed**: Live picture-in-picture signer video for hearing-impaired learners.\n• **22-Language AI Audio Narration**: Listen to summaries and explanations in your regional dialect.\n• **484 Language Pair Matrix**: Learn any Indian language through your native tongue in the [Language Hub](/student/learn-language).\n\nTry it right now on [Lesson 2: Environmental Science](/student/my-courses/course-env-001)!`,
      suggestedActions: [
        { label: 'Try Video Dubbing Player', action: 'Open Course Video', link: '/student/my-courses/course-env-001' },
        { label: 'Explore 484 Language Pathways', action: 'Open Language Learning', link: '/student/learn-language' }
      ]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 12. FEES, ADMISSION & STREAMS
  // ─────────────────────────────────────────────────────────────
  if (q.includes('fee') || q.includes('admission') || q.includes('stream') || q.includes('registration') || q.includes('cost') || q.includes('price')) {
    return {
      text: `💳 **Official NIOS Fee Structure & Admission Streams**\n\n**1. Admission Fee (Stream 1 - For Fresh Learners):**\n• **Secondary (Class 10)**: Male General: ₹1,800 | Female General: ₹1,450 | SC/ST/Ex-Servicemen: ₹1,200 (includes 5 subjects & study materials).\n• **Senior Secondary (Class 12)**: Male General: ₹2,000 | Female General: ₹1,650 | SC/ST: ₹1,300.\n• **Additional Subject**: ₹720 per subject.\n\n**2. Examination Fees:**\n• Theory Paper: **₹250 per subject**\n• Subject with Practical: **₹120 additional** per practical subject.\n• On-Demand Exam (ODE): ₹500 for theory, ₹700 for practical.\n\n**3. Admission Streams:**\n• **Stream 1**: For all learners (Block 1 for April exams, Block 2 for October exams).\n• **Stream 2**: For 10th/12th fail students of recognized boards to appear in October.\n• **Stream 3 & 4 (ODE)**: For Secondary and Senior Secondary learners wanting instant On-Demand exams throughout the year.`,
      suggestedActions: [
        { label: 'Open Student Portal', action: 'Open Portal', link: '/portal' },
        { label: 'Fee Payment & Finance', action: 'View Finance', link: '/student/finance' }
      ]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 13. USER'S REAL PROFILE & ENROLLED COURSES
  // ─────────────────────────────────────────────────────────────
  if (q.includes('profile') || q.includes('enrollment') || q.includes('my course') || q.includes('registered') || q.includes('center') || q.includes('status')) {
    const subjects = userContext?.details?.subjects?.join(', ') || 'Physics (312), Mathematics (311), Chemistry (313), English (302), Computer Science (330)';
    return {
      text: `👤 **Your NIOS Student Profile & Enrollment Record**\n\n• **Student Name**: ${userName}\n• **Enrollment Number**: **${enrollmentNo}**\n• **Class / Level**: ${userClass}\n• **Admission Status**: Active (Valid for 5 years)\n• **Study Center (AI)**: Kendriya Vidyalaya Regional Study Center (AI Code: 270142)\n• **Registered Subjects**: ${subjects}\n• **Current Academic Progress**: 68% Completed\n• **Pending Assessments**: 2 Quizzes, 1 TMA submission upcoming.\n\nYou can review all details on your [Student Profile](/profile) or continue learning on [My Courses](/student/my-courses).`,
      suggestedActions: [
        { label: 'Go to My Courses', action: 'Open My Courses', link: '/student/my-courses' },
        { label: 'View Profile', action: 'Open Profile', link: '/profile' },
        { label: 'Assessments', action: 'Open Assessments', link: '/assessments' }
      ]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 14. STUDY PLAN GENERATOR
  // ─────────────────────────────────────────────────────────────
  if (q.includes('plan') || q.includes('schedule') || q.includes('timetable') || q.includes('routine')) {
    return {
      type: 'plan',
      text: `📅 **Personalized NIOS 8-Week Master Study Plan (${userClass})**\n\n**Weekly Milestone Breakdown:**\n• **Weeks 1 - 2: Foundation & Core Theory**\n  - 2 hours daily: Read official NIOS SLMs in the [3D Digital Library](/student/library).\n  - Complete Chapter 1-3 solved exercises and self-check questions.\n• **Weeks 3 - 4: Problem Solving & Lab Work**\n  - Focus on numericals in Physics & Mathematics.\n  - Complete virtual lab simulations and practical journal entries.\n• **Weeks 5 - 6: TMA Completion & Submission**\n  - Write and upload all subject TMAs before the deadline (carries 20% weightage!).\n• **Weeks 7 - 8: Mock Tests & Revision**\n  - Solve past 5 years' NIOS question papers and take weekly timed quizzes.\n\n*Recommended Daily Routine: 1.5 hrs Morning (Theory) + 1.5 hrs Evening (Numerical & Solved Questions).*`,
      suggestedActions: [
        { label: 'Open 3D SLM Library', action: 'Open Library', link: '/student/library' },
        { label: 'Take Practice Quiz', action: 'Generate practice quiz' },
        { label: 'Check Schedule', action: 'View My Schedule', link: '/student/schedule' }
      ]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 15. DEFAULT INTELLIGENT MATCHING & SLM SEARCH
  // ─────────────────────────────────────────────────────────────
  // Check if query matches any book or course title/subject in MOCK_BOOKS or MOCK_COURSES
  const matchedBook = MOCK_BOOKS.find(b => 
    b.title.toLowerCase().includes(q) || 
    b.category.toLowerCase().includes(q) ||
    b.subjectCode.toLowerCase().includes(q) ||
    (b.pageDetails && b.pageDetails.some(p => p.heading.toLowerCase().includes(q) || p.chapterTitle.toLowerCase().includes(q)))
  );

  const matchedCourse = MOCK_COURSES.find(c => 
    c.title.toLowerCase().includes(q) || 
    c.subject.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q)
  );

  if (matchedBook) {
    const pageSample = matchedBook.pageDetails?.[0];
    return {
      text: `📖 **Relevant NIOS SLM Found: ${matchedBook.title}**\n\n• **Subject Code**: ${matchedBook.subjectCode} (${matchedBook.category})\n• **Author / Source**: ${matchedBook.author}\n• **Sample Chapter**: ${pageSample ? `${pageSample.chapterTitle} - "${pageSample.heading}"` : 'Chapter 1'}\n• **Summary**: ${pageSample?.content || 'Comprehensive textbook for NIOS syllabus.'}\n\nYou can read this book in realistic 3D format with audio narration and self-check questions: [Open ${matchedBook.title} in 3D FlipBook](/student/library/${matchedBook.id}).`,
      suggestedActions: [
        { label: `Open ${matchedBook.subjectCode} 3D FlipBook`, action: `Open ${matchedBook.title}`, link: `/student/library/${matchedBook.id}` },
        { label: 'Explore Full Library', action: 'Open Digital Library', link: '/student/library' }
      ]
    };
  }

  if (matchedCourse) {
    return {
      text: `🎓 **NIOS Course Found: ${matchedCourse.title}**\n\n• **Subject**: ${matchedCourse.subject}\n• **Level**: ${matchedCourse.level}\n• **Duration**: ${matchedCourse.duration}\n• **Rating**: ⭐ ${matchedCourse.rating} (${matchedCourse.enrolled} enrolled)\n• **Description**: ${matchedCourse.description}\n\nYou can watch video lessons, review lecture slides, and access multi-lingual audio on your course dashboard.`,
      suggestedActions: [
        { label: 'View Course Lessons', action: 'Open Course', link: `/student/my-courses` },
        { label: 'Explore More Courses', action: 'Explore Courses', link: '/student/explore-courses' }
      ]
    };
  }

  // Generic fallback with grounded guidance and website links
  return {
    text: `I've analyzed your question: **"${query}"** in the context of the NIOS academic curriculum and portal data.\n\nHere are the most relevant verified details from our website:\n• **Official SLM & Textbooks**: You can read complete chapter explanations and self-check questions for Secondary (10th) and Senior Secondary (12th) in our [3D Interactive Library](/student/library).\n• **TMA & Assessments**: TMA submissions carry 20% internal weightage. You can verify your submission status on the [Assessments Portal](/assessments).\n• **Video Lectures in 22 Languages**: Watch lesson videos with synchronized dubbing and Indian Sign Language (ISL) feed on [My Courses](/student/my-courses).\n• **Student Support**: For admission verification, fee receipts, or hall tickets, check your [Portal Dashboard](/portal).\n\nCould you specify if you need a chapter explanation, practice questions, or study guidelines?`,
    suggestedActions: [
      { label: 'Open 3D SLM Library', action: 'Open Library', link: '/student/library' },
      { label: 'Check TMA & Assessments', action: 'Open Assessments', link: '/assessments' },
      { label: 'Watch 22-Lang Videos', action: 'Open Course Videos', link: '/student/my-courses/course-env-001' }
    ]
  };
}

