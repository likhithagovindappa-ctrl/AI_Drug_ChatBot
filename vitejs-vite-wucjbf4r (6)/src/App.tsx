import { useState } from "react";

type Language = "English" | "Kannada";

type Medicine = {
  name: string;
  use: string;
  sideEffects: string;
  safety: string;
  category: string;
  aliases: string[];
};

type SymptomMapping = {
  keywords: string[];
  suggestedCategories: string;
  medicines: string[];
  advice: string;
  adviceKn: string;
};

/* =========================================================
   MEDICINE DATABASE
   ========================================================= */

const medicines: Record<string, Medicine> = {
  paracetamol: {
    name: "Paracetamol",
    use: "Commonly used to reduce fever and relieve mild to moderate pain.",
    sideEffects: "Some people may experience nausea or stomach discomfort.",
    safety:
      "Follow the medicine label or your healthcare professional's advice. Do not exceed the recommended amount.",
    category: "Pain relief / Fever",
    aliases: ["paracetamol", "acetaminophen", "dolo", "crocin"],
  },

  ibuprofen: {
    name: "Ibuprofen",
    use: "Commonly used for certain types of pain, inflammation, and fever.",
    sideEffects: "Stomach discomfort, nausea, or indigestion may occur.",
    safety:
      "Use only according to the label or professional advice. Ask a healthcare professional if you are unsure whether it is suitable for you.",
    category: "Pain relief / Anti-inflammatory",
    aliases: ["ibuprofen", "advil", "motrin"],
  },

  cetirizine: {
    name: "Cetirizine",
    use: "Commonly used to relieve allergy symptoms such as sneezing, runny nose, and itching.",
    sideEffects: "Drowsiness, tiredness, or dry mouth may occur.",
    safety:
      "Follow the medicine label or professional advice. Be careful with activities requiring alertness if it causes drowsiness.",
    category: "Antihistamine",
    aliases: ["cetirizine", "zyrtec"],
  },

  loratadine: {
    name: "Loratadine",
    use: "Commonly used to relieve symptoms of allergies such as sneezing and itching.",
    sideEffects: "Headache, tiredness, or dry mouth may occur.",
    safety: "Follow the medicine label or healthcare professional's advice.",
    category: "Antihistamine",
    aliases: ["loratadine", "claritin"],
  },

  omeprazole: {
    name: "Omeprazole",
    use: "Used to reduce stomach acid and help with certain acid-related conditions.",
    sideEffects: "Headache, nausea, or stomach discomfort may occur.",
    safety:
      "Use according to the medicine label or healthcare professional's advice.",
    category: "Acid reducer",
    aliases: ["omeprazole", "prilosec"],
  },

  pantoprazole: {
    name: "Pantoprazole",
    use: "Used to reduce stomach acid and treat certain acid-related conditions.",
    sideEffects: "Headache, nausea, or diarrhea may occur.",
    safety:
      "Follow the prescribed or labeled instructions and speak with a healthcare professional if you have concerns.",
    category: "Acid reducer",
    aliases: ["pantoprazole", "pan"],
  },

  amoxicillin: {
    name: "Amoxicillin",
    use: "An antibiotic used for certain bacterial infections.",
    sideEffects: "Nausea, diarrhea, or skin rash may occur.",
    safety:
      "Use only when prescribed or recommended by a qualified healthcare professional. Antibiotics do not treat viral infections.",
    category: "Antibiotic",
    aliases: ["amoxicillin", "amoxil"],
  },

  azithromycin: {
    name: "Azithromycin",
    use: "An antibiotic used for certain bacterial infections.",
    sideEffects: "Nausea, diarrhea, or stomach discomfort may occur.",
    safety: "Use only according to a healthcare professional's instructions.",
    category: "Antibiotic",
    aliases: ["azithromycin", "zithromax"],
  },

  ondansetron: {
    name: "Ondansetron",
    use: "Used to help prevent nausea and vomiting in certain situations.",
    sideEffects: "Headache, constipation, or tiredness may occur.",
    safety: "Use according to healthcare professional's instructions.",
    category: "Anti-nausea",
    aliases: ["ondansetron", "zofran", "emeset"],
  },

  antacid: {
    name: "Antacid",
    use: "Used to relieve symptoms caused by excess stomach acid, such as heartburn.",
    sideEffects: "Constipation, diarrhea, or stomach discomfort may occur.",
    safety:
      "Follow the product label and ask a healthcare professional if symptoms continue.",
    category: "Acid relief",
    aliases: ["antacid", "antacids", "gelusil", "eno", "eno powder"],
  },

  salbutamol: {
    name: "Salbutamol",
    use: "Used to help relieve breathing difficulties associated with certain airway conditions.",
    sideEffects: "Shakiness, headache, or a fast heartbeat may occur.",
    safety: "Use according to your healthcare professional's instructions.",
    category: "Respiratory medicine",
    aliases: ["salbutamol", "albuterol", "ventolin"],
  },
};

