import type { Topic, Concept, Question } from '../types';

/**
 * PUM NMMS CHAMPION — WEEKLY FOCUS TOPIC: 8.E.1 MONEY, SAVINGS AND INVESTMENTS
 * Primary Source: Tamil Nadu Samacheer Kalvi Class 8 Social Science Textbook
 * Economics Unit 1 (Pages 215–226)
 */

export const MONEY_TOPIC: Topic = {
  id: 'topic-sat-soc-8E1',
  subject_id: 'subj-social',
  category_id: 'economics',
  title_en: '8.E.1 — Money, Savings and Investments',
  title_ta: '8.E.1 — பணம், சேமிப்பு மற்றும் முதலீடுகள்',
  description_en: 'Evolution of money (barter to digital), functions of money, value of money (inflation/deflation), savings vs investment, and black money impacts.',
  description_ta: 'பணத்தின் பரிணாம வளர்ச்சி, பணிகள், மதிப்பு (பணவீக்கம்), சேமிப்பு மற்றும் முதலீட்டின் வேறுபாடுகள் மற்றும் கறுப்புப் பணம்.',
  order_index: 17,
  priority: 'HIGH_PRIORITY',
  confidence: 'HIGH',
  syllabus_status: 'EXPLICIT_OFFICIAL',
  years_found: [2018, 2020, 2022, 2023, 2024],
  frequency: 'HIGH',
  source_evidence: 'TN Samacheer Kalvi Class 8 Economics Unit 1 (Pages 215–226)',
  concepts_count: 5,
  questions_count: 15,
  official_questions_count: 2,
  practice_questions_count: 13,
  difficulty_level: 'MEDIUM',
  is_published: true
};

