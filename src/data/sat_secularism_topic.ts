import type { Topic, Concept, Question } from '../types';

/**
 * PUM NMMS CHAMPION — WEEKLY FOCUS TOPIC: 8.C.3 UNDERSTANDING SECULARISM
 * Primary Source: Tamil Nadu Samacheer Kalvi Class 8 Social Science Textbook
 * Civics Unit 3 (Pages 198–204)
 */

export const SECULARISM_TOPIC: Topic = {
  id: 'topic-sat-soc-secularism',
  subject_id: 'subj-social',
  category_id: 'civics',
  title_en: '8.C.3 — Understanding Secularism',
  title_ta: '8.C.3 — மதச்சார்பின்மையைப் புரிந்துகொள்ளுதல்',
  description_en: 'Meaning, historical origin, constitutional provisions (Articles 15-28, 42nd Amendment), objectives, and importance of secularism in India.',
  description_ta: 'மதச்சார்பின்மையின் பொருள், தோற்றம், இந்திய அரசியலமைப்புச் சட்டப் பிரிவுகள் (15-28, 42வது திருத்தம்) மற்றும் முக்கியத்துவம்.',
  order_index: 15,
  priority: 'HIGH_PRIORITY',
  confidence: 'HIGH',
  syllabus_status: 'EXPLICIT_OFFICIAL',
  years_found: [2019, 2021, 2022, 2023, 2024],
  frequency: 'HIGH',
  source_evidence: 'TN Samacheer Kalvi Class 8 Social Science Civics Unit 3 (Pages 198–204)',
  concepts_count: 5,
  questions_count: 20,
  official_questions_count: 2,
  practice_questions_count: 18,
  difficulty_level: 'MEDIUM',
  is_published: true
};