/* =========================================================
   KANNADA DATABASE
   ========================================================= */

const kannada: Record<string, Medicine> = {
  paracetamol: {
    ...medicines.paracetamol,
    name: "ಪ್ಯಾರಾಸಿಟಾಮಾಲ್",
    use: "ಜ್ವರವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ಸೌಮ್ಯದಿಂದ ಮಧ್ಯಮ ನೋವನ್ನು ನಿವಾರಿಸಲು ಸಾಮಾನ್ಯವಾಗಿ ಬಳಸಲಾಗುತ್ತದೆ.",
    sideEffects: "ಕೆಲವರಿಗೆ ವಾಕರಿಕೆ ಅಥವಾ ಹೊಟ್ಟೆಯ ಅಸ್ವಸ್ಥತೆ ಉಂಟಾಗಬಹುದು.",
    safety:
      "ಔಷಧಿಯ ಲೇಬಲ್ ಅಥವಾ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರ ಸಲಹೆಯನ್ನು ಅನುಸರಿಸಿ. ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಮಾಣವನ್ನು ಮೀರಬೇಡಿ.",
  },

  ibuprofen: {
    ...medicines.ibuprofen,
    name: "ಐಬುಪ್ರೊಫೆನ್",
    use: "ಕೆಲವು ರೀತಿಯ ನೋವು, ಉರಿಯೂತ ಮತ್ತು ಜ್ವರಕ್ಕೆ ಸಾಮಾನ್ಯವಾಗಿ ಬಳಸಲಾಗುತ್ತದೆ.",
    sideEffects: "ಹೊಟ್ಟೆಯ ಅಸ್ವಸ್ಥತೆ, ವಾಕರಿಕೆ ಅಥವಾ ಅಜೀರ್ಣ ಉಂಟಾಗಬಹುದು.",
    safety: "ಲೇಬಲ್ ಅಥವಾ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರ ಸಲಹೆಯಂತೆ ಮಾತ್ರ ಬಳಸಿ.",
  },

  cetirizine: {
    ...medicines.cetirizine,
    name: "ಸೆಟಿರಿಜಿನ್",
    use: "ಸೀನುವಿಕೆ ಮತ್ತು ತುರಿಕೆ ಮುಂತಾದ ಅಲರ್ಜಿ ಲಕ್ಷಣಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬಳಸಲಾಗುತ್ತದೆ.",
    sideEffects: "ನಿದ್ರೆ ಬರುವುದು, ದಣಿವು ಅಥವಾ ಬಾಯಿ ಒಣಗುವುದು ಉಂಟಾಗಬಹುದು.",
    safety: "ಔಷಧಿಯ ಲೇಬಲ್ ಅಥವಾ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರ ಸಲಹೆಯನ್ನು ಅನುಸರಿಸಿ.",
  },

  loratadine: {
    ...medicines.loratadine,
    name: "ಲೋರಾಟಡಿನ್",
    use: "ಸೀನುವಿಕೆ ಮತ್ತು ತುರಿಕೆ ಮುಂತಾದ ಅಲರ್ಜಿ ಲಕ್ಷಣಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬಳಸಲಾಗುತ್ತದೆ.",
    sideEffects: "ತಲೆನೋವು, ದಣಿವು ಅಥವಾ ಬಾಯಿ ಒಣಗುವುದು ಉಂಟಾಗಬಹುದು.",
    safety: "ಆರೋಗ್ಯ ವೃತ್ತಿಪರರ ಸಲಹೆಯನ್ನು ಅನುಸರಿಸಿ.",
  },

  omeprazole: {
    ...medicines.omeprazole,
    name: "ಒಮೆಪ್ರಾಜೋಲ್",
    use: "ಹೊಟ್ಟೆಯ ಆಮ್ಲವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ಕೆಲವು ಆಮ್ಲ ಸಂಬಂಧಿತ ಸಮಸ್ಯೆಗಳಿಗೆ ಬಳಸಲಾಗುತ್ತದೆ.",
    sideEffects: "ತಲೆನೋವು, ವಾಕರಿಕೆ ಅಥವಾ ಹೊಟ್ಟೆಯ ಅಸ್ವಸ್ಥತೆ ಉಂಟಾಗಬಹುದು.",
    safety: "ಆರೋಗ್ಯ ವೃತ್ತಿಪರರ ಸಲಹೆಯಂತೆ ಬಳಸಿ.",
  },

  pantoprazole: {
    ...medicines.pantoprazole,
    name: "ಪ್ಯಾಂಟೊಪ್ರಾಜೋಲ್",
    use: "ಹೊಟ್ಟೆಯ ಆಮ್ಲವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬಳಸಲಾಗುತ್ತದೆ.",
    sideEffects: "ತಲೆನೋವು, ವಾಕರಿಕೆ ಅಥವಾ ಅತಿಸಾರ ಉಂಟಾಗಬಹುದು.",
    safety: "ವೈದ್ಯರ ಸಲಹೆ ಅಥವಾ ಲೇಬಲ್ ಸೂಚನೆಗಳನ್ನು ಅನುಸರಿಸಿ.",
  },

  amoxicillin: {
    ...medicines.amoxicillin,
    name: "ಅಮೋಕ್ಸಿಸಿಲಿನ್",
    use: "ಕೆಲವು ಬ್ಯಾಕ್ಟೀರಿಯಾ ಸೋಂಕುಗಳಿಗೆ ಬಳಸುವ ಆಂಟಿಬಯಾಟಿಕ್.",
    sideEffects: "ವಾಕರಿಕೆ, ಅತಿಸಾರ ಅಥವಾ ಚರ್ಮದ ರಾಶ್ ಉಂಟಾಗಬಹುದು.",
    safety: "ವೈದ್ಯರು ಸೂಚಿಸಿದಾಗ ಮಾತ್ರ ಬಳಸಿ.",
  },

  azithromycin: {
    ...medicines.azithromycin,
    name: "ಅಜಿಥ್ರೊಮೈಸಿನ್",
    use: "ಕೆಲವು ಬ್ಯಾಕ್ಟೀರಿಯಾ ಸೋಂಕುಗಳಿಗೆ ಬಳಸುವ ಆಂಟಿಬಯಾಟಿಕ್.",
    sideEffects: "ವಾಕರಿಕೆ, ಅತಿಸಾರ ಅಥವಾ ಹೊಟ್ಟೆಯ ಅಸ್ವಸ್ಥತೆ ಉಂಟಾಗಬಹುದು.",
    safety: "ಆರೋಗ್ಯ ವೃತ್ತಿಪರರ ಸೂಚನೆಯಂತೆ ಮಾತ್ರ ಬಳಸಿ.",
  },

  ondansetron: {
    ...medicines.ondansetron,
    name: "ಒಂಡಾನ್ಸೆಟ್ರಾನ್",
    use: "ಕೆಲವು ಸಂದರ್ಭಗಳಲ್ಲಿ ವಾಕರಿಕೆ ಮತ್ತು ವಾಂತಿಯನ್ನು ತಡೆಯಲು ಬಳಸಲಾಗುತ್ತದೆ.",
    sideEffects: "ತಲೆನೋವು, ಮಲಬದ್ಧತೆ ಅಥವಾ ದಣಿವು ಉಂಟಾಗಬಹುದು.",
    safety: "ವೈದ್ಯರ ಸೂಚನೆಯಂತೆ ಬಳಸಿ.",
  },

  antacid: {
    ...medicines.antacid,
    name: "ಆಂಟಾಸಿಡ್",
    use: "ಎದೆಯುರಿಯಂತಹ ಹೊಟ್ಟೆಯ ಆಮ್ಲ ಸಂಬಂಧಿತ ಲಕ್ಷಣಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬಳಸಲಾಗುತ್ತದೆ.",
    sideEffects: "ಮಲಬದ್ಧತೆ, ಅತಿಸಾರ ಅಥವಾ ಹೊಟ್ಟೆಯ ಅಸ್ವಸ್ಥತೆ ಉಂಟಾಗಬಹುದು.",
    safety: "ಉತ್ಪನ್ನದ ಲೇಬಲ್ ಮತ್ತು ಆರೋಗ್ಯ ವೃತ್ತಿಪರರ ಸಲಹೆಯನ್ನು ಅನುಸರಿಸಿ.",
  },

  salbutamol: {
    ...medicines.salbutamol,
    name: "ಸಾಲ್ಬುಟಮಾಲ್",
    use: "ಕೆಲವು ಉಸಿರಾಟದ ಸಮಸ್ಯೆಗಳಲ್ಲಿ ಉಸಿರಾಟವನ್ನು ಸುಲಭಗೊಳಿಸಲು ಬಳಸಲಾಗುತ್ತದೆ.",
    sideEffects: "ನಡುಕ, ತಲೆನೋವು ಅಥವಾ ಹೃದಯ ಬಡಿತ ವೇಗವಾಗಬಹುದು.",
    safety: "ವೈದ್ಯರ ಸೂಚನೆಯಂತೆ ಬಳಸಿ.",
  },
};

