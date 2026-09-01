import type { Topic, Concept, Question } from '../types';

/**
 * PUM NMMS CHAMPION — WEEKLY FOCUS TOPIC: 7.I.G.3 POPULATION AND SETTLEMENT
 * Primary Source: Tamil Nadu Samacheer Kalvi Class 7 Social Science Textbook
 * Term 1 / Geography Unit 3 (Pages 165–178)
 */

export const POPULATION_TOPIC: Topic = {
  id: 'topic-sat-soc-7IG3',
  subject_id: 'subj-social',
  category_id: 'geography',
  title_en: '7.I.G.3 — Population and Settlement',
  title_ta: '7.I.G.3 — மக்கள் தொகை மற்றும் குடியிருப்புகள்',
  description_en: 'Population distribution, density factors, rural/urban settlement types, patterns (compact, linear, dispersed), and demography terms.',
  description_ta: 'மக்கள் தொகை பரவல், அடர்த்தி காரணிகள், கிராமப்புற மற்றும் நகர்ப்புற குடியிருப்புகளின் வகைகள் மற்றும் கலைச்சொற்கள்.',
  order_index: 16,
  priority: 'HIGH_PRIORITY',
  confidence: 'HIGH',
  syllabus_status: 'EXPLICIT_OFFICIAL',
  years_found: [2019, 2021, 2022, 2023, 2024],
  frequency: 'HIGH',
  source_evidence: 'TN Samacheer Kalvi Class 7 Geography Unit 3 (Pages 165–178)',
  concepts_count: 5,
  questions_count: 15,
  official_questions_count: 2,
  practice_questions_count: 13,
  difficulty_level: 'MEDIUM',
  is_published: true
};