export const SECULARISM_CONCEPTS: Concept[] = [
  // --- CONCEPT 1 ---
  {
    id: 'concept-secularism-1',
    topic_id: 'topic-sat-soc-secularism',
    title_en: 'Meaning and Origin of Secularism',
    title_ta: 'மதச்சார்பின்மையின் பொருள் மற்றும் தோற்றம்',
    summary_en: 'Origin of the term "Secularism" by George Jacob Holyoake in 1851, derived from Latin "Saeculum" (an age/this world).',
    summary_ta: '1851 இல் ஜார்ஜ் ஜேக்கப் ஹோலியோக் என்பவரால் "செக்யூலரிசம்" என்ற சொல் உருவாக்கப்பட்டது; லத்தீன் சொல் "Saeculum" இலிருந்து பெறப்பட்டது.',
    explanation_en: `
### 📌 Concept Overview (TN Samacheer Kalvi Class 8 Civics Unit 3, Page 198)

1. **Origin of the Term**:
   - The word **"Secularism"** was coined by British newspaper editor **George Jacob Holyoake** in **1851**.
   - It is derived from the Latin word **"Saeculum"**, which means **"an age"** or **"this world"** (spirit of an age).

2. **Definition of Secularism**:
   - Secularism is an attitude or policy of **non-interference of religion** in state affairs.
   - It means that the State does not privilege or discriminate against any religion.
   - All religions are treated equally with respect and impartiality by the Government.

3. **Key Principle**:
   - "State and Religion are two separate spheres." The state is governed by constitutional law, not religious doctrines.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம் (தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 8 குடிமையியல் அலகு 3, பக்கம் 198)

1. **சொல்லின் தோற்றம்**:
   - **"மதச்சார்பின்மை" (Secularism)** என்ற சொல்லை **1851** ஆம் ஆண்டில் பிரிட்டிஷ் பத்திரிகையாளர் **ஜார்ஜ் ஜேக்கப் ஹோலியோக்** (George Jacob Holyoake) என்பவர் உருவாக்கினார்.
   - இச்சொல் **"Saeculum"** என்ற லத்தீன் சொல்லிலிருந்து பெறப்பட்டது. இதன் பொருள் **"ஒரு காலம்"** அல்லது **"இவ்வுலகம்"** (இவ்வுலக வாழ்க்கை) என்பதாகும்.

2. **வரையறை**:
   - அரசு நிர்வாகத்தில் மதம் தலையிடாமல் இருப்பதும், அரசு எந்த ஒரு குறிப்பிட்ட மதத்தையும் ஆதரிக்காமலும் எதிர்க்காமலும் நடுநிலை வகிப்பதுமே மதச்சார்பின்மையாகும்.
   - அனைத்து மதத்தினரையும் அரசு சமமாக நடத்தி மதிக்கிறது.

3. **முக்கியக் கொள்கை**:
   - "அரசியலும் மதமும் இரு வேறு பிரிவுகள்." அரசு மதநூல்களால் அல்லாமல் அரசியலமைப்புச் சட்டத்தால் நிர்வகிக்கப்படுகிறது.
    `.trim(),
    example_en: 'In India, government offices, courts, and government schools do not display or promote any single religious worship.',
    example_ta: 'இந்தியாவில் அரசு அலுவலகங்கள், நீதிமன்றங்கள் மற்றும் அரசுப் பள்ளிகளில் எந்தவொரு குறிப்பிட்ட மத வழிபாடும் முன்னெடுக்கப்படுவதில்லை.',
    solved_question: {
      question_en: 'Who coined the term "Secularism" in the year 1851?',
      question_ta: '1851 ஆம் ஆண்டில் "மதச்சார்பின்மை" (Secularism) என்ற சொல்லை உருவாக்கியவர் யார்?',
      options_en: ['George Jacob Holyoake', 'Rabindranath Tagore', 'Mahatma Gandhi', 'Dr. B.R. Ambedkar'],
      options_ta: ['ஜார்ஜ் ஜேக்கப் ஹோலியோக்', 'ரவீந்திரநாத் தாகூர்', 'மகாத்மா காந்தி', 'டாக்டர் பி.ஆர். அம்பேத்கர்'],
      correct_index: 0,
      explanation_en: 'British editor George Jacob Holyoake coined the term Secularism in 1851 (Class 8 Civics Page 198).',
      explanation_ta: 'பிரிட்டிஷ் பத்திரிகையாளர் ஜார்ஜ் ஜேக்கப் ஹோலியோக் 1851 இல் இச்சொல்லை உருவாக்கினார் (பக்கம் 198).'
    },
    order_index: 1
  },

  // --- CONCEPT 2 ---
  {
    id: 'concept-secularism-2',
    topic_id: 'topic-sat-soc-secularism',
    title_en: 'Historical Tradition of Secularism in India',
    title_ta: 'இந்தியாவில் மதச்சார்பின்மையின் வரலாற்றுப் பின்னணி',
    summary_en: 'Ashoka Rock Edict XII, Kharavela inscriptions, Akbar Din-i-Ilahi & Ibadat Khana, Mahatma Gandhi quotes.',
    summary_ta: 'அசோகரின் 12வது பாறை ஆணை, காரவேலன் கல்வெட்டு, அக்பரின் தீன்-இலாஹி & இபாதத் கானா, மகாத்மா காந்தி கருத்துக்கள்.',
    explanation_en: `
### 📌 Concept Overview (TN Samacheer Kalvi Class 8 Civics Unit 3, Page 199)

1. **Ancient & Medieval Evidence**:
   - **Emperor Ashoka (3rd Century BCE)**: In his **Rock Edict XII**, Ashoka appealed that the state would not punish any religious sect, declaring equal honor to all religions.
   - **King Kharavela of Kalinga**: Rock inscriptions show patronage and tolerance to diverse faiths.
   - **Mughal Emperor Akbar (16th Century CE)**: Proposed **Din-i-Ilahi** (Divine Faith) and constructed **Ibadat Khana** (House of Worship) at Fatehpur Sikri to discuss religious truths with scholars of all faiths.

2. **Modern Indian Thinkers**:
   - **Mahatma Gandhi**: Stated that *"Religion is a personal matter which should have no place in politics or state affairs."*
   - **Poet Iqbal**: Wrote *"Religion does not teach us animosity towards one another."*
   - **Rabindranath Tagore**: Emphasized universal humanism beyond narrow religious boundaries.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம் (தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 8 குடிமையியல் அலகு 3, பக்கம் 199)

1. **பண்டைய & இடைக்கால ஆதாரங்கள்**:
   - **பேரரசர் அசோகர் (கி.மு. 3 ஆம் நூற்றாண்டு)**: தனது **12 ஆம் பாறை ஆணையில்**, அரசு அனைத்து மதப் பிரிவினரையும் சமமாக மதிக்க வேண்டும் என்றும் மதச் சகிப்புத்தன்மையையும் வலியுறுத்தினார்.
   - **கலிங்கத்து காரவேலன் கல்வெட்டுகள்**: அனைத்து மதத்தினரையும் ஆதரிக்கும் மதச்சார்பற்ற கொள்கையை வெளிப்படுத்துகின்றன.
   - **முகலாயப் பேரரசர் அக்பர் (கி.பி. 16 ஆம் நூற்றாண்டு)**: **தீன்-இலாஹி** (தெய்வீக நம்பிக்கை) என்ற கொள்கையை உருவாக்கி, பதேபூர் சிக்கிரியில் **இபாதத் கானா** (தொழுதுகூடம்) அமைத்து அனைத்து மத அறிஞர்களுடனும் கலந்துரையாடினார்.

2. **நவீன இந்திய சிந்தனையாளர்கள்**:
   - **மகாத்மா காந்தி**: *"மதம் என்பது தனிப்பட்ட விஷயம்; அதில் அரசியலுக்கோ அரசுக்கோ இடமில்லை"* என்று கூறினார்.
   - **கவிஞர் இக்பால்**: *"மதம் நமக்கு பகைமையைக் கற்றுத்தரவில்லை"* என்று பாடினார்.
    `.trim(),
    example_en: 'Ashoka Rock Edict XII is the earliest official royal proclamation of religious tolerance in India.',
    example_ta: 'அசோகரின் 12வது பாறை ஆணை இந்தியாவில் மதச் சகிப்புத்தன்மையை அறிவித்த முதல் அரச ஆணையாகும்.',
    solved_question: {
      question_en: 'Which Mughal Emperor constructed the "Ibadat Khana" to discuss religious doctrines?',
      question_ta: 'மதக் கோட்பாடுகளை விவாதிக்க "இபாதத் கானா" மன்றத்தை அமைத்த முகலாய மன்னர் யார்?',
      options_en: ['Babur', 'Akbar', 'Shah Jahan', 'Aurangzeb'],
      options_ta: ['பாபர்', 'அக்பர்', 'ஷாஜஹான்', 'ஔரங்கசீப்'],
      correct_index: 1,
      explanation_en: 'Emperor Akbar constructed the Ibadat Khana at Fatehpur Sikri (Class 8 Civics Page 199).',
      explanation_ta: 'பேரரசர் அக்பர் பதேபூர் சிக்கிரியில் இபாதத் கானாவை அமைத்தார் (பக்கம் 199).'
    },
    order_index: 2
  },

  // --- CONCEPT 3 ---
  {
    id: 'concept-secularism-3',
    topic_id: 'topic-sat-soc-secularism',
    title_en: 'Constitutional Provisions (Articles 15-28 & 42nd Amendment)',
    title_ta: 'அரசியலமைப்புச் சட்டப் பிரிவுகள் மற்றும் 42வது திருத்தம்',
    summary_en: '42nd Amendment 1976 added "Secular" to Preamble. Key Fundamental Rights Articles 15, 16, 25, 26, 27, 28.',
    summary_ta: '1976 ஆம் ஆண்டின் 42வது அரசியலமைப்புத் திருத்தம் முகப்புரையில் "மதச்சார்பற்ற" என்ற சொல்லைச் சேர்த்தது. முக்கிய சட்டப்பிரிவுகள் 15, 16, 25, 26, 27, 28.',
    explanation_en: `
### 📌 Concept Overview (TN Samacheer Kalvi Class 8 Civics Unit 3, Pages 200–201)

1. **42nd Constitutional Amendment Act of 1976**:
   - The word **"SECULAR"** was inserted into the **Preamble** of the Constitution of India in **1976** through the **42nd Amendment Act**.
   - Preamble declares India as a *"Sovereign Socialist Secular Democratic Republic"*.

2. **Key Fundamental Right Articles**:
   - **Article 15**: Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth.
   - **Article 16**: Equality of opportunity for all citizens in matters relating to public employment regardless of religion.
   - **Article 25(1)**: Freedom of conscience and the right to freely profess, practice and propagate any religion.
   - **Article 26**: Freedom to manage religious affairs (establishing religious institutions).
   - **Article 27**: Freedom from payment of taxes for the promotion or maintenance of any particular religion (State cannot levy taxes for religion).
   - **Article 28**: Freedom as to attendance at religious instruction or worship in state-aided educational institutions.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம் (தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 8 குடிமையியல் அலகு 3, பக்கங்கள் 200–201)

1. **1976 ஆம் ஆண்டின் 42வது அரசியலமைப்புச் சட்டத் திருத்தம்**:
   - **1976** இல் கொண்டுவரப்பட்ட **42வது சட்டத் திருத்தத்தின்** மூலம் இந்திய அரசியலமைப்பின் **முகப்புரையில் (Preamble)** **"மதச்சார்பற்ற" (SECULAR)** என்ற சொல் சேர்க்கப்பட்டது.
   - இந்தியாவை *"இறையாண்மை கொண்ட, சமதர்ம, மதச்சார்பற்ற, ஜனநாயக, குடியரசு"* என பிரகடனம் செய்கிறது.

2. **முக்கிய அடிப்படை உரிமைச் சட்டப் பிரிவுகள்**:
   - **பிரிவு 15**: மதம், இனம், சாதி, பாலினம் அல்லது பிறந்த இடம் ஆகியவற்றின் அடிப்படையில் பாகுபாடு காட்டுவதைத் தடை செய்கிறது.
   - **பிரிவு 16**: அரசு வேலைவாய்ப்புகளில் அனைவருக்கும் சம வாய்ப்பு அளிக்கிறது.
   - **பிரிவு 25(1)**: எந்தவொரு மதத்தையும் ஏற்கவும், பின்பற்றவும், பரப்பவும் உரிமை வழங்குகிறது.
   - **பிரிவு 26**: மத விவகாரங்களை நிர்வகிக்கும் சுதந்திரம் அளிக்கிறது.
   - **பிரிவு 27**: எந்தவொரு குறிப்பிட்ட மதத்தையும் வளர்ப்பதற்காக வரிகள் செலுத்துவதிலிருந்து விலக்கு அளிக்கிறது (அரசு மத வரி வசூலிக்காது).
   - **பிரிவு 28**: அரசு உதவிபெறும் கல்வி நிறுவனங்களில் மத போதனைகளில் பங்கேற்பதற்கான விலக்கு உரிமை அளிக்கிறது.
    `.trim(),
    example_en: 'Article 27 guarantees that the government cannot collect a special tax from citizens to build a religious temple or mosque.',
    example_ta: 'பிரிவு 27 இன் படி அரசு கோயில் அல்லது பள்ளிவாசல் கட்டக் குடிமக்களிடம் மத வரி வசூலிக்க முடியாது.',
    solved_question: {
      question_en: 'Which Constitutional Amendment Act added the word "SECULAR" to the Preamble of the Indian Constitution in 1976?',
      question_ta: '1976 ஆம் ஆண்டில் இந்திய அரசியலமைப்பின் முகப்புரையில் "மதச்சார்பற்ற" என்ற சொல்லைச் சேர்த்த சட்டத் திருத்தம் எது?',
      options_en: ['42nd Amendment Act', '44th Amendment Act', '73rd Amendment Act', '86th Amendment Act'],
      options_ta: ['42வது சட்டத் திருத்தம்', '44வது சட்டத் திருத்தம்', '73வது சட்டத் திருத்தம்', '86வது சட்டத் திருத்தம்'],
      correct_index: 0,
      explanation_en: 'The 42nd Constitutional Amendment Act of 1976 added the word SECULAR to the Preamble (Class 8 Civics Page 200).',
      explanation_ta: '1976 இன் 42வது சட்டத் திருத்தம் முகப்புரையில் மதச்சார்பற்ற என்ற சொல்லைச் சேர்த்தது (பக்கம் 200).'
    },
    order_index: 3
  },

  // --- CONCEPT 4 ---
  {
    id: 'concept-secularism-4',
    topic_id: 'topic-sat-soc-secularism',
    title_en: 'Objectives & Features of Indian Secularism (Sarva Dharma Sambhava)',
    title_ta: 'இந்திய மதச்சார்பின்மையின் லட்சியங்கள் மற்றும் சிறப்பியல்புகள்',
    summary_en: 'Sarva Dharma Sambhava (Equal respect to all religions). Difference between Western and Indian Secularism.',
    summary_ta: 'சர்வ தர்ம சமபாவா (அனைத்து மதங்களுக்கும் சம மரியாதை). மேலைநாட்டு மற்றும் இந்திய மதச்சார்பின்மையின் வேறுபாடு.',
    explanation_en: `
### 📌 Concept Overview (TN Samacheer Kalvi Class 8 Civics Unit 3, Page 202)

1. **Core Objectives of Indian Secularism**:
   - One religious community does not dominate another.
   - Some members do not dominate other members of the same religious community.
   - The State does not enforce any particular religion nor take away the religious freedom of individuals.

2. **Sarva Dharma Sambhava**:
   - Indian secularism is rooted in the Sanskrit philosophy **"Sarva Dharma Sambhava"**, meaning **"equal respect to all religions"**.

3. **Western vs. Indian Secularism**:
   - **Western Secularism**: Strict and rigid "wall of separation" between church and state (Complete non-interference).
   - **Indian Secularism**: Principled distance where the state maintains equal tolerance toward all religions, but can intervene in religious customs if they violate fundamental rights, public health, or morality (e.g. Abolition of Sati, Untouchability).
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம் (தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 8 குடிமையியல் அலகு 3, பக்கம் 202)

1. **இந்திய மதச்சார்பின்மையின் முக்கிய லட்சியங்கள்**:
   - ஒரு மதக் குழு மற்றொரு மதக் குழுவை ஆதிக்கம் செலுத்தாமல் இருத்தல்.
   - ஒரே மதத்தைச் சேர்ந்த ஒரு சிலர் அதே மதத்தின் மற்ற உறுப்பினர்களை ஆதிக்கம் செலுத்தாமல் இருத்தல்.
   - அரசு எந்தவொரு குறிப்பிட்ட மதத்தையும் கட்டாயப்படுத்தாமலும், தனிநபர்களின் மதச் சுதந்திரத்தைப் பறிக்காமலும் இருத்தல்.

2. **சர்வ தர்ம சமபாவா**:
   - இந்திய மதச்சார்பின்மை **"சர்வ தர்ம சமபாவா"** (அனைத்து மதங்களுக்கும் சம மரியாதை) என்ற சமஸ்கிருதத் தத்துவத்தில் வேரூன்றியுள்ளது.

3. **மேலைநாட்டு vs இந்திய மதச்சார்பின்மை**:
   - **மேலைநாட்டு மதச்சார்பின்மை**: அரசிற்கும் மதத்திற்குமிடையே முற்றிலும் கடுமையான பிரிவு (கடைப்பிடிக்கும் சுவர்).
   - **இந்திய மதச்சார்பின்மை**: கொள்கை ரீதியிலான சமமான இடைவெளி; அரசு அனைத்து மதங்களையும் சமமாக மதிக்கும், ஆனால் மனித உரிமை மீறல்கள் (எ.கா. உடன்கட்டை ஏறுதல், தீண்டாமை) நிகழும் போது தலையிட்டுச் சீர்திருத்தும்.
    `.trim(),
    example_en: 'The Indian government banned the social evil practice of Untouchability despite religious claims.',
    example_ta: 'மத சாக்குப்போக்குகளைத் தாண்டி தீண்டாமை என்ற சமூகக் கொடுமையை இந்திய அரசு சட்டப்படி தடை செய்தது.',
    solved_question: {
      question_en: 'What is the meaning of the Sanskrit term "Sarva Dharma Sambhava"?',
      question_ta: '"சர்வ தர்ம சமபாவா" என்ற சமஸ்கிருதத் தொடரின் பொருள் என்ன?',
      options_en: ['Equal respect to all religions', 'Domination of one religion', 'Rejection of all religions', 'State sponsored religion'],
      options_ta: ['அனைத்து மதங்களுக்கும் சம மரியாதை', 'ஒரு மதத்தின் ஆதிக்கம்', 'அனைத்து மதங்களையும் நிராகரித்தல்', 'அரசு மதத்தை ஆதரித்தல்'],
      correct_index: 0,
      explanation_en: 'Sarva Dharma Sambhava means equal respect to all religions (Class 8 Civics Page 202).',
      explanation_ta: 'சர்வ தர்ம சமபாவா என்பது அனைத்து மதங்களுக்கும் சம மரியாதை அளிப்பதாகும் (பக்கம் 202).'
    },
    order_index: 4
  },

  // --- CONCEPT 5 ---
  {
    id: 'concept-secularism-5',
    topic_id: 'topic-sat-soc-secularism',
    title_en: 'Why Secularism is Essential in India',
    title_ta: 'இந்தியாவில் ஏன் மதச்சார்பின்மை அவசியம்?',
    summary_en: 'Preventing tyranny of majority religion, protecting freedom of conscience, maintaining national integration.',
    summary_ta: 'பெரும்பான்மை மதத்தின் ஆதிக்கத்தைத் தடுத்தல், மனசாட்சி சுதந்திரத்தைப் பாதுகாத்தல், தேசிய ஒருமைப்பாட்டைப் பேணுதல்.',
    explanation_en: `
### 📌 Concept Overview (TN Samacheer Kalvi Class 8 Civics Unit 3, Page 203)

1. **Reasons Why Secularism is Necessary**:
   - **Protection of Minorities**: Prevents the majority religious group from using state power to discriminate against or persecute religious minorities.
   - **Freedom of Conscience**: Protects the right of individuals to embrace another religion or leave their current religion.
   - **Communal Harmony**: Fosters unity in diversity in a multi-religious country like India.
   - **Democratic Governance**: Ensures that the nation is governed by rule of law and fundamental human rights rather than religious dogmas.
    `.trim(),
    explanation_ta: `
### 📌 பாட விளக்கம் (தமிழ்நாடு சமச்சீர் கல்வி வகுப்பு 8 குடிமையியல் அலகு 3, பக்கம் 203)

1. **மதச்சார்பின்மை அவசியமானதற்கான காரணங்கள்**:
   - **சிறுபான்மையினர் பாதுகாப்பு**: பெரும்பான்மை மதத்தினர் அரசு அதிகாரத்தைப் பயன்படுத்தி சிறுபான்மையினரை ஒடுக்குவதைத் தடுக்கிறது.
   - **மனசாட்சி சுதந்திரம்**: தனிநபர்கள் தங்கள் மதத்தை மாற்றிக்கொள்ளவோ அல்லது எந்த மதத்தையும் பின்பற்றாமல் இருக்கவோ உள்ள உரிமையைப் பாதுகாக்கிறது.
   - **சமுதாய நல்லிணக்கம்**: இந்தியா போன்ற பன்முகத்தன்மை கொண்ட நாட்டில் மத நல்லிணக்கத்தையும் தேசிய ஒருமைப்பாட்டையும் வளர்க்கிறது.
   - **ஜனநாயக ஆட்சி**: நாடு மத விதிகளால் அல்லாமல் சட்டத்தின் ஆட்சியால் நிர்வகிக்கப்படுவதை உறுதி செய்கிறது.
    `.trim(),
    example_en: 'Secularism allows every citizen of India to celebrate their festival freely without state interference.',
    example_ta: 'மதச்சார்பின்மை இந்தியாவின் ஒவ்வொரு குடிமகனும் தங்கள் பண்டிகைகளை அரசின் தலையீடின்றி சுதந்திரமாகக் கொண்டாட வழிவகுக்கிறது.',
    solved_question: {
      question_en: 'Which of the following is a primary objective of secularism in India?',
      question_ta: 'பின்வருவனவற்றுள் இந்தியாவில் மதச்சார்பின்மையின் முதன்மை நோக்கம் எது?',
      options_en: ['Maintaining national unity and religious harmony', 'Promoting a state religion', 'Abolishing religious holidays', 'Restricting minority worship'],
      options_ta: ['தேசிய ஒருமைப்பாட்டையும் மத நல்லிணக்கத்தையும் பேணுதல்', 'அரசு மதத்தை விளம்பரப்படுத்துதல்', 'மத விடுமுறைகளை ரத்து செய்தல்', 'சிறுபான்மையினர் வழிபாட்டைத் தடுத்தல்'],
      correct_index: 0,
      explanation_en: 'Maintaining national unity and communal harmony is the primary objective of Indian secularism (Class 8 Civics Page 203).',
      explanation_ta: 'தேசிய ஒருமைப்பாட்டையும் நல்லிணக்கத்தையும் பேணுவதே மதச்சார்பின்மையின் பிரதான நோக்கமாகும் (பக்கம் 203).'
    },
    order_index: 5
  }
];

