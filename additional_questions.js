// Additional questions to add to each category (2 per category)

// BIOCHEMISTRY - Cellular Energy (add to existing questions)
const biochemistry_cellular_energy_additions = [
    {
        type: "multiple-choice",
        question: "In which cellular compartment does glycolysis occur?",
        options: ["Mitochondria", "Nucleus", "Cytoplasm", "Endoplasmic reticulum"],
        correct: 2,
        explanation: "Glycolysis occurs in the cytoplasm of the cell and does not require oxygen."
    },
    {
        type: "true-false",
        question: "The citric acid cycle produces more ATP directly than the electron transport chain.",
        correct: false,
        explanation: "False. The electron transport chain produces much more ATP (approximately 32-34) compared to the citric acid cycle (2 ATP)."
    }
];

// CELL BIOLOGY - Cell Structure
const cellbiology_structure_additions = [
    {
        type: "multiple-choice",
        question: "Which organelle has both a rough and smooth form?",
        options: ["Golgi apparatus", "Endoplasmic reticulum", "Mitochondria", "Nucleus"],
        correct: 1,
        explanation: "The endoplasmic reticulum exists as rough ER (with ribosomes) and smooth ER (without ribosomes)."
    },
    {
        type: "true-false",
        question: "Peroxisomes are involved in lipid metabolism and detoxification.",
        correct: true,
        explanation: "True. Peroxisomes break down fatty acids and toxic substances, particularly in liver cells."
    }
];

// GENETICS - DNA Structure
const genetics_dna_additions = [
    {
        type: "multiple-choice",
        question: "Which enzyme proofreads DNA during replication?",
        options: ["Helicase", "Primase", "DNA polymerase", "Ligase"],
        correct: 2,
        explanation: "DNA polymerase has 3' to 5' exonuclease activity that proofreads and corrects errors during replication."
    },
    {
        type: "true-false",
        question: "DNA methylation is an example of epigenetic modification.",
        correct: true,
        explanation: "True. DNA methylation is a key epigenetic mechanism that affects gene expression without changing the DNA sequence."
    }
];

// PHYSIOLOGY - Cardiovascular
const physiology_cardio_additions = [
    {
        type: "multiple-choice",
        question: "What is stroke volume?",
        options: ["Heart rate per minute", "Blood volume per heartbeat", "Total cardiac output", "Blood pressure difference"],
        correct: 1,
        explanation: "Stroke volume is the amount of blood pumped by the left ventricle with each heartbeat."
    },
    {
        type: "true-false",
        question: "The SA node is the heart's natural pacemaker.",
        correct: true,
        explanation: "True. The sinoatrial (SA) node generates electrical impulses that control heart rhythm."
    }
];

// MICROBIOLOGY - Bacteriology
const microbiology_bacteriology_additions = [
    {
        type: "multiple-choice",
        question: "What is the primary component of bacterial cell walls?",
        options: ["Cellulose", "Chitin", "Peptidoglycan", "Phospholipids"],
        correct: 2,
        explanation: "Peptidoglycan is the main structural component of bacterial cell walls."
    },
    {
        type: "true-false",
        question: "Gram-positive bacteria have thicker cell walls than gram-negative bacteria.",
        correct: true,
        explanation: "True. Gram-positive bacteria have thick peptidoglycan layers, while gram-negative bacteria have thin layers."
    }
];

// PATHOLOGY - General
const pathology_general_additions = [
    {
        type: "multiple-choice",
        question: "What is metastasis?",
        options: ["Cell death", "Spread of cancer to other parts", "Inflammation", "Tissue repair"],
        correct: 1,
        explanation: "Metastasis is the spread of cancer cells from the original tumor to other parts of the body."
    },
    {
        type: "true-false",
        question: "Benign tumors can metastasize.",
        correct: false,
        explanation: "False. Benign tumors do not metastasize; only malignant tumors spread to other parts of the body."
    }
];

// IMMUNOLOGY - Innate Immunity
const immunology_innate_additions = [
    {
        type: "multiple-choice",
        question: "Which cells are part of the innate immune system?",
        options: ["B cells", "T cells", "Natural killer cells", "Memory cells"],
        correct: 2,
        explanation: "Natural killer (NK) cells are part of the innate immune system and provide rapid response to infected cells."
    },
    {
        type: "true-false",
        question: "The innate immune system has immunological memory.",
        correct: false,
        explanation: "False. The innate immune system provides immediate but non-specific defense without memory."
    }
];

// PHARMACOLOGY - Pharmacokinetics
const pharmacology_pk_additions = [
    {
        type: "multiple-choice",
        question: "What does bioavailability measure?",
        options: ["Drug potency", "Fraction of drug reaching systemic circulation", "Drug toxicity", "Drug elimination rate"],
        correct: 1,
        explanation: "Bioavailability is the fraction of an administered drug that reaches the systemic circulation unchanged."
    },
    {
        type: "true-false",
        question: "First-pass metabolism occurs in the liver.",
        correct: true,
        explanation: "True. First-pass metabolism occurs when orally administered drugs are metabolized by the liver before reaching systemic circulation."
    }
];

// MOLECULAR BIOLOGY - DNA Replication
const molbio_dna_additions = [
    {
        type: "multiple-choice",
        question: "Which end of DNA can DNA polymerase add nucleotides to?",
        options: ["5' end", "3' end", "Both ends", "Neither end"],
        correct: 1,
        explanation: "DNA polymerase can only add nucleotides to the 3' end of a growing DNA strand."
    },
    {
        type: "true-false",
        question: "Okazaki fragments are formed on the leading strand.",
        correct: false,
        explanation: "False. Okazaki fragments are short DNA segments formed on the lagging strand during discontinuous replication."
    }
];

console.log("Additional questions prepared for manual addition to each category");