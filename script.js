// Quiz Application State
let currentQuiz = {
    category: '',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    skippedAnswers: 0,
    selectedAnswer: null,
    timer: null,
    timeLeft: 30,
    startTime: null,
    userAnswers: []
};

// Question Database
const questionDatabase = {
    anatomy: [
        {
            type: "multiple-choice",
            question: "Which of the following is the largest bone in the human body?",
            options: ["Tibia", "Femur", "Humerus", "Radius"],
            correct: 1,
            explanation: "The femur (thighbone) is the longest and strongest bone in the human body."
        },
        {
            type: "true-false",
            question: "The heart has four chambers.",
            correct: true,
            explanation: "True. The human heart has four chambers: two atria (left and right) and two ventricles (left and right)."
        },
        {
            type: "multiple-select",
            question: "Which of the following are parts of the respiratory system? (Select all that apply)",
            options: ["Lungs", "Heart", "Trachea", "Bronchi", "Stomach"],
            correct: [0, 2, 3],
            explanation: "The respiratory system includes the lungs, trachea, and bronchi. The heart is part of the circulatory system, and the stomach is part of the digestive system."
        },
        {
            type: "short-answer",
            question: "What is the primary muscle responsible for breathing?",
            correctAnswers: ["diaphragm", "the diaphragm"],
            explanation: "The diaphragm is the primary muscle of respiration, contracting to create negative pressure for inhalation."
        },
        {
            type: "multiple-choice",
            question: "What is the functional unit of the kidney?",
            options: ["Glomerulus", "Nephron", "Tubule", "Collecting duct"],
            correct: 1,
            explanation: "The nephron is the functional unit of the kidney, responsible for filtering blood and producing urine."
        },
        {
            type: "true-false",
            question: "The femur is located in the arm.",
            correct: false,
            explanation: "False. The femur is the thighbone, located in the leg, not the arm."
        },
        {
            type: "multiple-select",
            question: "Which bones are part of the skull? (Select all that apply)",
            options: ["Frontal bone", "Femur", "Parietal bone", "Tibia", "Occipital bone"],
            correct: [0, 2, 4],
            explanation: "The frontal, parietal, and occipital bones are all part of the skull. The femur and tibia are leg bones."
        },
        {
            type: "short-answer",
            question: "What is the smallest bone in the human body?",
            correctAnswers: ["stapes", "the stapes", "stirrup", "the stirrup"],
            explanation: "The stapes (stirrup bone) in the middle ear is the smallest bone in the human body."
        }
    ],

    biochemistry: [
        {
            type: "multiple-choice",
            question: "What is the primary energy currency of the cell?",
            options: ["ADP", "ATP", "NADH", "GTP"],
            correct: 1,
            explanation: "ATP (Adenosine Triphosphate) is the primary energy currency used by cells for various metabolic processes."
        },
        {
            type: "true-false",
            question: "ATP stands for Adenosine Triphosphate.",
            correct: true,
            explanation: "True. ATP is indeed Adenosine Triphosphate, the primary energy currency of cells."
        },
        {
            type: "short-answer",
            question: "What enzyme breaks down starch into glucose?",
            correctAnswers: ["amylase", "alpha-amylase"],
            explanation: "Amylase is the enzyme responsible for breaking down starch into glucose molecules."
        },
        {
            type: "multiple-choice",
            question: "What is the pH of normal human blood?",
            options: ["6.8", "7.0", "7.4", "8.0"],
            correct: 2,
            explanation: "Normal human blood pH is approximately 7.4, which is slightly alkaline."
        },
        {
            type: "multiple-select",
            question: "Which of the following are products of cellular respiration? (Select all that apply)",
            options: ["ATP", "Carbon dioxide", "Oxygen", "Water", "Glucose"],
            correct: [0, 1, 3],
            explanation: "Cellular respiration produces ATP, carbon dioxide, and water. Oxygen and glucose are reactants, not products."
        },
        {
            type: "true-false",
            question: "Enzymes are consumed during chemical reactions.",
            correct: false,
            explanation: "False. Enzymes are catalysts that speed up reactions but are not consumed in the process."
        },
        {
            type: "short-answer",
            question: "What vitamin is synthesized by the skin when exposed to sunlight?",
            correctAnswers: ["vitamin d", "vitamin d3", "cholecalciferol"],
            explanation: "Vitamin D is synthesized in the skin when 7-dehydrocholesterol is exposed to UVB radiation from sunlight."
        },
        {
            type: "multiple-choice",
            question: "What is the end product of glycolysis?",
            options: ["Glucose", "Pyruvate", "Lactate", "Acetyl-CoA"],
            correct: 1,
            explanation: "Glycolysis breaks down glucose into two molecules of pyruvate, producing ATP and NADH."
        }
    ],

    cellbiology: [
        {
            type: "multiple-choice",
            question: "Which organelle is responsible for protein synthesis?",
            options: ["Mitochondria", "Ribosomes", "Golgi apparatus", "Lysosomes"],
            correct: 1,
            explanation: "Ribosomes are the cellular organelles responsible for protein synthesis (translation)."
        },
        {
            type: "true-false",
            question: "The mitochondria is known as the powerhouse of the cell.",
            correct: true,
            explanation: "True. Mitochondria produce ATP through cellular respiration, earning the nickname 'powerhouse of the cell'."
        },
        {
            type: "short-answer",
            question: "During which phase of mitosis do chromosomes align at the cell's equator?",
            correctAnswers: ["metaphase", "meta phase"],
            explanation: "During metaphase, chromosomes align at the metaphase plate (cell's equator) before separation."
        },
        {
            type: "multiple-select",
            question: "Which organelles are involved in the endomembrane system? (Select all that apply)",
            options: ["Nucleus", "Endoplasmic reticulum", "Golgi apparatus", "Mitochondria", "Lysosomes"],
            correct: [0, 1, 2, 4],
            explanation: "The endomembrane system includes the nucleus, ER, Golgi apparatus, and lysosomes. Mitochondria are not part of this system."
        },
        {
            type: "multiple-choice",
            question: "What is the primary component of the cell membrane?",
            options: ["Proteins", "Carbohydrates", "Phospholipids", "Nucleic acids"],
            correct: 2,
            explanation: "Phospholipids form the bilayer structure that is the foundation of all cell membranes."
        },
        {
            type: "true-false",
            question: "Osmosis is the movement of water across a selectively permeable membrane.",
            correct: true,
            explanation: "True. Osmosis is specifically the movement of water molecules across a selectively permeable membrane."
        }
    ],

    genetics: [
        {
            type: "short-answer",
            question: "What does DNA stand for?",
            correctAnswers: ["deoxyribonucleic acid", "deoxy ribonucleic acid"],
            explanation: "DNA stands for Deoxyribonucleic Acid, the molecule that carries genetic information."
        },
        {
            type: "multiple-choice",
            question: "How many base pairs are in the human genome?",
            options: ["1 billion", "2 billion", "3 billion", "4 billion"],
            correct: 2,
            explanation: "The human genome contains approximately 3 billion base pairs of DNA."
        },
        {
            type: "true-false",
            question: "A codon consists of three nucleotides.",
            correct: true,
            explanation: "True. A codon is a sequence of three nucleotides that codes for a specific amino acid."
        },
        {
            type: "multiple-select",
            question: "Which of the following are DNA bases? (Select all that apply)",
            options: ["Adenine", "Uracil", "Guanine", "Cytosine", "Thymine"],
            correct: [0, 2, 3, 4],
            explanation: "DNA contains Adenine, Guanine, Cytosine, and Thymine. Uracil is found in RNA, not DNA."
        },
        {
            type: "multiple-choice",
            question: "Which inheritance pattern requires both parents to carry a gene for offspring to be affected?",
            options: ["Dominant", "Recessive", "X-linked", "Codominant"],
            correct: 1,
            explanation: "Recessive inheritance requires both parents to carry the gene for offspring to express the trait."
        },
        {
            type: "true-false",
            question: "Transcription creates proteins from RNA.",
            correct: false,
            explanation: "False. Transcription creates RNA from DNA. Translation creates proteins from RNA."
        }
    ],

    microbiology: [
        {
            question: "Which of the following is NOT a type of bacteria based on shape?",
            options: ["Cocci", "Bacilli", "Spirilla", "Viruses"],
            correct: 3,
            explanation: "Viruses are not bacteria and are not classified by shape like bacteria are."
        },
        {
            question: "What is the most heat-resistant form of bacterial life?",
            options: ["Vegetative cells", "Spores", "Cysts", "Biofilms"],
            correct: 1,
            explanation: "Bacterial spores are extremely heat-resistant and can survive harsh conditions."
        },
        {
            question: "Which staining method is used to differentiate bacteria into two major groups?",
            options: ["Acid-fast stain", "Gram stain", "Spore stain", "Capsule stain"],
            correct: 1,
            explanation: "Gram staining differentiates bacteria into Gram-positive and Gram-negative based on cell wall structure."
        },
        {
            question: "What is the primary component of fungal cell walls?",
            options: ["Cellulose", "Peptidoglycan", "Chitin", "Protein"],
            correct: 2,
            explanation: "Chitin is the primary structural component of fungal cell walls."
        },
        {
            question: "Which microorganism is responsible for causing malaria?",
            options: ["Bacteria", "Virus", "Protozoan", "Fungus"],
            correct: 2,
            explanation: "Malaria is caused by Plasmodium species, which are protozoans transmitted by mosquitoes."
        }
    ],

    pharmacology: [
        {
            question: "What is the study of drug absorption, distribution, metabolism, and excretion called?",
            options: ["Pharmacodynamics", "Pharmacokinetics", "Toxicology", "Posology"],
            correct: 1,
            explanation: "Pharmacokinetics studies what the body does to drugs (ADME processes)."
        },
        {
            question: "Which route of drug administration provides 100% bioavailability?",
            options: ["Oral", "Intramuscular", "Intravenous", "Sublingual"],
            correct: 2,
            explanation: "Intravenous administration provides 100% bioavailability as the drug goes directly into circulation."
        },
        {
            question: "What is the term for the minimum concentration of drug needed to produce an effect?",
            options: ["ED50", "LD50", "Threshold dose", "Toxic dose"],
            correct: 2,
            explanation: "Threshold dose is the minimum concentration required to produce a measurable effect."
        },
        {
            question: "Which enzyme is responsible for metabolizing many drugs in the liver?",
            options: ["Cytochrome P450", "Monoamine oxidase", "Acetylcholinesterase", "Phospholipase"],
            correct: 0,
            explanation: "Cytochrome P450 enzymes are the primary drug-metabolizing enzymes in the liver."
        },
        {
            question: "What does 'half-life' mean in pharmacology?",
            options: ["Time to reach peak concentration", "Time for 50% drug elimination", "Duration of action", "Time to onset"],
            correct: 1,
            explanation: "Half-life is the time required for the drug concentration to decrease by 50%."
        }
    ],

    immunology: [
        {
            question: "Which cells are primarily responsible for antibody production?",
            options: ["T cells", "B cells", "NK cells", "Dendritic cells"],
            correct: 1,
            explanation: "B cells differentiate into plasma cells that produce antibodies."
        },
        {
            question: "What is the most abundant antibody in human serum?",
            options: ["IgA", "IgE", "IgG", "IgM"],
            correct: 2,
            explanation: "IgG is the most abundant antibody in blood and provides long-term immunity."
        },
        {
            question: "Which type of immunity is provided by vaccines?",
            options: ["Active natural", "Active artificial", "Passive natural", "Passive artificial"],
            correct: 1,
            explanation: "Vaccines provide active artificial immunity by stimulating the immune system to produce antibodies."
        },
        {
            question: "What is the primary function of helper T cells?",
            options: ["Kill infected cells", "Produce antibodies", "Coordinate immune response", "Present antigens"],
            correct: 2,
            explanation: "Helper T cells coordinate the immune response by activating other immune cells."
        },
        {
            question: "Which cells present antigens to T cells?",
            options: ["B cells", "Dendritic cells", "NK cells", "Plasma cells"],
            correct: 1,
            explanation: "Dendritic cells are professional antigen-presenting cells that activate T cells."
        }
    ],

    biomaterials: [
        {
            question: "Which property is most important for biomaterials in contact with blood?",
            options: ["Strength", "Biocompatibility", "Color", "Weight"],
            correct: 1,
            explanation: "Biocompatibility is crucial for biomaterials to avoid adverse reactions with biological tissues."
        },
        {
            question: "What is the most commonly used metal in orthopedic implants?",
            options: ["Aluminum", "Titanium", "Copper", "Iron"],
            correct: 1,
            explanation: "Titanium is widely used due to its excellent biocompatibility and corrosion resistance."
        },
        {
            question: "Which polymer is commonly used in biodegradable sutures?",
            options: ["Polyethylene", "Polypropylene", "Polylactic acid", "Polyethylene terephthalate"],
            correct: 2,
            explanation: "Polylactic acid (PLA) is biodegradable and commonly used in absorbable sutures."
        },
        {
            question: "What does 'osteointegration' refer to?",
            options: ["Bone healing", "Direct bone-implant contact", "Bone growth", "Bone density"],
            correct: 1,
            explanation: "Osteointegration is the direct structural connection between bone and implant surface."
        },
        {
            question: "Which ceramic is commonly used in dental implants?",
            options: ["Silicon carbide", "Aluminum oxide", "Zirconium dioxide", "Titanium carbide"],
            correct: 2,
            explanation: "Zirconium dioxide (zirconia) is commonly used in dental implants due to its biocompatibility."
        }
    ],

    tissueengineering: [
        {
            question: "What are the three main components of tissue engineering?",
            options: ["Cells, scaffolds, signals", "Proteins, cells, DNA", "Scaffolds, nutrients, oxygen", "Cells, blood, nerves"],
            correct: 0,
            explanation: "The tissue engineering triad consists of cells, scaffolds, and signaling molecules."
        },
        {
            question: "What is the primary purpose of a scaffold in tissue engineering?",
            options: ["Provide nutrients", "Support cell growth", "Deliver drugs", "Generate heat"],
            correct: 1,
            explanation: "Scaffolds provide structural support for cells to attach, grow, and form new tissue."
        },
        {
            question: "Which type of stem cells can differentiate into any cell type?",
            options: ["Multipotent", "Pluripotent", "Totipotent", "Unipotent"],
            correct: 2,
            explanation: "Totipotent stem cells can differentiate into any cell type, including extraembryonic tissues."
        },
        {
            question: "What is the process of growing cells outside the body called?",
            options: ["In vivo culture", "Ex vivo culture", "In vitro culture", "In situ culture"],
            correct: 2,
            explanation: "In vitro culture refers to growing cells in laboratory conditions outside the body."
        },
        {
            question: "Which growth factor is important for blood vessel formation?",
            options: ["BMP", "TGF-β", "VEGF", "FGF"],
            correct: 2,
            explanation: "VEGF (Vascular Endothelial Growth Factor) is crucial for angiogenesis and blood vessel formation."
        }
    ],

    biomechanics: [
        {
            question: "What is the study of forces and their effects on living organisms called?",
            options: ["Biophysics", "Biomechanics", "Bioengineering", "Biotechnology"],
            correct: 1,
            explanation: "Biomechanics is the study of mechanical principles applied to biological systems."
        },
        {
            question: "Which law states that stress is proportional to strain in elastic materials?",
            options: ["Newton's law", "Hooke's law", "Pascal's law", "Bernoulli's law"],
            correct: 1,
            explanation: "Hooke's law describes the linear relationship between stress and strain in elastic materials."
        },
        {
            question: "What is the primary function of cartilage in joints?",
            options: ["Produce synovial fluid", "Reduce friction", "Provide stability", "Generate force"],
            correct: 1,
            explanation: "Cartilage provides a smooth, low-friction surface for joint movement."
        },
        {
            question: "Which type of muscle contraction occurs when muscle length doesn't change?",
            options: ["Concentric", "Eccentric", "Isometric", "Isotonic"],
            correct: 2,
            explanation: "Isometric contractions occur when muscle generates force without changing length."
        },
        {
            question: "What is the center of mass of the human body typically located?",
            options: ["Chest", "Abdomen", "Pelvis", "Head"],
            correct: 2,
            explanation: "The center of mass is typically located in the pelvis region, around the second sacral vertebra."
        }
    ],

    bioinformatics: [
        {
            question: "What does BLAST stand for in bioinformatics?",
            options: ["Basic Local Alignment Search Tool", "Biological Laboratory Analysis System Tool", "Binary Logic Assessment Search Tool", "Biomedical Literature Analysis Search Tool"],
            correct: 0,
            explanation: "BLAST is a widely used algorithm for comparing biological sequence information."
        },
        {
            question: "Which file format is commonly used to store DNA sequences?",
            options: [".txt", ".doc", ".fasta", ".pdf"],
            correct: 2,
            explanation: "FASTA format is the standard text-based format for representing nucleotide or protein sequences."
        },
        {
            question: "What is the purpose of sequence alignment?",
            options: ["To store sequences", "To identify similarities", "To delete sequences", "To create sequences"],
            correct: 1,
            explanation: "Sequence alignment is used to identify regions of similarity between biological sequences."
        },
        {
            question: "Which database is the primary repository for protein sequences?",
            options: ["GenBank", "UniProt", "PubMed", "EMBL"],
            correct: 1,
            explanation: "UniProt is the primary database for protein sequence and annotation data."
        },
        {
            question: "What does phylogenetic analysis study?",
            options: ["Protein structure", "Evolutionary relationships", "Gene expression", "Metabolic pathways"],
            correct: 1,
            explanation: "Phylogenetic analysis studies evolutionary relationships between species or genes."
        }
    ]
};