/* =========================================================
   SYMPTOM TO MEDICINE SUGGESTION MAPPINGS
   ========================================================= */

const symptomMappings: SymptomMapping[] = [
  {
    keywords: [
      "fever",
      "temperature",
      "body heat",
      "chills",
      "body ache",
      "headache",
      "pain",
      "toothache",
      "muscle ache",
      "ಜ್ವರ",
      "ತಲೆನೋವು",
      "ಮೈಕೈ ನೋವು",
    ],
    suggestedCategories: "Pain Relief & Fever Reducers (Analgesics/Antipyretics)",
    medicines: ["paracetamol", "ibuprofen"],
    advice:
      "For mild fever and body discomfort, over-the-counter pain/fever relievers are often considered under medical or pharmacist advice.",
    adviceKn:
      "ಸೌಮ್ಯ ಜ್ವರ ಮತ್ತು ಮೈಕೈ ನೋವಿಗೆ, ವೈದ್ಯರ ಅಥವಾ ಔಷಧಿಕಾರರ ಮಾರ್ಗದರ್ಶನದಂತೆ ಜ್ವರ/ನೋವು ನಿವಾರಕಗಳನ್ನು ಬಳಸಬಹುದು.",
  },
  {
    keywords: [
      "cold",
      "sneezing",
      "runny nose",
      "allergy",
      "itching",
      "watery eyes",
      "hives",
      "allergies",
      "ನೆಗಡಿ",
      "ಸೀನು",
      "ತುರಿಕೆ",
      "ಅಲರ್ಜಿ",
    ],
    suggestedCategories: "Antihistamines / Allergy Relief",
    medicines: ["cetirizine", "loratadine"],
    advice:
      "For allergy symptoms like sneezing and runny nose, non-drowsy or mild antihistamines are commonly recommended.",
    adviceKn:
      "ಸೀನುವಿಕೆ ಮತ್ತು ನೆಗಡಿಯಂತಹ ಅಲರ್ಜಿ ಲಕ್ಷಣಗಳಿಗೆ ಆಂಟಿಹಿಸ್ಟಮೈನ್ ಔಷಧಿಗಳನ್ನು ಸಾಮಾನ್ಯವಾಗಿ ಬಳಸಲಾಗುತ್ತದೆ.",
  },
  {
    keywords: [
      "acidity",
      "heartburn",
      "acid reflux",
      "stomach burn",
      "gastric",
      "gas",
      "indigestion",
      "ಎದೆಯುರಿ",
      "ಗ್ಯಾಸ್ಟ್ರಿಕ್",
      "ಆಮ್ಲೀಯತೆ",
    ],
    suggestedCategories: "Antacids / Acid Reducers (H2 Blockers & PPIs)",
    medicines: ["antacid", "omeprazole", "pantoprazole"],
    advice:
      "For heartburn or acid-related stomach discomfort, antacids or acid reducers are generally suggested.",
    adviceKn:
      "ಎದೆಯುರಿ ಅಥವಾ ಗ್ಯಾಸ್ಟ್ರಿಕ್ ಸಮಸ್ಯೆಗೆ ಆಂಟಾಸಿಡ್ ಅಥವಾ ಆಮ್ಲ ಸಂಶೋಧಕ ಔಷಧಿಗಳನ್ನು ಸಮಾಲೋಚಿಸಿ ಬಳಸಬಹುದು.",
  },
  {
    keywords: [
      "vomiting",
      "nausea",
      "feel like throwing up",
      "motion sickness",
      "ವಾಂತಿ",
      "ವಾಕರಿಕೆ",
    ],
    suggestedCategories: "Anti-nausea / Antiemetic Medications",
    medicines: ["ondansetron"],
    advice:
      "For nausea and vomiting, antiemetic options exist. Stay hydrated with small sips of water or oral rehydration solution.",
    adviceKn:
      "ವಾಕರಿಕೆ ಮತ್ತು ವಾಂತಿಗೆ ಆಂಟಿ-ಎಮೆಟಿಕ್ ಔಷಧಿಗಳನ್ನು ವೈದ್ಯರ ಸೂಚನೆಯಂತೆ ಬಳಸಬಹುದು.",
  },
  {
    keywords: [
      "bacterial infection",
      "throat infection",
      "pus",
      "infection",
      "ಸೋಂಕು",
    ],
    suggestedCategories: "Antibiotics (Prescription Only)",
    medicines: ["amoxicillin", "azithromycin"],
    advice:
      "Bacterial infections require medical evaluation. Antibiotics are prescription-only medicines and will not work for viral illnesses like the common cold or flu.",
    adviceKn:
      "ಬ್ಯಾಕ್ಟೀರಿಯಾ ಸೋಂಕುಗಳಿಗೆ ವೈದ್ಯರ ಚೀಟಿ ಅಗತ್ಯ. ವೈದ್ಯರ ಸಲಹೆಯಿಲ್ಲದೆ ಆಂಟಿಬಯಾಟಿಕ್ ಬಳಸಬೇಡಿ.",
  },
  {
    keywords: [
      "wheezing",
      "shortness of breath",
      "asthma",
      "breathing difficulty",
      "ಉಸಿರಾಟದ ತೊಂದರೆ",
    ],
    suggestedCategories: "Bronchodilators / Respiratory Relief",
    medicines: ["salbutamol"],
    advice:
      "Sudden breathing difficulty can be serious. Seek immediate medical attention if breathing is labored.",
    adviceKn:
      "ಉಸಿರಾಟದ ತೊಂದರೆ ಗಂಭೀರವಾಗಿದ್ದರೆ ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ನೆರವು ಪಡೆಯಿರಿ.",
  },
];