export const POPULATION_CONCEPTS: Concept[] = [
  // Concept 1
  {
    id: 'concept-pop-1',
    topic_id: 'topic-sat-soc-7IG3',
    title_en: 'Population Distribution & Density',
    title_ta: 'மக்கள் தொகை பரவல் மற்றும் அடர்த்தி',
    summary_en: 'Population density formula (Population / Land Area). High, moderate, and low density regions of the world.',
    summary_ta: 'மக்கள் தொகை அடர்த்தி சூத்திரம் (மக்கள் தொகை / நிலப்பரப்பு). உலகின் அதிக, மிதமான மற்றும் குறைந்த அடர்த்தி பகுதிகள்.',
    explanation_en: `
### 📌 Concept Overview (TN Samacheer Kalvi Class 7 Geography Unit 3, Pages 165–166)

1. **Population Density Formula**:
   - **Population Density** refers to the average number of people living per unit area (usually per square kilometer).
   - Formula: $$\\text{Population Density} = \\frac{\\text{Total Population}}{\\text{Total Land Area (sq. km)}}$$

2. **World Density Categories**:
   - **High Density Regions (> 100 people/sq.km)**: East Asia, South Asia (India, Bangladesh), Western Europe.
   - **Moderate Density Regions (10 to 100 people/sq.km)**: Central USA, Tropical Africa, Western Australia.
   - **Low Density Regions (< 10 people/sq.km)**: Polar caps (Antarctica, Greenland), Hot deserts (Sahara), High mountain ranges (Himalayas).
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம் (தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 7 புவியியல் அலகு 3, பக்கங்கள் 165–166)

1. **மக்கள் தொகை அடர்த்தி சூத்திரம்**:
   - ஒரு குறிப்பிட்ட நிலப்பரப்பில் (சதுர கிலோமீட்டரில்) வாழும் மக்களின் சராசரி எண்ணிக்கையே **மக்கள் தொகை அடர்த்தி** எனப்படும்.
   - சூத்திரம்: $$\\text{மக்கள் தொகை அடர்த்தி} = \\frac{\\text{மொத்த மக்கள் தொகை}}{\\text{மொத்த நிலப்பரப்பு (ச.கி.மீ)}}$$

2. **உலக மக்கள் தொகை அடர்த்திப் பிரிவுகள்**:
   - **அதிக அடர்த்தி பகுதிகள் (> 100 நபர்கள்/ச.கி.மீ)**: கிழக்கு ஆசியா, தெற்கு ஆசியா (இந்தியா, பங்களாதேஷ்), மேற்கு ஐரோப்பா.
   - **மிதமான அடர்த்தி பகுதிகள் (10 - 100 நபர்கள்/ச.கி.மீ)**: மத்திய அமெரிக்கா, ஆப்பிரிக்கப் பகுதிகள்.
   - **குறைந்த அடர்த்தி பகுதிகள் (< 10 நபர்கள்/ச.கி.மீ)**: துருவப் பகுதிகள் (அண்டார்டிகா, கிரீன்லாந்து), தார்/சஹாரா பாலைவனங்கள், இமயமலைப் பகுதிகள்.
    `.trim(),
    example_en: 'If a district has 500,000 people living in 1,000 sq.km, its density is 500 people per sq.km.',
    example_ta: '1,000 ச.கி.மீ பரப்பில் 500,000 மக்கள் வாழ்ந்தால், அதன் அடர்த்தி 500 நபர்கள்/ச.கி.மீ ஆகும்.',
    solved_question: {
      question_en: 'How is population density calculated?',
      question_ta: 'மக்கள் தொகை அடர்த்தி எவ்வாறு கணக்கிடப்படுகிறது?',
      options_en: ['Total Population / Total Area', 'Total Area / Total Population', 'Total Population × Total Area', 'Birth Rate - Death Rate'],
      options_ta: ['மொத்த மக்கள் தொகை / மொத்த நிலப்பரப்பு', 'மொத்த நிலப்பரப்பு / மொத்த மக்கள் தொகை', 'மொத்த மக்கள் தொகை × மொத்த நிலப்பரப்பு', 'பிறப்பு விகிதம் - இறப்பு விகிதம்'],
      correct_index: 0,
      explanation_en: 'Population density is calculated by dividing total population by total land area (Page 165).',
      explanation_ta: 'மக்கள் தொகையை நிலப்பரப்பால் வகுப்பதன் மூலம் அடர்த்தி பெறப்படுகிறது (பக்கம் 165).'
    },
    order_index: 1
  },

  // Concept 2
  {
    id: 'concept-pop-2',
    topic_id: 'topic-sat-soc-7IG3',
    title_en: 'Factors Influencing Population Distribution',
    title_ta: 'மக்கள் தொகை பரவலைத் தீர்மானிக்கும் காரணிகள்',
    summary_en: 'Physical factors (relief, climate, soil, water) and Human factors (religion, political stability, industries).',
    summary_ta: 'இயற்கைக் காரணிகள் (நிலத்தோற்றம், காலநிலை, மண், நீர்) மற்றும் மனிதக் காரணிகள் (தொழில்கள், அரசியல் ஸ்திரத்தன்மை).',
    explanation_en: `
### 📌 Concept Overview (TN Samacheer Kalvi Class 7 Geography Unit 3, Pages 167–169)

1. **Physical Factors**:
   - **Relief**: River plains (Gangetic plain) attract dense populations due to flat land for agriculture. Mountains deter settlement.
   - **Climate**: Extreme hot or freezing cold climates sparse population; temperate humid climates attract dense settlement.
   - **Soil & Water**: Fertile alluvial soils and abundant freshwater sources foster high agricultural population.

2. **Human Factors**:
   - **Economic/Industrial**: Mining regions (Chota Nagpur plateau) and manufacturing hubs attract workers.
   - **Cultural & Religious**: Holy cities (Varanasi, Jerusalem, Madurai) attract continuous settlements.
   - **Political Stability**: Safe regions free from civil war attract population influx.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம் (தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 7 புவியியல் அலகு 3, பக்கங்கள் 167–169)

1. **இயற்கைக் காரணிகள்**:
   - **நிலத்தோற்றம்**: ஆற்றுச் சமவெளிகள் (கங்கைச் சமவெளி) விவசாயத்திற்கு ஏற்றதாக இருப்பதால் அதிக மக்கள் வாழ்கின்றனர்.
   - **காலநிலை**: மிதமான காலநிலை உள்ள பகுதிகளில் மக்கள் அடர்த்தி அதிகம்; கடுமையான குளிர் அல்லது வெப்பப் பகுதிகளில் குறைவு.
   - **மண் & நீர் வளங்கள்**: வளமான வண்டல் மண் மற்றும் நன்னீர் வசதி உள்ள இடங்களில் மக்கள் அடர்த்தி அதிகம்.

2. **மனிதக் காரணிகள்**:
   - **தொழில் காரணிகள்**: சுரங்கப் பகுதிகள் மற்றும் தொழில் நகரங்கள் (சோட்டா நாகபுரி பீடபூமி) வேலைவாய்ப்புக்காக மக்களை ஈர்க்கின்றன.
   - **மத & கலாச்சார காரணிகள்**: புனித நகரங்கள் (மதுரை, வாரணாசி) மக்கள் குடியிருப்புகளை ஈர்க்கின்றன.
    `.trim(),
    example_en: 'The fertile alluvial plains of River Ganges are among the most densely populated places on Earth.',
    example_ta: 'கங்கை ஆற்றின் வளமான வண்டல் சமவெளி உலகில் அதிக மக்கள் அடர்த்தி கொண்ட பகுதிகளில் ஒன்றாகும்.',
    solved_question: {
      question_en: 'Which physical factor makes river valleys highly populated?',
      question_ta: 'ஆற்றுப் பள்ளத்தாக்குகள் அதிக மக்கள் தொகை கொண்டதாக அமையக் காரணமான இயற்கைக் காரணி எது?',
      options_en: ['Fertile alluvial soil and water availability', 'Dense forest growth', 'High altitude mountain slopes', 'Heavy snowfall'],
      options_ta: ['வளமான வண்டல் மண் மற்றும் நீர் வசதி', 'அடர்ந்த காட்டு வளர்ச்சி', 'உயரமான மலைச் சரிவுகள்', 'கடுமையான பனிப்பொழிவு'],
      correct_index: 0,
      explanation_en: 'Fertile soil and freshwater supply in river valleys support human agriculture and settlements (Page 167).',
      explanation_ta: 'வளமான மண்ணும் குடிநீரும் ஆற்றுப் பள்ளத்தாக்குகளை மக்கள் குடியிருப்பாக மாற்றுகின்றன (பக்கம் 167).'
    },
    order_index: 2
  },

  // Concept 3
  {
    id: 'concept-pop-3',
    topic_id: 'topic-sat-soc-7IG3',
    title_en: 'Settlement & Types of Rural Settlements',
    title_ta: 'குடியிருப்புகள் மற்றும் கிராமக் குடியிருப்புகளின் வகைகள்',
    summary_en: 'Compact (clustered), Dispersed (scattered), Linear, Radial, and Star-shaped rural settlement patterns.',
    summary_ta: 'அடர்ந்த, சிதறிய, நேர்கோட்டு, ஆர வடிவ மற்றும் நட்சத்திர வடிவ கிராமக் குடியிருப்புகளின் அமைப்புகள்.',
    explanation_en: `
### 📌 Concept Overview (TN Samacheer Kalvi Class 7 Geography Unit 3, Pages 170–172)

1. **Definition of Settlement**:
   - A **Settlement** is a place where people build their homes and live together to carry out economic activities.

2. **Types of Rural Settlements**:
   - **Compact / Clustered Settlement**: Houses are built very close to each other in fertile river plains.
   - **Dispersed / Scattered Settlement**: Houses are spaced far apart over hills, deserts, or dense forests.

3. **Patterns of Settlement**:
   - **Linear Pattern**: Houses built along a road, railway line, river bank, or canal.
   - **Radial Pattern**: Houses built along roads radiating outwards from a central point.
   - **Star-shaped Pattern**: Formed where several roads converge at a central junction.
   - **Circular Pattern**: Houses built around a lake, pond, or tank.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம் (தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 7 புவியியல் அலகு 3, பக்கங்கள் 170–172)

1. **குடியிருப்பின் வரைவிலக்கணம்**:
   - மனிதர்கள் தங்களின் பொருளாதார நடவடிக்கைகளுக்காக வீடுகளை அமைத்து வாழும் இடமே **குடியிருப்பு** எனப்படும்.

2. **கிராமக் குடியிருப்புகளின் வகைகள்**:
   - **அடர்ந்த / குழுமிய குடியிருப்பு**: வளமான சமவெளிகளில் வீடுகள் ஒன்றுக்கொன்று மிக அருகில் நெருக்கமாகக் கட்டப்பட்டிருக்கும்.
   - **சிதறிய குடியிருப்பு**: மலைகள், பாலைவனங்கள் மற்றும் காடுகளில் வீடுகள் தூரத்தூர இடைவெளியில் அமைந்திருக்கும்.

3. **குடியிருப்பு அமைப்புகள் (Patterns)**:
   - **நேர்கோட்டு அமைப்பு (Linear)**: சாலைகள், இரயில் பாதைகள் அல்லது ஆற்றங்கரையை ஒட்டி வீடுகள் நேர்கோட்டில் அமைதல்.
   - **ஆர வடிவ அமைப்பு (Radial)**: மையப் புள்ளியிலிருந்து பிரியும் சாலைகளின் ஓரங்களில் வீடுகள் அமைதல்.
   - **வட்ட வடிவ அமைப்பு (Circular)**: ஏரி அல்லது குளத்தைச் சுற்றி வீடுகள் அமைதல்.
    `.trim(),
    example_en: 'Houses built along the East Coast Road (ECR) form a classic Linear Settlement pattern.',
    example_ta: 'கிழக்குக் கடற்கரை சாலையை (ECR) ஒட்டி அமைந்துள்ள வீடுகள் நேர்கோட்டுக் குடியிருப்புக்குச் சிறந்த சான்றாகும்.',
    solved_question: {
      question_en: 'Which type of settlement pattern is formed by houses built along a river bank or main road?',
      question_ta: 'ஆற்றங்கரை அல்லது முக்கிய சாலையின் ஓரத்தில் வீடுகள் நேர்கோட்டில் அமைந்திருக்கும் குடியிருப்பு வகை எது?',
      options_en: ['Linear Pattern', 'Circular Pattern', 'Star-shaped Pattern', 'Dispersed Pattern'],
      options_ta: ['நேர்கோட்டு அமைப்பு (Linear)', 'வட்ட வடிவ அமைப்பு', 'நட்சத்திர வடிவ அமைப்பு', 'சிதறிய குடியிருப்பு'],
      correct_index: 0,
      explanation_en: 'Settlements along roads, railways, or river banks form a Linear Pattern (Page 171).',
      explanation_ta: 'சாலை அல்லது ஆற்றங்கரையோரம் அமையும் வீடுகள் நேர்கோட்டு அமைப்பு எனப்படும் (பக்கம் 171).'
    },
    order_index: 3
  },

  // Concept 4
  {
    id: 'concept-pop-4',
    topic_id: 'topic-sat-soc-7IG3',
    title_en: 'Urban Settlements & Hierarchy',
    title_ta: 'நகர்ப்புறக் குடியிருப்புகள் மற்றும் படிநிலை',
    summary_en: 'Urbanization, Town, City, Metropolis (1M+), Megalopolis (10M+), and Megacity hierarchy.',
    summary_ta: 'நகரமயமாக்கல், நகரம், மாநகரம் (10 லட்சம்+), பெருநகரம் (1 கோடி+) மற்றும் படிநிலை.',
    explanation_en: `
### 📌 Concept Overview (TN Samacheer Kalvi Class 7 Geography Unit 3, Pages 173–175)

1. **Urban Settlement Hierarchy**:
   - **Town**: Population over 5,000 where majority engage in non-agricultural secondary/tertiary work.
   - **City**: A large urban town with specialized administration and services.
   - **Metropolis**: An urban center with a population exceeding **1 Million (10 Lakhs)** (e.g. Chennai, Madurai, Coimbatore).
   - **Megalopolis / Megacity**: A super-urban region with a population exceeding **10 Million (1 Crore)** (e.g. Mumbai, Delhi, Tokyo).

2. **Functional Classification**:
   - Administrative Towns (Capital cities like Chennai, New Delhi).
   - Industrial Towns (Jamshedpur, Tiruppur).
   - Religious/Cultural Towns (Kanchipuram, Varanasi).
   - Port Towns (Tuticorin, Chennai Port).
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம் (தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 7 புவியியல் அலகு 3, பக்கங்கள் 173–175)

1. **நகர்ப்புறக் குடியிருப்புகளின் படிநிலை**:
   - **நகரம் (Town)**: 5,000 க்கும் மேற்பட்ட மக்கள் தொகை கொண்ட பகுதி.
   - **மாநகரம் (Metropolis)**: 10 லட்சத்திற்கும் (1 Million) அதிகமான மக்கள் தொகை கொண்ட நகரம் (எ.கா: சென்னை, மதுரை).
   - **பெருநகரம் (Megalopolis / Megacity)**: 1 கோடிக்கும் (10 Million) அதிகமான மக்கள் தொகை கொண்ட மிகப்பெரிய நகர்ப்புறப் பகுதி (எ.கா: மும்பை, டெல்லி).

2. **செயல்பாட்டு வகைப்பாடு**:
   - நிர்வாக நகரங்கள் (தலைநகரங்கள்: சென்னை, டெல்லி).
   - தொழில் நகரங்கள் (திருப்பூர், ஜாம்ஷெட்பூர்).
   - துறைமுக நகரங்கள் (தூத்துக்குடி, சென்னை).
    `.trim(),
    example_en: 'Chennai is classified as a Metropolis because its population exceeds 1 Million.',
    example_ta: 'சென்னை 10 லட்சத்திற்கும் அதிகமான மக்கள் தொகையைக் கொண்டிருப்பதால் மாநகரம் (Metropolis) எனப்படுகிறது.',
    solved_question: {
      question_en: 'What is an urban center with a population exceeding 1 Million (10 Lakhs) called?',
      question_ta: '10 லட்சத்திற்கும் (1 Million) அதிகமான மக்கள் தொகை கொண்ட நகர்ப்புற மையம் எவ்வாறு அழைக்கப்படுகிறது?',
      options_en: ['Metropolis', 'Village', 'Hamlet', 'Rural Cluster'],
      options_ta: ['மாநகரம் (Metropolis)', 'கிராமம்', 'சிற்றூர்', 'குழுமிய கிராமம்'],
      correct_index: 0,
      explanation_en: 'A city with more than 1 million population is termed a Metropolis (Page 174).',
      explanation_ta: '10 லட்சத்திற்கும் அதிக மக்கள் தொகை கொண்ட நகரம் மாநகரம் (Metropolis) எனப்படும் (பக்கம் 174).'
    },
    order_index: 4
  },

  // Concept 5
  {
    id: 'concept-pop-5',
    topic_id: 'topic-sat-soc-7IG3',
    title_en: 'Demography & Migration Terms',
    title_ta: 'மக்கள் தொகையியல் கலைச்சொற்கள் மற்றும் இடப்பெயர்வு',
    summary_en: 'Birth rate, death rate, natural growth rate, push factors (poverty, drought) vs pull factors (jobs, education).',
    summary_ta: 'பிறப்பு விகிதம், இறப்பு விகிதம், இயற்கை வளர்ச்சி, தள்ளு காரணிகள் மற்றும் இழு காரணிகள்.',
    explanation_en: `
### 📌 Concept Overview (TN Samacheer Kalvi Class 7 Geography Unit 3, Pages 176–177)

1. **Demographic Terms**:
   - **Crude Birth Rate**: Number of live births per 1,000 people in a year.
   - **Crude Death Rate**: Number of deaths per 1,000 people in a year.
   - **Natural Growth Rate**: Difference between Birth Rate and Death Rate ($$\\text{Growth} = \\text{Birth Rate} - \\text{Death Rate}$$).

2. **Migration (Emigration vs Immigration)**:
   - **Migration**: Movement of people from one place to another permanently or temporarily.
   - **Push Factors**: Adverse causes forcing people to leave an origin place (poverty, drought, unemployment, civil war).
   - **Pull Factors**: Attractive features drawing people to a destination place (job opportunities, higher wages, safety, education).
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம் (தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 7 புவியியல் அலகு 3, பக்கங்கள் 176–177)

1. **மக்கள் தொகையியல் சொற்கள்**:
   - **பிறப்பு விகிதம்**: ஒரு ஆண்டில் 1,000 மக்களுக்கு பிறக்கும் குழந்தைகலின் எண்ணிக்கை.
   - **இறப்பு விகிதம்**: ஒரு ஆண்டில் 1,000 மக்களுக்கு நிகழும் இறப்புகளின் எண்ணிக்கை.
   - **இயற்கை வளர்ச்சி விகிதம்**: பிறப்பு விகிதத்திற்கும் இறப்பு விகிதத்திற்கும் இடையேயான வித்தியாசம்.

2. **இடப்பெயர்வு காரணிகள் (Migration)**:
   - **தள்ளு காரணிகள் (Push Factors)**: வறுமை, வறட்சி, வேலையின்மை போன்ற ஊரிலிருந்து மக்களை வெளியேற கட்டாயப்படுத்தும் காரணிகள்.
   - **இழு காரணிகள் (Pull Factors)**: நல்ல வேலைவாய்ப்பு, உயர் கல்வி, வசதிகள் போன்ற மக்களை நகரை நோக்கி ஈர்க்கும் காரணிகள்.
    `.trim(),
    example_en: 'High job opportunities in Chennai act as a Pull Factor for rural migrants.',
    example_ta: 'சென்னையில் உள்ள அதிக வேலைவாய்ப்புகள் கிராமப் புற மக்களை ஈர்க்கும் இழு காரணியாக செயல்படுகின்றன.',
    solved_question: {
      question_en: 'Job opportunities, good education, and higher wages in cities are examples of which migration factor?',
      question_ta: 'நகரங்களில் உள்ள வேலைவாய்ப்பு, நல்ல கல்வி மற்றும் உயர் ஊதியம் ஆகியவை இடப்பெயர்வின் எந்தக் காரணிக்கு எடுத்துக்காட்டாகும்?',
      options_en: ['Pull Factor', 'Push Factor', 'Physical Barrier', 'Natural Hazard'],
      options_ta: ['இழு காரணி (Pull Factor)', 'தள்ளு காரணி (Push Factor)', 'இயற்கைத் தடை', 'இயற்கை அபாயம்'],
      correct_index: 0,
      explanation_en: 'Favorable opportunities attracting people to a destination are Pull Factors (Page 177).',
      explanation_ta: 'மக்களை ஈர்க்கும் சாதகமான சூழல்கள் இழு காரணிகள் (Pull Factors) எனப்படும் (பக்கம் 177).'
    },
    order_index: 5
  }
];