// Extended question database with more questions per category
const extendedQuestions = {
    anatomy: [
        {
            question: "Which lobe of the brain is primarily responsible for vision?",
            options: ["Frontal lobe", "Parietal lobe", "Temporal lobe", "Occipital lobe"],
            correct: 3,
            explanation: "The occipital lobe contains the primary visual cortex and processes visual information."
        },
        {
            question: "What is the smallest bone in the human body?",
            options: ["Stapes", "Malleus", "Incus", "Hyoid"],
            correct: 0,
            explanation: "The stapes (stirrup bone) in the middle ear is the smallest bone in the human body."
        },
        {
            question: "How many pairs of ribs does a human typically have?",
            options: ["10", "11", "12", "13"],
            correct: 2,
            explanation: "Humans typically have 12 pairs of ribs, totaling 24 ribs."
        },
        {
            question: "Which nerve controls the diaphragm?",
            options: ["Vagus nerve", "Phrenic nerve", "Intercostal nerve", "Median nerve"],
            correct: 1,
            explanation: "The phrenic nerve innervates the diaphragm and controls breathing."
        },
        {
            question: "What is the longest nerve in the human body?",
            options: ["Sciatic nerve", "Vagus nerve", "Median nerve", "Ulnar nerve"],
            correct: 0,
            explanation: "The sciatic nerve is the longest nerve, running from the lower back to the foot."
        }
    ],
    
    biochemistry: [
        {
            question: "Which molecule serves as the backbone of DNA?",
            options: ["Ribose sugar", "Deoxyribose sugar", "Glucose", "Fructose"],
            correct: 1,
            explanation: "DNA's backbone consists of deoxyribose sugar and phosphate groups."
        },
        {
            question: "What is the normal range of blood glucose in mg/dL?",
            options: ["50-80", "70-100", "100-140", "140-180"],
            correct: 1,
            explanation: "Normal fasting blood glucose levels range from 70-100 mg/dL."
        },
        {
            question: "Which amino acid is essential and must be obtained from diet?",
            options: ["Alanine", "Glycine", "Lysine", "Serine"],
            correct: 2,
            explanation: "Lysine is an essential amino acid that cannot be synthesized by the human body."
        },
        {
            question: "What is the primary storage form of glucose in the liver?",
            options: ["Starch", "Cellulose", "Glycogen", "Sucrose"],
            correct: 2,
            explanation: "Glycogen is the primary storage form of glucose in liver and muscle tissue."
        },
        {
            question: "Which enzyme is deficient in phenylketonuria (PKU)?",
            options: ["Tyrosinase", "Phenylalanine hydroxylase", "Tryptophan hydroxylase", "Histidine decarboxylase"],
            correct: 1,
            explanation: "PKU is caused by deficiency in phenylalanine hydroxylase, leading to phenylalanine accumulation."
        }
    ]
};