/* =========================================================
   FIND MEDICINE KEY BY NAME
   ========================================================= */

const findMedicineKey = (query: string): string | null => {
  const lower = query.toLowerCase();

  for (const key of Object.keys(medicines)) {
    const medicine = medicines[key];

    if (
      medicine.aliases.some((alias) =>
        lower.includes(alias.toLowerCase())
      )
    ) {
      return key;
    }
  }

  return null;
};

/* =========================================================
   SAFETY GUARDRAIL
   ========================================================= */

const isRiskyDoseQuestion = (question: string): boolean => {
  const q = question.toLowerCase();

  const riskyTerms = [
    "double my dose",
    "double dose",
    "double the dose",
    "increase my dose",
    "increase the dose",
    "take extra",
    "take more",
    "extra dose",
    "catch up",
    "missed dose",
    "how much should i take",
    "how many tablets",
    "how many pills",
    "dosage",
    "dose",
    "mg",
    "overdose",
    "too many tablets",
    "too many pills",
    "ಡೋಸ್",
    "ಮಾತ್ರೆ",
    "ಹೆಚ್ಚು ಮಾತ್ರೆ",
    "ತಪ್ಪಿದ ಡೋಸ್",
  ];

  return riskyTerms.some((term) => q.includes(term));
};

/* =========================================================
   CHAT ANSWER & SUGGESTION ENGINE
   ========================================================= */