export const MONEY_CONCEPTS: Concept[] = [
  // Concept 1
  {
    id: 'concept-mon-1',
    topic_id: 'topic-sat-soc-8E1',
    title_en: 'Evolution & Functions of Money',
    title_ta: 'பணத்தின் பரிணாம வளர்ச்சி மற்றும் பணிகள்',
    summary_en: 'Barter system & double coincidence of wants, commodity money, metallic money, paper money, plastic & digital money. Primary functions of money.',
    summary_ta: 'பண்டமாற்று முறை, உலோகப் பணம், காகிதப் பணம், நெகிழிப் பணம் மற்றும் மின்னணுப் பணம். பணத்தின் முதன்மைப் பணிகள்.',
    explanation_en: `
### 📌 Concept Overview (TN Samacheer Kalvi Class 8 Economics Unit 1, Pages 215–216)

1. **Evolution Stages of Money**:
   - **Barter System**: Direct exchange of goods for goods (faced double coincidence of wants drawback).
   - **Commodity Money**: Cattle, grain, shells used as money.
   - **Metallic Money**: Gold, silver, copper coins used under ancient kings (Sher Shah Suri introduced *Rupiya* silver coin).
   - **Paper Money**: Managed by Central Bank (RBI in India).
   - **Plastic Money**: Credit cards and Debit cards.
   - **Digital / E-Money**: Electronic transfer (NEFT, UPI, Net Banking).

2. **Primary Functions of Money**:
   - **Medium of Exchange**: Facilitates buying and selling of goods.
   - **Measure of Value**: Standard unit to express price of all commodities.
   - **Store of Value**: Ability to hold purchasing power for future use.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம் (தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 8 பொருளியல் அலகு 1, பக்கங்கள் 215–216)

1. **பணத்தின் பரிணாம வளர்ச்சி நிலைகள்**:
   - **பண்டமாற்று முறை (Barter System)**: பண்டங்களுக்குப் பதிலாக பண்டங்களை நேரடியாக மாற்றுதல் (தேவைகளின் இரட்டைப் பொருத்தம் இன்மையால் சிக்கல்).
   - **உலோகப் பணம் (Metallic Money)**: தங்கம், வெள்ளி நாணயங்கள் (செர்ஷா சூரி *ரூபியா* என்ற வெள்ளி நாணயத்தை அறிமுகப்படுத்தினார்).
   - **காகிதப் பணம் (Paper Money)**: மத்திய வங்கியினால் (RBI) வெளியிடப்படும் பணம்.
   - **நெகிழிப் பணம் (Plastic Money)**: கடன் அட்டைகள் (Credit) & பற்று அட்டைகள் (Debit).
   - **மின்னணுப் பணம் (Digital Money)**: UPI, NEFT மற்றும் இணைய வங்கிப் பரிவர்த்தனைகள்.

2. **பணத்தின் முதன்மைப் பணிகள்**:
   - **பரிமாற்ற ஊடகம் (Medium of Exchange)**: பொருட்களை வாங்கவும் விற்கவும் பயன்படுகிறது.
   - **மதிப்பின் அளவுகோல் (Measure of Value)**: அனைத்துப் பொருட்களின் விலையையும் அளவிட உதவும் அலகு.
   - **மதிப்பின் சேமிப்பு (Store of Value)**: எதிர்காலப் பயன்பாட்டிற்காக மதிப்பைச் சேமிக்க உதவுகிறது.
    `.trim(),
    example_en: 'Sher Shah Suri issued a 178 grain silver coin called "Rupiya" which formed the basis of modern Indian Rupee.',
    example_ta: 'செர்ஷா சூரி 178 தானிய எடையுள்ள "ரூபியா" என்ற வெள்ளி நாணயத்தை வெளியிட்டார்; இதுவே நவீன இந்திய ரூபாயின் அடிப்படையாகும்.',
    solved_question: {
      question_en: 'Which ruler introduced the silver coin named "Rupiya" weighing 178 grains in medieval India?',
      question_ta: 'இடைக்கால இந்தியாவில் 178 தானிய எடைக் கொண்ட "ரூபியா" என்ற வெள்ளி நாணயத்தை அறிமுகப்படுத்திய மன்னர் யார்?',
      options_en: ['Sher Shah Suri', 'Akbar', 'Alauddin Khalji', 'Ashoka'],
      options_ta: ['செர்ஷா சூரி', 'அக்பர்', 'அலாவுதீன் கல்ஜி', 'அசோகர்'],
      correct_index: 0,
      explanation_en: 'Sher Shah Suri issued the Rupiya silver coin which influenced modern currency (Page 215).',
      explanation_ta: 'செர்ஷா சூரி ரூபியா என்ற நாணயத்தை வெளியிட்டார் (பக்கம் 215).'
    },
    order_index: 1
  },

  // Concept 2
  {
    id: 'concept-mon-2',
    topic_id: 'topic-sat-soc-8E1',
    title_en: 'Value of Money & Inflation / Deflation',
    title_ta: 'பணத்தின் மதிப்பு மற்றும் பணவீக்கம் / பணவாட்டம்',
    summary_en: 'Internal value (purchasing power) vs External value (exchange rate). Inflation (price rise) vs Deflation (price fall).',
    summary_ta: 'உள் மதிப்பு (வாங்கும் திறன்) மற்றும் வெளி மதிப்பு (மாற்று விகிதம்). பணவீக்கம் (விலையேற்றம்) மற்றும் பணவாட்டம் (விலைவீழ்ச்சி).',
    explanation_en: `
### 📌 Concept Overview (TN Samacheer Kalvi Class 8 Economics Unit 1, Pages 217–218)

1. **Value of Money**:
   - **Internal Value of Money**: The purchasing power of money over domestic goods and services.
   - **External Value of Money**: The purchasing power of domestic currency in terms of foreign currency (Exchange rate).

2. **Inflation vs Deflation**:
   - **Inflation (பணவீக்கம்)**: Sustained rise in general price level of goods, leading to a **decrease** in the purchasing power of money.
   - **Deflation (பணவாட்டம்)**: Continuous fall in general price level of goods, leading to an **increase** in the purchasing power of money.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம் (தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 8 பொருளியல் அலகு 1, பக்கங்கள் 217–218)

1. **பணத்தின் மதிப்பு**:
   - **உள் மதிப்பு (Internal Value)**: உள்நாட்டுப் பொருட்களை வாங்க பணத்திற்கு இருக்கும் வாங்கும் திறன் (Purchasing power).
   - **வெளி மதிப்பு (External Value)**: வெளிநாட்டுப் பணத்திற்கு நிகராக உள்நாட்டுப் பணத்திற்கு உள்ள வாங்கும் திறன் (அந்நியச் செலாவணி மாற்று விகிதம்).

2. **பணவீக்கம் vs பணவாட்டம்**:
   - **பணவீக்கம் (Inflation)**: பொருட்களின் பொதுவான விலை மட்டம் தொடர்ந்து உயர்வதும், பணத்தின் வாங்கும் திறன் **குறைவதும்** ஆகும்.
   - **பணவாட்டம் (Deflation)**: பொருட்களின் பொதுவான விலை மட்டம் தொடர்ந்து குறைவதும், பணத்தின் வாங்கும் திறன் **அதிகரிப்பதும்** ஆகும்.
    `.trim(),
    example_en: 'If 100 rupees bought 5 kg of rice last year but only 4 kg this year, inflation has reduced purchasing power.',
    example_ta: 'சென்ற ஆண்டு 100 ரூபாய்க்கு 5 கிலோ அரிசி வாங்கி, இந்த ஆண்டு 4 கிலோ மட்டுமே வாங்க முடிந்தால் அது பணவீக்கமாகும்.',
    solved_question: {
      question_en: 'What happens to the purchasing power of money during Inflation?',
      question_ta: 'பணவீக்கத்தின் போது பணத்தின் வாங்கும் திறனுக்கு என்ன நிகழ்கிறது?',
      options_en: ['Purchasing power decreases', 'Purchasing power increases', 'Purchasing power stays double', 'No change'],
      options_ta: ['வாங்கும் திறன் குறைகிறது', 'வாங்கும் திறன் அதிகரிக்கிறது', 'இரட்டிப்பாகிறது', 'மாற்றமில்லை'],
      correct_index: 0,
      explanation_en: 'During inflation, prices rise, causing the purchasing power of money to decrease (Page 217).',
      explanation_ta: 'பணவீக்கத்தின் போது பொருட்கள் விலை உயர்வதால் வாங்கும் திறன் குறைகிறது (பக்கம் 217).'
    },
    order_index: 2
  },

  // Concept 3
  {
    id: 'concept-mon-3',
    topic_id: 'topic-sat-soc-8E1',
    title_en: 'Savings & Black Money',
    title_ta: 'சேமிப்பு மற்றும் கறுப்புப் பணம்',
    summary_en: 'Definition of savings (S = Y - C), student savings methods, bank deposits; Black money (tax evasion) and negative economic effects.',
    summary_ta: 'சேமிப்பு வரைவிலக்கணம் (S = Y - C), வங்கிச் சேமிப்புக் கணக்குகள்; கறுப்புப் பணம் (வரி ஏய்ப்பு) மற்றும் பொருளாதாரத் தீமைகள்.',
    explanation_en: `
### 📌 Concept Overview (TN Samacheer Kalvi Class 8 Economics Unit 1, Pages 219–221)

1. **Savings Definition**:
   - **Savings** is that portion of disposable income which is not consumed immediately.
   - Formula: $$\\text{Savings (S)} = \\text{Income (Y)} - \\text{Consumption (C)}$$
   - Types of Bank Savings: Savings Account, Fixed Deposit, Recurring Deposit (RD), Student Savings Account.

2. **Black Money (கறுப்புப் பணம்)**:
   - **Black Money** is money earned through illegal activities or unaccounted money on which **taxes have been evaded**.
   - **Causes of Black Money**: High tax rates, corruption, smuggling, tax evasion by unaccounted transactions.
   - **Negative Impacts**: Creates dual economy, causes loss of government revenue, inflates real estate prices, leads to social inequality.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம் (தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 8 பொருளியல் அலகு 1, பக்கங்கள் 219–221)

1. **சேமிப்பு (Savings)**:
   - **சேமிப்பு** என்பது தற்போதைய நுகர்விற்காகப் பயன்படுத்தப்படாத வருமானத்தின் ஒரு பகுதியாகும்.
   - சூத்திரம்: $$\\text{சேமிப்பு (S)} = \\text{வருமானம் (Y)} - \\text{நுகர்வு (C)}$$
   - வங்கிச் சேமிப்பு முறைகள்: சேமிப்புக் கணக்கு, நிலையான வைப்பு (FD), தொடர் வைப்பு (RD).

2. **கறுப்புப் பணம் (Black Money)**:
   - அரசுக்குக் கணக்குக் காட்டாமல் **வரிகளை ஏய்த்து** மறைத்து வைக்கப்படும் பணமே **கறுப்புப் பணம்** ஆகும்.
   - **காரணங்கள்**: அதிக வரி விகிதங்கள், ஊழல், வரி ஏய்ப்பு.
   - **தீய விளைவுகள்**: அரசுக்கு வருவாய் இழப்பு, இரட்டைப் பொருளாதாரம் உருவாதல், விலைவாசி செயற்கையாக உயர்தல்.
    `.trim(),
    example_en: 'Keeping cash at home without recording income in tax returns creates black money.',
    example_ta: 'வருமான வரிக் கணக்கில் காட்டாமல் பணத்தை அரசுக்குத் தெரியாமல் மறைப்பது கறுப்புப் பணத்தை உருவாக்குகிறது.',
    solved_question: {
      question_en: 'How is Savings (S) defined in terms of Income (Y) and Consumption (C)?',
      question_ta: 'வருமானம் (Y) மற்றும் நுகர்வு (C) ஆகியவற்றின் அடிப்படையில் சேமிப்பு (S) எவ்வாறு வரையறுக்கப்படுகிறது?',
      options_en: ['S = Y - C', 'S = Y + C', 'S = Y × C', 'S = C - Y'],
      options_ta: ['S = Y - C', 'S = Y + C', 'S = Y × C', 'S = C - Y'],
      correct_index: 0,
      explanation_en: 'Savings is unspent income, i.e., S = Y - C (Page 219).',
      explanation_ta: 'சேமிப்பு என்பது வருமானத்தில் நுகர்வு போக எஞ்சியது: S = Y - C (பக்கம் 219).'
    },
    order_index: 3
  },

  // Concept 4
  {
    id: 'concept-mon-4',
    topic_id: 'topic-sat-soc-8E1',
    title_en: 'Investment & Financial Instruments',
    title_ta: 'முதலீடு மற்றும் நிதி நிறுவனங்கள்',
    summary_en: 'Investment definition (capital asset creation), shares, bonds, mutual funds, post office schemes, and bank roles.',
    summary_ta: 'முதலீடு வரைவிலக்கணம் (மூலதன சொத்துக்கள் உருவாக்கம்), பங்குகள், பத்திரங்கள், அஞ்சலக சேமிப்புத் திட்டங்கள்.',
    explanation_en: `
### 📌 Concept Overview (TN Samacheer Kalvi Class 8 Economics Unit 1, Pages 222–223)

1. **Definition of Investment**:
   - **Investment** is the process of deploying funds into productive capital assets (stocks, bonds, real estate, mutual funds, gold) to generate future income or profit.

2. **Common Investment Avenues**:
   - **Commercial Bank Fixed Deposits**: Safe investment with guaranteed interest.
   - **Post Office Savings Schemes**: National Savings Certificate (NSC), Kisan Vikas Patra.
   - **Shares & Stocks**: Ownership in corporate capital with variable dividends.
   - **Bonds / Debentures**: Government or corporate debt instruments with fixed interest returns.
   - **Mutual Funds**: Pooled investments managed by professional fund managers.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம் (தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 8 பொருளியல் அலகு 1, பக்கங்கள் 222–223)

1. **முதலீடு (Investment)**:
   - எதிர்காலத்தில் கூடுதல் வருமானம் அல்லது மூலதனத்தைப் பெற பணத்தை உற்பத்தி சார்ந்த சொத்துக்களில் (பங்குகள், பத்திரங்கள், ரியல் எஸ்டேட்) ஈடுபடுத்துவதே **முதலீடு** ஆகும்.

2. **முக்கிய முதலீட்டு வழிகள்**:
   - **வங்கி நிலையான வைப்புகள்**: குறைந்த அபாயத்துடன் கூடிய உத்திரவாத வட்டி.
   - **அஞ்சலகச் சேமிப்புத் திட்டங்கள்**: தேசிய சேமிப்புப் பத்திரம் (NSC), கிசான் விகாஸ் பத்ரா.
   - **பங்குகள் (Shares)**: நிறுவனங்களின் மூலதனத்தில் பங்கு பெறுதல்.
   - **பத்திரங்கள் (Bonds)**: அரசு அல்லது நிறுவனக் கடன் பத்திரங்கள்.
    `.trim(),
    example_en: 'Buying a National Savings Certificate (NSC) at the Post Office is a popular government-backed investment.',
    example_ta: 'அஞ்சலகத்தில் தேசிய சேமிப்புப் பத்திரம் (NSC) வாங்குவது அரசு ஆதரவு பெற்ற பாதுகாப்பான முதலீடாகும்.',
    solved_question: {
      question_en: 'Which of the following is a government-backed safe post office investment scheme?',
      question_ta: 'பின்வருவனவற்றுள் எது அரசு ஆதரவு பெற்ற பாதுகாப்பான அஞ்சலக முதலீட்டுத் திட்டமாகும்?',
      options_en: ['National Savings Certificate (NSC)', 'Black Money Hoard', 'Speculative Lottery', 'Unregistered Chit Fund'],
      options_ta: ['தேசிய சேமிப்புப் பத்திரம் (NSC)', 'கறுப்புப் பணப் பதுக்கல்', 'சூதாட்ட அதிர்ஷ்டச் சீட்டு', 'பதிவு செய்யாத சீட்டு நிறுவனம்'],
      correct_index: 0,
      explanation_en: 'National Savings Certificate is a safe government post office investment (Page 222).',
      explanation_ta: 'தேசிய சேமிப்புப் பத்திரம் (NSC) அரசு அஞ்சலக பாதுகாப்பான முதலீடாகும் (பக்கம் 222).'
    },
    order_index: 4
  },

  // Concept 5
  {
    id: 'concept-mon-5',
    topic_id: 'topic-sat-soc-8E1',
    title_en: 'Difference Between Savings and Investment',
    title_ta: 'சேமிப்பு மற்றும் முதலீட்டிற்கு இடையே உள்ள வேறுபாடுகள்',
    summary_en: 'Comparing savings (unspent money, low risk, liquid) vs investment (capital asset deployment, risk & return).',
    summary_ta: 'சேமிப்பு (செலவிடாத பணம், குறைந்த அபாயம்) மற்றும் முதலீடு (மூலதன உற்பத்தி, லாப நோக்கம்) ஒப்பீடு.',
    explanation_en: `
### 📌 Concept Overview (TN Samacheer Kalvi Class 8 Economics Unit 1, Pages 224–225)

1. **Comparison Table**:

| Feature | Savings (சேமிப்பு) | Investment (முதலீடு) |
| :--- | :--- | :--- |
| **Purpose** | To meet short-term emergency cash needs | To generate future wealth / capital appreciation |
| **Risk** | Very Low / Minimal Risk | Moderate to High Risk |
| **Liquidity** | High (easy cash withdrawal) | Low to Moderate Liquidity |
| **Return** | Low fixed interest | Higher variable returns / capital gains |
| **Example** | Savings Account balance, Cash in Piggy Bank | Shares, Bonds, Real Estate, Gold |
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம் (தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 8 பொருளியல் அலகு 1, பக்கங்கள் 224–225)

1. **ஒப்பீட்டு அட்டவணை**:

| அம்சம் | சேமிப்பு (Savings) | முதலீடு (Investment) |
| :--- | :--- | :--- |
| **நோக்கம்** | குறுகிய கால அவசரத் தேவைகளைப் பூர்த்தி செய்ய | எதிர்கால செல்வத்தை பெருக்க / லாபம் பெற |
| **அபாயம் (Risk)** | மிகவும் குறைவு | மிதமானது முதல் அதிக அபாயம் |
| **திரவத்தன்மை (Liquidity)**| அதிகம் (உடனடி பணமாக மாற்றுதல்) | மிதமானது முதல் குறைவு |
| **வருவாய் (Return)** | குறைந்த நிலையான வட்டி | அதிக லாபம் / வருவாய் |
| **எடுத்துக்காட்டு** | சேமிப்பு வங்கி கணக்கில் உள்ள பணம் | பங்குகள், பத்திரங்கள், ரியல் எஸ்டேட் |
    `.trim(),
    example_en: 'Keeping money in a bank savings account provides high liquidity with minimal risk, whereas buying company shares carries higher return with market risk.',
    example_ta: 'வங்கி சேமிப்புக் கணக்கில் பணம் வைத்திருப்பது குறைந்த அபாயத்துடன் அதிக திரவத்தன்மையை அளிக்கிறது; பங்குகளில் முதலீடு செய்வது அதிக லாபத்தையும் சந்தை அபாயத்தையும் அளிக்கிறது.',
    solved_question: {
      question_en: 'Which financial instrument provides high liquidity with low risk?',
      question_ta: 'குறைந்த அபாயத்துடன் அதிக திரவத்தன்மையை (உடனடி பணமாக மாற்றுதல்) அளிக்கும் நிதி சாதனம் எது?',
      options_en: ['Bank Savings Account', 'Real Estate Property', 'Corporate Shares', 'Physical Gold'],
      options_ta: ['வங்கி சேமிப்புக் கணக்கு (Savings Account)', 'ரியல் எஸ்டேட் நிலம்', 'நிறுவனப் பங்குகள்', 'தங்கம்'],
      correct_index: 0,
      explanation_en: 'Bank savings accounts offer maximum liquidity and safety.',
      explanation_ta: 'வங்கி சேமிப்புக் கணக்கு அதிக திரவத்தன்மையையும் பாதுகாப்பையும் அளிக்கிறது (பக்கம் 224).'
    },
    order_index: 5
  }
];