// Merge extended questions with base questions
Object.keys(extendedQuestions).forEach(category => {
    if (questionDatabase[category]) {
        questionDatabase[category] = [...questionDatabase[category], ...extendedQuestions[category]];
    }
});

// Utility Functions
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.classList.add('fade-in');
    }
    
    // Update navigation
    updateNavigation(sectionId);
}

function updateNavigation(activeSection) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSection}`) {
            link.classList.add('active');
        }
    });
}

function showHome() {
    showSection('home');
}

function showCategories() {
    showSection('categories');
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function getCategoryTitle(category) {
    const titles = {
        anatomy: 'Anatomy & Physiology',
        biochemistry: 'Biochemistry',
        cellbiology: 'Cell Biology',
        genetics: 'Genetics',
        microbiology: 'Microbiology',
        pharmacology: 'Pharmacology',
        immunology: 'Immunology',
        biomaterials: 'Biomaterials',
        tissueengineering: 'Tissue Engineering',
        biomechanics: 'Biomechanics',
        bioinformatics: 'Bioinformatics'
    };
    return titles[category] || category;
}

// Quiz Functions
function startQuiz(category) {
    if (!questionDatabase[category]) {
        alert('Questions for this category are not available yet.');
        return;
    }
    
    // Initialize quiz state
    currentQuiz = {
        category: category,
        questions: shuffleArray(questionDatabase[category]).slice(0, 10), // Random 10 questions
        currentQuestionIndex: 0,
        score: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        skippedAnswers: 0,
        selectedAnswer: null,
        timer: null,
        timeLeft: 30,
        startTime: new Date(),
        userAnswers: []
    };
    
    // Update UI
    document.getElementById('quiz-category-title').textContent = getCategoryTitle(category);
    document.getElementById('total-questions').textContent = currentQuiz.questions.length;
    
    showSection('quiz');
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    const questionNumber = currentQuiz.currentQuestionIndex + 1;
    
    // Update question counter and progress
    document.getElementById('current-question').textContent = questionNumber;
    const progress = (questionNumber / currentQuiz.questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    
    // Display question
    document.getElementById('question-text').textContent = question.question;
    
    // Create options based on question type
    const optionsGrid = document.getElementById('options-grid');
    optionsGrid.innerHTML = '';
    
    if (!question.type) question.type = 'multiple-choice'; // Default for old questions
    
    switch (question.type) {
        case 'true-false':
            createTrueFalseOptions(optionsGrid);
            break;
        case 'short-answer':
            createShortAnswerInput(optionsGrid);
            break;
        case 'multiple-select':
            createMultipleSelectOptions(optionsGrid, question.options);
            break;
        case 'multiple-choice':
        default:
            createMultipleChoiceOptions(optionsGrid, question.options);
            break;
    }
    
    // Reset UI state
    currentQuiz.selectedAnswer = null;
    currentQuiz.selectedAnswers = [];
    document.getElementById('next-button').disabled = true;
    resetTimer();
    
    // Add animations
    document.querySelector('.question-card').classList.add('slide-in-right');
}

function createTrueFalseOptions(container) {
    const trueButton = document.createElement('button');
    trueButton.className = 'option-button';
    trueButton.textContent = 'True';
    trueButton.onclick = () => selectAnswer(true);
    
    const falseButton = document.createElement('button');
    falseButton.className = 'option-button';
    falseButton.textContent = 'False';
    falseButton.onclick = () => selectAnswer(false);
    
    container.appendChild(trueButton);
    container.appendChild(falseButton);
}

function createShortAnswerInput(container) {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'short-answer-container';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'short-answer-input';
    input.placeholder = 'Type your answer here...';
    input.addEventListener('input', function() {
        currentQuiz.selectedAnswer = this.value.trim().toLowerCase();
        document.getElementById('next-button').disabled = this.value.trim() === '';
    });
    
    inputContainer.appendChild(input);
    container.appendChild(inputContainer);
    
    // Focus the input
    setTimeout(() => input.focus(), 100);
}

function createMultipleSelectOptions(container, options) {
    container.classList.add('multiple-select');
    currentQuiz.selectedAnswers = [];
    
    const instruction = document.createElement('div');
    instruction.className = 'instruction-text';
    instruction.textContent = 'Select all correct answers:';
    container.appendChild(instruction);
    
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button multiple-select-option';
        button.textContent = option;
        button.onclick = () => toggleMultipleAnswer(index, button);
        container.appendChild(button);
    });
}

function createMultipleChoiceOptions(container, options) {
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        container.appendChild(button);
    });
}

function selectAnswer(answer) {
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    
    if (question.type === 'multiple-choice' || !question.type) {
        // Remove previous selections
        document.querySelectorAll('.option-button').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Mark selected answer
        if (typeof answer === 'number') {
            document.querySelectorAll('.option-button')[answer].classList.add('selected');
        }
    }
    
    currentQuiz.selectedAnswer = answer;
    document.getElementById('next-button').disabled = false;
}

function toggleMultipleAnswer(index, button) {
    if (!currentQuiz.selectedAnswers) {
        currentQuiz.selectedAnswers = [];
    }
    
    const isSelected = currentQuiz.selectedAnswers.includes(index);
    
    if (isSelected) {
        currentQuiz.selectedAnswers = currentQuiz.selectedAnswers.filter(i => i !== index);
        button.classList.remove('selected');
    } else {
        currentQuiz.selectedAnswers.push(index);
        button.classList.add('selected');
    }
    
    // Enable next button if at least one answer is selected
    document.getElementById('next-button').disabled = currentQuiz.selectedAnswers.length === 0;
    
    // For multiple select questions, store the array in selectedAnswer
    currentQuiz.selectedAnswer = currentQuiz.selectedAnswers;
}

function nextQuestion() {
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    
    // Check answer based on question type
    let isCorrect = false;
    
    switch (question.type) {
        case 'true-false':
            isCorrect = currentQuiz.selectedAnswer === question.correct;
            break;
        case 'short-answer':
            const userAnswer = currentQuiz.selectedAnswer.toLowerCase().trim();
            isCorrect = question.correctAnswers.some(answer => 
                answer.toLowerCase() === userAnswer
            );
            break;
        case 'multiple-select':
            // Check if arrays are equal (same elements, same length)
            const correctSet = new Set(question.correct);
            const selectedSet = new Set(currentQuiz.selectedAnswer || []);
            isCorrect = correctSet.size === selectedSet.size && 
                       [...correctSet].every(x => selectedSet.has(x));
            break;
        case 'multiple-choice':
        default:
            isCorrect = currentQuiz.selectedAnswer === question.correct;
            break;
    }
    
    // Record answer
    const userAnswer = {
        questionIndex: currentQuiz.currentQuestionIndex,
        selectedAnswer: currentQuiz.selectedAnswer,
        correct: question.correct,
        isCorrect: isCorrect,
        timeUsed: 30 - currentQuiz.timeLeft
    };
    currentQuiz.userAnswers.push(userAnswer);
    
    // Update statistics
    if (isCorrect) {
        currentQuiz.correctAnswers++;
        currentQuiz.score += 10;
    } else {
        currentQuiz.incorrectAnswers++;
    }
    
    // Show correct answer briefly
    showAnswerFeedback(question);
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuiz.currentQuestionIndex++;
        if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }, 2000);
}

function skipQuestion() {
    currentQuiz.skippedAnswers++;
    const userAnswer = {
        questionIndex: currentQuiz.currentQuestionIndex,
        selectedAnswer: null,
        correct: currentQuiz.questions[currentQuiz.currentQuestionIndex].correct,
        isCorrect: false,
        timeUsed: 30 - currentQuiz.timeLeft,
        skipped: true
    };
    currentQuiz.userAnswers.push(userAnswer);
    
    currentQuiz.currentQuestionIndex++;
    if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function showAnswerFeedback(question) {
    const optionButtons = document.querySelectorAll('.option-button');
    const optionsGrid = document.getElementById('options-grid');
    
    // Create feedback message
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'answer-feedback';
    
    let isCorrect = false;
    
    switch (question.type) {
        case 'true-false':
            // Highlight correct answer
            const correctButton = question.correct ? optionButtons[0] : optionButtons[1];
            correctButton.classList.add('show-correct');
            
            // If user selected wrong answer, highlight it
            if (currentQuiz.selectedAnswer !== question.correct) {
                const incorrectButton = !question.correct ? optionButtons[0] : optionButtons[1];
                incorrectButton.classList.add('show-incorrect');
            } else {
                isCorrect = true;
            }
            break;
            
        case 'short-answer':
            const userAnswer = currentQuiz.selectedAnswer.toLowerCase().trim();
            isCorrect = question.correctAnswers.some(answer => 
                answer.toLowerCase() === userAnswer
            );
            
            // Show the correct answers
            const correctAnswersText = question.correctAnswers.join(' or ');
            feedbackDiv.innerHTML = `<strong>Correct answer(s):</strong> ${correctAnswersText}<br><strong>Your answer:</strong> ${currentQuiz.selectedAnswer}`;
            break;
            
        case 'multiple-select':
            // Highlight correct answers
            question.correct.forEach(index => {
                if (optionButtons[index]) {
                    optionButtons[index].classList.add('show-correct');
                }
            });
            
            // Check user's selections
            const userSelections = currentQuiz.selectedAnswer || [];
            userSelections.forEach(index => {
                if (!question.correct.includes(index)) {
                    optionButtons[index].classList.add('show-incorrect');
                }
            });
            
            // Check if answer is correct
            const correctSet = new Set(question.correct);
            const selectedSet = new Set(userSelections);
            isCorrect = correctSet.size === selectedSet.size && 
                       [...correctSet].every(x => selectedSet.has(x));
            break;
            
        case 'multiple-choice':
        default:
            // Highlight correct answer
            if (optionButtons[question.correct]) {
                optionButtons[question.correct].classList.add('show-correct');
            }
            
            // If user selected wrong answer, highlight it as incorrect
            if (currentQuiz.selectedAnswer !== null && currentQuiz.selectedAnswer !== question.correct) {
                if (optionButtons[currentQuiz.selectedAnswer]) {
                    optionButtons[currentQuiz.selectedAnswer].classList.add('show-incorrect');
                }
            } else if (currentQuiz.selectedAnswer === question.correct) {
                isCorrect = true;
            }
            break;
    }
    
    // Set feedback class and add explanation
    feedbackDiv.classList.add(isCorrect ? 'correct' : 'incorrect');
    if (!feedbackDiv.innerHTML) {
        feedbackDiv.innerHTML = `<strong>Explanation:</strong> ${question.explanation}`;
    } else {
        feedbackDiv.innerHTML += `<br><br><strong>Explanation:</strong> ${question.explanation}`;
    }
    
    // Add feedback to the question card
    optionsGrid.appendChild(feedbackDiv);
    
    // Disable all interactive elements
    optionButtons.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    const shortAnswerInput = document.querySelector('.short-answer-input');
    if (shortAnswerInput) {
        shortAnswerInput.disabled = true;
    }
}

function startTimer() {
    currentQuiz.timeLeft = 30;
    updateTimerDisplay();
    
    currentQuiz.timer = setInterval(() => {
        currentQuiz.timeLeft--;
        updateTimerDisplay();
        
        if (currentQuiz.timeLeft <= 5) {
            document.getElementById('timer').classList.add('warning');
        }
        
        if (currentQuiz.timeLeft <= 0) {
            // Time's up - treat as skip
            clearInterval(currentQuiz.timer);
            skipQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(currentQuiz.timer);
    document.getElementById('timer').classList.remove('warning');
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = currentQuiz.timeLeft;
}

function endQuiz() {
    clearInterval(currentQuiz.timer);
    const endTime = new Date();
    const timeTaken = Math.round((endTime - currentQuiz.startTime) / 1000);
    
    // Calculate final score percentage
    const scorePercentage = Math.round((currentQuiz.correctAnswers / currentQuiz.questions.length) * 100);
    
    // Update results display
    document.getElementById('final-score').textContent = `${scorePercentage}%`;
    document.getElementById('correct-answers').textContent = currentQuiz.correctAnswers;
    document.getElementById('incorrect-answers').textContent = currentQuiz.incorrectAnswers;
    document.getElementById('skipped-answers').textContent = currentQuiz.skippedAnswers;
    document.getElementById('time-taken').textContent = formatTime(timeTaken);
    
    // Set results message based on score
    const resultMessage = document.getElementById('results-message');
    if (scorePercentage >= 90) {
        resultMessage.textContent = "Outstanding! You have mastered this topic!";
    } else if (scorePercentage >= 70) {
        resultMessage.textContent = "Great job! You have a good understanding of this topic.";
    } else if (scorePercentage >= 50) {
        resultMessage.textContent = "Good effort! Consider reviewing this topic further.";
    } else {
        resultMessage.textContent = "Keep studying! Practice makes perfect.";
    }
    
    showSection('results');
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function quitQuiz() {
    if (confirm('Are you sure you want to quit the quiz? Your progress will be lost.')) {
        clearInterval(currentQuiz.timer);
        showCategories();
    }
}

function retryQuiz() {
    startQuiz(currentQuiz.category);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Navigation event listeners
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
        });
    });
    
    // Initialize home section
    showSection('home');
    
    // Add keyboard support
    document.addEventListener('keydown', function(e) {
        const currentSection = document.querySelector('.section.active').id;
        
        if (currentSection === 'quiz') {
            // Number keys for answer selection
            if (e.key >= '1' && e.key <= '4') {
                const answerIndex = parseInt(e.key) - 1;
                const options = document.querySelectorAll('.option-button');
                if (options[answerIndex]) {
                    selectAnswer(answerIndex);
                }
            }
            // Enter key for next question
            else if (e.key === 'Enter' && !document.getElementById('next-button').disabled) {
                nextQuestion();
            }
            // Space key for skip
            else if (e.key === ' ') {
                e.preventDefault();
                skipQuestion();
            }
        }
    });
});

// Add smooth scrolling and animations
function addAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe category cards
    document.querySelectorAll('.category-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addAnimations);

// Performance optimization: Preload critical resources
function preloadResources() {
    // Preload font awesome icons
    const iconClasses = [
        'fas fa-dna', 'fas fa-user-md', 'fas fa-atom', 'fas fa-microscope',
        'fas fa-bacteria', 'fas fa-pills', 'fas fa-shield-virus', 'fas fa-cube',
        'fas fa-layer-group', 'fas fa-cog', 'fas fa-code'
    ];
    
    iconClasses.forEach(iconClass => {
        const tempElement = document.createElement('i');
        tempElement.className = iconClass;
        tempElement.style.display = 'none';
        document.body.appendChild(tempElement);
        setTimeout(() => document.body.removeChild(tempElement), 100);
    });
}

// Call preload function
document.addEventListener('DOMContentLoaded', preloadResources);