const getAnswer = (
  question: string,
  language: Language
): string => {
  const q = question.toLowerCase().trim();

  if (!q) {
    return language === "Kannada"
      ? "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಅಥವಾ ಲಕ್ಷಣವನ್ನು ನಮೂದಿಸಿ."
      : "Please enter your query or symptom.";
  }

  /* 1. SAFETY CHECK FIRST */
  if (isRiskyDoseQuestion(question)) {
    return language === "Kannada"
      ? "⚠️ ನಾನು ವೈಯಕ್ತಿಕ ಡೋಸ್ ಅನ್ನು ಹೆಚ್ಚಿಸಲು, ಎರಡು ಪಟ್ಟು ಮಾಡಲು ಅಥವಾ ಬದಲಾಯಿಸಲು ಸಲಹೆ ನೀಡಲು ಸಾಧ್ಯವಿಲ್ಲ. ತಪ್ಪಿದ ಅಥವಾ ಹೆಚ್ಚುವರಿ ಡೋಸ್ ಬಗ್ಗೆ ವೈದ್ಯರು ಅಥವಾ ಔಷಧಿಕಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ. ಗಂಭೀರ ಅಥವಾ ವೇಗವಾಗಿ ಹೆಚ್ಚುತ್ತಿರುವ ಲಕ್ಷಣಗಳಿದ್ದರೆ ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ."
      : "⚠️ Safety Alert: I cannot advise you to increase, double, or change a medicine dose. For a missed or extra dose, please contact a doctor or pharmacist. If you have severe symptoms, seek urgent medical care.";
  }

  /* 2. DIRECT MEDICINE QUERY */
  const medicineKey = findMedicineKey(question);

  if (medicineKey) {
    const medicine =
      language === "Kannada"
        ? kannada[medicineKey]
        : medicines[medicineKey];

    if (
      q.includes("use") ||
      q.includes("uses") ||
      q.includes("used") ||
      q.includes("purpose") ||
      q.includes("ಬಳಕೆ") ||
      q.includes("ಯಾವುದಕ್ಕೆ")
    ) {
      return `${medicine.name}: ${medicine.use}`;
    }

    if (
      q.includes("side effect") ||
      q.includes("side effects") ||
      q.includes("ಅಡ್ಡ ಪರಿಣಾಮ")
    ) {
      return `${medicine.name}: ${medicine.sideEffects}`;
    }

    if (
      q.includes("safe") ||
      q.includes("safety") ||
      q.includes("ಸುರಕ್ಷ")
    ) {
      return `${medicine.name}: ${medicine.safety}`;
    }

    return language === "Kannada"
      ? `💊 **${medicine.name}**\n\n📌 **ಬಳಕೆ:**\n${medicine.use}\n\n⚠️ **ಸಾಮಾನ್ಯ ಅಡ್ಡ ಪರಿಣಾಮಗಳು:**\n${medicine.sideEffects}\n\n🛡️ **ಸುರಕ್ಷತೆ:**\n${medicine.safety}`
      : `💊 **${medicine.name}**\n\n📌 **Primary Uses:**\n${medicine.use}\n\n⚠️ **Common Side Effects:**\n${medicine.sideEffects}\n\n🛡️ **Safety Guidance:**\n${medicine.safety}`;
  }

  /* 3. SYMPTOM MATCHING */
  const matchedSymptoms = symptomMappings.filter((mapping) =>
    mapping.keywords.some((keyword) => q.includes(keyword))
  );

  if (matchedSymptoms.length > 0) {
    let responseText = "";

    matchedSymptoms.forEach((mapping) => {
      const suggestedMedDetails = mapping.medicines
        .map((medKey) => {
          const med =
            language === "Kannada"
              ? kannada[medKey]
              : medicines[medKey];
          return `  • **${med.name}** (${med.category}): ${med.use}`;
        })
        .join("\n");

      if (language === "Kannada") {
        responseText += `🔍 **ಲಕ್ಷಣದ ಆಧಾರದ ಮೇಲೆ ಸಲಹೆಗಳು (${mapping.suggestedCategories}):**\n\n${mapping.adviceKn}\n\n**ಸಾಮಾನ್ಯವಾಗಿ ಪರಿಶೀಲಿಸಲಾಗುವ ಔಷಧಿ ವರ್ಗಗಳು:**\n${suggestedMedDetails}\n\n`;
      } else {
        responseText += `🔍 **Symptom-Based Suggestion (${mapping.suggestedCategories}):**\n\n${mapping.advice}\n\n**Commonly associated medicine options:**\n${suggestedMedDetails}\n\n`;
      }
    });

    const disclaimer =
      language === "Kannada"
        ? "⚠️ *ಗಮನಿಸಿ: ಇವು ಮಾಹಿತಿ ಮತ್ತು ಶಿಕ್ಷಣ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಮಾತ್ರ. ಯಾವುದೇ ಔಷಧಿಯನ್ನು ತೆಗೆದುಕೊಳ್ಳುವ ಮೊದಲು ನಿಮ್ಮ ವೈದ್ಯರು ಅಥವಾ ಔಷಧಿಕಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ.*"
        : "⚠️ *Note: These are informational recommendations. Always confirm suitability with a doctor or pharmacist before taking any medication.*";

    return responseText + disclaimer;
  }

  /* 4. FALLBACK */
  return language === "Kannada"
    ? "ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಸಂಬಂಧಿಸಿದ ನಿರ್ದಿಷ್ಟ ಔಷಧ ಅಥವಾ ಲಕ್ಷಣ ನನ್ನ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಕಂಡುಬಂದಿಲ್ಲ.\n\n💡 ನೀವು ಜ್ವರ, ತಲೆನೋವು, ಆಮ್ಲೀಯತೆ, ನೆಗಡಿ ಅಥವಾ ವಾಂತಿಯಂತಹ ಲಕ್ಷಣಗಳನ್ನು ಕೇಳಬಹುದು."
    : "I couldn't identify a specific medicine or recognized symptom pattern in your message.\n\n💡 Try describing your symptom (e.g., \"I have a fever and headache\", \"What helps with acidity?\").";
};