export const SECULARISM_PRACTICE_QUESTIONS: Question[] = [
  // Q1
  {
    id: 'q-secularism-01',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-1',
    question_en: 'In which year was the term "Secularism" coined by George Jacob Holyoake?',
    question_ta: 'ஜார்ஜ் ஜேக்கப் ஹோலியோக் என்பவரால் "மதச்சார்பின்மை" (Secularism) என்ற சொல் எந்த ஆண்டில் உருவாக்கப்பட்டது?',
    option_a_en: '1851',
    option_a_ta: '1851',
    option_b_en: '1857',
    option_b_ta: '1857',
    option_c_en: '1947',
    option_c_ta: '1947',
    option_d_en: '1950',
    option_d_ta: '1950',
    correct_option: 'A',
    explanation_en: 'George Jacob Holyoake coined the term Secularism in 1851.',
    explanation_ta: '1851 ஆம் ஆண்டில் ஜார்ஜ் ஜேக்கப் ஹோலியோக் இச்சொல்லை உருவாக்கினார்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 198,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q2
  {
    id: 'q-secularism-02',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-1',
    question_en: 'The English word "Secularism" is derived from which Latin word?',
    question_ta: '"செக்யூலரிசம்" என்ற ஆங்கிலச் சொல் எந்த லத்தீன் சொல்லிலிருந்து பெறப்பட்டது?',
    option_a_en: 'Saeculum',
    option_a_ta: 'Saeculum',
    option_b_en: 'Civitas',
    option_b_ta: 'Civitas',
    option_c_en: 'Polis',
    option_c_ta: 'Polis',
    option_d_en: 'Lex',
    option_d_ta: 'Lex',
    correct_option: 'A',
    explanation_en: 'Derived from Latin word "Saeculum" meaning "an age" or "this world".',
    explanation_ta: 'லத்தீன் சொல்லான "Saeculum" என்பதிலிருந்து பெறப்பட்டது; இதன் பொருள் "ஒரு காலம்" அல்லது "இவ்வுலகம்".',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 198,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q3
  {
    id: 'q-secularism-03',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-2',
    question_en: 'In which Rock Edict did Emperor Ashoka declare equal respect and tolerance for all religious sects?',
    question_ta: 'பேரரசர் அசோகர் தனது எந்தப் பாறை ஆணையில் அனைத்து மதப் பிரிவினருக்கும் சம மரியாதையையும் சகிப்புத்தன்மையையும் அறிவித்தார்?',
    option_a_en: 'Rock Edict XII',
    option_a_ta: '12 ஆம் பாறை ஆணை',
    option_b_en: 'Rock Edict I',
    option_b_ta: '1 ஆம் பாறை ஆணை',
    option_c_en: 'Rock Edict V',
    option_c_ta: '5 ஆம் பாறை ஆணை',
    option_d_en: 'Rock Edict XIII',
    option_d_ta: '13 ஆம் பாறை ஆணை',
    correct_option: 'A',
    explanation_en: 'In Rock Edict XII, Ashoka appealed for religious tolerance and honor to all sects.',
    explanation_ta: 'அசோகர் தனது 12 ஆம் பாறை ஆணையில் மதச் சகிப்புத்தன்மையையும் சம மரியாதையையும் அறிவித்தார்.',
    difficulty: 'MEDIUM',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 199,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q4
  {
    id: 'q-secularism-04',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-2',
    question_en: 'Which Mughal Emperor proposed "Din-i-Ilahi" (Divine Faith)?',
    question_ta: '"தீன்-இலாஹி" (தெய்வீக நம்பிக்கை) என்ற கொள்கையை உருவாக்கிய முகலாய மன்னர் யார்?',
    option_a_en: 'Akbar',
    option_a_ta: 'அக்பர்',
    option_b_en: 'Babur',
    option_b_ta: 'பாபர்',
    option_c_en: 'Humayun',
    option_c_ta: 'ஹுமாயூன்',
    option_d_en: 'Aurangzeb',
    option_d_ta: 'ஔரங்கசீப்',
    correct_option: 'A',
    explanation_en: 'Emperor Akbar formulated Din-i-Ilahi based on religious harmony.',
    explanation_ta: 'பேரரசர் அக்பர் மத நல்லிணக்கத்தை அடிப்படையாகக் கொண்டு தீன்-இலாஹியை உருவாக்கினார்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 199,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q5
  {
    id: 'q-secularism-05',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-2',
    question_en: 'Who stated: "Religion is a personal matter which should have no place in politics"?',
    question_ta: '"மதம் என்பது தனிப்பட்ட விஷயம்; அதில் அரசியலுக்கோ அரசுக்கோ இடமில்லை" என்று கூறியவர் யார்?',
    option_a_en: 'Mahatma Gandhi',
    option_a_ta: 'மகாத்மா காந்தி',
    option_b_en: 'Jawaharlal Nehru',
    option_b_ta: 'ஜவஹர்லால் நேரு',
    option_c_en: 'Sardar Patel',
    option_c_ta: 'சர்தார் படேல்',
    option_d_en: 'Dr. Rajendra Prasad',
    option_d_ta: 'டாக்டர் ராஜேந்திர பிரசாத்',
    correct_option: 'A',
    explanation_en: 'Mahatma Gandhi advocated that religion is a personal matter separate from politics.',
    explanation_ta: 'மகாத்மா காந்தி மதம் தனிப்பட்ட விஷயம் என்று வலியுறுத்தினார்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 199,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q6
  {
    id: 'q-secularism-06',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-3',
    question_en: 'Which Constitutional Amendment inserted the word "SECULAR" into the Preamble in 1976?',
    question_ta: '1976 ஆம் ஆண்டில் முகப்புரையில் "மதச்சார்பற்ற" என்ற சொல்லைச் சேர்த்த அரசியலமைப்புத் திருத்தம் எது?',
    option_a_en: '42nd Amendment Act',
    option_a_ta: '42வது சட்டத் திருத்தம்',
    option_b_en: '44th Amendment Act',
    option_b_ta: '44வது சட்டத் திருத்தம்',
    option_c_en: '52nd Amendment Act',
    option_c_ta: '52வது சட்டத் திருத்தம்',
    option_d_en: '61st Amendment Act',
    option_d_ta: '61வது சட்டத் திருத்தம்',
    correct_option: 'A',
    explanation_en: '42nd Constitutional Amendment Act of 1976 inserted SECULAR into the Preamble.',
    explanation_ta: '1976 இன் 42வது அரசியலமைப்புச் சட்டத் திருத்தம் முகப்புரையில் மதச்சார்பற்ற என்ற சொல்லைச் சேர்த்தது.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'OFFICIAL_QUESTION_BANK',
    source_name: 'TN NMMS Official Question Bank & Class 8 Civics',
    source_page: 200,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q7
  {
    id: 'q-secularism-07',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-3',
    question_en: 'Which Article of the Indian Constitution prohibits discrimination on grounds of religion, race, caste, sex or place of birth?',
    question_ta: 'மதம், இனம், சாதி, பாலினம் அல்லது பிறந்த இடத்தின் அடிப்படையில் பாகுபாடு காட்டுவதைத் தடை செய்யும் அரசியலமைப்புச் சட்டப் பிரிவு எது?',
    option_a_en: 'Article 15',
    option_a_ta: 'பிரிவு 15',
    option_b_en: 'Article 17',
    option_b_ta: 'பிரிவு 17',
    option_c_en: 'Article 21',
    option_c_ta: 'பிரிவு 21',
    option_d_en: 'Article 32',
    option_d_ta: 'பிரிவு 32',
    correct_option: 'A',
    explanation_en: 'Article 15 prohibits state discrimination on religious or social grounds.',
    explanation_ta: 'பிரிவு 15 மத அல்லது சமூக அடிப்படையில் பாகுபாடு காட்டுவதைத் தடை செய்கிறது.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 200,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q8
  {
    id: 'q-secularism-08',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-3',
    question_en: 'Article 25(1) guarantees which fundamental freedom to every citizen?',
    question_ta: 'சட்டப்பிரிவு 25(1) ஒவ்வொரு குடிமகனுக்கும் எந்த அடிப்படை உரிமையை உறுதி செய்கிறது?',
    option_a_en: 'Freedom of conscience and right to profess, practice and propagate any religion',
    option_a_ta: 'மனசாட்சி சுதந்திரம் மற்றும் எந்த மதத்தையும் ஏற்கவும், பின்பற்றவும், பரப்பவும் உரிமை',
    option_b_en: 'Freedom of speech and expression',
    option_b_ta: 'பேச்சு மற்றும் கருத்து சுதந்திரம்',
    option_c_en: 'Right to form trade unions',
    option_c_ta: 'தொழிற்சங்கங்கள் அமைக்கும் உரிமை',
    option_d_en: 'Right to assemble peacefully without arms',
    option_d_ta: 'ஆயுதமின்றி அமைதியாக கூடும் உரிமை',
    correct_option: 'A',
    explanation_en: 'Article 25(1) provides freedom to profess, practice, and propagate any religion.',
    explanation_ta: 'பிரிவு 25(1) எந்த மதத்தையும் பின்பற்றவும் பரப்பவும் சுதந்திரம் அளிக்கிறது.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 201,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q9
  {
    id: 'q-secularism-09',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-3',
    question_en: 'Which Article states that no citizen shall be compelled to pay taxes for the promotion of any specific religion?',
    question_ta: 'எந்தவொரு குறிப்பிட்ட மதத்தையும் வளர்ப்பதற்காக வரிகள் செலுத்துமாறு எந்தக் குடிமகனையும் வற்புறுத்த முடியாது எனக்கூறும் சட்டப்பிரிவு எது?',
    option_a_en: 'Article 27',
    option_a_ta: 'பிரிவு 27',
    option_b_en: 'Article 24',
    option_b_ta: 'பிரிவு 24',
    option_c_en: 'Article 30',
    option_c_ta: 'பிரிவு 30',
    option_d_en: 'Article 45',
    option_d_ta: 'பிரிவு 45',
    correct_option: 'A',
    explanation_en: 'Article 27 prohibits the levying of taxes for the promotion of any particular religion.',
    explanation_ta: 'பிரிவு 27 மதத்திற்காக வரி வசூலிப்பதைத் தடை செய்கிறது.',
    difficulty: 'MEDIUM',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 201,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q10
  {
    id: 'q-secularism-10',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-3',
    question_en: 'Article 28 prohibits which activity in educational institutions maintained wholly out of State funds?',
    question_ta: 'முழுவதும் அரசு நிதியால் நிர்வகிக்கப்படும் கல்வி நிறுவனங்களில் எந்த நடவடிக்கையை பிரிவு 28 தடை செய்கிறது?',
    option_a_en: 'Religious instruction',
    option_a_ta: 'மத போதனைகள் வழங்குதல்',
    option_b_en: 'Science education',
    option_b_ta: 'அறிவியல் கல்வி',
    option_c_en: 'Sports competitions',
    option_c_ta: 'விளையாட்டுப் போட்டிகள்',
    option_d_en: 'Language training',
    option_d_ta: 'மொழிப் பயிற்சி',
    correct_option: 'A',
    explanation_en: 'Article 28 prohibits compulsory religious instruction in state-maintained schools.',
    explanation_ta: 'பிரிவு 28 அரசு உதவிபெறும் பள்ளிகளில் கட்டாய மத போதனையைத் தடை செய்கிறது.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 201,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q11
  {
    id: 'q-secularism-11',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-4',
    question_en: 'What is the literal meaning of "Sarva Dharma Sambhava"?',
    question_ta: '"சர்வ தர்ம சமபாவா" என்ற தொடரின் நேரடிப் பொருள் என்ன?',
    option_a_en: 'Equal respect to all religions',
    option_a_ta: 'அனைத்து மதங்களுக்கும் சம மரியாதை',
    option_b_en: 'Supremacy of one religion',
    option_b_ta: 'ஒரு மதத்தின் மேலாதிக்கம்',
    option_c_en: 'Total ban on religion',
    option_c_ta: 'மதங்களின் மீது முழுத் தடை',
    option_d_en: 'State enforcement of faith',
    option_d_ta: 'அரசு மதத்தைக் கட்டாயப்படுத்துதல்',
    correct_option: 'A',
    explanation_en: 'Sarva Dharma Sambhava is the Indian concept of equal tolerance and respect for all faiths.',
    explanation_ta: 'சர்வ தர்ம சமபாவா என்பது அனைத்து மதங்களுக்கும் சம மரியாதை அளிப்பதாகும்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 202,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q12
  {
    id: 'q-secularism-12',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-4',
    question_en: 'How does Indian secularism differ from Western secularism?',
    question_ta: 'இந்திய மதச்சார்பின்மை மேலைநாட்டு மதச்சார்பின்மையிலிருந்து எவ்வாறு வேறுபடுகிறது?',
    option_a_en: 'Indian secularism maintains principled distance and equal respect, intervening for social reforms',
    option_a_ta: 'இந்திய மதச்சார்பின்மை சமமான இடைவெளியைப் பேணி சமூக சீர்திருத்தங்களுக்கு அரசால் தலையிட முடியும்',
    option_b_en: 'Indian secularism forces a single state religion',
    option_b_ta: 'இந்திய மதச்சார்பின்மை ஒரே அரசு மதத்தைக் கட்டாயப்படுத்துகிறது',
    option_c_en: 'Western secularism promotes religious taxes',
    option_c_ta: 'மேலைநாட்டு மதச்சார்பின்மை மத வரிகளை ஊக்குவிக்கிறது',
    option_d_en: 'There is no difference between them',
    option_d_ta: 'அவற்றுக்கிடையே எந்த வேறுபாடும் இல்லை',
    correct_option: 'A',
    explanation_en: 'Indian secularism allows state intervention for social justice (e.g. banning untouchability).',
    explanation_ta: 'இந்திய மதச்சார்பின்மை சமூக நீதிக்காக அரசிற்கு தலையிடும் உரிமையை அளிக்கிறது.',
    difficulty: 'HARD',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 202,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q13
  {
    id: 'q-secularism-13',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-5',
    question_en: 'Why is secularism essential for a democratic country like India?',
    question_ta: 'இந்தியா போன்ற ஜனநாயக நாட்டிற்கு மதச்சார்பின்மை ஏன் அவசியமானது?',
    option_a_en: 'To protect minorities and maintain national unity in a multi-religious society',
    option_a_ta: 'சிறுபான்மையினரைப் பாதுகாக்கவும் மதச் சார்பற்ற சமூகத்தில் தேசிய ஒருமைப்பாட்டைப் பேணவும்',
    option_b_en: 'To make one religion dominant over others',
    option_b_ta: 'ஒரு மதத்தை மற்ற மதங்களின் மீது ஆதிக்கம் செலுத்த வைக்க',
    option_c_en: 'To ban citizens from following any faith',
    option_c_ta: 'குடிமக்கள் எந்த மதத்தையும் பின்பற்றுவதைத் தடுக்க',
    option_d_en: 'To collect religious funds for the state',
    option_d_ta: 'அரசிற்கு மத நிதியை வசூலிக்க',
    correct_option: 'A',
    explanation_en: 'Secularism prevents majority oppression and preserves national unity in a diverse country.',
    explanation_ta: 'மதச்சார்பின்மை பெரும்பான்மையினரின் அடக்குமுறையைத் தடுத்து தேசிய ஒருமைப்பாட்டைப் பேணுகிறது.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 203,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q14
  {
    id: 'q-secularism-14',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-3',
    question_en: 'Article 16 of the Constitution ensures equality of opportunity in which field?',
    question_ta: 'அரசியலமைப்புச் சட்டப்பிரிவு 16 எந்தத் துறையில் சம வாய்ப்பை உறுதி செய்கிறது?',
    option_a_en: 'Public employment',
    option_a_ta: 'அரசு வேலைவாய்ப்பு',
    option_b_en: 'Religious priesthood',
    option_b_ta: 'மதப் குருத்துவம்',
    option_c_en: 'Military ranking',
    option_c_ta: 'இராணுவப் பதவி',
    option_d_en: 'Foreign travel',
    option_d_ta: 'வெளிநாட்டுப் பயணம்',
    correct_option: 'A',
    explanation_en: 'Article 16 guarantees equal opportunity in matters of public employment regardless of religion.',
    explanation_ta: 'பிரிவு 16 அரசு வேலைவாய்ப்புகளில் அனைவருக்கும் சம வாய்ப்பை அளிக்கிறது.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 200,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q15
  {
    id: 'q-secularism-15',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-2',
    question_en: 'Where did Mughal Emperor Akbar build the "Ibadat Khana"?',
    question_ta: 'முகலாயப் பேரரசர் அக்பர் "இபாதத் கானா" மன்றத்தை எங்கு அமைத்தார்?',
    option_a_en: 'Fatehpur Sikri',
    option_a_ta: 'பதேபூர் சிக்கிரி',
    option_b_en: 'Agra',
    option_b_ta: 'ஆக்ரா',
    option_c_en: 'Delhi',
    option_c_ta: 'டெல்லி',
    option_d_en: 'Lahore',
    option_d_ta: 'லாகூர்',
    correct_option: 'A',
    explanation_en: 'Akbar built Ibadat Khana at Fatehpur Sikri for inter-faith dialogue.',
    explanation_ta: 'அக்பர் பதேபூர் சிக்கிரியில் இபாதத் கானாவை அமைத்தார்.',
    difficulty: 'MEDIUM',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 199,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q16
  {
    id: 'q-secularism-16',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-3',
    question_en: 'Which Article gives religious denominations the freedom to manage their own religious affairs?',
    question_ta: 'மத நிறுவனங்கள் தங்கள் மத விவகாரங்களைத் தாங்களே நிர்வகிக்கும் சுதந்திரத்தை எந்த சட்டப்பிரிவு வழங்குகிறது?',
    option_a_en: 'Article 26',
    option_a_ta: 'பிரிவு 26',
    option_b_en: 'Article 19',
    option_b_ta: 'பிரிவு 19',
    option_c_en: 'Article 31',
    option_c_ta: 'பிரிவு 31',
    option_d_en: 'Article 14',
    option_d_ta: 'பிரிவு 14',
    correct_option: 'A',
    explanation_en: 'Article 26 grants freedom to manage religious affairs.',
    explanation_ta: 'பிரிவு 26 மத விவகாரங்களை நிர்வகிக்கும் சுதந்திரத்தை அளிக்கிறது.',
    difficulty: 'MEDIUM',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 201,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q17
  {
    id: 'q-secularism-17',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-1',
    question_en: 'What does a secular state mean?',
    question_ta: 'மதச்சார்பற்ற அரசு என்பது எதனைக் குறிக்கும்?',
    option_a_en: 'A state that treats all religions equally and has no official state religion',
    option_a_ta: 'அனைத்து மதங்களையும் சமமாக நடத்தும் மற்றும் எந்த அரசு மதமும் இல்லாத நாடு',
    option_b_en: 'A state that establishes one single religion as official',
    option_b_ta: 'ஒரே ஒரு மதத்தை அதிகாரப்பூர்வமாக அறிவிக்கும் நாடு',
    option_c_en: 'A state that opposes all religions',
    option_c_ta: 'அனைத்து மதங்களையும் எதிர்க்கும் நாடு',
    option_d_en: 'A state governed strictly by religious priests',
    option_d_ta: 'மதக் குருமார்களால் நிர்வகிக்கப்படும் நாடு',
    correct_option: 'A',
    explanation_en: 'A secular state maintains complete neutrality and has no official state religion.',
    explanation_ta: 'மதச்சார்பற்ற அரசு நடுநிலை வகிக்கிறது; அதற்கு அரசு மதம் ஏதும் இல்லை.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 198,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q18
  {
    id: 'q-secularism-18',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-2',
    question_en: 'Famous poet Iqbal wrote which memorable quote on religious harmony?',
    question_ta: 'மத நல்லிணக்கம் குறித்து கவிஞர் இக்பால் எழுதிய புகழ்பெற்ற கூற்று எது?',
    option_a_en: 'Religion does not teach us animosity towards one another',
    option_a_ta: 'மதம் நமக்கு பகைமையைக் கற்றுத்தரவில்லை',
    option_b_en: 'Truth alone triumphs',
    option_b_ta: 'வாய்மையே வெல்லும்',
    option_c_en: 'Work is Worship',
    option_c_ta: 'செயலே வழிபாடு',
    option_d_en: 'Unity in Division',
    option_d_ta: 'பிரிவில் ஒற்றுமை',
    correct_option: 'A',
    explanation_en: 'Poet Iqbal wrote "Religion does not teach us animosity towards one another".',
    explanation_ta: 'கவிஞர் இக்பால் "மதம் நமக்கு பகைமையைக் கற்றுத்தரவில்லை" என்று எழுதினார்.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 199,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q19
  {
    id: 'q-secularism-19',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-4',
    question_en: 'Which of the following is NOT an objective of secularism in India?',
    question_ta: 'பின்வருவனவற்றுள் எது இந்தியாவில் மதச்சார்பின்மையின் நோக்கம் அல்ல?',
    option_a_en: 'Enforcing one religious code on all citizens',
    option_a_ta: 'அனைத்து குடிமக்கள் மீதும் ஒரே மத சட்டத்தை திணித்தல்',
    option_b_en: 'Preventing religious domination of one community over another',
    option_b_ta: 'ஒரு மதக்குழு மற்றொரு மதக்குழுவை ஆதிக்கம் செலுத்துவதைத் தடுத்தல்',
    option_c_en: 'Ensuring freedom of conscience for every citizen',
    option_c_ta: 'ஒவ்வொரு குடிமகனுக்கும் மனசாட்சி சுதந்திரத்தை உறுதி செய்தல்',
    option_d_en: 'Maintaining equality of all religions before the law',
    option_d_ta: 'சட்டத்தின் முன் அனைத்து மதங்களுக்கும் சமத்துவத்தைப் பேணுதல்',
    correct_option: 'A',
    explanation_en: 'Enforcing a single religious code is against secularism principles.',
    explanation_ta: 'ஒரே மதச் சட்டத்தைத் திணிப்பது மதச்சார்பின்மைக்கு எதிரானது.',
    difficulty: 'MEDIUM',
    question_type: 'MCQ',
    source_type: 'VERIFIED_NMMS_DERIVED',
    source_name: 'TN Samacheer Kalvi Class 8 Civics Unit 3',
    source_page: 202,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  },
  // Q20
  {
    id: 'q-secularism-20',
    subject_id: 'subj-social',
    topic_id: 'topic-sat-soc-secularism',
    concept_id: 'concept-secularism-5',
    question_en: 'In the Preamble of the Indian Constitution, India is declared as:',
    question_ta: 'இந்திய அரசியலமைப்பின் முகப்புரையில் இந்தியா எவ்வாறு பிரகடனம் செய்யப்பட்டுள்ளது?',
    option_a_en: 'Sovereign Socialist Secular Democratic Republic',
    option_a_ta: 'இறையாண்மை கொண்ட, சமதர்ம, மதச்சார்பற்ற, ஜனநாயக, குடியரசு',
    option_b_en: 'Religious Monarchy',
    option_b_ta: 'மத முடியாட்சி',
    option_c_en: 'Federal Religious State',
    option_c_ta: 'கூட்டாட்சி மத நாடு',
    option_d_en: 'Autocratic Republic',
    option_d_ta: 'சர்வாதிகாரக் குடியரசு',
    correct_option: 'A',
    explanation_en: 'Preamble declares India as a Sovereign Socialist Secular Democratic Republic.',
    explanation_ta: 'முகப்புரை இந்தியாவை இறையாண்மை கொண்ட, சமதர்ம, மதச்சார்பற்ற, ஜனநாயக, குடியரசு என பிரகடனம் செய்கிறது.',
    difficulty: 'EASY',
    question_type: 'MCQ',
    source_type: 'OFFICIAL_QUESTION_BANK',
    source_name: 'TN NMMS Official Question Bank & Class 8 Civics',
    source_page: 200,
    verification_status: 'PUBLISHED',
    created_at: '2026-09-01T00:00:00Z'
  }
];