export const MONEY_PRACTICE_QUESTIONS: Question[] = [
  {
    id: 'q-mon-01',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-8E1',
    concept_id: 'concept-mon-1',
    question_en: 'What was the major drawback of the Barter System of exchange?',
    question_ta: 'பண்டமாற்று முறையில் (Barter System) காணப்பட்ட பிரதான குறைபாடு எது?',
    option_a_en: 'Lack of double coincidence of wants',
    option_a_ta: 'தேவைகளின் இரட்டைப் பொருத்தம் இன்மை',
    option_b_en: 'High central bank interest rate',
    option_b_ta: 'மத்திய வங்கியின் அதிக வட்டி விகிதம்',
    option_c_en: 'Lack of paper printing presses',
    option_c_ta: 'காகித அச்சுக்கூடங்கள் இல்லாமை',
    option_d_en: 'Excessive plastic card usage',
    option_d_ta: 'அதிக நெகிழி அட்டை பயன்பாடு',
    correct_option: 'A',
    explanation_en: 'Double coincidence of wants was the primary limitation of barter.',
    explanation_ta: 'தேவைகளின் இரட்டைப் பொருத்தம் இன்மையே பண்டமாற்று முறையின் முக்கியக் குறையாகும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 8 Economics Unit 1',
    source_page: 215,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-mon-02',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-8E1',
    concept_id: 'concept-mon-1',
    question_en: 'Which medieval ruler issued the 178-grain silver coin named "Rupiya"?',
    question_ta: '178 தானிய எடைக் கொண்ட "ரூபியா" என்ற வெள்ளி நாணயத்தை வெளியிட்ட இடைக்கால மன்னர் யார்?',
    option_a_en: 'Sher Shah Suri',
    option_a_ta: 'செர்ஷா சூரி',
    option_b_en: 'Babur',
    option_b_ta: 'பாபர்',
    option_c_en: 'Shah Jahan',
    option_c_ta: 'ஷாஜஹான்',
    option_d_en: 'Aurangzeb',
    option_d_ta: 'ஔரங்கசீப்',
    correct_option: 'A',
    explanation_en: 'Sher Shah Suri introduced the Rupiya silver coin in India.',
    explanation_ta: 'செர்ஷா சூரி ரூபியா என்ற வெள்ளி நாணயத்தை வெளியிட்டார்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'OFFICIAL_QUESTION_BANK',
    source_name: 'TN NMMS Official Question Bank & Class 8 Economics',
    source_page: 215,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-mon-03',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-8E1',
    concept_id: 'concept-mon-2',
    question_en: 'What happens to the general price level of goods during Inflation?',
    question_ta: 'பணவீக்கத்தின் (Inflation) போது பொருட்களின் பொதுவான விலை மட்டத்திற்கு என்ன நிகழ்கிறது?',
    option_a_en: 'Prices continuously rise',
    option_a_ta: 'விலை மட்டம் தொடர்ந்து உயர்கிறது',
    option_b_en: 'Prices continuously drop to zero',
    option_b_ta: 'விலை மட்டம் பூஜ்யத்திற்கு வீழ்ச்சியடைகிறது',
    option_c_en: 'Prices remain completely frozen',
    option_c_ta: 'விலை முற்றிலும் மாறாமல் நிற்கிறது',
    option_d_en: 'Taxes are abolished',
    option_d_ta: 'வரிகள் ரத்து செய்யப்படுகின்றன',
    correct_option: 'A',
    explanation_en: 'Inflation causes a continuous rise in general price level.',
    explanation_ta: 'பணவீக்கத்தில் பொருட்களின் பொதுவான விலை உயர்கிறது.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 8 Economics Unit 1',
    source_page: 217,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-mon-04',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-8E1',
    concept_id: 'concept-mon-3',
    question_en: 'Money earned through illegal means or unaccounted money on which tax is evaded is known as:',
    question_ta: 'சட்டவிரோத வழிகளில் சம்பாதிக்கப்பட்ட அல்லது அரசுக்குக் கணக்குக் காட்டாமல் வரி ஏய்க்கப்பட்ட பணம் எவ்வாறு அழைக்கப்படுகிறது?',
    option_a_en: 'Black Money',
    option_a_ta: 'கறுப்புப் பணம் (Black Money)',
    option_b_en: 'White Money',
    option_b_ta: 'வெள்ளைப் பணம்',
    option_c_en: 'Plastic Money',
    option_c_ta: 'நெகிழிப் பணம்',
    option_d_en: 'Commodity Money',
    option_d_ta: 'பண்டப் பணம்',
    correct_option: 'A',
    explanation_en: 'Unaccounted money derived from tax evasion is called Black Money.',
    explanation_ta: 'வரி ஏய்க்கப்பட்டு கணக்கில் காட்டப்படாத பணம் கறுப்புப் பணம் எனப்படும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 8 Economics Unit 1',
    source_page: 220,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-mon-05',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-8E1',
    concept_id: 'concept-mon-3',
    question_en: 'If Disposable Income Y = ₹50,000 and Consumption C = ₹35,000, what is the Savings S?',
    question_ta: 'வருமானம் Y = ₹50,000 மற்றும் நுகர்வு C = ₹35,000 எனில், சேமிப்பு S எவ்வளவு?',
    option_a_en: '₹15,000',
    option_a_ta: '₹15,000',
    option_b_en: '₹85,000',
    option_b_ta: '₹85,000',
    option_c_en: '₹50,000',
    option_c_ta: '₹50,000',
    option_d_en: '₹35,000',
    option_d_ta: '₹35,000',
    correct_option: 'A',
    explanation_en: 'Savings S = Y - C = 50,000 - 35,000 = ₹15,000.',
    explanation_ta: 'சேமிப்பு S = Y - C = 50,000 - 35,000 = ₹15,000.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 8 Economics Unit 1',
    source_page: 219,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-mon-06',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-8E1',
    concept_id: 'concept-mon-4',
    question_en: 'Deploying money into stocks, bonds, or mutual funds to earn future income or wealth appreciation is called:',
    question_ta: 'எதிர்காலத்தில் கூடுதல் வருமானம் அல்லது செல்வத்தைப் பெருக்க பணத்தை பங்குகள் அல்லது பத்திரங்களில் ஈடுபடுத்துவது எவ்வாறு அழைக்கப்படுகிறது?',
    option_a_en: 'Investment',
    option_a_ta: 'முதலீடு (Investment)',
    option_b_en: 'Tax Evasion',
    option_b_ta: 'வரி ஏய்ப்பு',
    option_c_en: 'Inflation',
    option_c_ta: 'பணவீக்கம்',
    option_d_en: 'Barter Exchange',
    option_d_ta: 'பண்டமாற்று',
    correct_option: 'A',
    explanation_en: 'Investment is deploying money into assets for future financial gain.',
    explanation_ta: 'வருமானம் பெற பணத்தை சொத்துக்களில் ஈடுபடுத்துவது முதலீடாகும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 8 Economics Unit 1',
    source_page: 222,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-mon-07',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-8E1',
    concept_id: 'concept-mon-5',
    question_en: 'Which financial option carries lower risk and higher liquidity compared to stocks?',
    question_ta: 'பங்குகளை விடக் குறைந்த அபாயத்தையும் அதிக திரவத்தன்மையையும் அளிக்கும் நிதி வடிவம் எது?',
    option_a_en: 'Bank Savings Account',
    option_a_ta: 'வங்கி சேமிப்புக் கணக்கு (Savings Account)',
    option_b_en: 'Volatile Company Equity Shares',
    option_b_ta: 'நிறுவனப் பங்குகள்',
    option_c_en: 'Real Estate Land Speculation',
    option_c_ta: 'ரியல் எஸ்டேட் நிலம்',
    option_d_en: 'Cryptocurrency Trading',
    option_d_ta: 'கிரிப்டோகரன்சி வர்த்தகம்',
    correct_option: 'A',
    explanation_en: 'Bank savings accounts offer minimal risk and maximum liquidity.',
    explanation_ta: 'வங்கி சேமிப்புக் கணக்கு குறைந்த அபாயமும் அதிக திரவத்தன்மையும் கொண்டது.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 8 Economics Unit 1',
    source_page: 224,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-mon-08',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-8E1',
    concept_id: 'concept-mon-1',
    question_en: 'Credit cards and debit cards are examples of which stage of money evolution?',
    question_ta: 'கடன் அட்டைகள் (Credit cards) மற்றும் பற்று அட்டைகள் (Debit cards) பணத்தின் எந்த பரிணாம நிலைக்கு எடுத்துக்காட்டாகும்?',
    option_a_en: 'Plastic Money',
    option_a_ta: 'நெகிழிப் பணம் (Plastic Money)',
    option_b_en: 'Commodity Money',
    option_b_ta: 'பண்டப் பணம்',
    option_c_en: 'Metallic Money',
    option_c_ta: 'உலோகப் பணம்',
    option_d_en: 'Barter Goods',
    option_d_ta: 'பண்டமாற்றுப் பொருட்கள்',
    correct_option: 'A',
    explanation_en: 'Bank cards made of plastic represent Plastic Money.',
    explanation_ta: 'கடன் மற்றும் பற்று அட்டைகள் நெகிழிப் பணம் எனப்படுகின்றன.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 8 Economics Unit 1',
    source_page: 216,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-mon-09',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-8E1',
    concept_id: 'concept-mon-1',
    question_en: 'Which institution regulates paper currency notes in India?',
    question_ta: 'இந்தியாவில் காகிதப் பணக் குறிப்புகளைக் கட்டுப்படுத்தி வெளியிடும் நிறுவனம் எது?',
    option_a_en: 'Reserve Bank of India (RBI)',
    option_a_ta: 'இந்திய ரிசர்வ் வங்கி (RBI)',
    option_b_en: 'State Bank of India (SBI)',
    option_b_ta: 'பாரத ஸ்டேட் வங்கி (SBI)',
    option_c_en: 'Life Insurance Corporation (LIC)',
    option_c_ta: 'ஆயுள் காப்பீட்டுக் கழகம் (LIC)',
    option_d_en: 'Indian Post Office',
    option_d_ta: 'இந்திய அஞ்சல் துறை',
    correct_option: 'A',
    explanation_en: 'The Reserve Bank of India (RBI) issues and regulates paper currency.',
    explanation_ta: 'ரிசர்வ் வங்கி (RBI) இந்தியாவில் காகிதப் பணத்தை வெளியிட்டு நிர்வகிக்கிறது.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 8 Economics Unit 1',
    source_page: 216,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-mon-10',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-8E1',
    concept_id: 'concept-mon-2',
    question_en: 'Continuous fall in the general price level of goods accompanied by an increase in purchasing power is termed:',
    question_ta: 'பொருட்களின் பொதுவான விலை மட்டம் தொடர்ந்து குறைவதும், பணத்தின் வாங்கும் திறன் அதிகரிப்பதும் எவ்வாறு அழைக்கப்படுகிறது?',
    option_a_en: 'Deflation',
    option_a_ta: 'பணவாட்டம் (Deflation)',
    option_b_en: 'Inflation',
    option_b_ta: 'பணவீக்கம் (Inflation)',
    option_c_en: 'Stagflation',
    option_c_ta: 'தேக்கப் பணவீக்கம்',
    option_d_en: 'Devaluation',
    option_d_ta: 'பணமதிப்புக் குறைப்பு',
    correct_option: 'A',
    explanation_en: 'Deflation is the continuous fall in prices increasing money purchasing power.',
    explanation_ta: 'பொருட்கள் விலை குறைந்து வாங்கும் திறன் உயர்வது பணவாட்டமாகும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 8 Economics Unit 1',
    source_page: 217,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-mon-11',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-8E1',
    concept_id: 'concept-mon-3',
    question_en: 'Which of the following is a major negative impact of Black Money on an economy?',
    question_ta: 'பொருளாதாரத்தில் கறுப்புப் பணத்தின் மிக முக்கிய எதிர்மறையான தீய விளைவு எது?',
    option_a_en: 'Loss of revenue to the government and creation of dual economy',
    option_a_ta: 'அரசுக்கு வரி வருவாய் இழப்பும் இரட்டைப் பொருளாதாரம் உருவாவதும்',
    option_b_en: 'Increase in public school construction',
    option_b_ta: 'அரசுப் பள்ளிக் கட்டிடங்கள் அதிகரித்தல்',
    option_c_en: 'Reduction of inflation to zero',
    option_c_ta: 'பணவீக்கம் பூஜ்ஜியமாகக் குறைதல்',
    option_d_en: 'Free distribution of gold coins',
    option_d_ta: 'இலவசத் தங்க நாணயப் பங்கீடு',
    correct_option: 'A',
    explanation_en: 'Black money leads to tax evasion, loss of state revenue, and inequality.',
    explanation_ta: 'கறுப்புப் பணம் அரசுக்கு வரி வருவாய் இழப்பையும் இரட்டைப் பொருளாதாரத்தையும் உருவாக்குகிறது.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 8 Economics Unit 1',
    source_page: 221,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-mon-12',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-8E1',
    concept_id: 'concept-mon-4',
    question_en: 'What is the full form of NSC offered by the Indian Post Office for safe savings?',
    question_ta: 'பாதுகாப்பான சேமிப்பிற்காக இந்திய அஞ்சல் துறை வழங்கும் NSC என்பதன் விரிவாக்கம் என்ன?',
    option_a_en: 'National Savings Certificate',
    option_a_ta: 'தேசிய சேமிப்புப் பத்திரம் (National Savings Certificate)',
    option_b_en: 'New State Currency',
    option_b_ta: 'புதிய மாநிலப் பணம்',
    option_c_en: 'Net Savings Coin',
    option_c_ta: 'நிகர சேமிப்பு நாணயம்',
    option_d_en: 'National Stock Credit',
    option_d_ta: 'தேசிய பங்கு கடன்',
    correct_option: 'A',
    explanation_en: 'NSC stands for National Savings Certificate.',
    explanation_ta: 'NSC என்பது தேசிய சேமிப்புப் பத்திரம் (National Savings Certificate) ஆகும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 8 Economics Unit 1',
    source_page: 222,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-mon-13',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-8E1',
    concept_id: 'concept-mon-1',
    question_en: 'Which of the following is considered a primary function of money?',
    question_ta: 'பின்வருவனவற்றுள் எது பணத்தின் முதன்மைப் பணியாகக் கருதப்படுகிறது?',
    option_a_en: 'Medium of Exchange and Measure of Value',
    option_a_ta: 'பரிமாற்ற ஊடகம் மற்றும் மதிப்பின் அளவுகோல்',
    option_b_en: 'Tax Evasion Tool',
    option_b_ta: 'வரி ஏய்ப்பு சாதனம்',
    option_c_en: 'Black Market Creation',
    option_c_ta: 'கறுப்புச் சந்தை உருவாக்கம்',
    option_d_en: 'Barter Goods Trading',
    option_d_ta: 'பண்டமாற்று வர்த்தகம்',
    correct_option: 'A',
    explanation_en: 'Medium of exchange and measure of value are primary functions of money.',
    explanation_ta: 'பரிமாற்ற ஊடகம் மற்றும் மதிப்பின் அளவுகோல் பணத்தின் முதன்மைப் பணிகளாகும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 8 Economics Unit 1',
    source_page: 216,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-mon-14',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-8E1',
    concept_id: 'concept-mon-2',
    question_en: 'Internal value of money refers to:',
    question_ta: 'பணத்தின் உள் மதிப்பு (Internal Value) எதனைக் குறிக்கிறது?',
    option_a_en: 'Purchasing power over domestic goods and services',
    option_a_ta: 'உள்நாட்டுப் பொருட்களை வாங்க பணத்திற்கு உள்ள வாங்கும் திறன்',
    option_b_en: 'Exchange rate against US Dollars only',
    option_b_ta: 'அமெரிக்க டாலருக்கு நிகரான மாற்று விகிதம் மட்டுமே',
    option_c_en: 'Weight of paper note in grams',
    option_c_ta: 'காகிதப் பணத்தின் கிராம் எடை',
    option_d_en: 'Color of currency note',
    option_d_ta: 'நாணயத் தாளின் வண்ணம்',
    correct_option: 'A',
    explanation_en: 'Internal value is purchasing power of money over domestic commodities.',
    explanation_ta: 'உள்மதிப்பு என்பது உள்நாட்டுப் பொருட்களை வாங்கும் பணத்தின் திறனாகும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 8 Economics Unit 1',
    source_page: 217,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-mon-15',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-8E1',
    concept_id: 'concept-mon-5',
    question_en: 'What is the key difference regarding Risk between Savings and Investment?',
    question_ta: 'சேமிப்பு மற்றும் முதலீட்டிற்கு இடையே உள்ள அபாய நிலையின் (Risk) முக்கிய வேறுபாடு என்ன?',
    option_a_en: 'Savings has very low risk while Investment carries moderate to high risk',
    option_a_ta: 'சேமிப்பு குறைந்த அபாயம் கொண்டது; முதலீடு மிதமான முதல் அதிக அபாயம் கொண்டது',
    option_b_en: 'Savings is extremely risky while Investment has zero risk',
    option_b_ta: 'சேமிப்பு அதிக அபாயகரமானது; முதலீட்டுக்கு அபாயமே இல்லை',
    option_c_en: 'Both have 100% loss risk',
    option_c_ta: 'இரண்டிலும் 100% இழப்பு அபாயம் உண்டு',
    option_d_en: 'There is no difference in risk',
    option_d_ta: 'அபாயத்தில் எந்த வேறுபாடும் இல்லை',
    correct_option: 'A',
    explanation_en: 'Savings carries minimal risk whereas Investment carries higher risk for higher potential return.',
    explanation_ta: 'சேமிப்பு குறைந்த அபாயத்தைக் கொண்டது; முதலீடு அதிக லாபத்திற்காக அதிக அபாயத்தைக் கொண்டது.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 8 Economics Unit 1',
    source_page: 224,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  }
];