/* =========================================================
   APP COMPONENT
   ========================================================= */

export default function App() {
  const [language, setLanguage] = useState<Language>("English");
  const [medicineName, setMedicineName] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<
    { sender: "bot" | "user"; text: string }[]
  >([]);

  const isKannada = language === "Kannada";

  const searchMedicine = () => {
    const key = medicineName.trim().toLowerCase();
    const medicineKey = findMedicineKey(key);

    if (medicineKey) {
      setSelectedMedicine(
        isKannada ? kannada[medicineKey] : medicines[medicineKey]
      );
      setMessages([]);
    } else {
      setSelectedMedicine(null);
      alert(
        isKannada
          ? "ಈ ಡೆಮೊದಲ್ಲಿ ಈ ಔಷಧಿಯ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ."
          : "Medicine not found in database. Try searching by symptoms below!"
      );
    }
  };

  const askQuestion = (queryText?: string) => {
    const textToSubmit = queryText || question;
    if (!textToSubmit.trim()) return;

    const userMessage = textToSubmit.trim();
    const answer = getAnswer(userMessage, language);

    setMessages((previous) => [
      ...previous,
      { sender: "user", text: userMessage },
      { sender: "bot", text: answer },
    ]);

    setQuestion("");
  };

  const text = {
    title: isKannada
      ? "ನಿಮ್ಮ ಆರೋಗ್ಯ ಮತ್ತು ಔಷಧ ಮಾರ್ಗದರ್ಶಿ"
      : "Health & Medicine Assistant",
    subtitle: isKannada
      ? "ಔಷಧಿಯ ಹೆಸರು ಅಥವಾ ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಆಧಾರವಾಗಿಟ್ಟುಕೊಂಡು ಸಲಹೆ ಪಡೆಯಿರಿ"
      : "Ask about specific medicines or search using your symptoms.",
    search: isKannada ? "ಹುಡುಕಿ" : "Search",
    medicineInfo: isKannada ? "ಔಷಧಿ ಮಾಹಿತಿ" : "Medicine Information",
    usedFor: isKannada ? "ಯಾವುದಕ್ಕೆ ಬಳಸಲಾಗುತ್ತದೆ?" : "What is it used for?",
    sideEffects: isKannada ? "ಸಾಮಾನ್ಯ ಅಡ್ಡ ಪರಿಣಾಮಗಳು" : "Common side effects",
    safety: isKannada ? "ಸುರಕ್ಷತಾ ಮಾಹಿತಿ" : "Safety information",
    chat: "Smart MediGuide Chat",
    chatHint: isKannada
      ? "ರೋಗಲಕ್ಷಣಗಳನ್ನು ನಮೂದಿಸಿ ಅಥವಾ ಔಷಧಿಯ ಬಗ್ಗೆ ಕೇಳಿ."
      : "Type your symptoms or ask medicine questions directly.",
    send: isKannada ? "ಕಳುಹಿಸಿ" : "Send",
    disclaimer: isKannada
      ? "ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿಗಾಗಿ ಮಾತ್ರ. ಈ ಅಪ್ಲಿಕೇಶನ್ ರೋಗನಿರ್ಣಯ ಅಥವಾ ಔಷಧಿ ಸೂಚನೆ ನೀಡುವುದಿಲ್ಲ."
      : "Educational information only. This application does not diagnose, prescribe, or replace professional medical advice.",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f2fe, #f8fafc)",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        color: "#172033",
      }}
    >
      <div style={{ maxWidth: "850px", margin: "auto" }}>
        {/* HEADER */}
        <header
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#2563eb",
            }}
          >
            💊 DrugEdu AI
          </div>
          <div style={{ marginTop: "6px", color: "#64748b" }}>
            🤖 AI-Powered Symptom & Medicine Helper
          </div>

          <button
            onClick={() =>
              setLanguage(language === "English" ? "Kannada" : "English")
            }
            style={{
              marginTop: "15px",
              padding: "10px 18px",
              borderRadius: "20px",
              border: "1px solid #cbd5e1",
              background: "#f8fafc",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🌐 {language === "English" ? "ಕನ್ನಡ" : "English"}
          </button>
        </header>

        {/* HERO */}
        <section
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px 20px",
            textAlign: "center",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
            {text.title}
          </h1>
          <p style={{ color: "#64748b", maxWidth: "600px", margin: "auto" }}>
            {text.subtitle}
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              maxWidth: "600px",
              margin: "25px auto 10px",
            }}
          >
            <input
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchMedicine();
              }}
              placeholder={
                isKannada
                  ? "ಔಷಧಿಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ"
                  : "Direct medicine lookup (e.g. Paracetamol)"
              }
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontSize: "16px",
              }}
            />

            <button
              onClick={searchMedicine}
              style={{
                padding: "14px 20px",
                borderRadius: "12px",
                border: "none",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🔍 {text.search}
            </button>
          </div>
        </section>

        {/* MEDICINE DETAILS CARD */}
        {selectedMedicine && (
          <section
            style={{
              marginTop: "20px",
              background: "white",
              borderRadius: "20px",
              padding: "25px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>💊 {text.medicineInfo}</h2>
              <button
                onClick={() => setSelectedMedicine(null)}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <h3 style={{ color: "#2563eb", marginTop: "5px" }}>
              {selectedMedicine.name} ({selectedMedicine.category})
            </h3>

            <h4>{text.usedFor}</h4>
            <p>{selectedMedicine.use}</p>

            <h4>⚠️ {text.sideEffects}</h4>
            <p>{selectedMedicine.sideEffects}</p>

            <h4>🛡️ {text.safety}</h4>
            <p>{selectedMedicine.safety}</p>
          </section>
        )}

        {/* SMART CHATBOT SECTION */}
        <section
          style={{
            marginTop: "20px",
            background: "white",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h2>🤖 {text.chat}</h2>
          <p style={{ color: "#64748b" }}>{text.chatHint}</p>

          <div
            style={{
              background: "#f8fafc",
              borderRadius: "15px",
              padding: "15px",
              minHeight: "220px",
              maxHeight: "450px",
              overflowY: "auto",
              marginBottom: "15px",
              border: "1px solid #e2e8f0",
            }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  background: "#dbeafe",
                  padding: "15px",
                  borderRadius: "12px",
                  color: "#1e3a8a",
                }}
              >
                🤖{" "}
                {isKannada
                  ? "ನಮಸ್ಕಾರ! ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ನಮೂದಿಸಿ (ಉದಾ: 'ನನಗೆ ತಲೆನೋವು ಮತ್ತು ಜ್ವರ ಇದೆ') ಮತ್ತು ನಾನು ಸಲಹೆಗಳನ್ನು ನೀಡುತ್ತೇನೆ."
                  : "Hello! Describe your query or symptoms (e.g., 'I have acidity and heartburn', 'What is recommended for cold and sneezing?')."}
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    message.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "14px",
                    borderRadius: "14px",
                    background:
                      message.sender === "user" ? "#2563eb" : "#f1f5f9",
                    color: message.sender === "user" ? "white" : "#172033",
                    whiteSpace: "pre-line",
                    lineHeight: "1.5",
                  }}
                >
                  {message.sender === "user" ? "👤 " : "🤖 "}
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* CHAT INPUT */}
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") askQuestion();
              }}
              placeholder={
                isKannada
                  ? "ಉದಾ: 'ನನಗೆ ತಲೆನೋವು ಮತ್ತು ಜ್ವರ ಇದೆ'"
                  : "Type symptoms e.g., 'I have acidity & heartburn' or 'fever'"
              }
              style={{
                flex: 1,
                padding: "13px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
              }}
            />

            <button
              onClick={() => askQuestion()}
              style={{
                padding: "12px 20px",
                borderRadius: "10px",
                border: "none",
                background: "#16a34a",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {text.send}
            </button>
          </div>

          {/* QUICK SUGGESTION CHIPS */}
          <div style={{ marginTop: "20px" }}>
            <strong style={{ fontSize: "14px", color: "#475569" }}>
              💡 Click to try sample queries:
            </strong>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "10px",
              }}
            >
              {[
                "I have a fever and body ache",
                "What can help with acidity and heartburn?",
                "What medicine helps for runny nose and allergies?",
                "Feeling nauseous and vomiting",
              ].map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => askQuestion(sample)}
                  style={{
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    color: "#1d4ed8",
                    padding: "6px 12px",
                    borderRadius: "16px",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "12px",
            color: "#64748b",
            padding: "10px",
          }}
        >
          {text.disclaimer}
        </footer>
      </div>
    </div>
  );
}