export const POPULATION_PRACTICE_QUESTIONS: Question[] = [
  {
    id: 'q-pop-01',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-7IG3',
    concept_id: 'concept-pop-1',
    question_en: 'What is the formula to calculate population density?',
    question_ta: 'மக்கள் தொகை அடர்த்தியைக் கணக்கிடும் சூத்திரம் எது?',
    option_a_en: 'Total Population / Total Area (sq. km)',
    option_a_ta: 'மொத்த மக்கள் தொகை / மொத்த நிலப்பரப்பு (ச.கி.மீ)',
    option_b_en: 'Total Area / Total Population',
    option_b_ta: 'மொத்த நிலப்பரப்பு / மொத்த மக்கள் தொகை',
    option_c_en: 'Birth Rate - Death Rate',
    option_c_ta: 'பிறப்பு விகிதம் - இறப்பு விகிதம்',
    option_d_en: 'Total Population × Total Area',
    option_d_ta: 'மொத்த மக்கள் தொகை × மொத்த நிலப்பரப்பு',
    correct_option: 'A',
    explanation_en: 'Density = Total Population divided by Total Area.',
    explanation_ta: 'மக்கள் தொகை அடர்த்தி = மொத்த மக்கள் தொகை / மொத்த நிலப்பரப்பு.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 7 Geography Unit 3',
    source_page: 165,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-pop-02',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-7IG3',
    concept_id: 'concept-pop-1',
    question_en: 'Regions with a population density exceeding 100 persons per sq. km are categorized as:',
    question_ta: 'சதுர கிலோமீட்டருக்கு 100 நபர்களுக்கு மேல் மக்கள் தொகை அடர்த்தி கொண்ட பகுதிகள் எவ்வாறு வகைப்படுத்தப்படுகின்றன?',
    option_a_en: 'High Density Regions',
    option_a_ta: 'அதிக அடர்த்தி பகுதிகள்',
    option_b_en: 'Low Density Regions',
    option_b_ta: 'குறைந்த அடர்த்தி பகுதிகள்',
    option_c_en: 'Moderate Density Regions',
    option_c_ta: 'மிதமான அடர்த்தி பகுதிகள்',
    option_d_en: 'Uninhabited Regions',
    option_d_ta: 'மனிதரற்ற பகுதிகள்',
    correct_option: 'A',
    explanation_en: 'Areas with > 100 persons/sq.km are high density regions.',
    explanation_ta: '> 100 நபர்கள்/ச.கி.மீ கொண்ட பகுதிகள் அதிக அடர்த்தி கொண்டவை.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 7 Geography Unit 3',
    source_page: 166,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-pop-03',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-7IG3',
    concept_id: 'concept-pop-2',
    question_en: 'Which physical factor makes high mountain slopes sparsely populated?',
    question_ta: 'உயரமான மலைச் சரிவுகளில் மக்கள் தொகை குறைவாக இருக்கக் காரணமான இயற்கைக் காரணி எது?',
    option_a_en: 'Steep relief, cold climate and lack of arable land',
    option_a_ta: 'செங்குத்தான நிலத்தோற்றம், கடுமையான குளிர் மற்றும் விவசாய நிலமின்மை',
    option_b_en: 'Abundant groundwater',
    option_b_ta: 'அதிக நிலத்தடி நீர்',
    option_c_en: 'Flat plain lands',
    option_c_ta: 'சமவெளி நிலங்கள்',
    option_d_en: 'Presence of major seaports',
    option_d_ta: 'துறைமுகங்கள் அமைந்திருத்தல்',
    correct_option: 'A',
    explanation_en: 'Steep mountains have harsh climate and poor soil, resulting in low population.',
    explanation_ta: 'மலைச் சரிவுகளில் கடுமையான குளிரும் விவசாயமின்மையும் குறைந்த மக்கள் தொகைக்குக் காரணம்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 7 Geography Unit 3',
    source_page: 167,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-pop-04',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-7IG3',
    concept_id: 'concept-pop-3',
    question_en: 'Houses built closely together in fertile river plains form which type of settlement?',
    question_ta: 'வளமான ஆற்றுச் சமவெளிகளில் வீடுகள் ஒன்றுக்கொன்று மிக நெருக்கமாக அமைந்திருக்கும் குடியிருப்பு வகை எது?',
    option_a_en: 'Compact / Clustered Settlement',
    option_a_ta: 'அடர்ந்த / குழுமிய குடியிருப்பு',
    option_b_en: 'Dispersed / Scattered Settlement',
    option_b_ta: 'சிதறிய குடியிருப்பு',
    option_c_en: 'Isolated Farmhouse',
    option_c_ta: 'தனித்த பண்ணை வீடு',
    option_d_en: 'Temporary Camp',
    option_d_ta: 'தற்காலிக முகாம்',
    correct_option: 'A',
    explanation_en: 'Compact settlements develop in fertile plains where houses are built close together.',
    explanation_ta: 'வளமான சமவெளிகளில் வீடுகள் நெருக்கமாக அமைவது அடர்ந்த குடியிருப்பாகும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 7 Geography Unit 3',
    source_page: 170,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-pop-05',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-7IG3',
    concept_id: 'concept-pop-3',
    question_en: 'What pattern of settlement is formed by houses built around a lake or pond?',
    question_ta: 'ஏரி அல்லது குளத்தைச் சுற்றி வீடுகள் அமைந்திருக்கும் குடியிருப்பு அமைப்பு எது?',
    option_a_en: 'Circular Pattern',
    option_a_ta: 'வட்ட வடிவ அமைப்பு',
    option_b_en: 'Linear Pattern',
    option_b_ta: 'நேர்கோட்டு அமைப்பு',
    option_c_en: 'Triangular Pattern',
    option_c_ta: 'முக்கோண வடிவ அமைப்பு',
    option_d_en: 'Radial Pattern',
    option_d_ta: 'ஆர வடிவ அமைப்பு',
    correct_option: 'A',
    explanation_en: 'Circular settlement patterns develop surrounding water bodies like lakes or ponds.',
    explanation_ta: 'நீர்நிலைகளைச் சுற்றி அமையும் வீடுகள் வட்ட வடிவ அமைப்பு எனப்படும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 7 Geography Unit 3',
    source_page: 172,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-pop-06',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-7IG3',
    concept_id: 'concept-pop-4',
    question_en: 'What is a city with a population exceeding 1 Million (10 Lakhs) termed?',
    question_ta: '10 லட்சத்திற்கும் (1 Million) அதிகமான மக்கள் தொகை கொண்ட நகரம் எவ்வாறு அழைக்கப்படுகிறது?',
    option_a_en: 'Metropolis',
    option_a_ta: 'மாநகரம் (Metropolis)',
    option_b_en: 'Village',
    option_b_ta: 'கிராமம்',
    option_c_en: 'Town',
    option_c_ta: 'நகரம்',
    option_d_en: 'Hamlet',
    option_d_ta: 'சிற்றூர்',
    correct_option: 'A',
    explanation_en: 'A city with over 1 million population is a Metropolis.',
    explanation_ta: '10 லட்சத்திற்கு அதிகமான மக்கள் தொகை கொண்ட நகரம் மாநகரம் எனப்படும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'OFFICIAL_QUESTION_BANK',
    source_name: 'TN NMMS Official Question Bank & Class 7 Geography',
    source_page: 174,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-pop-07',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-7IG3',
    concept_id: 'concept-pop-4',
    question_en: 'Which city in Tamil Nadu is classified as a industrial town famous for textiles?',
    question_ta: 'தமிழ்நாட்டில் ஜவுளித் தொழிலுக்குப் புகழ்பெற்ற தொழில் நகரமாக வகைப்படுத்தப்படும் நகரம் எது?',
    option_a_en: 'Tiruppur',
    option_a_ta: 'திருப்பூர்',
    option_b_en: 'Ooty',
    option_b_ta: 'ஊட்டி',
    option_c_en: 'Kanyakumari',
    option_c_ta: 'கன்னியாகுமரி',
    option_d_en: 'Rameswaram',
    option_d_ta: 'இராமேஸ்வரம்',
    correct_option: 'A',
    explanation_en: 'Tiruppur is a functional industrial town specialized in textile manufacturing.',
    explanation_ta: 'திருப்பூர் ஜவுளி உற்பத்திக்கு சிறப்புப் பெற்ற தொழில் நகரமாகும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 7 Geography Unit 3',
    source_page: 175,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-pop-08',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-7IG3',
    concept_id: 'concept-pop-5',
    question_en: 'Drought, unemployment, and lack of basic amenities forcing people to leave their hometown are examples of:',
    question_ta: 'வறட்சி, வேலையின்மை மற்றும் அடிப்படை வசதியின்மை போன்ற மக்களை சொந்த ஊரிலிருந்து வெளியேற நிர்ப்பந்திப்பவை எதற்கு எடுத்துக்காட்டு?',
    option_a_en: 'Push Factors of migration',
    option_a_ta: 'இடப்பெயர்வின் தள்ளு காரணிகள் (Push Factors)',
    option_b_en: 'Pull Factors of migration',
    option_b_ta: 'இடப்பெயர்வின் இழு காரணிகள் (Pull Factors)',
    option_c_en: 'Urban Planning',
    option_c_ta: 'நகர்ப்புறத் திட்டமிடல்',
    option_d_en: 'High Fertility Rate',
    option_d_ta: 'அதிக கருவுறுதல் விகிதம்',
    correct_option: 'A',
    explanation_en: 'Unfavorable conditions pushing people away from an origin are Push Factors.',
    explanation_ta: 'மக்களை வெளியேறக் கட்டாயப்படுத்தும் சாதகமற்ற சூழல்கள் தள்ளு காரணிகள் எனப்படும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 7 Geography Unit 3',
    source_page: 176,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-pop-09',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-7IG3',
    concept_id: 'concept-pop-5',
    question_en: 'What is the natural growth rate of population calculated as?',
    question_ta: 'இயற்கையான மக்கள் தொகை வளர்ச்சி விகிதம் எவ்வாறு கணக்கிடப்படுகிறது?',
    option_a_en: 'Crude Birth Rate - Crude Death Rate',
    option_a_ta: 'பிறப்பு விகிதம் - இறப்பு விகிதம்',
    option_b_en: 'Birth Rate + Death Rate',
    option_b_ta: 'பிறப்பு விகிதம் + இறப்பு விகிதம்',
    option_c_en: 'Immigration × Emigration',
    option_c_ta: 'உள் இடப்பெயர்வு × வெளி இடப்பெயர்வு',
    option_d_en: 'Total Population / 100',
    option_d_ta: 'மொத்த மக்கள் தொகை / 100',
    correct_option: 'A',
    explanation_en: 'Natural Growth Rate = Birth Rate minus Death Rate.',
    explanation_ta: 'இயற்கை வளர்ச்சி விகிதம் = பிறப்பு விகிதம் - இறப்பு விகிதம்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 7 Geography Unit 3',
    source_page: 176,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-pop-10',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-7IG3',
    concept_id: 'concept-pop-3',
    question_en: 'Where do dispersed or scattered settlements usually develop?',
    question_ta: 'சிதறிய குடியிருப்புகள் வழக்கமாக எங்கு உருவாகின்றன?',
    option_a_en: 'Hilly terrains, deserts, and thick forest areas',
    option_a_ta: 'மலைப் பகுதிகள், பாலைவனங்கள் மற்றும் அடர்ந்த காட்டுப் பகுதிகள்',
    option_b_en: 'Fertile river delta plains',
    option_b_ta: 'வளமான ஆற்று டெல்டா சமவெளிகள்',
    option_c_en: 'Capital city centers',
    option_c_ta: 'தலைநகர மையங்கள்',
    option_d_en: 'Major seaport harbors',
    option_d_ta: 'பிரதான துறைமுகங்கள்',
    correct_option: 'A',
    explanation_en: 'Dispersed settlements are scattered across hills, deserts, or forests.',
    explanation_ta: 'மலைகள் மற்றும் பாலைவனங்களில் வீடுகள் தூரத்தூர சிதறியமைந்து காணப்படும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 7 Geography Unit 3',
    source_page: 171,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-pop-11',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-7IG3',
    concept_id: 'concept-pop-4',
    question_en: 'A super-urban region with a population exceeding 10 Million (1 Crore) is called:',
    question_ta: '1 கோடிக்கும் (10 Million) அதிகமான மக்கள் தொகை கொண்ட மிகப்பெரிய நகர்ப்புறப் பகுதி எவ்வாறு அழைக்கப்படுகிறது?',
    option_a_en: 'Megalopolis / Megacity',
    option_a_ta: 'பெருநகரம் (Megalopolis / Megacity)',
    option_b_en: 'Town',
    option_b_ta: 'நகரம்',
    option_c_en: 'Village',
    option_c_ta: 'கிராமம்',
    option_d_en: 'Suburb',
    option_d_ta: 'புறநகர்',
    correct_option: 'A',
    explanation_en: 'An urban area exceeding 10 million population is a Megacity/Megalopolis.',
    explanation_ta: '1 கோடிக்கும் அதிக மக்கள் தொகை கொண்ட பகுதி பெருநகரம் (Megacity) எனப்படும்.',
    difficulty: 'MEDIUM',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 7 Geography Unit 3',
    source_page: 174,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-pop-12',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-7IG3',
    concept_id: 'concept-pop-2',
    question_en: 'Why is Antarctica categorized as a low density human population zone?',
    question_ta: 'அண்டார்டிகா மனித மக்கள் தொகை குறைந்த மண்டலமாக வகைப்படுத்தப்படக் காரணம் என்ன?',
    option_a_en: 'Extremely cold freezing polar climate covered with thick ice caps',
    option_a_ta: 'அடர்ந்த பனிப்பாறைகளால் மூடப்பட்ட கடுமையான துருவக் குளிர் காலநிலை',
    option_b_en: 'Frequent desert sandstorms',
    option_b_ta: 'அடிக்கடி ஏற்படும் பாலைவன மணற்புயல்',
    option_c_en: 'Lack of oceanic seaports',
    option_c_ta: 'கடல் துறைமுகங்கள் இல்லாமை',
    option_d_en: 'Heavy tropical monsoon rain',
    option_d_ta: 'அதிக வெப்பமண்டல மழை',
    correct_option: 'A',
    explanation_en: 'Extreme polar freezing temperatures make Antarctica hostile for permanent human habitation.',
    explanation_ta: 'கடுமையான துருவக் குளிரும் பனியும் நிரந்தரக் குடியிருப்பைத் தடுக்கிறது.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 7 Geography Unit 3',
    source_page: 166,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-pop-13',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-7IG3',
    concept_id: 'concept-pop-3',
    question_en: 'When roads converge at a central junction from multiple directions, what settlement pattern is formed?',
    question_ta: 'பல திசைகளிலிருந்தும் சாலைகள் ஒரு மையச் சந்திப்பில் வந்து இணையும் போது உருவாகும் குடியிருப்பு வடிவம் எது?',
    option_a_en: 'Star-shaped Pattern',
    option_a_ta: 'நட்சத்திர வடிவ அமைப்பு (Star-shaped)',
    option_b_en: 'Linear Pattern',
    option_b_ta: 'நேர்கோட்டு அமைப்பு',
    option_c_en: 'Circular Pattern',
    option_c_ta: 'வட்ட வடிவ அமைப்பு',
    option_d_en: 'Gridiron Pattern',
    option_d_ta: 'கட்ட அமைப்புக் குடியிருப்பு',
    correct_option: 'A',
    explanation_en: 'Converging roads at a central point give rise to Star-shaped settlements.',
    explanation_ta: 'மையச் சந்திப்பில் இணையும் சாலைகளால் நட்சத்திர வடிவக் குடியிருப்பு உருவாகிறது.',
    difficulty: 'MEDIUM',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 7 Geography Unit 3',
    source_page: 172,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-pop-14',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-7IG3',
    concept_id: 'concept-pop-4',
    question_en: 'New Delhi and Chennai are classified as which functional town type?',
    question_ta: 'புதுடெல்லி மற்றும் சென்னை ஆகியவை எந்தச் செயல்பாட்டு நகர வகையாகப் பிரிக்கப்படுகின்றன?',
    option_a_en: 'Administrative Towns',
    option_a_ta: 'நிர்வாக நகரங்கள் (Administrative Towns)',
    option_b_en: 'Mining Towns',
    option_b_ta: 'சுரங்க நகரங்கள்',
    option_c_en: 'Resort Towns',
    option_c_ta: 'சுற்றுலா ஓய்வு நகரங்கள்',
    option_d_en: 'Agricultural Villages',
    option_d_ta: 'விவசாய கிராமங்கள்',
    correct_option: 'A',
    explanation_en: 'Capital cities housing government headquarters are Administrative Towns.',
    explanation_ta: 'அரசுத் தலைமையகங்களைக் கொண்ட தலைநகரங்கள் நிர்வாக நகரங்கள் எனப்படும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 7 Geography Unit 3',
    source_page: 175,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 'q-pop-15',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-7IG3',
    concept_id: 'concept-pop-5',
    question_en: 'What does Crude Birth Rate measure?',
    question_ta: 'பிறப்பு விகிதம் (Crude Birth Rate) எதனைக் கணக்கிடுகிறது?',
    option_a_en: 'Number of live births per 1,000 people in a year',
    option_a_ta: 'ஒரு ஆண்டில் 1,000 மக்களுக்கு பிறக்கும் உயிருள்ள குழந்தைகளின் எண்ணிக்கை',
    option_b_en: 'Number of deaths per 100 people',
    option_b_ta: '100 மக்களுக்கு ஏற்படும் இறப்புகள்',
    option_c_en: 'Total children in a school',
    option_c_ta: 'பள்ளியில் உள்ள மொத்த குழந்தைகள்',
    option_d_en: 'Percentage of urban growth',
    option_d_ta: 'நகர்ப்புற வளர்ச்சியின் சதவீதம்',
    correct_option: 'A',
    explanation_en: 'Birth rate is the number of live births per 1,000 population per year.',
    explanation_ta: 'பிறப்பு விகிதம் என்பது 1,000 மக்களுக்கு பிறக்கும் குழந்தைகளின் எண்ணிக்கையாகும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'TEXTBOOK_BASED',
    source_name: 'TN Samacheer Kalvi Class 7 Geography Unit 3',
    source_page: 176,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  }
];
