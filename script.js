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

// Topic-Organized Question Database
const questionDatabase = {
    anatomy: {
        topics: {
            "Skeletal System": [
                {
                    type: "multiple-choice",
                    question: "Which of the following is the largest bone in the human body?",
                    options: ["Tibia", "Femur", "Humerus", "Radius"],
                    correct: 1,
                    explanation: "The femur (thighbone) is the longest and strongest bone in the human body."
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
                },
                {
                    type: "multiple-choice",
                    question: "How many bones are in the adult human body?",
                    options: ["206", "215", "225", "235"],
                    correct: 0,
                    explanation: "The adult human body has 206 bones, reduced from about 270 at birth due to fusion during development."
                }
            ],
            "Muscular System": [
                {
                    type: "short-answer",
                    question: "What is the primary muscle responsible for breathing?",
                    correctAnswers: ["diaphragm", "the diaphragm"],
                    explanation: "The diaphragm is the primary muscle of respiration, contracting to create negative pressure for inhalation."
                },
                {
                    type: "multiple-choice",
                    question: "Which type of muscle is found in the heart?",
                    options: ["Skeletal muscle", "Smooth muscle", "Cardiac muscle", "Striated muscle"],
                    correct: 2,
                    explanation: "Cardiac muscle is the specialized muscle type found only in the heart."
                },
                {
                    type: "true-false",
                    question: "Smooth muscle is under voluntary control.",
                    correct: false,
                    explanation: "False. Smooth muscle is involuntary and controlled by the autonomic nervous system."
                },
                {
                    type: "multiple-choice",
                    question: "What is the largest muscle in the human body?",
                    options: ["Biceps", "Quadriceps", "Gluteus maximus", "Latissimus dorsi"],
                    correct: 2,
                    explanation: "The gluteus maximus is the largest muscle in the human body."
                },
                {
                    type: "multiple-select",
                    question: "Which proteins are involved in muscle contraction? (Select all that apply)",
                    options: ["Actin", "Myosin", "Collagen", "Troponin", "Elastin"],
                    correct: [0, 1, 3],
                    explanation: "Actin, myosin, and troponin are key proteins in the muscle contraction mechanism."
                }
            ],
            "Cardiovascular System": [
                {
                    type: "true-false",
                    question: "The heart has four chambers.",
                    correct: true,
                    explanation: "True. The human heart has four chambers: two atria (left and right) and two ventricles (left and right)."
                },
                {
                    type: "multiple-choice",
                    question: "Which blood vessel carries oxygenated blood from the lungs to the heart?",
                    options: ["Pulmonary artery", "Pulmonary vein", "Aorta", "Vena cava"],
                    correct: 1,
                    explanation: "The pulmonary veins carry oxygenated blood from the lungs back to the left atrium."
                },
                {
                    type: "short-answer",
                    question: "What is the normal resting heart rate range for adults?",
                    correctAnswers: ["60-100", "60 to 100", "60-100 bpm"],
                    explanation: "The normal resting heart rate for adults is 60-100 beats per minute."
                },
                {
                    type: "multiple-choice",
                    question: "Which chamber of the heart has the thickest wall?",
                    options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
                    correct: 3,
                    explanation: "The left ventricle has the thickest wall as it pumps blood to the entire body."
                },
                {
                    type: "true-false",
                    question: "Arteries always carry oxygenated blood.",
                    correct: false,
                    explanation: "False. The pulmonary artery carries deoxygenated blood from the heart to the lungs."
                }
            ],
            "Respiratory System": [
                {
                    type: "multiple-select",
                    question: "Which of the following are parts of the respiratory system? (Select all that apply)",
                    options: ["Lungs", "Heart", "Trachea", "Bronchi", "Stomach"],
                    correct: [0, 2, 3],
                    explanation: "The respiratory system includes the lungs, trachea, and bronchi. The heart is part of the circulatory system, and the stomach is part of the digestive system."
                },
                {
                    type: "multiple-choice",
                    question: "Where does gas exchange occur in the lungs?",
                    options: ["Bronchi", "Bronchioles", "Alveoli", "Trachea"],
                    correct: 2,
                    explanation: "Gas exchange occurs in the alveoli, tiny air sacs in the lungs."
                },
                {
                    type: "true-false",
                    question: "The right lung has three lobes while the left lung has two lobes.",
                    correct: true,
                    explanation: "True. The right lung has three lobes (upper, middle, lower) and the left lung has two lobes (upper, lower)."
                },
                {
                    type: "short-answer",
                    question: "What is the medical term for the voice box?",
                    correctAnswers: ["larynx", "the larynx"],
                    explanation: "The larynx is the medical term for the voice box, containing the vocal cords."
                },
                {
                    type: "multiple-choice",
                    question: "What percentage of oxygen is in the air we breathe?",
                    options: ["16%", "18%", "21%", "25%"],
                    correct: 2,
                    explanation: "Air contains approximately 21% oxygen, 78% nitrogen, and 1% other gases."
                }
            ],
            "Urinary System": [
                {
                    type: "multiple-choice",
                    question: "What is the functional unit of the kidney?",
                    options: ["Glomerulus", "Nephron", "Tubule", "Collecting duct"],
                    correct: 1,
                    explanation: "The nephron is the functional unit of the kidney, responsible for filtering blood and producing urine."
                },
                {
                    type: "true-false",
                    question: "The kidneys are located in the thoracic cavity.",
                    correct: false,
                    explanation: "False. The kidneys are located in the retroperitoneal space in the abdominal cavity."
                },
                {
                    type: "multiple-choice",
                    question: "How much blood do the kidneys filter per day?",
                    options: ["50 liters", "100 liters", "180 liters", "250 liters"],
                    correct: 2,
                    explanation: "The kidneys filter approximately 180 liters of blood per day."
                },
                {
                    type: "short-answer",
                    question: "What hormone regulates water reabsorption in the kidneys?",
                    correctAnswers: ["ADH", "antidiuretic hormone", "vasopressin"],
                    explanation: "ADH (antidiuretic hormone) or vasopressin regulates water reabsorption in the collecting ducts."
                },
                {
                    type: "multiple-select",
                    question: "Which substances are normally found in urine? (Select all that apply)",
                    options: ["Urea", "Glucose", "Creatinine", "Proteins", "Water"],
                    correct: [0, 2, 4],
                    explanation: "Normal urine contains urea, creatinine, and water. Glucose and proteins should not be present in significant amounts."
                }
            ]
        }
    },

    biochemistry: {
        topics: {
            "Cellular Energy": [
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
                    type: "multiple-choice",
                    question: "What is the end product of glycolysis?",
                    options: ["Glucose", "Pyruvate", "Lactate", "Acetyl-CoA"],
                    correct: 1,
                    explanation: "Glycolysis breaks down glucose into two molecules of pyruvate, producing ATP and NADH."
                },
                {
                    type: "multiple-select",
                    question: "Which of the following are products of cellular respiration? (Select all that apply)",
                    options: ["ATP", "Carbon dioxide", "Oxygen", "Water", "Glucose"],
                    correct: [0, 1, 3],
                    explanation: "Cellular respiration produces ATP, carbon dioxide, and water. Oxygen and glucose are reactants, not products."
                },
                {
                    type: "short-answer",
                    question: "How many ATP molecules are produced from one glucose molecule in cellular respiration?",
                    correctAnswers: ["36", "38", "36-38"],
                    explanation: "Cellular respiration typically produces 36-38 ATP molecules per glucose molecule."
                }
            ],
            "Enzymes and Catalysis": [
                {
                    type: "true-false",
                    question: "Enzymes are consumed during chemical reactions.",
                    correct: false,
                    explanation: "False. Enzymes are catalysts that speed up reactions but are not consumed in the process."
                },
                {
                    type: "short-answer",
                    question: "What enzyme breaks down starch into glucose?",
                    correctAnswers: ["amylase", "alpha-amylase"],
                    explanation: "Amylase is the enzyme responsible for breaking down starch into glucose molecules."
                },
                {
                    type: "multiple-choice",
                    question: "What factors affect enzyme activity?",
                    options: ["Temperature only", "pH only", "Temperature and pH", "Substrate concentration only"],
                    correct: 2,
                    explanation: "Enzyme activity is affected by temperature, pH, substrate concentration, and inhibitors."
                },
                {
                    type: "multiple-choice",
                    question: "What is the active site of an enzyme?",
                    options: ["The entire enzyme", "The binding site for substrate", "The product release site", "The allosteric site"],
                    correct: 1,
                    explanation: "The active site is the specific region where the substrate binds and the reaction occurs."
                },
                {
                    type: "true-false",
                    question: "Competitive inhibitors bind to the active site of enzymes.",
                    correct: true,
                    explanation: "True. Competitive inhibitors compete with substrate for the active site."
                }
            ],
            "Acid-Base Chemistry": [
                {
                    type: "multiple-choice",
                    question: "What is the pH of normal human blood?",
                    options: ["6.8", "7.0", "7.4", "8.0"],
                    correct: 2,
                    explanation: "Normal human blood pH is approximately 7.4, which is slightly alkaline."
                },
                {
                    type: "multiple-choice",
                    question: "What is the Henderson-Hasselbalch equation used for?",
                    options: ["Calculating enzyme kinetics", "Calculating pH of buffer systems", "Calculating reaction rates", "Calculating concentration"],
                    correct: 1,
                    explanation: "The Henderson-Hasselbalch equation calculates pH of buffer systems."
                },
                {
                    type: "true-false",
                    question: "A solution with pH 3 is more acidic than a solution with pH 5.",
                    correct: true,
                    explanation: "True. Lower pH values indicate higher acidity."
                },
                {
                    type: "short-answer",
                    question: "What is the pKa of the bicarbonate buffer system?",
                    correctAnswers: ["6.1", "6.10"],
                    explanation: "The pKa of the bicarbonate buffer system (H2CO3/HCO3-) is 6.1."
                },
                {
                    type: "multiple-choice",
                    question: "Which buffer system is most important in blood?",
                    options: ["Phosphate buffer", "Bicarbonate buffer", "Protein buffer", "Hemoglobin buffer"],
                    correct: 1,
                    explanation: "The bicarbonate buffer system is the most important buffer in blood plasma."
                }
            ],
            "Vitamins and Cofactors": [
                {
                    type: "short-answer",
                    question: "What vitamin is synthesized by the skin when exposed to sunlight?",
                    correctAnswers: ["vitamin d", "vitamin d3", "cholecalciferol"],
                    explanation: "Vitamin D is synthesized in the skin when 7-dehydrocholesterol is exposed to UVB radiation from sunlight."
                },
                {
                    type: "multiple-choice",
                    question: "Which vitamin is a coenzyme in the citric acid cycle?",
                    options: ["Vitamin A", "Vitamin B1 (Thiamine)", "Vitamin C", "Vitamin K"],
                    correct: 1,
                    explanation: "Thiamine (Vitamin B1) is converted to TPP, a coenzyme in pyruvate dehydrogenase and α-ketoglutarate dehydrogenase."
                },
                {
                    type: "true-false",
                    question: "Fat-soluble vitamins can be stored in the body.",
                    correct: true,
                    explanation: "True. Fat-soluble vitamins (A, D, E, K) can be stored in adipose tissue and liver."
                },
                {
                    type: "multiple-select",
                    question: "Which are water-soluble vitamins? (Select all that apply)",
                    options: ["Vitamin A", "Vitamin C", "Vitamin B12", "Vitamin D", "Folate"],
                    correct: [1, 2, 4],
                    explanation: "Water-soluble vitamins include vitamin C, B vitamins (including B12), and folate."
                },
                {
                    type: "multiple-choice",
                    question: "What metal ion is found in vitamin B12?",
                    options: ["Iron", "Zinc", "Cobalt", "Magnesium"],
                    correct: 2,
                    explanation: "Vitamin B12 (cobalamin) contains a cobalt ion at its center."
                }
            ],
            "Lipid Biochemistry": [
                {
                    type: "multiple-choice",
                    question: "Which fatty acid is essential and cannot be synthesized by humans?",
                    options: ["Palmitic acid", "Stearic acid", "Linoleic acid", "Oleic acid"],
                    correct: 2,
                    explanation: "Linoleic acid is an essential fatty acid that must be obtained from diet."
                },
                {
                    type: "true-false",
                    question: "Cholesterol is synthesized primarily in the liver.",
                    correct: true,
                    explanation: "True. The liver is the primary site of cholesterol synthesis in the body."
                },
                {
                    type: "multiple-choice",
                    question: "What enzyme is the rate-limiting step in cholesterol synthesis?",
                    options: ["HMG-CoA synthase", "HMG-CoA reductase", "Acetyl-CoA carboxylase", "Fatty acid synthase"],
                    correct: 1,
                    explanation: "HMG-CoA reductase is the rate-limiting enzyme in cholesterol synthesis."
                },
                {
                    type: "short-answer",
                    question: "What is the storage form of glucose in animals?",
                    correctAnswers: ["glycogen"],
                    explanation: "Glycogen is the storage form of glucose in animals, primarily stored in liver and muscle."
                },
                {
                    type: "multiple-choice",
                    question: "Beta-oxidation occurs in which cellular compartment?",
                    options: ["Cytoplasm", "Mitochondria", "Endoplasmic reticulum", "Nucleus"],
                    correct: 1,
                    explanation: "Beta-oxidation of fatty acids occurs in the mitochondrial matrix."
                }
            ]
        }
    },

    cellbiology: {
        topics: {
            "Cell Structure and Organelles": [
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
                    type: "multiple-select",
                    question: "Which organelles are involved in the endomembrane system? (Select all that apply)",
                    options: ["Nucleus", "Endoplasmic reticulum", "Golgi apparatus", "Mitochondria", "Lysosomes"],
                    correct: [0, 1, 2, 4],
                    explanation: "The endomembrane system includes the nucleus, ER, Golgi apparatus, and lysosomes. Mitochondria are not part of this system."
                },
                {
                    type: "multiple-choice",
                    question: "What is the function of the Golgi apparatus?",
                    options: ["Protein synthesis", "ATP production", "Protein modification and packaging", "DNA replication"],
                    correct: 2,
                    explanation: "The Golgi apparatus modifies, packages, and ships proteins received from the ER."
                },
                {
                    type: "short-answer",
                    question: "What organelle contains digestive enzymes?",
                    correctAnswers: ["lysosomes", "lysosome"],
                    explanation: "Lysosomes contain digestive enzymes and are responsible for breaking down cellular waste."
                }
            ],
            "Cell Membrane and Transport": [
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
                },
                {
                    type: "multiple-choice",
                    question: "Which type of transport requires energy?",
                    options: ["Passive diffusion", "Facilitated diffusion", "Active transport", "Osmosis"],
                    correct: 2,
                    explanation: "Active transport requires energy (ATP) to move substances against their concentration gradient."
                },
                {
                    type: "multiple-select",
                    question: "Which processes require no cellular energy? (Select all that apply)",
                    options: ["Simple diffusion", "Facilitated diffusion", "Active transport", "Osmosis", "Endocytosis"],
                    correct: [0, 1, 3],
                    explanation: "Simple diffusion, facilitated diffusion, and osmosis are passive processes requiring no energy."
                },
                {
                    type: "short-answer",
                    question: "What is the fluid mosaic model?",
                    correctAnswers: ["cell membrane model", "membrane structure model"],
                    explanation: "The fluid mosaic model describes the cell membrane as a flexible structure with proteins embedded in a phospholipid bilayer."
                }
            ],
            "Cell Division": [
                {
                    type: "short-answer",
                    question: "During which phase of mitosis do chromosomes align at the cell's equator?",
                    correctAnswers: ["metaphase", "meta phase"],
                    explanation: "During metaphase, chromosomes align at the metaphase plate (cell's equator) before separation."
                },
                {
                    type: "multiple-choice",
                    question: "How many phases are there in mitosis?",
                    options: ["3", "4", "5", "6"],
                    correct: 1,
                    explanation: "Mitosis has 4 phases: prophase, metaphase, anaphase, and telophase."
                },
                {
                    type: "true-false",
                    question: "Meiosis produces genetically identical cells.",
                    correct: false,
                    explanation: "False. Meiosis produces genetically diverse gametes through crossing over and independent assortment."
                },
                {
                    type: "multiple-choice",
                    question: "In which phase do sister chromatids separate?",
                    options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
                    correct: 2,
                    explanation: "Sister chromatids separate during anaphase and move to opposite poles of the cell."
                },
                {
                    type: "multiple-choice",
                    question: "What is the result of meiosis in humans?",
                    options: ["2 diploid cells", "4 diploid cells", "2 haploid cells", "4 haploid cells"],
                    correct: 3,
                    explanation: "Meiosis produces 4 haploid gametes from one diploid cell."
                }
            ],
            "Cell Signaling": [
                {
                    type: "multiple-choice",
                    question: "What are the three stages of cell signaling?",
                    options: ["Reception, transmission, response", "Reception, transduction, response", "Binding, activation, termination", "Initiation, propagation, termination"],
                    correct: 1,
                    explanation: "Cell signaling involves reception (signal binding), transduction (signal processing), and response (cellular change)."
                },
                {
                    type: "true-false",
                    question: "Second messengers amplify cellular signals.",
                    correct: true,
                    explanation: "True. Second messengers like cAMP and IP3 amplify signals by activating multiple downstream targets."
                },
                {
                    type: "multiple-choice",
                    question: "Which molecule is a common second messenger?",
                    options: ["ATP", "cAMP", "DNA", "Glucose"],
                    correct: 1,
                    explanation: "cAMP (cyclic adenosine monophosphate) is a widely used second messenger in cell signaling."
                },
                {
                    type: "short-answer",
                    question: "What type of receptor spans the cell membrane?",
                    correctAnswers: ["transmembrane receptor", "integral membrane receptor"],
                    explanation: "Transmembrane receptors span the cell membrane and can receive signals from outside the cell."
                },
                {
                    type: "multiple-choice",
                    question: "What happens during signal transduction?",
                    options: ["Signal binds to receptor", "Signal is amplified and processed", "Cell produces a response", "Signal is terminated"],
                    correct: 1,
                    explanation: "Signal transduction is the process where the signal is amplified and processed inside the cell."
                }
            ],
            "Cellular Respiration and Photosynthesis": [
                {
                    type: "multiple-choice",
                    question: "Where does the citric acid cycle occur?",
                    options: ["Cytoplasm", "Mitochondrial matrix", "Inner mitochondrial membrane", "Outer mitochondrial membrane"],
                    correct: 1,
                    explanation: "The citric acid cycle (Krebs cycle) occurs in the mitochondrial matrix."
                },
                {
                    type: "true-false",
                    question: "Photosynthesis occurs in the chloroplasts.",
                    correct: true,
                    explanation: "True. Photosynthesis occurs in chloroplasts, specifically in the thylakoids and stroma."
                },
                {
                    type: "multiple-choice",
                    question: "What is the overall equation for photosynthesis?",
                    options: ["6CO2 + 6H2O + light → C6H12O6 + 6O2", "C6H12O6 + 6O2 → 6CO2 + 6H2O + ATP", "Both equations", "Neither equation"],
                    correct: 0,
                    explanation: "Photosynthesis: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2."
                },
                {
                    type: "short-answer",
                    question: "What pigment captures light energy in photosynthesis?",
                    correctAnswers: ["chlorophyll", "chlorophyll a"],
                    explanation: "Chlorophyll (primarily chlorophyll a) is the main pigment that captures light energy for photosynthesis."
                },
                {
                    type: "multiple-select",
                    question: "Which processes produce ATP? (Select all that apply)",
                    options: ["Glycolysis", "Citric acid cycle", "Electron transport chain", "Calvin cycle", "Light reactions"],
                    correct: [0, 1, 2, 4],
                    explanation: "ATP is produced in glycolysis, citric acid cycle, electron transport chain, and light reactions of photosynthesis."
                }
            ]
        }
    },

    genetics: {
        topics: {
            "DNA Structure and Function": [
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
                    type: "multiple-select",
                    question: "Which of the following are DNA bases? (Select all that apply)",
                    options: ["Adenine", "Uracil", "Guanine", "Cytosine", "Thymine"],
                    correct: [0, 2, 3, 4],
                    explanation: "DNA contains Adenine, Guanine, Cytosine, and Thymine. Uracil is found in RNA, not DNA."
                },
                {
                    type: "multiple-choice",
                    question: "What type of bonds hold the two DNA strands together?",
                    options: ["Covalent bonds", "Ionic bonds", "Hydrogen bonds", "Van der Waals forces"],
                    correct: 2,
                    explanation: "Hydrogen bonds between complementary base pairs hold the two DNA strands together."
                },
                {
                    type: "true-false",
                    question: "DNA replication is semiconservative.",
                    correct: true,
                    explanation: "True. Each new DNA molecule contains one original strand and one newly synthesized strand."
                }
            ],
            "Gene Expression": [
                {
                    type: "true-false",
                    question: "A codon consists of three nucleotides.",
                    correct: true,
                    explanation: "True. A codon is a sequence of three nucleotides that codes for a specific amino acid."
                },
                {
                    type: "true-false",
                    question: "Transcription creates proteins from RNA.",
                    correct: false,
                    explanation: "False. Transcription creates RNA from DNA. Translation creates proteins from RNA."
                },
                {
                    type: "multiple-choice",
                    question: "Where does transcription occur in eukaryotes?",
                    options: ["Cytoplasm", "Nucleus", "Mitochondria", "Ribosome"],
                    correct: 1,
                    explanation: "In eukaryotes, transcription occurs in the nucleus where DNA is located."
                },
                {
                    type: "short-answer",
                    question: "What enzyme synthesizes RNA during transcription?",
                    correctAnswers: ["RNA polymerase", "rna polymerase"],
                    explanation: "RNA polymerase is the enzyme that synthesizes RNA from a DNA template during transcription."
                },
                {
                    type: "multiple-choice",
                    question: "How many codons code for amino acids?",
                    options: ["20", "61", "64", "67"],
                    correct: 1,
                    explanation: "61 codons code for amino acids, while 3 are stop codons (UAG, UAA, UGA)."
                }
            ],
            "Inheritance Patterns": [
                {
                    type: "multiple-choice",
                    question: "Which inheritance pattern requires both parents to carry a gene for offspring to be affected?",
                    options: ["Dominant", "Recessive", "X-linked", "Codominant"],
                    correct: 1,
                    explanation: "Recessive inheritance requires both parents to carry the gene for offspring to express the trait."
                },
                {
                    type: "multiple-choice",
                    question: "In a cross between two heterozygotes (Aa × Aa), what is the phenotypic ratio?",
                    options: ["1:1", "1:2:1", "3:1", "9:3:3:1"],
                    correct: 2,
                    explanation: "A monohybrid cross between heterozygotes produces a 3:1 phenotypic ratio (3 dominant : 1 recessive)."
                },
                {
                    type: "true-false",
                    question: "X-linked traits are more common in males than females.",
                    correct: true,
                    explanation: "True. Males have only one X chromosome, so they express X-linked recessive traits more frequently."
                },
                {
                    type: "short-answer",
                    question: "What is the genetic makeup of an individual called?",
                    correctAnswers: ["genotype"],
                    explanation: "The genotype is the genetic makeup or genetic constitution of an individual."
                },
                {
                    type: "multiple-choice",
                    question: "What type of inheritance shows both traits equally?",
                    options: ["Complete dominance", "Incomplete dominance", "Codominance", "Multiple alleles"],
                    correct: 2,
                    explanation: "Codominance shows both alleles equally, like AB blood type where both A and B are expressed."
                }
            ],
            "Molecular Genetics": [
                {
                    type: "multiple-choice",
                    question: "What is a mutation?",
                    options: ["Change in DNA sequence", "Change in protein structure", "Change in cell division", "Change in metabolism"],
                    correct: 0,
                    explanation: "A mutation is a change in the DNA sequence that can affect gene function."
                },
                {
                    type: "multiple-select",
                    question: "Which are types of point mutations? (Select all that apply)",
                    options: ["Silent", "Missense", "Nonsense", "Insertion", "Deletion"],
                    correct: [0, 1, 2],
                    explanation: "Point mutations include silent, missense, and nonsense mutations. Insertions and deletions are frameshift mutations."
                },
                {
                    type: "true-false",
                    question: "PCR stands for Polymerase Chain Reaction.",
                    correct: true,
                    explanation: "True. PCR (Polymerase Chain Reaction) is a technique used to amplify DNA sequences."
                },
                {
                    type: "short-answer",
                    question: "What technique is used to separate DNA fragments by size?",
                    correctAnswers: ["gel electrophoresis", "electrophoresis"],
                    explanation: "Gel electrophoresis separates DNA fragments based on their size through an electric field."
                },
                {
                    type: "multiple-choice",
                    question: "What is CRISPR used for?",
                    options: ["DNA sequencing", "Gene editing", "Protein synthesis", "Cell division"],
                    correct: 1,
                    explanation: "CRISPR-Cas9 is a revolutionary gene editing tool that can precisely modify DNA sequences."
                }
            ],
            "Population Genetics": [
                {
                    type: "multiple-choice",
                    question: "What does the Hardy-Weinberg principle describe?",
                    options: ["Mutation rates", "Allele frequencies in populations", "Gene expression", "Protein folding"],
                    correct: 1,
                    explanation: "The Hardy-Weinberg principle describes allele and genotype frequencies in populations under equilibrium."
                },
                {
                    type: "true-false",
                    question: "Genetic drift has a larger effect in small populations.",
                    correct: true,
                    explanation: "True. Genetic drift (random changes in allele frequencies) has a greater impact in smaller populations."
                },
                {
                    type: "multiple-choice",
                    question: "What is gene flow?",
                    options: ["Movement of genes between populations", "Change in gene expression", "Gene duplication", "Gene deletion"],
                    correct: 0,
                    explanation: "Gene flow is the movement of alleles between populations through migration and breeding."
                },
                {
                    type: "short-answer",
                    question: "What is the bottleneck effect?",
                    correctAnswers: ["population bottleneck", "genetic bottleneck"],
                    explanation: "A bottleneck effect occurs when a population's size is significantly reduced, reducing genetic diversity."
                },
                {
                    type: "multiple-choice",
                    question: "Which factor can change allele frequencies in a population?",
                    options: ["Natural selection", "Genetic drift", "Gene flow", "All of the above"],
                    correct: 3,
                    explanation: "Natural selection, genetic drift, and gene flow can all change allele frequencies in populations."
                }
            ]
        }
    },

    physiology: {
        topics: {
            "Cardiovascular Physiology": [
                {
                    type: "multiple-choice",
                    question: "What is the average cardiac output at rest?",
                    options: ["3-4 L/min", "5-6 L/min", "7-8 L/min", "9-10 L/min"],
                    correct: 1,
                    explanation: "The average cardiac output at rest is approximately 5-6 liters per minute."
                },
                {
                    type: "true-false",
                    question: "Blood pressure is highest during systole.",
                    correct: true,
                    explanation: "True. Systolic pressure occurs when the heart contracts, creating the highest pressure in arteries."
                },
                {
                    type: "multiple-choice",
                    question: "What is the normal blood pressure for a healthy adult?",
                    options: ["90/60 mmHg", "120/80 mmHg", "140/90 mmHg", "160/100 mmHg"],
                    correct: 1,
                    explanation: "Normal blood pressure for healthy adults is around 120/80 mmHg."
                },
                {
                    type: "short-answer",
                    question: "What is the term for the relaxation phase of the cardiac cycle?",
                    correctAnswers: ["diastole", "diastolic phase"],
                    explanation: "Diastole is the relaxation phase when the heart fills with blood."
                },
                {
                    type: "multiple-choice",
                    question: "Which factor does NOT affect cardiac output?",
                    options: ["Heart rate", "Stroke volume", "Blood type", "Contractility"],
                    correct: 2,
                    explanation: "Cardiac output = heart rate × stroke volume. Blood type does not directly affect cardiac output."
                }
            ],
            "Respiratory Physiology": [
                {
                    type: "multiple-choice",
                    question: "What is the normal respiratory rate for adults at rest?",
                    options: ["8-10 breaths/min", "12-20 breaths/min", "25-30 breaths/min", "35-40 breaths/min"],
                    correct: 1,
                    explanation: "Normal respiratory rate for adults at rest is 12-20 breaths per minute."
                },
                {
                    type: "true-false",
                    question: "Carbon dioxide is the primary stimulus for breathing.",
                    correct: true,
                    explanation: "True. Increased CO2 levels in blood are the primary stimulus that triggers breathing."
                },
                {
                    type: "short-answer",
                    question: "What is the total lung capacity of an average adult?",
                    correctAnswers: ["6 liters", "6000 ml", "6L"],
                    explanation: "Total lung capacity is approximately 6 liters in healthy adults."
                },
                {
                    type: "multiple-choice",
                    question: "Which muscles are involved in forced expiration?",
                    options: ["Diaphragm only", "External intercostals", "Internal intercostals and abdominals", "Sternocleidomastoid"],
                    correct: 2,
                    explanation: "Forced expiration involves internal intercostal muscles and abdominal muscles."
                },
                {
                    type: "multiple-select",
                    question: "What factors affect oxygen binding to hemoglobin? (Select all that apply)",
                    options: ["pH", "Temperature", "CO2 levels", "Blood pressure", "2,3-BPG"],
                    correct: [0, 1, 2, 4],
                    explanation: "pH, temperature, CO2 levels, and 2,3-BPG all affect oxygen-hemoglobin binding."
                }
            ],
            "Endocrine Physiology": [
                {
                    type: "true-false",
                    question: "Insulin is produced by the pancreas.",
                    correct: true,
                    explanation: "True. Insulin is produced by the beta cells in the islets of Langerhans in the pancreas."
                },
                {
                    type: "multiple-select",
                    question: "Which hormones are produced by the adrenal glands? (Select all that apply)",
                    options: ["Cortisol", "Insulin", "Adrenaline", "Aldosterone", "Thyroxine"],
                    correct: [0, 2, 3],
                    explanation: "The adrenal glands produce cortisol, adrenaline (epinephrine), and aldosterone. Insulin is from the pancreas, and thyroxine is from the thyroid."
                },
                {
                    type: "short-answer",
                    question: "What hormone regulates blood sugar levels?",
                    correctAnswers: ["insulin", "insulin and glucagon"],
                    explanation: "Insulin (and glucagon) are the primary hormones that regulate blood glucose levels."
                },
                {
                    type: "multiple-choice",
                    question: "Which gland is known as the 'master gland'?",
                    options: ["Thyroid", "Adrenal", "Pituitary", "Pancreas"],
                    correct: 2,
                    explanation: "The pituitary gland is called the 'master gland' because it controls other endocrine glands."
                },
                {
                    type: "true-false",
                    question: "Growth hormone is released primarily during sleep.",
                    correct: true,
                    explanation: "True. Growth hormone is released in pulses, with the largest release occurring during deep sleep."
                }
            ],
            "Neurophysiology": [
                {
                    type: "multiple-choice",
                    question: "Which part of the brain controls balance and coordination?",
                    options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"],
                    correct: 1,
                    explanation: "The cerebellum is responsible for balance, coordination, and fine motor control."
                },
                {
                    type: "true-false",
                    question: "The left hemisphere of the brain controls the right side of the body.",
                    correct: true,
                    explanation: "True. Due to the crossing of nerve fibers, the left hemisphere controls the right side of the body and vice versa."
                },
                {
                    type: "multiple-choice",
                    question: "What is the resting membrane potential of a typical neuron?",
                    options: ["-50 mV", "-70 mV", "-90 mV", "-110 mV"],
                    correct: 1,
                    explanation: "The resting membrane potential is approximately -70 mV in most neurons."
                },
                {
                    type: "short-answer",
                    question: "What neurotransmitter is primarily involved in muscle contraction?",
                    correctAnswers: ["acetylcholine", "ACh"],
                    explanation: "Acetylcholine (ACh) is the primary neurotransmitter at the neuromuscular junction."
                },
                {
                    type: "multiple-choice",
                    question: "Which structure connects the two cerebral hemispheres?",
                    options: ["Corpus callosum", "Brain stem", "Cerebellum", "Thalamus"],
                    correct: 0,
                    explanation: "The corpus callosum is a large bundle of nerve fibers connecting the two hemispheres."
                }
            ],
            "Renal Physiology": [
                {
                    type: "multiple-choice",
                    question: "What is the normal pH range of human blood?",
                    options: ["7.0-7.2", "7.35-7.45", "7.5-7.6", "6.8-7.0"],
                    correct: 1,
                    explanation: "The normal pH range of human blood is 7.35-7.45, which is slightly alkaline."
                },
                {
                    type: "short-answer",
                    question: "What is the primary function of red blood cells?",
                    correctAnswers: ["carry oxygen", "transport oxygen", "oxygen transport", "oxygen delivery"],
                    explanation: "The primary function of red blood cells (erythrocytes) is to carry oxygen from the lungs to body tissues."
                },
                {
                    type: "multiple-choice",
                    question: "What percentage of cardiac output goes to the kidneys?",
                    options: ["10%", "15%", "20%", "25%"],
                    correct: 3,
                    explanation: "Approximately 25% of cardiac output goes to the kidneys for filtration."
                },
                {
                    type: "true-false",
                    question: "The kidneys play a role in blood pressure regulation.",
                    correct: true,
                    explanation: "True. Kidneys regulate blood pressure through the renin-angiotensin-aldosterone system."
                },
                {
                    type: "multiple-choice",
                    question: "What is the normal urine output per day?",
                    options: ["500-800 mL", "800-1200 mL", "1200-1800 mL", "1800-2400 mL"],
                    correct: 2,
                    explanation: "Normal daily urine output is approximately 1200-1800 mL."
                }
            ]
        }
    },

    microbiology: {
        topics: {
            "Bacterial Morphology and Classification": [
                {
                    type: "multiple-choice",
                    question: "Which of the following is NOT a type of bacteria based on shape?",
                    options: ["Cocci", "Bacilli", "Spirilla", "Viruses"],
                    correct: 3,
                    explanation: "Viruses are not bacteria and are not classified by shape like bacteria are."
                },
                {
                    type: "multiple-choice",
                    question: "Which staining method is used to differentiate bacteria into two major groups?",
                    options: ["Acid-fast stain", "Gram stain", "Spore stain", "Capsule stain"],
                    correct: 1,
                    explanation: "Gram staining differentiates bacteria into Gram-positive and Gram-negative based on cell wall structure."
                },
                {
                    type: "true-false",
                    question: "All bacteria have peptidoglycan in their cell walls.",
                    correct: false,
                    explanation: "False. Gram-positive bacteria have thick peptidoglycan layers, while Gram-negative have thin layers."
                },
                {
                    type: "multiple-choice",
                    question: "What shape are cocci bacteria?",
                    options: ["Rod-shaped", "Spiral-shaped", "Spherical", "Comma-shaped"],
                    correct: 2,
                    explanation: "Cocci are spherical or round-shaped bacteria."
                },
                {
                    type: "short-answer",
                    question: "What are spiral-shaped bacteria called?",
                    correctAnswers: ["spirilla", "spirochetes"],
                    explanation: "Spiral-shaped bacteria are called spirilla or spirochetes depending on their specific morphology."
                }
            ],
            "Bacterial Growth and Survival": [
                {
                    type: "multiple-choice",
                    question: "What is the most heat-resistant form of bacterial life?",
                    options: ["Vegetative cells", "Spores", "Cysts", "Biofilms"],
                    correct: 1,
                    explanation: "Bacterial spores are extremely heat-resistant and can survive harsh conditions."
                },
                {
                    type: "multiple-choice",
                    question: "What is binary fission?",
                    options: ["Sexual reproduction", "Asexual reproduction", "Spore formation", "Conjugation"],
                    correct: 1,
                    explanation: "Binary fission is the asexual reproduction method where bacteria divide into two identical cells."
                },
                {
                    type: "true-false",
                    question: "Bacteria can only grow in the presence of oxygen.",
                    correct: false,
                    explanation: "False. Some bacteria are anaerobic and grow without oxygen, while others require oxygen."
                },
                {
                    type: "multiple-choice",
                    question: "What is the generation time of E. coli under optimal conditions?",
                    options: ["10 minutes", "20 minutes", "30 minutes", "60 minutes"],
                    correct: 1,
                    explanation: "E. coli has a generation time of approximately 20 minutes under optimal conditions."
                },
                {
                    type: "short-answer",
                    question: "What is the lag phase in bacterial growth?",
                    correctAnswers: ["adaptation phase", "adjustment phase"],
                    explanation: "The lag phase is when bacteria adapt to new environmental conditions before exponential growth begins."
                }
            ],
            "Fungi and Parasites": [
                {
                    type: "multiple-choice",
                    question: "What is the primary component of fungal cell walls?",
                    options: ["Cellulose", "Peptidoglycan", "Chitin", "Protein"],
                    correct: 2,
                    explanation: "Chitin is the primary structural component of fungal cell walls."
                },
                {
                    type: "multiple-choice",
                    question: "Which microorganism is responsible for causing malaria?",
                    options: ["Bacteria", "Virus", "Protozoan", "Fungus"],
                    correct: 2,
                    explanation: "Malaria is caused by Plasmodium species, which are protozoans transmitted by mosquitoes."
                },
                {
                    type: "true-false",
                    question: "Fungi are prokaryotic organisms.",
                    correct: false,
                    explanation: "False. Fungi are eukaryotic organisms with membrane-bound nuclei and organelles."
                },
                {
                    type: "multiple-choice",
                    question: "What type of reproduction do yeasts primarily use?",
                    options: ["Binary fission", "Budding", "Fragmentation", "Conjugation"],
                    correct: 1,
                    explanation: "Yeasts primarily reproduce asexually through budding."
                },
                {
                    type: "short-answer",
                    question: "What is the vector for malaria transmission?",
                    correctAnswers: ["mosquito", "anopheles mosquito"],
                    explanation: "Malaria is transmitted by Anopheles mosquitoes that carry Plasmodium parasites."
                }
            ],
            "Viruses and Viral Infections": [
                {
                    type: "true-false",
                    question: "Viruses can reproduce independently.",
                    correct: false,
                    explanation: "False. Viruses are obligate intracellular parasites that require host cells to reproduce."
                },
                {
                    type: "multiple-choice",
                    question: "What is the protein coat of a virus called?",
                    options: ["Capsid", "Envelope", "Core", "Matrix"],
                    correct: 0,
                    explanation: "The capsid is the protein coat that surrounds and protects viral genetic material."
                },
                {
                    type: "multiple-choice",
                    question: "Which virus causes AIDS?",
                    options: ["HSV", "HPV", "HIV", "HBV"],
                    correct: 2,
                    explanation: "HIV (Human Immunodeficiency Virus) causes AIDS (Acquired Immunodeficiency Syndrome)."
                },
                {
                    type: "short-answer",
                    question: "What are bacteriophages?",
                    correctAnswers: ["viruses that infect bacteria", "bacterial viruses"],
                    explanation: "Bacteriophages are viruses that specifically infect and replicate within bacteria."
                },
                {
                    type: "multiple-choice",
                    question: "What is the lytic cycle?",
                    options: ["Viral dormancy", "Immediate viral replication and cell death", "Slow viral integration", "Viral mutation"],
                    correct: 1,
                    explanation: "The lytic cycle involves immediate viral replication followed by host cell lysis and death."
                }
            ],
            "Antimicrobials and Resistance": [
                {
                    type: "multiple-choice",
                    question: "What is the mechanism of action of penicillin?",
                    options: ["Protein synthesis inhibition", "Cell wall synthesis inhibition", "DNA replication inhibition", "Cell membrane disruption"],
                    correct: 1,
                    explanation: "Penicillin inhibits bacterial cell wall synthesis by targeting peptidoglycan formation."
                },
                {
                    type: "true-false",
                    question: "Antibiotics are effective against viral infections.",
                    correct: false,
                    explanation: "False. Antibiotics target bacterial structures and processes, not viral components."
                },
                {
                    type: "multiple-choice",
                    question: "What is MRSA?",
                    options: ["A viral infection", "Methicillin-resistant Staphylococcus aureus", "A fungal disease", "A parasitic infection"],
                    correct: 1,
                    explanation: "MRSA is Methicillin-resistant Staphylococcus aureus, a bacteria resistant to many antibiotics."
                },
                {
                    type: "short-answer",
                    question: "What is antibiotic resistance?",
                    correctAnswers: ["bacterial resistance to antibiotics", "drug resistance"],
                    explanation: "Antibiotic resistance is the ability of bacteria to survive and multiply despite the presence of antibiotics."
                },
                {
                    type: "multiple-choice",
                    question: "Which process leads to antibiotic resistance?",
                    options: ["Mutation only", "Horizontal gene transfer only", "Both mutation and gene transfer", "Viral infection"],
                    correct: 2,
                    explanation: "Antibiotic resistance develops through both spontaneous mutations and horizontal gene transfer between bacteria."
                }
            ]
        }
    },

    pharmacology: {
        topics: {
            "Pharmacokinetics": [
                {
                    type: "multiple-choice",
                    question: "What is the study of drug absorption, distribution, metabolism, and excretion called?",
                    options: ["Pharmacodynamics", "Pharmacokinetics", "Toxicology", "Posology"],
                    correct: 1,
                    explanation: "Pharmacokinetics studies what the body does to drugs (ADME processes)."
                },
                {
                    type: "multiple-choice",
                    question: "Which route of drug administration provides 100% bioavailability?",
                    options: ["Oral", "Intramuscular", "Intravenous", "Sublingual"],
                    correct: 2,
                    explanation: "Intravenous administration provides 100% bioavailability as the drug goes directly into circulation."
                },
                {
                    type: "multiple-choice",
                    question: "What does 'half-life' mean in pharmacology?",
                    options: ["Time to reach peak concentration", "Time for 50% drug elimination", "Duration of action", "Time to onset"],
                    correct: 1,
                    explanation: "Half-life is the time required for the drug concentration to decrease by 50%."
                },
                {
                    type: "short-answer",
                    question: "What does ADME stand for in pharmacokinetics?",
                    correctAnswers: ["absorption distribution metabolism excretion", "absorption, distribution, metabolism, excretion"],
                    explanation: "ADME stands for Absorption, Distribution, Metabolism, and Excretion - the four main pharmacokinetic processes."
                },
                {
                    type: "true-false",
                    question: "First-pass metabolism occurs in the liver.",
                    correct: true,
                    explanation: "True. First-pass metabolism occurs when orally administered drugs are metabolized by the liver before reaching systemic circulation."
                }
            ],
            "Pharmacodynamics": [
                {
                    type: "multiple-choice",
                    question: "What is the term for the minimum concentration of drug needed to produce an effect?",
                    options: ["ED50", "LD50", "Threshold dose", "Toxic dose"],
                    correct: 2,
                    explanation: "Threshold dose is the minimum concentration required to produce a measurable effect."
                },
                {
                    type: "multiple-choice",
                    question: "What does ED50 represent?",
                    options: ["Effective dose for 50% of population", "Lethal dose for 50%", "Threshold dose", "Maximum safe dose"],
                    correct: 0,
                    explanation: "ED50 is the dose that produces the desired effect in 50% of the population."
                },
                {
                    type: "true-false",
                    question: "Agonists activate receptors while antagonists block them.",
                    correct: true,
                    explanation: "True. Agonists bind to and activate receptors, while antagonists bind but do not activate receptors."
                },
                {
                    type: "short-answer",
                    question: "What is the therapeutic index?",
                    correctAnswers: ["ratio of toxic to therapeutic dose", "LD50/ED50"],
                    explanation: "Therapeutic index is the ratio between the toxic dose and therapeutic dose, indicating drug safety."
                },
                {
                    type: "multiple-choice",
                    question: "What type of antagonist competes for the same binding site?",
                    options: ["Competitive", "Non-competitive", "Irreversible", "Allosteric"],
                    correct: 0,
                    explanation: "Competitive antagonists compete with agonists for the same receptor binding site."
                }
            ],
            "Drug Metabolism": [
                {
                    type: "multiple-choice",
                    question: "Which enzyme is responsible for metabolizing many drugs in the liver?",
                    options: ["Cytochrome P450", "Monoamine oxidase", "Acetylcholinesterase", "Phospholipase"],
                    correct: 0,
                    explanation: "Cytochrome P450 enzymes are the primary drug-metabolizing enzymes in the liver."
                },
                {
                    type: "multiple-choice",
                    question: "What are Phase I drug metabolism reactions?",
                    options: ["Conjugation reactions", "Oxidation, reduction, hydrolysis", "Protein binding", "Renal excretion"],
                    correct: 1,
                    explanation: "Phase I reactions include oxidation, reduction, and hydrolysis, primarily by cytochrome P450 enzymes."
                },
                {
                    type: "true-false",
                    question: "Phase II metabolism reactions make drugs more water-soluble.",
                    correct: true,
                    explanation: "True. Phase II conjugation reactions increase drug water solubility for easier excretion."
                },
                {
                    type: "short-answer",
                    question: "What is enzyme induction?",
                    correctAnswers: ["increased enzyme production", "upregulation of enzymes"],
                    explanation: "Enzyme induction is the increased production of drug-metabolizing enzymes, often leading to faster drug clearance."
                },
                {
                    type: "multiple-choice",
                    question: "Which organ is the primary site of drug metabolism?",
                    options: ["Kidneys", "Lungs", "Liver", "Heart"],
                    correct: 2,
                    explanation: "The liver is the primary site of drug metabolism due to its high concentration of metabolizing enzymes."
                }
            ],
            "Drug Classes and Mechanisms": [
                {
                    type: "multiple-choice",
                    question: "Which class of drugs blocks sodium channels?",
                    options: ["Beta blockers", "Calcium channel blockers", "Local anesthetics", "ACE inhibitors"],
                    correct: 2,
                    explanation: "Local anesthetics block voltage-gated sodium channels to prevent nerve conduction."
                },
                {
                    type: "multiple-choice",
                    question: "What is the mechanism of action of aspirin?",
                    options: ["COX-1 and COX-2 inhibition", "Histamine receptor blocking", "Beta receptor blocking", "Calcium channel blocking"],
                    correct: 0,
                    explanation: "Aspirin irreversibly inhibits COX-1 and COX-2 enzymes, reducing prostaglandin synthesis."
                },
                {
                    type: "true-false",
                    question: "Beta blockers reduce heart rate and blood pressure.",
                    correct: true,
                    explanation: "True. Beta blockers block beta-adrenergic receptors, reducing heart rate and contractility."
                },
                {
                    type: "short-answer",
                    question: "What do ACE inhibitors do?",
                    correctAnswers: ["block angiotensin converting enzyme", "reduce blood pressure"],
                    explanation: "ACE inhibitors block angiotensin-converting enzyme, reducing angiotensin II formation and blood pressure."
                },
                {
                    type: "multiple-choice",
                    question: "Which neurotransmitter do benzodiazepines enhance?",
                    options: ["Dopamine", "Serotonin", "GABA", "Acetylcholine"],
                    correct: 2,
                    explanation: "Benzodiazepines enhance GABA activity at GABA-A receptors, producing anxiolytic effects."
                }
            ],
            "Adverse Drug Reactions": [
                {
                    type: "multiple-choice",
                    question: "What is an idiosyncratic drug reaction?",
                    options: ["Dose-dependent toxicity", "Unpredictable individual reaction", "Allergic reaction", "Drug interaction"],
                    correct: 1,
                    explanation: "Idiosyncratic reactions are unpredictable, individual responses not related to dose or known mechanisms."
                },
                {
                    type: "true-false",
                    question: "Type A adverse drug reactions are dose-dependent.",
                    correct: true,
                    explanation: "True. Type A (Augmented) reactions are predictable and dose-dependent extensions of pharmacological effects."
                },
                {
                    type: "multiple-choice",
                    question: "What is Stevens-Johnson syndrome?",
                    options: ["Liver toxicity", "Severe skin reaction", "Kidney damage", "Heart arrhythmia"],
                    correct: 1,
                    explanation: "Stevens-Johnson syndrome is a severe, life-threatening skin and mucous membrane reaction to drugs."
                },
                {
                    type: "short-answer",
                    question: "What is pharmacovigilance?",
                    correctAnswers: ["monitoring drug safety", "adverse drug reaction monitoring"],
                    explanation: "Pharmacovigilance is the science of monitoring, detecting, and preventing adverse drug reactions."
                },
                {
                    type: "multiple-choice",
                    question: "Which organ is most commonly affected by drug-induced toxicity?",
                    options: ["Brain", "Heart", "Liver", "Lungs"],
                    correct: 2,
                    explanation: "The liver is most commonly affected due to its central role in drug metabolism."
                }
            ]
        }
    },

    immunology: {
        topics: {
            "Innate Immunity": [
                {
                    type: "multiple-choice",
                    question: "Which cells are part of the innate immune system?",
                    options: ["B cells", "T cells", "Neutrophils", "Plasma cells"],
                    correct: 2,
                    explanation: "Neutrophils are part of the innate immune system and provide immediate defense against pathogens."
                },
                {
                    type: "true-false",
                    question: "Innate immunity provides specific protection against pathogens.",
                    correct: false,
                    explanation: "False. Innate immunity provides non-specific, general protection against pathogens."
                },
                {
                    type: "multiple-choice",
                    question: "What is the first line of defense in innate immunity?",
                    options: ["Neutrophils", "Macrophages", "Physical barriers", "Complement system"],
                    correct: 2,
                    explanation: "Physical barriers like skin and mucous membranes are the first line of defense."
                },
                {
                    type: "short-answer",
                    question: "What cells engulf and destroy pathogens?",
                    correctAnswers: ["phagocytes", "macrophages", "neutrophils"],
                    explanation: "Phagocytes, including macrophages and neutrophils, engulf and destroy pathogens."
                },
                {
                    type: "multiple-choice",
                    question: "Which complement pathway is activated by antibody-antigen complexes?",
                    options: ["Classical pathway", "Alternative pathway", "Lectin pathway", "Terminal pathway"],
                    correct: 0,
                    explanation: "The classical complement pathway is activated by antibody-antigen immune complexes."
                }
            ],
            "Adaptive Immunity": [
                {
                    type: "multiple-choice",
                    question: "Which cells are primarily responsible for antibody production?",
                    options: ["T cells", "B cells", "NK cells", "Dendritic cells"],
                    correct: 1,
                    explanation: "B cells differentiate into plasma cells that produce antibodies."
                },
                {
                    type: "multiple-choice",
                    question: "What is the primary function of helper T cells?",
                    options: ["Kill infected cells", "Produce antibodies", "Coordinate immune response", "Present antigens"],
                    correct: 2,
                    explanation: "Helper T cells coordinate the immune response by activating other immune cells."
                },
                {
                    type: "multiple-choice",
                    question: "Which cells present antigens to T cells?",
                    options: ["B cells", "Dendritic cells", "NK cells", "Plasma cells"],
                    correct: 1,
                    explanation: "Dendritic cells are professional antigen-presenting cells that activate T cells."
                },
                {
                    type: "true-false",
                    question: "Cytotoxic T cells directly kill infected cells.",
                    correct: true,
                    explanation: "True. Cytotoxic T cells (CD8+) directly kill infected, malignant, or foreign cells."
                },
                {
                    type: "short-answer",
                    question: "What is immunological memory?",
                    correctAnswers: ["faster secondary response", "memory cells"],
                    explanation: "Immunological memory is the ability to mount a faster, stronger response upon re-exposure to an antigen."
                }
            ],
            "Antibodies and Immunoglobulins": [
                {
                    type: "multiple-choice",
                    question: "What is the most abundant antibody in human serum?",
                    options: ["IgA", "IgE", "IgG", "IgM"],
                    correct: 2,
                    explanation: "IgG is the most abundant antibody in blood and provides long-term immunity."
                },
                {
                    type: "multiple-choice",
                    question: "Which antibody is involved in allergic reactions?",
                    options: ["IgG", "IgA", "IgE", "IgD"],
                    correct: 2,
                    explanation: "IgE is responsible for allergic reactions and protection against parasites."
                },
                {
                    type: "true-false",
                    question: "IgM is the first antibody produced during an immune response.",
                    correct: true,
                    explanation: "True. IgM is the first antibody class produced during the primary immune response."
                },
                {
                    type: "short-answer",
                    question: "What part of an antibody binds to antigens?",
                    correctAnswers: ["variable region", "antigen binding site", "fab region"],
                    explanation: "The variable region (Fab region) of antibodies binds specifically to antigens."
                },
                {
                    type: "multiple-choice",
                    question: "Which immunoglobulin is most prevalent in secretions?",
                    options: ["IgG", "IgA", "IgM", "IgE"],
                    correct: 1,
                    explanation: "IgA is the predominant antibody in secretions like saliva, tears, and breast milk."
                }
            ],
            "Vaccination and Immunization": [
                {
                    type: "multiple-choice",
                    question: "Which type of immunity is provided by vaccines?",
                    options: ["Active natural", "Active artificial", "Passive natural", "Passive artificial"],
                    correct: 1,
                    explanation: "Vaccines provide active artificial immunity by stimulating the immune system to produce antibodies."
                },
                {
                    type: "true-false",
                    question: "Live attenuated vaccines contain weakened but living pathogens.",
                    correct: true,
                    explanation: "True. Live attenuated vaccines contain weakened versions of the pathogen that can replicate but not cause disease."
                },
                {
                    type: "multiple-choice",
                    question: "What is herd immunity?",
                    options: ["Individual protection", "Population-level protection", "Vaccine failure", "Natural infection"],
                    correct: 1,
                    explanation: "Herd immunity occurs when enough people are immune to prevent disease transmission in the population."
                },
                {
                    type: "short-answer",
                    question: "What are adjuvants in vaccines?",
                    correctAnswers: ["immune enhancers", "substances that enhance immune response"],
                    explanation: "Adjuvants are substances added to vaccines to enhance and prolong the immune response."
                },
                {
                    type: "multiple-choice",
                    question: "Which vaccine type provides the longest-lasting immunity?",
                    options: ["Inactivated", "Live attenuated", "Subunit", "Toxoid"],
                    correct: 1,
                    explanation: "Live attenuated vaccines typically provide the longest-lasting immunity, often lifelong."
                }
            ],
            "Autoimmunity and Immunodeficiency": [
                {
                    type: "multiple-choice",
                    question: "What is an autoimmune disease?",
                    options: ["Overactive immune system", "Immune system attacks self", "Weak immune system", "Allergic reaction"],
                    correct: 1,
                    explanation: "Autoimmune diseases occur when the immune system mistakenly attacks the body's own tissues."
                },
                {
                    type: "multiple-choice",
                    question: "Which condition is characterized by destruction of insulin-producing cells?",
                    options: ["Type 2 diabetes", "Type 1 diabetes", "Hypothyroidism", "Rheumatoid arthritis"],
                    correct: 1,
                    explanation: "Type 1 diabetes is an autoimmune condition where the immune system destroys insulin-producing beta cells."
                },
                {
                    type: "true-false",
                    question: "Primary immunodeficiency is acquired later in life.",
                    correct: false,
                    explanation: "False. Primary immunodeficiency is congenital (present from birth), while secondary is acquired."
                },
                {
                    type: "short-answer",
                    question: "What does SCID stand for?",
                    correctAnswers: ["severe combined immunodeficiency", "severe combined immune deficiency"],
                    explanation: "SCID stands for Severe Combined Immunodeficiency, a group of rare inherited disorders."
                },
                {
                    type: "multiple-choice",
                    question: "Which organ transplant rejection is mediated by T cells?",
                    options: ["Hyperacute", "Acute", "Chronic", "All types"],
                    correct: 1,
                    explanation: "Acute transplant rejection is primarily mediated by T cells recognizing foreign HLA molecules."
                }
            ]
        }
    },

    molecularbiology: {
        topics: {
            "DNA Structure and Replication": [
                {
                    type: "multiple-choice",
                    question: "What enzyme unwinds DNA during replication?",
                    options: ["DNA polymerase", "Helicase", "Primase", "Ligase"],
                    correct: 1,
                    explanation: "Helicase unwinds the DNA double helix by breaking hydrogen bonds between base pairs."
                },
                {
                    type: "true-false",
                    question: "DNA replication occurs in the 5' to 3' direction.",
                    correct: true,
                    explanation: "True. DNA polymerase synthesizes new DNA strands in the 5' to 3' direction."
                },
                {
                    type: "multiple-choice",
                    question: "What is the leading strand?",
                    options: ["Discontinuous synthesis", "Continuous synthesis", "Template strand", "Antisense strand"],
                    correct: 1,
                    explanation: "The leading strand is synthesized continuously in the 5' to 3' direction."
                },
                {
                    type: "short-answer",
                    question: "What are Okazaki fragments?",
                    correctAnswers: ["short DNA segments", "lagging strand fragments"],
                    explanation: "Okazaki fragments are short DNA segments synthesized discontinuously on the lagging strand."
                },
                {
                    type: "multiple-choice",
                    question: "Which enzyme fills in gaps between Okazaki fragments?",
                    options: ["Helicase", "Primase", "DNA ligase", "Topoisomerase"],
                    correct: 2,
                    explanation: "DNA ligase joins Okazaki fragments by forming phosphodiester bonds between adjacent nucleotides."
                }
            ],
            "RNA Structure and Function": [
                {
                    type: "multiple-choice",
                    question: "What sugar is found in RNA?",
                    options: ["Deoxyribose", "Ribose", "Glucose", "Fructose"],
                    correct: 1,
                    explanation: "RNA contains ribose sugar, which has a hydroxyl group on the 2' carbon."
                },
                {
                    type: "true-false",
                    question: "RNA is typically single-stranded.",
                    correct: true,
                    explanation: "True. RNA is typically single-stranded, unlike DNA which is double-stranded."
                },
                {
                    type: "multiple-select",
                    question: "Which are types of RNA? (Select all that apply)",
                    options: ["mRNA", "tRNA", "rRNA", "dRNA", "miRNA"],
                    correct: [0, 1, 2, 4],
                    explanation: "Types of RNA include mRNA, tRNA, rRNA, and miRNA. dRNA does not exist."
                },
                {
                    type: "short-answer",
                    question: "What is the function of mRNA?",
                    correctAnswers: ["carries genetic information", "messenger RNA"],
                    explanation: "mRNA carries genetic information from DNA to ribosomes for protein synthesis."
                },
                {
                    type: "multiple-choice",
                    question: "Which RNA type is involved in protein synthesis at ribosomes?",
                    options: ["mRNA only", "tRNA only", "rRNA only", "All three types"],
                    correct: 3,
                    explanation: "Protein synthesis involves mRNA (template), tRNA (amino acid delivery), and rRNA (ribosome component)."
                }
            ],
            "Protein Synthesis": [
                {
                    type: "multiple-choice",
                    question: "Where does translation occur in eukaryotes?",
                    options: ["Nucleus", "Cytoplasm", "Mitochondria", "Endoplasmic reticulum"],
                    correct: 1,
                    explanation: "Translation occurs in the cytoplasm at ribosomes in eukaryotes."
                },
                {
                    type: "true-false",
                    question: "The genetic code is universal.",
                    correct: true,
                    explanation: "True. The genetic code is nearly universal across all living organisms."
                },
                {
                    type: "multiple-choice",
                    question: "How many amino acids are encoded by the genetic code?",
                    options: ["20", "21", "22", "64"],
                    correct: 0,
                    explanation: "The genetic code specifies 20 standard amino acids used in protein synthesis."
                },
                {
                    type: "short-answer",
                    question: "What is the start codon?",
                    correctAnswers: ["AUG", "aug"],
                    explanation: "AUG is the start codon that initiates protein synthesis and codes for methionine."
                },
                {
                    type: "multiple-choice",
                    question: "What happens during elongation in translation?",
                    options: ["Initiation of synthesis", "Addition of amino acids", "Termination of synthesis", "mRNA processing"],
                    correct: 1,
                    explanation: "During elongation, amino acids are sequentially added to the growing protein chain."
                }
            ],
            "Gene Regulation": [
                {
                    type: "multiple-choice",
                    question: "What is an operon?",
                    options: ["Single gene", "Group of genes with related functions", "Protein complex", "RNA molecule"],
                    correct: 1,
                    explanation: "An operon is a cluster of genes under the control of a single promoter."
                },
                {
                    type: "true-false",
                    question: "Transcription factors bind to promoter regions.",
                    correct: true,
                    explanation: "True. Transcription factors bind to promoter regions to regulate gene expression."
                },
                {
                    type: "multiple-choice",
                    question: "What is the function of enhancers?",
                    options: ["Block transcription", "Increase transcription", "Process mRNA", "Translate proteins"],
                    correct: 1,
                    explanation: "Enhancers are DNA sequences that increase the rate of transcription when bound by activators."
                },
                {
                    type: "short-answer",
                    question: "What are histones?",
                    correctAnswers: ["DNA-binding proteins", "chromatin proteins"],
                    explanation: "Histones are proteins around which DNA wraps to form chromatin structure."
                },
                {
                    type: "multiple-choice",
                    question: "What is epigenetic regulation?",
                    options: ["DNA sequence changes", "Heritable changes without DNA alteration", "Protein mutations", "RNA degradation"],
                    correct: 1,
                    explanation: "Epigenetic regulation involves heritable changes in gene expression without altering DNA sequence."
                }
            ],
            "Molecular Techniques": [
                {
                    type: "multiple-choice",
                    question: "What is the purpose of PCR?",
                    options: ["DNA sequencing", "DNA amplification", "Protein synthesis", "RNA processing"],
                    correct: 1,
                    explanation: "PCR (Polymerase Chain Reaction) amplifies specific DNA sequences exponentially."
                },
                {
                    type: "true-false",
                    question: "Northern blotting detects specific RNA molecules.",
                    correct: true,
                    explanation: "True. Northern blotting is used to detect specific RNA molecules in a sample."
                },
                {
                    type: "multiple-choice",
                    question: "What enzyme is used in reverse transcription?",
                    options: ["DNA polymerase", "RNA polymerase", "Reverse transcriptase", "Ligase"],
                    correct: 2,
                    explanation: "Reverse transcriptase synthesizes DNA from an RNA template."
                },
                {
                    type: "short-answer",
                    question: "What is DNA sequencing?",
                    correctAnswers: ["determining DNA order", "reading DNA sequence"],
                    explanation: "DNA sequencing determines the order of nucleotides in a DNA molecule."
                },
                {
                    type: "multiple-choice",
                    question: "What is CRISPR-Cas9 used for?",
                    options: ["DNA amplification", "Gene editing", "RNA detection", "Protein purification"],
                    correct: 1,
                    explanation: "CRISPR-Cas9 is a revolutionary tool for precise gene editing and modification."
                }
            ]
        }
    },

    pathology: {
        topics: {
            "General Pathology": [
                {
                    type: "multiple-choice",
                    question: "What is pathology?",
                    options: ["Study of normal function", "Study of disease processes", "Study of anatomy", "Study of genetics"],
                    correct: 1,
                    explanation: "Pathology is the study of disease processes, including their causes, mechanisms, and effects."
                },
                {
                    type: "multiple-choice",
                    question: "What are the four cardinal signs of inflammation?",
                    options: ["Pain, swelling, redness, fever", "Redness, heat, swelling, pain", "Fever, chills, pain, swelling", "Heat, cold, pain, numbness"],
                    correct: 1,
                    explanation: "The four cardinal signs of inflammation are redness, heat, swelling, and pain (rubor, calor, tumor, dolor)."
                },
                {
                    type: "true-false",
                    question: "Necrosis is programmed cell death.",
                    correct: false,
                    explanation: "False. Necrosis is uncontrolled cell death due to injury. Apoptosis is programmed cell death."
                },
                {
                    type: "short-answer",
                    question: "What is etiology?",
                    correctAnswers: ["cause of disease", "disease causation"],
                    explanation: "Etiology is the study of the causes or origins of diseases."
                },
                {
                    type: "multiple-choice",
                    question: "What is the difference between acute and chronic inflammation?",
                    options: ["Duration and cell types", "Location only", "Severity only", "Age of patient"],
                    correct: 0,
                    explanation: "Acute inflammation is short-term with neutrophils, while chronic inflammation is long-term with lymphocytes and macrophages."
                }
            ],
            "Cellular Pathology": [
                {
                    type: "multiple-choice",
                    question: "What is apoptosis?",
                    options: ["Cell growth", "Programmed cell death", "Cell division", "Cell differentiation"],
                    correct: 1,
                    explanation: "Apoptosis is programmed cell death that occurs naturally during development and tissue homeostasis."
                },
                {
                    type: "true-false",
                    question: "Hypertrophy involves an increase in cell number.",
                    correct: false,
                    explanation: "False. Hypertrophy involves an increase in cell size. Hyperplasia involves an increase in cell number."
                },
                {
                    type: "multiple-choice",
                    question: "What is metaplasia?",
                    options: ["Cell death", "Abnormal cell growth", "Replacement of one cell type with another", "Cell shrinkage"],
                    correct: 2,
                    explanation: "Metaplasia is the replacement of one differentiated cell type with another, usually as an adaptive response."
                },
                {
                    type: "short-answer",
                    question: "What is dysplasia?",
                    correctAnswers: ["abnormal cell development", "disordered cell growth"],
                    explanation: "Dysplasia is abnormal cellular development characterized by altered size, shape, and organization of cells."
                },
                {
                    type: "multiple-choice",
                    question: "Which process involves cell shrinkage due to decreased workload?",
                    options: ["Hypertrophy", "Hyperplasia", "Atrophy", "Metaplasia"],
                    correct: 2,
                    explanation: "Atrophy is the decrease in cell size and number, often due to decreased use or aging."
                }
            ],
            "Neoplasia and Cancer": [
                {
                    type: "multiple-choice",
                    question: "What is a neoplasm?",
                    options: ["Normal tissue", "Abnormal new growth", "Inflammatory response", "Healing tissue"],
                    correct: 1,
                    explanation: "A neoplasm is an abnormal new growth of tissue that serves no physiological function."
                },
                {
                    type: "true-false",
                    question: "All neoplasms are malignant.",
                    correct: false,
                    explanation: "False. Neoplasms can be benign (non-cancerous) or malignant (cancerous)."
                },
                {
                    type: "multiple-choice",
                    question: "What is metastasis?",
                    options: ["Local tumor growth", "Spread of cancer to distant sites", "Tumor regression", "Normal cell division"],
                    correct: 1,
                    explanation: "Metastasis is the spread of cancer cells from the primary tumor to distant organs or tissues."
                },
                {
                    type: "short-answer",
                    question: "What are oncogenes?",
                    correctAnswers: ["cancer-promoting genes", "genes that promote cancer"],
                    explanation: "Oncogenes are genes that, when activated or overexpressed, can promote cancer development."
                },
                {
                    type: "multiple-choice",
                    question: "What is the difference between benign and malignant tumors?",
                    options: ["Size only", "Color only", "Growth pattern and spread", "Age of occurrence"],
                    correct: 2,
                    explanation: "Benign tumors grow slowly and don't spread, while malignant tumors grow rapidly and can metastasize."
                }
            ],
            "Infectious Diseases": [
                {
                    type: "multiple-choice",
                    question: "What is the most common cause of healthcare-associated infections?",
                    options: ["Viruses", "Bacteria", "Fungi", "Parasites"],
                    correct: 1,
                    explanation: "Bacteria are the most common cause of healthcare-associated infections."
                },
                {
                    type: "true-false",
                    question: "Opportunistic infections occur in immunocompromised patients.",
                    correct: true,
                    explanation: "True. Opportunistic infections are caused by organisms that normally don't cause disease in healthy individuals."
                },
                {
                    type: "multiple-choice",
                    question: "What is sepsis?",
                    options: ["Local infection", "Systemic inflammatory response to infection", "Wound healing", "Immune deficiency"],
                    correct: 1,
                    explanation: "Sepsis is a life-threatening systemic inflammatory response to infection."
                },
                {
                    type: "short-answer",
                    question: "What is a nosocomial infection?",
                    correctAnswers: ["hospital-acquired infection", "healthcare-associated infection"],
                    explanation: "A nosocomial infection is an infection acquired in a healthcare setting during medical care."
                },
                {
                    type: "multiple-choice",
                    question: "Which pathogen causes tuberculosis?",
                    options: ["Staphylococcus aureus", "Mycobacterium tuberculosis", "Streptococcus pneumoniae", "Escherichia coli"],
                    correct: 1,
                    explanation: "Tuberculosis is caused by Mycobacterium tuberculosis, an acid-fast bacillus."
                }
            ],
            "Cardiovascular Pathology": [
                {
                    type: "multiple-choice",
                    question: "What is atherosclerosis?",
                    options: ["Heart muscle disease", "Buildup of plaque in arteries", "Heart rhythm disorder", "Valve disease"],
                    correct: 1,
                    explanation: "Atherosclerosis is the buildup of fatty plaques in arterial walls, leading to narrowing and hardening."
                },
                {
                    type: "true-false",
                    question: "Myocardial infarction is caused by blocked coronary arteries.",
                    correct: true,
                    explanation: "True. Myocardial infarction (heart attack) occurs when coronary arteries are blocked, depriving heart muscle of oxygen."
                },
                {
                    type: "multiple-choice",
                    question: "What is hypertension?",
                    options: ["Low blood pressure", "High blood pressure", "Irregular heartbeat", "Heart failure"],
                    correct: 1,
                    explanation: "Hypertension is persistently elevated blood pressure that can damage blood vessels and organs."
                },
                {
                    type: "short-answer",
                    question: "What is stroke?",
                    correctAnswers: ["brain blood flow interruption", "cerebrovascular accident"],
                    explanation: "Stroke is the interruption of blood flow to part of the brain, causing brain tissue damage."
                },
                {
                    type: "multiple-choice",
                    question: "Which type of stroke is caused by bleeding in the brain?",
                    options: ["Ischemic stroke", "Hemorrhagic stroke", "Embolic stroke", "Thrombotic stroke"],
                    correct: 1,
                    explanation: "Hemorrhagic stroke is caused by bleeding in the brain due to ruptured blood vessels."
                }
            ]
        }
    },

    biostatistics: {
        topics: {
            "Descriptive Statistics": [
                {
                    type: "multiple-choice",
                    question: "What is the most commonly used measure of central tendency?",
                    options: ["Mean", "Median", "Mode", "Range"],
                    correct: 0,
                    explanation: "The mean (average) is the most commonly used measure of central tendency in biostatistics."
                },
                {
                    type: "true-false",
                    question: "The median is less affected by outliers than the mean.",
                    correct: true,
                    explanation: "True. The median is more robust to outliers than the mean because it represents the middle value."
                },
                {
                    type: "multiple-choice",
                    question: "What does standard deviation measure?",
                    options: ["Central tendency", "Variability", "Correlation", "Probability"],
                    correct: 1,
                    explanation: "Standard deviation measures the variability or spread of data around the mean."
                },
                {
                    type: "short-answer",
                    question: "What is a frequency distribution?",
                    correctAnswers: ["data organization by values", "count of each value"],
                    explanation: "A frequency distribution shows how often each value occurs in a dataset."
                },
                {
                    type: "multiple-choice",
                    question: "Which measure is best for skewed data?",
                    options: ["Mean", "Median", "Mode", "Standard deviation"],
                    correct: 1,
                    explanation: "The median is preferred for skewed distributions as it's less influenced by extreme values."
                }
            ],
            "Probability and Distributions": [
                {
                    type: "multiple-choice",
                    question: "What is the range of probability values?",
                    options: ["-1 to 1", "0 to 1", "0 to 100", "-∞ to +∞"],
                    correct: 1,
                    explanation: "Probability values range from 0 (impossible) to 1 (certain)."
                },
                {
                    type: "true-false",
                    question: "The normal distribution is symmetric around the mean.",
                    correct: true,
                    explanation: "True. The normal distribution is bell-shaped and symmetric around the mean."
                },
                {
                    type: "multiple-choice",
                    question: "What percentage of data falls within 2 standard deviations in a normal distribution?",
                    options: ["68%", "95%", "99%", "99.7%"],
                    correct: 1,
                    explanation: "Approximately 95% of data falls within 2 standard deviations from the mean in a normal distribution."
                },
                {
                    type: "short-answer",
                    question: "What is a p-value?",
                    correctAnswers: ["probability of result by chance", "statistical significance measure"],
                    explanation: "A p-value is the probability of obtaining results at least as extreme as observed, assuming the null hypothesis is true."
                },
                {
                    type: "multiple-choice",
                    question: "Which distribution is used for small sample sizes?",
                    options: ["Normal", "t-distribution", "Chi-square", "F-distribution"],
                    correct: 1,
                    explanation: "The t-distribution is used when sample sizes are small (typically n < 30) and population standard deviation is unknown."
                }
            ],
            "Hypothesis Testing": [
                {
                    type: "multiple-choice",
                    question: "What is a null hypothesis?",
                    options: ["Alternative explanation", "No effect or difference", "Positive result", "Research hypothesis"],
                    correct: 1,
                    explanation: "The null hypothesis states there is no effect, difference, or relationship between variables."
                },
                {
                    type: "true-false",
                    question: "A Type I error occurs when we reject a true null hypothesis.",
                    correct: true,
                    explanation: "True. Type I error (false positive) occurs when we incorrectly reject a true null hypothesis."
                },
                {
                    type: "multiple-choice",
                    question: "What is the conventional significance level (alpha)?",
                    options: ["0.01", "0.05", "0.10", "0.25"],
                    correct: 1,
                    explanation: "The conventional significance level (alpha) is 0.05, meaning 5% chance of Type I error."
                },
                {
                    type: "short-answer",
                    question: "What is statistical power?",
                    correctAnswers: ["probability of detecting true effect", "1 minus beta"],
                    explanation: "Statistical power is the probability of correctly rejecting a false null hypothesis (detecting a true effect)."
                },
                {
                    type: "multiple-choice",
                    question: "Which test is used to compare means of two independent groups?",
                    options: ["Paired t-test", "Independent t-test", "Chi-square test", "ANOVA"],
                    correct: 1,
                    explanation: "An independent (unpaired) t-test compares means between two separate groups."
                }
            ],
            "Study Design and Sampling": [
                {
                    type: "multiple-choice",
                    question: "Which study design is considered the gold standard for clinical research?",
                    options: ["Case-control", "Cross-sectional", "Cohort", "Randomized controlled trial"],
                    correct: 3,
                    explanation: "Randomized controlled trials (RCTs) are considered the gold standard due to their ability to establish causation."
                },
                {
                    type: "true-false",
                    question: "Random sampling helps ensure sample representativeness.",
                    correct: true,
                    explanation: "True. Random sampling helps ensure that the sample is representative of the target population."
                },
                {
                    type: "multiple-choice",
                    question: "What is selection bias?",
                    options: ["Random error", "Systematic error in participant selection", "Measurement error", "Confounding variable"],
                    correct: 1,
                    explanation: "Selection bias is systematic error in how participants are chosen or retained in a study."
                },
                {
                    type: "short-answer",
                    question: "What is a confounding variable?",
                    correctAnswers: ["variable affecting both exposure and outcome", "third variable"],
                    explanation: "A confounding variable is associated with both the exposure and outcome, potentially distorting the true relationship."
                },
                {
                    type: "multiple-choice",
                    question: "What is the purpose of blinding in clinical trials?",
                    options: ["Increase sample size", "Reduce bias", "Improve randomization", "Ensure compliance"],
                    correct: 1,
                    explanation: "Blinding prevents bias by keeping participants and/or investigators unaware of treatment assignments."
                }
            ],
            "Epidemiological Measures": [
                {
                    type: "multiple-choice",
                    question: "What does incidence measure?",
                    options: ["Total disease cases", "New disease cases over time", "Disease severity", "Treatment response"],
                    correct: 1,
                    explanation: "Incidence measures the rate of new cases of disease occurring in a population over a specific time period."
                },
                {
                    type: "true-false",
                    question: "Prevalence includes both new and existing cases.",
                    correct: true,
                    explanation: "True. Prevalence is the proportion of a population that has a disease at a specific time, including both new and existing cases."
                },
                {
                    type: "multiple-choice",
                    question: "What is relative risk?",
                    options: ["Absolute difference in risk", "Ratio of risks between groups", "Percentage increase in risk", "Number needed to treat"],
                    correct: 1,
                    explanation: "Relative risk is the ratio of the risk in the exposed group to the risk in the unexposed group."
                },
                {
                    type: "short-answer",
                    question: "What is the odds ratio?",
                    correctAnswers: ["ratio of odds", "measure of association"],
                    explanation: "Odds ratio is the ratio of odds of an event occurring in one group compared to another group."
                },
                {
                    type: "multiple-choice",
                    question: "What does a confidence interval indicate?",
                    options: ["Exact value", "Range of plausible values", "Statistical significance", "Sample size"],
                    correct: 1,
                    explanation: "A confidence interval provides a range of plausible values for a population parameter with a specified level of confidence."
                }
            ]
        }
    },

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

// Utility Functions
function showSection(sectionId) {
                    type: "short-answer",
                    question: "What is the smallest bone in the human body?",
                    correctAnswers: ["stapes", "the stapes", "stirrup", "the stirrup"],
                    explanation: "The stapes (stirrup bone) in the middle ear is the smallest bone in the human body."
                },
                {
                    type: "multiple-choice",
                    question: "How many bones are in the adult human body?",
                    options: ["206", "215", "225", "235"],
                    correct: 0,
                    explanation: "The adult human body has 206 bones, reduced from about 270 at birth due to fusion during development."
                }
            ],
            "Muscular System": [
                {
                    type: "short-answer",
                    question: "What is the primary muscle responsible for breathing?",
                    correctAnswers: ["diaphragm", "the diaphragm"],
                    explanation: "The diaphragm is the primary muscle of respiration, contracting to create negative pressure for inhalation."
                },
                {
                    type: "multiple-choice",
                    question: "Which type of muscle is found in the heart?",
                    options: ["Skeletal muscle", "Smooth muscle", "Cardiac muscle", "Striated muscle"],
                    correct: 2,
                    explanation: "Cardiac muscle is the specialized muscle type found only in the heart."
                },
                {
                    type: "true-false",
                    question: "Smooth muscle is under voluntary control.",
                    correct: false,
                    explanation: "False. Smooth muscle is involuntary and controlled by the autonomic nervous system."
                },
                {
                    type: "multiple-choice",
                    question: "What is the largest muscle in the human body?",
                    options: ["Biceps", "Quadriceps", "Gluteus maximus", "Latissimus dorsi"],
                    correct: 2,
                    explanation: "The gluteus maximus is the largest muscle in the human body."
                },
                {
                    type: "multiple-select",
                    question: "Which proteins are involved in muscle contraction? (Select all that apply)",
                    options: ["Actin", "Myosin", "Collagen", "Troponin", "Elastin"],
                    correct: [0, 1, 3],
                    explanation: "Actin, myosin, and troponin are key proteins in the muscle contraction mechanism."
                }
            ],
            "Cardiovascular System": [
                {
                    type: "true-false",
                    question: "The heart has four chambers.",
                    correct: true,
                    explanation: "True. The human heart has four chambers: two atria (left and right) and two ventricles (left and right)."
                },
                {
                    type: "multiple-choice",
                    question: "Which blood vessel carries oxygenated blood from the lungs to the heart?",
                    options: ["Pulmonary artery", "Pulmonary vein", "Aorta", "Vena cava"],
                    correct: 1,
                    explanation: "The pulmonary veins carry oxygenated blood from the lungs back to the left atrium."
                },
                {
                    type: "short-answer",
                    question: "What is the normal resting heart rate range for adults?",
                    correctAnswers: ["60-100", "60 to 100", "60-100 bpm"],
                    explanation: "The normal resting heart rate for adults is 60-100 beats per minute."
                },
                {
                    type: "multiple-choice",
                    question: "Which chamber of the heart has the thickest wall?",
                    options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
                    correct: 3,
                    explanation: "The left ventricle has the thickest wall as it pumps blood to the entire body."
                },
                {
                    type: "true-false",
                    question: "Arteries always carry oxygenated blood.",
                    correct: false,
                    explanation: "False. The pulmonary artery carries deoxygenated blood from the heart to the lungs."
                }
            ],
            "Respiratory System": [
                {
                    type: "multiple-select",
                    question: "Which of the following are parts of the respiratory system? (Select all that apply)",
                    options: ["Lungs", "Heart", "Trachea", "Bronchi", "Stomach"],
                    correct: [0, 2, 3],
                    explanation: "The respiratory system includes the lungs, trachea, and bronchi. The heart is part of the circulatory system, and the stomach is part of the digestive system."
                },
                {
                    type: "multiple-choice",
                    question: "Where does gas exchange occur in the lungs?",
                    options: ["Bronchi", "Bronchioles", "Alveoli", "Trachea"],
                    correct: 2,
                    explanation: "Gas exchange occurs in the alveoli, tiny air sacs in the lungs."
                },
                {
                    type: "true-false",
                    question: "The right lung has three lobes while the left lung has two lobes.",
                    correct: true,
                    explanation: "True. The right lung has three lobes (upper, middle, lower) and the left lung has two lobes (upper, lower)."
                },
                {
                    type: "short-answer",
                    question: "What is the medical term for the voice box?",
                    correctAnswers: ["larynx", "the larynx"],
                    explanation: "The larynx is the medical term for the voice box, containing the vocal cords."
                },
                {
                    type: "multiple-choice",
                    question: "What percentage of oxygen is in the air we breathe?",
                    options: ["16%", "18%", "21%", "25%"],
                    correct: 2,
                    explanation: "Air contains approximately 21% oxygen, 78% nitrogen, and 1% other gases."
                }
            ],
            "Urinary System": [
                {
                    type: "multiple-choice",
                    question: "What is the functional unit of the kidney?",
                    options: ["Glomerulus", "Nephron", "Tubule", "Collecting duct"],
                    correct: 1,
                    explanation: "The nephron is the functional unit of the kidney, responsible for filtering blood and producing urine."
                },
                {
                    type: "true-false",
                    question: "The kidneys are located in the thoracic cavity.",
                    correct: false,
                    explanation: "False. The kidneys are located in the retroperitoneal space in the abdominal cavity."
                },
                {
                    type: "multiple-choice",
                    question: "How much blood do the kidneys filter per day?",
                    options: ["50 liters", "100 liters", "180 liters", "250 liters"],
                    correct: 2,
                    explanation: "The kidneys filter approximately 180 liters of blood per day."
                },
                {
                    type: "short-answer",
                    question: "What hormone regulates water reabsorption in the kidneys?",
                    correctAnswers: ["ADH", "antidiuretic hormone", "vasopressin"],
                    explanation: "ADH (antidiuretic hormone) or vasopressin regulates water reabsorption in the collecting ducts."
                },
                {
                    type: "multiple-select",
                    question: "Which substances are normally found in urine? (Select all that apply)",
                    options: ["Urea", "Glucose", "Creatinine", "Proteins", "Water"],
                    correct: [0, 2, 4],
                    explanation: "Normal urine contains urea, creatinine, and water. Glucose and proteins should not be present in significant amounts."
                }
            ]
        }
    },

    biochemistry: {
        topics: {
            "Cellular Energy": [
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
                    type: "multiple-choice",
                    question: "What is the end product of glycolysis?",
                    options: ["Glucose", "Pyruvate", "Lactate", "Acetyl-CoA"],
                    correct: 1,
                    explanation: "Glycolysis breaks down glucose into two molecules of pyruvate, producing ATP and NADH."
                },
                {
                    type: "multiple-select",
                    question: "Which of the following are products of cellular respiration? (Select all that apply)",
                    options: ["ATP", "Carbon dioxide", "Oxygen", "Water", "Glucose"],
                    correct: [0, 1, 3],
                    explanation: "Cellular respiration produces ATP, carbon dioxide, and water. Oxygen and glucose are reactants, not products."
                },
                {
                    type: "short-answer",
                    question: "How many ATP molecules are produced from one glucose molecule in cellular respiration?",
                    correctAnswers: ["36", "38", "36-38"],
                    explanation: "Cellular respiration typically produces 36-38 ATP molecules per glucose molecule."
                }
            ],
            "Enzymes and Catalysis": [
                {
                    type: "true-false",
                    question: "Enzymes are consumed during chemical reactions.",
                    correct: false,
                    explanation: "False. Enzymes are catalysts that speed up reactions but are not consumed in the process."
                },
                {
                    type: "short-answer",
                    question: "What enzyme breaks down starch into glucose?",
                    correctAnswers: ["amylase", "alpha-amylase"],
                    explanation: "Amylase is the enzyme responsible for breaking down starch into glucose molecules."
                },
                {
                    type: "multiple-choice",
                    question: "What factors affect enzyme activity?",
                    options: ["Temperature only", "pH only", "Temperature and pH", "Substrate concentration only"],
                    correct: 2,
                    explanation: "Enzyme activity is affected by temperature, pH, substrate concentration, and inhibitors."
                },
                {
                    type: "multiple-choice",
                    question: "What is the active site of an enzyme?",
                    options: ["The entire enzyme", "The binding site for substrate", "The product release site", "The allosteric site"],
                    correct: 1,
                    explanation: "The active site is the specific region where the substrate binds and the reaction occurs."
                },
                {
                    type: "true-false",
                    question: "Competitive inhibitors bind to the active site of enzymes.",
                    correct: true,
                    explanation: "True. Competitive inhibitors compete with substrate for the active site."
                }
            ],
            "Acid-Base Chemistry": [
                {
                    type: "multiple-choice",
                    question: "What is the pH of normal human blood?",
                    options: ["6.8", "7.0", "7.4", "8.0"],
                    correct: 2,
                    explanation: "Normal human blood pH is approximately 7.4, which is slightly alkaline."
                },
                {
                    type: "multiple-choice",
                    question: "What is the Henderson-Hasselbalch equation used for?",
                    options: ["Calculating enzyme kinetics", "Calculating pH of buffer systems", "Calculating reaction rates", "Calculating concentration"],
                    correct: 1,
                    explanation: "The Henderson-Hasselbalch equation calculates pH of buffer systems."
                },
                {
                    type: "true-false",
                    question: "A solution with pH 3 is more acidic than a solution with pH 5.",
                    correct: true,
                    explanation: "True. Lower pH values indicate higher acidity."
                },
                {
                    type: "short-answer",
                    question: "What is the pKa of the bicarbonate buffer system?",
                    correctAnswers: ["6.1", "6.10"],
                    explanation: "The pKa of the bicarbonate buffer system (H2CO3/HCO3-) is 6.1."
                },
                {
                    type: "multiple-choice",
                    question: "Which buffer system is most important in blood?",
                    options: ["Phosphate buffer", "Bicarbonate buffer", "Protein buffer", "Hemoglobin buffer"],
                    correct: 1,
                    explanation: "The bicarbonate buffer system is the most important buffer in blood plasma."
                }
            ],
            "Vitamins and Cofactors": [
                {
                    type: "short-answer",
                    question: "What vitamin is synthesized by the skin when exposed to sunlight?",
                    correctAnswers: ["vitamin d", "vitamin d3", "cholecalciferol"],
                    explanation: "Vitamin D is synthesized in the skin when 7-dehydrocholesterol is exposed to UVB radiation from sunlight."
                },
                {
                    type: "multiple-choice",
                    question: "Which vitamin is a coenzyme in the citric acid cycle?",
                    options: ["Vitamin A", "Vitamin B1 (Thiamine)", "Vitamin C", "Vitamin K"],
                    correct: 1,
                    explanation: "Thiamine (Vitamin B1) is converted to TPP, a coenzyme in pyruvate dehydrogenase and α-ketoglutarate dehydrogenase."
                },
                {
                    type: "true-false",
                    question: "Fat-soluble vitamins can be stored in the body.",
                    correct: true,
                    explanation: "True. Fat-soluble vitamins (A, D, E, K) can be stored in adipose tissue and liver."
                },
                {
                    type: "multiple-select",
                    question: "Which are water-soluble vitamins? (Select all that apply)",
                    options: ["Vitamin A", "Vitamin C", "Vitamin B12", "Vitamin D", "Folate"],
                    correct: [1, 2, 4],
                    explanation: "Water-soluble vitamins include vitamin C, B vitamins (including B12), and folate."
                },
                {
                    type: "multiple-choice",
                    question: "What metal ion is found in vitamin B12?",
                    options: ["Iron", "Zinc", "Cobalt", "Magnesium"],
                    correct: 2,
                    explanation: "Vitamin B12 (cobalamin) contains a cobalt ion at its center."
                }
            ],
            "Lipid Biochemistry": [
                {
                    type: "multiple-choice",
                    question: "Which fatty acid is essential and cannot be synthesized by humans?",
                    options: ["Palmitic acid", "Stearic acid", "Linoleic acid", "Oleic acid"],
                    correct: 2,
                    explanation: "Linoleic acid is an essential fatty acid that must be obtained from diet."
                },
                {
                    type: "true-false",
                    question: "Cholesterol is synthesized primarily in the liver.",
                    correct: true,
                    explanation: "True. The liver is the primary site of cholesterol synthesis in the body."
                },
                {
                    type: "multiple-choice",
                    question: "What enzyme is the rate-limiting step in cholesterol synthesis?",
                    options: ["HMG-CoA synthase", "HMG-CoA reductase", "Acetyl-CoA carboxylase", "Fatty acid synthase"],
                    correct: 1,
                    explanation: "HMG-CoA reductase is the rate-limiting enzyme in cholesterol synthesis."
                },
                {
                    type: "short-answer",
                    question: "What is the storage form of glucose in animals?",
                    correctAnswers: ["glycogen"],
                    explanation: "Glycogen is the storage form of glucose in animals, primarily stored in liver and muscle."
                },
                {
                    type: "multiple-choice",
                    question: "Beta-oxidation occurs in which cellular compartment?",
                    options: ["Cytoplasm", "Mitochondria", "Endoplasmic reticulum", "Nucleus"],
                    correct: 1,
                    explanation: "Beta-oxidation of fatty acids occurs in the mitochondrial matrix."
                }
            ]
        }
    },

    cellbiology: {
        topics: {
            "Cell Structure and Organelles": [
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
                    type: "multiple-select",
                    question: "Which organelles are involved in the endomembrane system? (Select all that apply)",
                    options: ["Nucleus", "Endoplasmic reticulum", "Golgi apparatus", "Mitochondria", "Lysosomes"],
                    correct: [0, 1, 2, 4],
                    explanation: "The endomembrane system includes the nucleus, ER, Golgi apparatus, and lysosomes. Mitochondria are not part of this system."
                },
                {
                    type: "multiple-choice",
                    question: "What is the function of the Golgi apparatus?",
                    options: ["Protein synthesis", "ATP production", "Protein modification and packaging", "DNA replication"],
                    correct: 2,
                    explanation: "The Golgi apparatus modifies, packages, and ships proteins received from the ER."
                },
                {
                    type: "short-answer",
                    question: "What organelle contains digestive enzymes?",
                    correctAnswers: ["lysosomes", "lysosome"],
                    explanation: "Lysosomes contain digestive enzymes and are responsible for breaking down cellular waste."
                }
            ],
            "Cell Membrane and Transport": [
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
                },
                {
                    type: "multiple-choice",
                    question: "Which type of transport requires energy?",
                    options: ["Passive diffusion", "Facilitated diffusion", "Active transport", "Osmosis"],
                    correct: 2,
                    explanation: "Active transport requires energy (ATP) to move substances against their concentration gradient."
                },
                {
                    type: "multiple-select",
                    question: "Which processes require no cellular energy? (Select all that apply)",
                    options: ["Simple diffusion", "Facilitated diffusion", "Active transport", "Osmosis", "Endocytosis"],
                    correct: [0, 1, 3],
                    explanation: "Simple diffusion, facilitated diffusion, and osmosis are passive processes requiring no energy."
                },
                {
                    type: "short-answer",
                    question: "What is the fluid mosaic model?",
                    correctAnswers: ["cell membrane model", "membrane structure model"],
                    explanation: "The fluid mosaic model describes the cell membrane as a flexible structure with proteins embedded in a phospholipid bilayer."
                }
            ],
            "Cell Division": [
                {
                    type: "short-answer",
                    question: "During which phase of mitosis do chromosomes align at the cell's equator?",
                    correctAnswers: ["metaphase", "meta phase"],
                    explanation: "During metaphase, chromosomes align at the metaphase plate (cell's equator) before separation."
                },
                {
                    type: "multiple-choice",
                    question: "How many phases are there in mitosis?",
                    options: ["3", "4", "5", "6"],
                    correct: 1,
                    explanation: "Mitosis has 4 phases: prophase, metaphase, anaphase, and telophase."
                },
                {
                    type: "true-false",
                    question: "Meiosis produces genetically identical cells.",
                    correct: false,
                    explanation: "False. Meiosis produces genetically diverse gametes through crossing over and independent assortment."
                },
                {
                    type: "multiple-choice",
                    question: "In which phase do sister chromatids separate?",
                    options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
                    correct: 2,
                    explanation: "Sister chromatids separate during anaphase and move to opposite poles of the cell."
                },
                {
                    type: "multiple-choice",
                    question: "What is the result of meiosis in humans?",
                    options: ["2 diploid cells", "4 diploid cells", "2 haploid cells", "4 haploid cells"],
                    correct: 3,
                    explanation: "Meiosis produces 4 haploid gametes from one diploid cell."
                }
            ],
            "Cell Signaling": [
                {
                    type: "multiple-choice",
                    question: "What are the three stages of cell signaling?",
                    options: ["Reception, transmission, response", "Reception, transduction, response", "Binding, activation, termination", "Initiation, propagation, termination"],
                    correct: 1,
                    explanation: "Cell signaling involves reception (signal binding), transduction (signal processing), and response (cellular change)."
                },
                {
                    type: "true-false",
                    question: "Second messengers amplify cellular signals.",
                    correct: true,
                    explanation: "True. Second messengers like cAMP and IP3 amplify signals by activating multiple downstream targets."
                },
                {
                    type: "multiple-choice",
                    question: "Which molecule is a common second messenger?",
                    options: ["ATP", "cAMP", "DNA", "Glucose"],
                    correct: 1,
                    explanation: "cAMP (cyclic adenosine monophosphate) is a widely used second messenger in cell signaling."
                },
                {
                    type: "short-answer",
                    question: "What type of receptor spans the cell membrane?",
                    correctAnswers: ["transmembrane receptor", "integral membrane receptor"],
                    explanation: "Transmembrane receptors span the cell membrane and can receive signals from outside the cell."
                },
                {
                    type: "multiple-choice",
                    question: "What happens during signal transduction?",
                    options: ["Signal binds to receptor", "Signal is amplified and processed", "Cell produces a response", "Signal is terminated"],
                    correct: 1,
                    explanation: "Signal transduction is the process where the signal is amplified and processed inside the cell."
                }
            ],
            "Cellular Respiration and Photosynthesis": [
                {
                    type: "multiple-choice",
                    question: "Where does the citric acid cycle occur?",
                    options: ["Cytoplasm", "Mitochondrial matrix", "Inner mitochondrial membrane", "Outer mitochondrial membrane"],
                    correct: 1,
                    explanation: "The citric acid cycle (Krebs cycle) occurs in the mitochondrial matrix."
                },
                {
                    type: "true-false",
                    question: "Photosynthesis occurs in the chloroplasts.",
                    correct: true,
                    explanation: "True. Photosynthesis occurs in chloroplasts, specifically in the thylakoids and stroma."
                },
                {
                    type: "multiple-choice",
                    question: "What is the overall equation for photosynthesis?",
                    options: ["6CO2 + 6H2O + light → C6H12O6 + 6O2", "C6H12O6 + 6O2 → 6CO2 + 6H2O + ATP", "Both equations", "Neither equation"],
                    correct: 0,
                    explanation: "Photosynthesis: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2."
                },
                {
                    type: "short-answer",
                    question: "What pigment captures light energy in photosynthesis?",
                    correctAnswers: ["chlorophyll", "chlorophyll a"],
                    explanation: "Chlorophyll (primarily chlorophyll a) is the main pigment that captures light energy for photosynthesis."
                },
                {
                    type: "multiple-select",
                    question: "Which processes produce ATP? (Select all that apply)",
                    options: ["Glycolysis", "Citric acid cycle", "Electron transport chain", "Calvin cycle", "Light reactions"],
                    correct: [0, 1, 2, 4],
                    explanation: "ATP is produced in glycolysis, citric acid cycle, electron transport chain, and light reactions of photosynthesis."
                }
            ]
        }
    },

    genetics: {
        topics: {
            "DNA Structure and Function": [
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
                    type: "multiple-select",
                    question: "Which of the following are DNA bases? (Select all that apply)",
                    options: ["Adenine", "Uracil", "Guanine", "Cytosine", "Thymine"],
                    correct: [0, 2, 3, 4],
                    explanation: "DNA contains Adenine, Guanine, Cytosine, and Thymine. Uracil is found in RNA, not DNA."
                },
                {
                    type: "multiple-choice",
                    question: "What type of bonds hold the two DNA strands together?",
                    options: ["Covalent bonds", "Ionic bonds", "Hydrogen bonds", "Van der Waals forces"],
                    correct: 2,
                    explanation: "Hydrogen bonds between complementary base pairs hold the two DNA strands together."
                },
                {
                    type: "true-false",
                    question: "DNA replication is semiconservative.",
                    correct: true,
                    explanation: "True. Each new DNA molecule contains one original strand and one newly synthesized strand."
                }
            ],
            "Gene Expression": [
                {
                    type: "true-false",
                    question: "A codon consists of three nucleotides.",
                    correct: true,
                    explanation: "True. A codon is a sequence of three nucleotides that codes for a specific amino acid."
                },
                {
                    type: "true-false",
                    question: "Transcription creates proteins from RNA.",
                    correct: false,
                    explanation: "False. Transcription creates RNA from DNA. Translation creates proteins from RNA."
                },
                {
                    type: "multiple-choice",
                    question: "Where does transcription occur in eukaryotes?",
                    options: ["Cytoplasm", "Nucleus", "Mitochondria", "Ribosome"],
                    correct: 1,
                    explanation: "In eukaryotes, transcription occurs in the nucleus where DNA is located."
                },
                {
                    type: "short-answer",
                    question: "What enzyme synthesizes RNA during transcription?",
                    correctAnswers: ["RNA polymerase", "rna polymerase"],
                    explanation: "RNA polymerase is the enzyme that synthesizes RNA from a DNA template during transcription."
                },
                {
                    type: "multiple-choice",
                    question: "How many codons code for amino acids?",
                    options: ["20", "61", "64", "67"],
                    correct: 1,
                    explanation: "61 codons code for amino acids, while 3 are stop codons (UAG, UAA, UGA)."
                }
            ],
            "Inheritance Patterns": [
                {
                    type: "multiple-choice",
                    question: "Which inheritance pattern requires both parents to carry a gene for offspring to be affected?",
                    options: ["Dominant", "Recessive", "X-linked", "Codominant"],
                    correct: 1,
                    explanation: "Recessive inheritance requires both parents to carry the gene for offspring to express the trait."
                },
                {
                    type: "multiple-choice",
                    question: "In a cross between two heterozygotes (Aa × Aa), what is the phenotypic ratio?",
                    options: ["1:1", "1:2:1", "3:1", "9:3:3:1"],
                    correct: 2,
                    explanation: "A monohybrid cross between heterozygotes produces a 3:1 phenotypic ratio (3 dominant : 1 recessive)."
                },
                {
                    type: "true-false",
                    question: "X-linked traits are more common in males than females.",
                    correct: true,
                    explanation: "True. Males have only one X chromosome, so they express X-linked recessive traits more frequently."
                },
                {
                    type: "short-answer",
                    question: "What is the genetic makeup of an individual called?",
                    correctAnswers: ["genotype"],
                    explanation: "The genotype is the genetic makeup or genetic constitution of an individual."
                },
                {
                    type: "multiple-choice",
                    question: "What type of inheritance shows both traits equally?",
                    options: ["Complete dominance", "Incomplete dominance", "Codominance", "Multiple alleles"],
                    correct: 2,
                    explanation: "Codominance shows both alleles equally, like AB blood type where both A and B are expressed."
                }
            ],
            "Molecular Genetics": [
                {
                    type: "multiple-choice",
                    question: "What is a mutation?",
                    options: ["Change in DNA sequence", "Change in protein structure", "Change in cell division", "Change in metabolism"],
                    correct: 0,
                    explanation: "A mutation is a change in the DNA sequence that can affect gene function."
                },
                {
                    type: "multiple-select",
                    question: "Which are types of point mutations? (Select all that apply)",
                    options: ["Silent", "Missense", "Nonsense", "Insertion", "Deletion"],
                    correct: [0, 1, 2],
                    explanation: "Point mutations include silent, missense, and nonsense mutations. Insertions and deletions are frameshift mutations."
                },
                {
                    type: "true-false",
                    question: "PCR stands for Polymerase Chain Reaction.",
                    correct: true,
                    explanation: "True. PCR (Polymerase Chain Reaction) is a technique used to amplify DNA sequences."
                },
                {
                    type: "short-answer",
                    question: "What technique is used to separate DNA fragments by size?",
                    correctAnswers: ["gel electrophoresis", "electrophoresis"],
                    explanation: "Gel electrophoresis separates DNA fragments based on their size through an electric field."
                },
                {
                    type: "multiple-choice",
                    question: "What is CRISPR used for?",
                    options: ["DNA sequencing", "Gene editing", "Protein synthesis", "Cell division"],
                    correct: 1,
                    explanation: "CRISPR-Cas9 is a revolutionary gene editing tool that can precisely modify DNA sequences."
                }
            ],
            "Population Genetics": [
                {
                    type: "multiple-choice",
                    question: "What does the Hardy-Weinberg principle describe?",
                    options: ["Mutation rates", "Allele frequencies in populations", "Gene expression", "Protein folding"],
                    correct: 1,
                    explanation: "The Hardy-Weinberg principle describes allele and genotype frequencies in populations under equilibrium."
                },
                {
                    type: "true-false",
                    question: "Genetic drift has a larger effect in small populations.",
                    correct: true,
                    explanation: "True. Genetic drift (random changes in allele frequencies) has a greater impact in smaller populations."
                },
                {
                    type: "multiple-choice",
                    question: "What is gene flow?",
                    options: ["Movement of genes between populations", "Change in gene expression", "Gene duplication", "Gene deletion"],
                    correct: 0,
                    explanation: "Gene flow is the movement of alleles between populations through migration and breeding."
                },
                {
                    type: "short-answer",
                    question: "What is the bottleneck effect?",
                    correctAnswers: ["population bottleneck", "genetic bottleneck"],
                    explanation: "A bottleneck effect occurs when a population's size is significantly reduced, reducing genetic diversity."
                },
                {
                    type: "multiple-choice",
                    question: "Which factor can change allele frequencies in a population?",
                    options: ["Natural selection", "Genetic drift", "Gene flow", "All of the above"],
                    correct: 3,
                    explanation: "Natural selection, genetic drift, and gene flow can all change allele frequencies in populations."
                }
            ]
        }
    },

    physiology: {
        topics: {
            "Cardiovascular Physiology": [
                {
                    type: "multiple-choice",
                    question: "What is the average cardiac output at rest?",
                    options: ["3-4 L/min", "5-6 L/min", "7-8 L/min", "9-10 L/min"],
                    correct: 1,
                    explanation: "The average cardiac output at rest is approximately 5-6 liters per minute."
                },
                {
                    type: "true-false",
                    question: "Blood pressure is highest during systole.",
                    correct: true,
                    explanation: "True. Systolic pressure occurs when the heart contracts, creating the highest pressure in arteries."
                },
                {
                    type: "multiple-choice",
                    question: "What is the normal blood pressure for a healthy adult?",
                    options: ["90/60 mmHg", "120/80 mmHg", "140/90 mmHg", "160/100 mmHg"],
                    correct: 1,
                    explanation: "Normal blood pressure for healthy adults is around 120/80 mmHg."
                },
                {
                    type: "short-answer",
                    question: "What is the term for the relaxation phase of the cardiac cycle?",
                    correctAnswers: ["diastole", "diastolic phase"],
                    explanation: "Diastole is the relaxation phase when the heart fills with blood."
                },
                {
                    type: "multiple-choice",
                    question: "Which factor does NOT affect cardiac output?",
                    options: ["Heart rate", "Stroke volume", "Blood type", "Contractility"],
                    correct: 2,
                    explanation: "Cardiac output = heart rate × stroke volume. Blood type does not directly affect cardiac output."
                }
            ],
            "Respiratory Physiology": [
                {
                    type: "multiple-choice",
                    question: "What is the normal respiratory rate for adults at rest?",
                    options: ["8-10 breaths/min", "12-20 breaths/min", "25-30 breaths/min", "35-40 breaths/min"],
                    correct: 1,
                    explanation: "Normal respiratory rate for adults at rest is 12-20 breaths per minute."
                },
                {
                    type: "true-false",
                    question: "Carbon dioxide is the primary stimulus for breathing.",
                    correct: true,
                    explanation: "True. Increased CO2 levels in blood are the primary stimulus that triggers breathing."
                },
                {
                    type: "short-answer",
                    question: "What is the total lung capacity of an average adult?",
                    correctAnswers: ["6 liters", "6000 ml", "6L"],
                    explanation: "Total lung capacity is approximately 6 liters in healthy adults."
                },
                {
                    type: "multiple-choice",
                    question: "Which muscles are involved in forced expiration?",
                    options: ["Diaphragm only", "External intercostals", "Internal intercostals and abdominals", "Sternocleidomastoid"],
                    correct: 2,
                    explanation: "Forced expiration involves internal intercostal muscles and abdominal muscles."
                },
                {
                    type: "multiple-select",
                    question: "What factors affect oxygen binding to hemoglobin? (Select all that apply)",
                    options: ["pH", "Temperature", "CO2 levels", "Blood pressure", "2,3-BPG"],
                    correct: [0, 1, 2, 4],
                    explanation: "pH, temperature, CO2 levels, and 2,3-BPG all affect oxygen-hemoglobin binding."
                }
            ],
            "Endocrine Physiology": [
                {
                    type: "true-false",
                    question: "Insulin is produced by the pancreas.",
                    correct: true,
                    explanation: "True. Insulin is produced by the beta cells in the islets of Langerhans in the pancreas."
                },
                {
                    type: "multiple-select",
                    question: "Which hormones are produced by the adrenal glands? (Select all that apply)",
                    options: ["Cortisol", "Insulin", "Adrenaline", "Aldosterone", "Thyroxine"],
                    correct: [0, 2, 3],
                    explanation: "The adrenal glands produce cortisol, adrenaline (epinephrine), and aldosterone. Insulin is from the pancreas, and thyroxine is from the thyroid."
                },
                {
                    type: "short-answer",
                    question: "What hormone regulates blood sugar levels?",
                    correctAnswers: ["insulin", "insulin and glucagon"],
                    explanation: "Insulin (and glucagon) are the primary hormones that regulate blood glucose levels."
                },
                {
                    type: "multiple-choice",
                    question: "Which gland is known as the 'master gland'?",
                    options: ["Thyroid", "Adrenal", "Pituitary", "Pancreas"],
                    correct: 2,
                    explanation: "The pituitary gland is called the 'master gland' because it controls other endocrine glands."
                },
                {
                    type: "true-false",
                    question: "Growth hormone is released primarily during sleep.",
                    correct: true,
                    explanation: "True. Growth hormone is released in pulses, with the largest release occurring during deep sleep."
                }
            ],
            "Neurophysiology": [
                {
                    type: "multiple-choice",
                    question: "Which part of the brain controls balance and coordination?",
                    options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"],
                    correct: 1,
                    explanation: "The cerebellum is responsible for balance, coordination, and fine motor control."
                },
                {
                    type: "true-false",
                    question: "The left hemisphere of the brain controls the right side of the body.",
                    correct: true,
                    explanation: "True. Due to the crossing of nerve fibers, the left hemisphere controls the right side of the body and vice versa."
                },
                {
                    type: "multiple-choice",
                    question: "What is the resting membrane potential of a typical neuron?",
                    options: ["-50 mV", "-70 mV", "-90 mV", "-110 mV"],
                    correct: 1,
                    explanation: "The resting membrane potential is approximately -70 mV in most neurons."
                },
                {
                    type: "short-answer",
                    question: "What neurotransmitter is primarily involved in muscle contraction?",
                    correctAnswers: ["acetylcholine", "ACh"],
                    explanation: "Acetylcholine (ACh) is the primary neurotransmitter at the neuromuscular junction."
                },
                {
                    type: "multiple-choice",
                    question: "Which structure connects the two cerebral hemispheres?",
                    options: ["Corpus callosum", "Brain stem", "Cerebellum", "Thalamus"],
                    correct: 0,
                    explanation: "The corpus callosum is a large bundle of nerve fibers connecting the two hemispheres."
                }
            ],
            "Renal Physiology": [
                {
                    type: "multiple-choice",
                    question: "What is the normal pH range of human blood?",
                    options: ["7.0-7.2", "7.35-7.45", "7.5-7.6", "6.8-7.0"],
                    correct: 1,
                    explanation: "The normal pH range of human blood is 7.35-7.45, which is slightly alkaline."
                },
                {
                    type: "short-answer",
                    question: "What is the primary function of red blood cells?",
                    correctAnswers: ["carry oxygen", "transport oxygen", "oxygen transport", "oxygen delivery"],
                    explanation: "The primary function of red blood cells (erythrocytes) is to carry oxygen from the lungs to body tissues."
                },
                {
                    type: "multiple-choice",
                    question: "What percentage of cardiac output goes to the kidneys?",
                    options: ["10%", "15%", "20%", "25%"],
                    correct: 3,
                    explanation: "Approximately 25% of cardiac output goes to the kidneys for filtration."
                },
                {
                    type: "true-false",
                    question: "The kidneys play a role in blood pressure regulation.",
                    correct: true,
                    explanation: "True. Kidneys regulate blood pressure through the renin-angiotensin-aldosterone system."
                },
                {
                    type: "multiple-choice",
                    question: "What is the normal urine output per day?",
                    options: ["500-800 mL", "800-1200 mL", "1200-1800 mL", "1800-2400 mL"],
                    correct: 2,
                    explanation: "Normal daily urine output is approximately 1200-1800 mL."
                }
            ]
        }
    },

    microbiology: {
        topics: {
            "Bacterial Morphology and Classification": [
                {
                    type: "multiple-choice",
                    question: "Which of the following is NOT a type of bacteria based on shape?",
                    options: ["Cocci", "Bacilli", "Spirilla", "Viruses"],
                    correct: 3,
                    explanation: "Viruses are not bacteria and are not classified by shape like bacteria are."
                },
                {
                    type: "multiple-choice",
                    question: "Which staining method is used to differentiate bacteria into two major groups?",
                    options: ["Acid-fast stain", "Gram stain", "Spore stain", "Capsule stain"],
                    correct: 1,
                    explanation: "Gram staining differentiates bacteria into Gram-positive and Gram-negative based on cell wall structure."
                },
                {
                    type: "true-false",
                    question: "All bacteria have peptidoglycan in their cell walls.",
                    correct: false,
                    explanation: "False. Gram-positive bacteria have thick peptidoglycan layers, while Gram-negative have thin layers."
                },
                {
                    type: "multiple-choice",
                    question: "What shape are cocci bacteria?",
                    options: ["Rod-shaped", "Spiral-shaped", "Spherical", "Comma-shaped"],
                    correct: 2,
                    explanation: "Cocci are spherical or round-shaped bacteria."
                },
                {
                    type: "short-answer",
                    question: "What are spiral-shaped bacteria called?",
                    correctAnswers: ["spirilla", "spirochetes"],
                    explanation: "Spiral-shaped bacteria are called spirilla or spirochetes depending on their specific morphology."
                }
            ],
            "Bacterial Growth and Survival": [
                {
                    type: "multiple-choice",
                    question: "What is the most heat-resistant form of bacterial life?",
                    options: ["Vegetative cells", "Spores", "Cysts", "Biofilms"],
                    correct: 1,
                    explanation: "Bacterial spores are extremely heat-resistant and can survive harsh conditions."
                },
                {
                    type: "multiple-choice",
                    question: "What is binary fission?",
                    options: ["Sexual reproduction", "Asexual reproduction", "Spore formation", "Conjugation"],
                    correct: 1,
                    explanation: "Binary fission is the asexual reproduction method where bacteria divide into two identical cells."
                },
                {
                    type: "true-false",
                    question: "Bacteria can only grow in the presence of oxygen.",
                    correct: false,
                    explanation: "False. Some bacteria are anaerobic and grow without oxygen, while others require oxygen."
                },
                {
                    type: "multiple-choice",
                    question: "What is the generation time of E. coli under optimal conditions?",
                    options: ["10 minutes", "20 minutes", "30 minutes", "60 minutes"],
                    correct: 1,
                    explanation: "E. coli has a generation time of approximately 20 minutes under optimal conditions."
                },
                {
                    type: "short-answer",
                    question: "What is the lag phase in bacterial growth?",
                    correctAnswers: ["adaptation phase", "adjustment phase"],
                    explanation: "The lag phase is when bacteria adapt to new environmental conditions before exponential growth begins."
                }
            ],
            "Fungi and Parasites": [
                {
                    type: "multiple-choice",
                    question: "What is the primary component of fungal cell walls?",
                    options: ["Cellulose", "Peptidoglycan", "Chitin", "Protein"],
                    correct: 2,
                    explanation: "Chitin is the primary structural component of fungal cell walls."
                },
                {
                    type: "multiple-choice",
                    question: "Which microorganism is responsible for causing malaria?",
                    options: ["Bacteria", "Virus", "Protozoan", "Fungus"],
                    correct: 2,
                    explanation: "Malaria is caused by Plasmodium species, which are protozoans transmitted by mosquitoes."
                },
                {
                    type: "true-false",
                    question: "Fungi are prokaryotic organisms.",
                    correct: false,
                    explanation: "False. Fungi are eukaryotic organisms with membrane-bound nuclei and organelles."
                },
                {
                    type: "multiple-choice",
                    question: "What type of reproduction do yeasts primarily use?",
                    options: ["Binary fission", "Budding", "Fragmentation", "Conjugation"],
                    correct: 1,
                    explanation: "Yeasts primarily reproduce asexually through budding."
                },
                {
                    type: "short-answer",
                    question: "What is the vector for malaria transmission?",
                    correctAnswers: ["mosquito", "anopheles mosquito"],
                    explanation: "Malaria is transmitted by Anopheles mosquitoes that carry Plasmodium parasites."
                }
            ],
            "Viruses and Viral Infections": [
                {
                    type: "true-false",
                    question: "Viruses can reproduce independently.",
                    correct: false,
                    explanation: "False. Viruses are obligate intracellular parasites that require host cells to reproduce."
                },
                {
                    type: "multiple-choice",
                    question: "What is the protein coat of a virus called?",
                    options: ["Capsid", "Envelope", "Core", "Matrix"],
                    correct: 0,
                    explanation: "The capsid is the protein coat that surrounds and protects viral genetic material."
                },
                {
                    type: "multiple-choice",
                    question: "Which virus causes AIDS?",
                    options: ["HSV", "HPV", "HIV", "HBV"],
                    correct: 2,
                    explanation: "HIV (Human Immunodeficiency Virus) causes AIDS (Acquired Immunodeficiency Syndrome)."
                },
                {
                    type: "short-answer",
                    question: "What are bacteriophages?",
                    correctAnswers: ["viruses that infect bacteria", "bacterial viruses"],
                    explanation: "Bacteriophages are viruses that specifically infect and replicate within bacteria."
                },
                {
                    type: "multiple-choice",
                    question: "What is the lytic cycle?",
                    options: ["Viral dormancy", "Immediate viral replication and cell death", "Slow viral integration", "Viral mutation"],
                    correct: 1,
                    explanation: "The lytic cycle involves immediate viral replication followed by host cell lysis and death."
                }
            ],
            "Antimicrobials and Resistance": [
                {
                    type: "multiple-choice",
                    question: "What is the mechanism of action of penicillin?",
                    options: ["Protein synthesis inhibition", "Cell wall synthesis inhibition", "DNA replication inhibition", "Cell membrane disruption"],
                    correct: 1,
                    explanation: "Penicillin inhibits bacterial cell wall synthesis by targeting peptidoglycan formation."
                },
                {
                    type: "true-false",
                    question: "Antibiotics are effective against viral infections.",
                    correct: false,
                    explanation: "False. Antibiotics target bacterial structures and processes, not viral components."
                },
                {
                    type: "multiple-choice",
                    question: "What is MRSA?",
                    options: ["A viral infection", "Methicillin-resistant Staphylococcus aureus", "A fungal disease", "A parasitic infection"],
                    correct: 1,
                    explanation: "MRSA is Methicillin-resistant Staphylococcus aureus, a bacteria resistant to many antibiotics."
                },
                {
                    type: "short-answer",
                    question: "What is antibiotic resistance?",
                    correctAnswers: ["bacterial resistance to antibiotics", "drug resistance"],
                    explanation: "Antibiotic resistance is the ability of bacteria to survive and multiply despite the presence of antibiotics."
                },
                {
                    type: "multiple-choice",
                    question: "Which process leads to antibiotic resistance?",
                    options: ["Mutation only", "Horizontal gene transfer only", "Both mutation and gene transfer", "Viral infection"],
                    correct: 2,
                    explanation: "Antibiotic resistance develops through both spontaneous mutations and horizontal gene transfer between bacteria."
                }
            ]
        }
    },

    pharmacology: {
        topics: {
            "Pharmacokinetics": [
                {
                    type: "multiple-choice",
                    question: "What is the study of drug absorption, distribution, metabolism, and excretion called?",
                    options: ["Pharmacodynamics", "Pharmacokinetics", "Toxicology", "Posology"],
                    correct: 1,
                    explanation: "Pharmacokinetics studies what the body does to drugs (ADME processes)."
                },
                {
                    type: "multiple-choice",
                    question: "Which route of drug administration provides 100% bioavailability?",
                    options: ["Oral", "Intramuscular", "Intravenous", "Sublingual"],
                    correct: 2,
                    explanation: "Intravenous administration provides 100% bioavailability as the drug goes directly into circulation."
                },
                {
                    type: "multiple-choice",
                    question: "What does 'half-life' mean in pharmacology?",
                    options: ["Time to reach peak concentration", "Time for 50% drug elimination", "Duration of action", "Time to onset"],
                    correct: 1,
                    explanation: "Half-life is the time required for the drug concentration to decrease by 50%."
                },
                {
                    type: "short-answer",
                    question: "What does ADME stand for in pharmacokinetics?",
                    correctAnswers: ["absorption distribution metabolism excretion", "absorption, distribution, metabolism, excretion"],
                    explanation: "ADME stands for Absorption, Distribution, Metabolism, and Excretion - the four main pharmacokinetic processes."
                },
                {
                    type: "true-false",
                    question: "First-pass metabolism occurs in the liver.",
                    correct: true,
                    explanation: "True. First-pass metabolism occurs when orally administered drugs are metabolized by the liver before reaching systemic circulation."
                }
            ],
            "Pharmacodynamics": [
                {
                    type: "multiple-choice",
                    question: "What is the term for the minimum concentration of drug needed to produce an effect?",
                    options: ["ED50", "LD50", "Threshold dose", "Toxic dose"],
                    correct: 2,
                    explanation: "Threshold dose is the minimum concentration required to produce a measurable effect."
                },
                {
                    type: "multiple-choice",
                    question: "What does ED50 represent?",
                    options: ["Effective dose for 50% of population", "Lethal dose for 50%", "Threshold dose", "Maximum safe dose"],
                    correct: 0,
                    explanation: "ED50 is the dose that produces the desired effect in 50% of the population."
                },
                {
                    type: "true-false",
                    question: "Agonists activate receptors while antagonists block them.",
                    correct: true,
                    explanation: "True. Agonists bind to and activate receptors, while antagonists bind but do not activate receptors."
                },
                {
                    type: "short-answer",
                    question: "What is the therapeutic index?",
                    correctAnswers: ["ratio of toxic to therapeutic dose", "LD50/ED50"],
                    explanation: "Therapeutic index is the ratio between the toxic dose and therapeutic dose, indicating drug safety."
                },
                {
                    type: "multiple-choice",
                    question: "What type of antagonist competes for the same binding site?",
                    options: ["Competitive", "Non-competitive", "Irreversible", "Allosteric"],
                    correct: 0,
                    explanation: "Competitive antagonists compete with agonists for the same receptor binding site."
                }
            ],
            "Drug Metabolism": [
                {
                    type: "multiple-choice",
                    question: "Which enzyme is responsible for metabolizing many drugs in the liver?",
                    options: ["Cytochrome P450", "Monoamine oxidase", "Acetylcholinesterase", "Phospholipase"],
                    correct: 0,
                    explanation: "Cytochrome P450 enzymes are the primary drug-metabolizing enzymes in the liver."
                },
                {
                    type: "multiple-choice",
                    question: "What are Phase I drug metabolism reactions?",
                    options: ["Conjugation reactions", "Oxidation, reduction, hydrolysis", "Protein binding", "Renal excretion"],
                    correct: 1,
                    explanation: "Phase I reactions include oxidation, reduction, and hydrolysis, primarily by cytochrome P450 enzymes."
                },
                {
                    type: "true-false",
                    question: "Phase II metabolism reactions make drugs more water-soluble.",
                    correct: true,
                    explanation: "True. Phase II conjugation reactions increase drug water solubility for easier excretion."
                },
                {
                    type: "short-answer",
                    question: "What is enzyme induction?",
                    correctAnswers: ["increased enzyme production", "upregulation of enzymes"],
                    explanation: "Enzyme induction is the increased production of drug-metabolizing enzymes, often leading to faster drug clearance."
                },
                {
                    type: "multiple-choice",
                    question: "Which organ is the primary site of drug metabolism?",
                    options: ["Kidneys", "Lungs", "Liver", "Heart"],
                    correct: 2,
                    explanation: "The liver is the primary site of drug metabolism due to its high concentration of metabolizing enzymes."
                }
            ],
            "Drug Classes and Mechanisms": [
                {
                    type: "multiple-choice",
                    question: "Which class of drugs blocks sodium channels?",
                    options: ["Beta blockers", "Calcium channel blockers", "Local anesthetics", "ACE inhibitors"],
                    correct: 2,
                    explanation: "Local anesthetics block voltage-gated sodium channels to prevent nerve conduction."
                },
                {
                    type: "multiple-choice",
                    question: "What is the mechanism of action of aspirin?",
                    options: ["COX-1 and COX-2 inhibition", "Histamine receptor blocking", "Beta receptor blocking", "Calcium channel blocking"],
                    correct: 0,
                    explanation: "Aspirin irreversibly inhibits COX-1 and COX-2 enzymes, reducing prostaglandin synthesis."
                },
                {
                    type: "true-false",
                    question: "Beta blockers reduce heart rate and blood pressure.",
                    correct: true,
                    explanation: "True. Beta blockers block beta-adrenergic receptors, reducing heart rate and contractility."
                },
                {
                    type: "short-answer",
                    question: "What do ACE inhibitors do?",
                    correctAnswers: ["block angiotensin converting enzyme", "reduce blood pressure"],
                    explanation: "ACE inhibitors block angiotensin-converting enzyme, reducing angiotensin II formation and blood pressure."
                },
                {
                    type: "multiple-choice",
                    question: "Which neurotransmitter do benzodiazepines enhance?",
                    options: ["Dopamine", "Serotonin", "GABA", "Acetylcholine"],
                    correct: 2,
                    explanation: "Benzodiazepines enhance GABA activity at GABA-A receptors, producing anxiolytic effects."
                }
            ],
            "Adverse Drug Reactions": [
                {
                    type: "multiple-choice",
                    question: "What is an idiosyncratic drug reaction?",
                    options: ["Dose-dependent toxicity", "Unpredictable individual reaction", "Allergic reaction", "Drug interaction"],
                    correct: 1,
                    explanation: "Idiosyncratic reactions are unpredictable, individual responses not related to dose or known mechanisms."
                },
                {
                    type: "true-false",
                    question: "Type A adverse drug reactions are dose-dependent.",
                    correct: true,
                    explanation: "True. Type A (Augmented) reactions are predictable and dose-dependent extensions of pharmacological effects."
                },
                {
                    type: "multiple-choice",
                    question: "What is Stevens-Johnson syndrome?",
                    options: ["Liver toxicity", "Severe skin reaction", "Kidney damage", "Heart arrhythmia"],
                    correct: 1,
                    explanation: "Stevens-Johnson syndrome is a severe, life-threatening skin and mucous membrane reaction to drugs."
                },
                {
                    type: "short-answer",
                    question: "What is pharmacovigilance?",
                    correctAnswers: ["monitoring drug safety", "adverse drug reaction monitoring"],
                    explanation: "Pharmacovigilance is the science of monitoring, detecting, and preventing adverse drug reactions."
                },
                {
                    type: "multiple-choice",
                    question: "Which organ is most commonly affected by drug-induced toxicity?",
                    options: ["Brain", "Heart", "Liver", "Lungs"],
                    correct: 2,
                    explanation: "The liver is most commonly affected due to its central role in drug metabolism."
                }
            ]
        }
    },

    immunology: {
        topics: {
            "Innate Immunity": [
                {
                    type: "multiple-choice",
                    question: "Which cells are part of the innate immune system?",
                    options: ["B cells", "T cells", "Neutrophils", "Plasma cells"],
                    correct: 2,
                    explanation: "Neutrophils are part of the innate immune system and provide immediate defense against pathogens."
                },
                {
                    type: "true-false",
                    question: "Innate immunity provides specific protection against pathogens.",
                    correct: false,
                    explanation: "False. Innate immunity provides non-specific, general protection against pathogens."
                },
                {
                    type: "multiple-choice",
                    question: "What is the first line of defense in innate immunity?",
                    options: ["Neutrophils", "Macrophages", "Physical barriers", "Complement system"],
                    correct: 2,
                    explanation: "Physical barriers like skin and mucous membranes are the first line of defense."
                },
                {
                    type: "short-answer",
                    question: "What cells engulf and destroy pathogens?",
                    correctAnswers: ["phagocytes", "macrophages", "neutrophils"],
                    explanation: "Phagocytes, including macrophages and neutrophils, engulf and destroy pathogens."
                },
                {
                    type: "multiple-choice",
                    question: "Which complement pathway is activated by antibody-antigen complexes?",
                    options: ["Classical pathway", "Alternative pathway", "Lectin pathway", "Terminal pathway"],
                    correct: 0,
                    explanation: "The classical complement pathway is activated by antibody-antigen immune complexes."
                }
            ],
            "Adaptive Immunity": [
                {
                    type: "multiple-choice",
                    question: "Which cells are primarily responsible for antibody production?",
                    options: ["T cells", "B cells", "NK cells", "Dendritic cells"],
                    correct: 1,
                    explanation: "B cells differentiate into plasma cells that produce antibodies."
                },
                {
                    type: "multiple-choice",
                    question: "What is the primary function of helper T cells?",
                    options: ["Kill infected cells", "Produce antibodies", "Coordinate immune response", "Present antigens"],
                    correct: 2,
                    explanation: "Helper T cells coordinate the immune response by activating other immune cells."
                },
                {
                    type: "multiple-choice",
                    question: "Which cells present antigens to T cells?",
                    options: ["B cells", "Dendritic cells", "NK cells", "Plasma cells"],
                    correct: 1,
                    explanation: "Dendritic cells are professional antigen-presenting cells that activate T cells."
                },
                {
                    type: "true-false",
                    question: "Cytotoxic T cells directly kill infected cells.",
                    correct: true,
                    explanation: "True. Cytotoxic T cells (CD8+) directly kill infected, malignant, or foreign cells."
                },
                {
                    type: "short-answer",
                    question: "What is immunological memory?",
                    correctAnswers: ["faster secondary response", "memory cells"],
                    explanation: "Immunological memory is the ability to mount a faster, stronger response upon re-exposure to an antigen."
                }
            ],
            "Antibodies and Immunoglobulins": [
                {
                    type: "multiple-choice",
                    question: "What is the most abundant antibody in human serum?",
                    options: ["IgA", "IgE", "IgG", "IgM"],
                    correct: 2,
                    explanation: "IgG is the most abundant antibody in blood and provides long-term immunity."
                },
                {
                    type: "multiple-choice",
                    question: "Which antibody is involved in allergic reactions?",
                    options: ["IgG", "IgA", "IgE", "IgD"],
                    correct: 2,
                    explanation: "IgE is responsible for allergic reactions and protection against parasites."
                },
                {
                    type: "true-false",
                    question: "IgM is the first antibody produced during an immune response.",
                    correct: true,
                    explanation: "True. IgM is the first antibody class produced during the primary immune response."
                },
                {
                    type: "short-answer",
                    question: "What part of an antibody binds to antigens?",
                    correctAnswers: ["variable region", "antigen binding site", "fab region"],
                    explanation: "The variable region (Fab region) of antibodies binds specifically to antigens."
                },
                {
                    type: "multiple-choice",
                    question: "Which immunoglobulin is most prevalent in secretions?",
                    options: ["IgG", "IgA", "IgM", "IgE"],
                    correct: 1,
                    explanation: "IgA is the predominant antibody in secretions like saliva, tears, and breast milk."
                }
            ],
            "Vaccination and Immunization": [
                {
                    type: "multiple-choice",
                    question: "Which type of immunity is provided by vaccines?",
                    options: ["Active natural", "Active artificial", "Passive natural", "Passive artificial"],
                    correct: 1,
                    explanation: "Vaccines provide active artificial immunity by stimulating the immune system to produce antibodies."
                },
                {
                    type: "true-false",
                    question: "Live attenuated vaccines contain weakened but living pathogens.",
                    correct: true,
                    explanation: "True. Live attenuated vaccines contain weakened versions of the pathogen that can replicate but not cause disease."
                },
                {
                    type: "multiple-choice",
                    question: "What is herd immunity?",
                    options: ["Individual protection", "Population-level protection", "Vaccine failure", "Natural infection"],
                    correct: 1,
                    explanation: "Herd immunity occurs when enough people are immune to prevent disease transmission in the population."
                },
                {
                    type: "short-answer",
                    question: "What are adjuvants in vaccines?",
                    correctAnswers: ["immune enhancers", "substances that enhance immune response"],
                    explanation: "Adjuvants are substances added to vaccines to enhance and prolong the immune response."
                },
                {
                    type: "multiple-choice",
                    question: "Which vaccine type provides the longest-lasting immunity?",
                    options: ["Inactivated", "Live attenuated", "Subunit", "Toxoid"],
                    correct: 1,
                    explanation: "Live attenuated vaccines typically provide the longest-lasting immunity, often lifelong."
                }
            ],
            "Autoimmunity and Immunodeficiency": [
                {
                    type: "multiple-choice",
                    question: "What is an autoimmune disease?",
                    options: ["Overactive immune system", "Immune system attacks self", "Weak immune system", "Allergic reaction"],
                    correct: 1,
                    explanation: "Autoimmune diseases occur when the immune system mistakenly attacks the body's own tissues."
                },
                {
                    type: "multiple-choice",
                    question: "Which condition is characterized by destruction of insulin-producing cells?",
                    options: ["Type 2 diabetes", "Type 1 diabetes", "Hypothyroidism", "Rheumatoid arthritis"],
                    correct: 1,
                    explanation: "Type 1 diabetes is an autoimmune condition where the immune system destroys insulin-producing beta cells."
                },
                {
                    type: "true-false",
                    question: "Primary immunodeficiency is acquired later in life.",
                    correct: false,
                    explanation: "False. Primary immunodeficiency is congenital (present from birth), while secondary is acquired."
                },
                {
                    type: "short-answer",
                    question: "What does SCID stand for?",
                    correctAnswers: ["severe combined immunodeficiency", "severe combined immune deficiency"],
                    explanation: "SCID stands for Severe Combined Immunodeficiency, a group of rare inherited disorders."
                },
                {
                    type: "multiple-choice",
                    question: "Which organ transplant rejection is mediated by T cells?",
                    options: ["Hyperacute", "Acute", "Chronic", "All types"],
                    correct: 1,
                    explanation: "Acute transplant rejection is primarily mediated by T cells recognizing foreign HLA molecules."
                }
            ]
        }
    },

    molecularbiology: {
        topics: {
            "DNA Structure and Replication": [
                {
                    type: "multiple-choice",
                    question: "What enzyme unwinds DNA during replication?",
                    options: ["DNA polymerase", "Helicase", "Primase", "Ligase"],
                    correct: 1,
                    explanation: "Helicase unwinds the DNA double helix by breaking hydrogen bonds between base pairs."
                },
                {
                    type: "true-false",
                    question: "DNA replication occurs in the 5' to 3' direction.",
                    correct: true,
                    explanation: "True. DNA polymerase synthesizes new DNA strands in the 5' to 3' direction."
                },
                {
                    type: "multiple-choice",
                    question: "What is the leading strand?",
                    options: ["Discontinuous synthesis", "Continuous synthesis", "Template strand", "Antisense strand"],
                    correct: 1,
                    explanation: "The leading strand is synthesized continuously in the 5' to 3' direction."
                },
                {
                    type: "short-answer",
                    question: "What are Okazaki fragments?",
                    correctAnswers: ["short DNA segments", "lagging strand fragments"],
                    explanation: "Okazaki fragments are short DNA segments synthesized discontinuously on the lagging strand."
                },
                {
                    type: "multiple-choice",
                    question: "Which enzyme fills in gaps between Okazaki fragments?",
                    options: ["Helicase", "Primase", "DNA ligase", "Topoisomerase"],
                    correct: 2,
                    explanation: "DNA ligase joins Okazaki fragments by forming phosphodiester bonds between adjacent nucleotides."
                }
            ],
            "RNA Structure and Function": [
                {
                    type: "multiple-choice",
                    question: "What sugar is found in RNA?",
                    options: ["Deoxyribose", "Ribose", "Glucose", "Fructose"],
                    correct: 1,
                    explanation: "RNA contains ribose sugar, which has a hydroxyl group on the 2' carbon."
                },
                {
                    type: "true-false",
                    question: "RNA is typically single-stranded.",
                    correct: true,
                    explanation: "True. RNA is typically single-stranded, unlike DNA which is double-stranded."
                },
                {
                    type: "multiple-select",
                    question: "Which are types of RNA? (Select all that apply)",
                    options: ["mRNA", "tRNA", "rRNA", "dRNA", "miRNA"],
                    correct: [0, 1, 2, 4],
                    explanation: "Types of RNA include mRNA, tRNA, rRNA, and miRNA. dRNA does not exist."
                },
                {
                    type: "short-answer",
                    question: "What is the function of mRNA?",
                    correctAnswers: ["carries genetic information", "messenger RNA"],
                    explanation: "mRNA carries genetic information from DNA to ribosomes for protein synthesis."
                },
                {
                    type: "multiple-choice",
                    question: "Which RNA type is involved in protein synthesis at ribosomes?",
                    options: ["mRNA only", "tRNA only", "rRNA only", "All three types"],
                    correct: 3,
                    explanation: "Protein synthesis involves mRNA (template), tRNA (amino acid delivery), and rRNA (ribosome component)."
                }
            ],
            "Protein Synthesis": [
                {
                    type: "multiple-choice",
                    question: "Where does translation occur in eukaryotes?",
                    options: ["Nucleus", "Cytoplasm", "Mitochondria", "Endoplasmic reticulum"],
                    correct: 1,
                    explanation: "Translation occurs in the cytoplasm at ribosomes in eukaryotes."
                },
                {
                    type: "true-false",
                    question: "The genetic code is universal.",
                    correct: true,
                    explanation: "True. The genetic code is nearly universal across all living organisms."
                },
                {
                    type: "multiple-choice",
                    question: "How many amino acids are encoded by the genetic code?",
                    options: ["20", "21", "22", "64"],
                    correct: 0,
                    explanation: "The genetic code specifies 20 standard amino acids used in protein synthesis."
                },
                {
                    type: "short-answer",
                    question: "What is the start codon?",
                    correctAnswers: ["AUG", "aug"],
                    explanation: "AUG is the start codon that initiates protein synthesis and codes for methionine."
                },
                {
                    type: "multiple-choice",
                    question: "What happens during elongation in translation?",
                    options: ["Initiation of synthesis", "Addition of amino acids", "Termination of synthesis", "mRNA processing"],
                    correct: 1,
                    explanation: "During elongation, amino acids are sequentially added to the growing protein chain."
                }
            ],
            "Gene Regulation": [
                {
                    type: "multiple-choice",
                    question: "What is an operon?",
                    options: ["Single gene", "Group of genes with related functions", "Protein complex", "RNA molecule"],
                    correct: 1,
                    explanation: "An operon is a cluster of genes under the control of a single promoter."
                },
                {
                    type: "true-false",
                    question: "Transcription factors bind to promoter regions.",
                    correct: true,
                    explanation: "True. Transcription factors bind to promoter regions to regulate gene expression."
                },
                {
                    type: "multiple-choice",
                    question: "What is the function of enhancers?",
                    options: ["Block transcription", "Increase transcription", "Process mRNA", "Translate proteins"],
                    correct: 1,
                    explanation: "Enhancers are DNA sequences that increase the rate of transcription when bound by activators."
                },
                {
                    type: "short-answer",
                    question: "What are histones?",
                    correctAnswers: ["DNA-binding proteins", "chromatin proteins"],
                    explanation: "Histones are proteins around which DNA wraps to form chromatin structure."
                },
                {
                    type: "multiple-choice",
                    question: "What is epigenetic regulation?",
                    options: ["DNA sequence changes", "Heritable changes without DNA alteration", "Protein mutations", "RNA degradation"],
                    correct: 1,
                    explanation: "Epigenetic regulation involves heritable changes in gene expression without altering DNA sequence."
                }
            ],
            "Molecular Techniques": [
                {
                    type: "multiple-choice",
                    question: "What is the purpose of PCR?",
                    options: ["DNA sequencing", "DNA amplification", "Protein synthesis", "RNA processing"],
                    correct: 1,
                    explanation: "PCR (Polymerase Chain Reaction) amplifies specific DNA sequences exponentially."
                },
                {
                    type: "true-false",
                    question: "Northern blotting detects specific RNA molecules.",
                    correct: true,
                    explanation: "True. Northern blotting is used to detect specific RNA molecules in a sample."
                },
                {
                    type: "multiple-choice",
                    question: "What enzyme is used in reverse transcription?",
                    options: ["DNA polymerase", "RNA polymerase", "Reverse transcriptase", "Ligase"],
                    correct: 2,
                    explanation: "Reverse transcriptase synthesizes DNA from an RNA template."
                },
                {
                    type: "short-answer",
                    question: "What is DNA sequencing?",
                    correctAnswers: ["determining DNA order", "reading DNA sequence"],
                    explanation: "DNA sequencing determines the order of nucleotides in a DNA molecule."
                },
                {
                    type: "multiple-choice",
                    question: "What is CRISPR-Cas9 used for?",
                    options: ["DNA amplification", "Gene editing", "RNA detection", "Protein purification"],
                    correct: 1,
                    explanation: "CRISPR-Cas9 is a revolutionary tool for precise gene editing and modification."
                }
            ]
        }
    },

    pathology: {
        topics: {
            "General Pathology": [
                {
                    type: "multiple-choice",
                    question: "What is pathology?",
                    options: ["Study of normal function", "Study of disease processes", "Study of anatomy", "Study of genetics"],
                    correct: 1,
                    explanation: "Pathology is the study of disease processes, including their causes, mechanisms, and effects."
                },
                {
                    type: "multiple-choice",
                    question: "What are the four cardinal signs of inflammation?",
                    options: ["Pain, swelling, redness, fever", "Redness, heat, swelling, pain", "Fever, chills, pain, swelling", "Heat, cold, pain, numbness"],
                    correct: 1,
                    explanation: "The four cardinal signs of inflammation are redness, heat, swelling, and pain (rubor, calor, tumor, dolor)."
                },
                {
                    type: "true-false",
                    question: "Necrosis is programmed cell death.",
                    correct: false,
                    explanation: "False. Necrosis is uncontrolled cell death due to injury. Apoptosis is programmed cell death."
                },
                {
                    type: "short-answer",
                    question: "What is etiology?",
                    correctAnswers: ["cause of disease", "disease causation"],
                    explanation: "Etiology is the study of the causes or origins of diseases."
                },
                {
                    type: "multiple-choice",
                    question: "What is the difference between acute and chronic inflammation?",
                    options: ["Duration and cell types", "Location only", "Severity only", "Age of patient"],
                    correct: 0,
                    explanation: "Acute inflammation is short-term with neutrophils, while chronic inflammation is long-term with lymphocytes and macrophages."
                }
            ],
            "Cellular Pathology": [
                {
                    type: "multiple-choice",
                    question: "What is apoptosis?",
                    options: ["Cell growth", "Programmed cell death", "Cell division", "Cell differentiation"],
                    correct: 1,
                    explanation: "Apoptosis is programmed cell death that occurs naturally during development and tissue homeostasis."
                },
                {
                    type: "true-false",
                    question: "Hypertrophy involves an increase in cell number.",
                    correct: false,
                    explanation: "False. Hypertrophy involves an increase in cell size. Hyperplasia involves an increase in cell number."
                },
                {
                    type: "multiple-choice",
                    question: "What is metaplasia?",
                    options: ["Cell death", "Abnormal cell growth", "Replacement of one cell type with another", "Cell shrinkage"],
                    correct: 2,
                    explanation: "Metaplasia is the replacement of one differentiated cell type with another, usually as an adaptive response."
                },
                {
                    type: "short-answer",
                    question: "What is dysplasia?",
                    correctAnswers: ["abnormal cell development", "disordered cell growth"],
                    explanation: "Dysplasia is abnormal cellular development characterized by altered size, shape, and organization of cells."
                },
                {
                    type: "multiple-choice",
                    question: "Which process involves cell shrinkage due to decreased workload?",
                    options: ["Hypertrophy", "Hyperplasia", "Atrophy", "Metaplasia"],
                    correct: 2,
                    explanation: "Atrophy is the decrease in cell size and number, often due to decreased use or aging."
                }
            ],
            "Neoplasia and Cancer": [
                {
                    type: "multiple-choice",
                    question: "What is a neoplasm?",
                    options: ["Normal tissue", "Abnormal new growth", "Inflammatory response", "Healing tissue"],
                    correct: 1,
                    explanation: "A neoplasm is an abnormal new growth of tissue that serves no physiological function."
                },
                {
                    type: "true-false",
                    question: "All neoplasms are malignant.",
                    correct: false,
                    explanation: "False. Neoplasms can be benign (non-cancerous) or malignant (cancerous)."
                },
                {
                    type: "multiple-choice",
                    question: "What is metastasis?",
                    options: ["Local tumor growth", "Spread of cancer to distant sites", "Tumor regression", "Normal cell division"],
                    correct: 1,
                    explanation: "Metastasis is the spread of cancer cells from the primary tumor to distant organs or tissues."
                },
                {
                    type: "short-answer",
                    question: "What are oncogenes?",
                    correctAnswers: ["cancer-promoting genes", "genes that promote cancer"],
                    explanation: "Oncogenes are genes that, when activated or overexpressed, can promote cancer development."
                },
                {
                    type: "multiple-choice",
                    question: "What is the difference between benign and malignant tumors?",
                    options: ["Size only", "Color only", "Growth pattern and spread", "Age of occurrence"],
                    correct: 2,
                    explanation: "Benign tumors grow slowly and don't spread, while malignant tumors grow rapidly and can metastasize."
                }
            ],
            "Infectious Diseases": [
                {
                    type: "multiple-choice",
                    question: "What is the most common cause of healthcare-associated infections?",
                    options: ["Viruses", "Bacteria", "Fungi", "Parasites"],
                    correct: 1,
                    explanation: "Bacteria are the most common cause of healthcare-associated infections."
                },
                {
                    type: "true-false",
                    question: "Opportunistic infections occur in immunocompromised patients.",
                    correct: true,
                    explanation: "True. Opportunistic infections are caused by organisms that normally don't cause disease in healthy individuals."
                },
                {
                    type: "multiple-choice",
                    question: "What is sepsis?",
                    options: ["Local infection", "Systemic inflammatory response to infection", "Wound healing", "Immune deficiency"],
                    correct: 1,
                    explanation: "Sepsis is a life-threatening systemic inflammatory response to infection."
                },
                {
                    type: "short-answer",
                    question: "What is a nosocomial infection?",
                    correctAnswers: ["hospital-acquired infection", "healthcare-associated infection"],
                    explanation: "A nosocomial infection is an infection acquired in a healthcare setting during medical care."
                },
                {
                    type: "multiple-choice",
                    question: "Which pathogen causes tuberculosis?",
                    options: ["Staphylococcus aureus", "Mycobacterium tuberculosis", "Streptococcus pneumoniae", "Escherichia coli"],
                    correct: 1,
                    explanation: "Tuberculosis is caused by Mycobacterium tuberculosis, an acid-fast bacillus."
                }
            ],
            "Cardiovascular Pathology": [
                {
                    type: "multiple-choice",
                    question: "What is atherosclerosis?",
                    options: ["Heart muscle disease", "Buildup of plaque in arteries", "Heart rhythm disorder", "Valve disease"],
                    correct: 1,
                    explanation: "Atherosclerosis is the buildup of fatty plaques in arterial walls, leading to narrowing and hardening."
                },
                {
                    type: "true-false",
                    question: "Myocardial infarction is caused by blocked coronary arteries.",
                    correct: true,
                    explanation: "True. Myocardial infarction (heart attack) occurs when coronary arteries are blocked, depriving heart muscle of oxygen."
                },
                {
                    type: "multiple-choice",
                    question: "What is hypertension?",
                    options: ["Low blood pressure", "High blood pressure", "Irregular heartbeat", "Heart failure"],
                    correct: 1,
                    explanation: "Hypertension is persistently elevated blood pressure that can damage blood vessels and organs."
                },
                {
                    type: "short-answer",
                    question: "What is stroke?",
                    correctAnswers: ["brain blood flow interruption", "cerebrovascular accident"],
                    explanation: "Stroke is the interruption of blood flow to part of the brain, causing brain tissue damage."
                },
                {
                    type: "multiple-choice",
                    question: "Which type of stroke is caused by bleeding in the brain?",
                    options: ["Ischemic stroke", "Hemorrhagic stroke", "Embolic stroke", "Thrombotic stroke"],
                    correct: 1,
                    explanation: "Hemorrhagic stroke is caused by bleeding in the brain due to ruptured blood vessels."
                }
            ]
        }
    },

    biostatistics: {
        topics: {
            "Descriptive Statistics": [
                {
                    type: "multiple-choice",
                    question: "What is the most commonly used measure of central tendency?",
                    options: ["Mean", "Median", "Mode", "Range"],
                    correct: 0,
                    explanation: "The mean (average) is the most commonly used measure of central tendency in biostatistics."
                },
                {
                    type: "true-false",
                    question: "The median is less affected by outliers than the mean.",
                    correct: true,
                    explanation: "True. The median is more robust to outliers than the mean because it represents the middle value."
                },
                {
                    type: "multiple-choice",
                    question: "What does standard deviation measure?",
                    options: ["Central tendency", "Variability", "Correlation", "Probability"],
                    correct: 1,
                    explanation: "Standard deviation measures the variability or spread of data around the mean."
                },
                {
                    type: "short-answer",
                    question: "What is a frequency distribution?",
                    correctAnswers: ["data organization by values", "count of each value"],
                    explanation: "A frequency distribution shows how often each value occurs in a dataset."
                },
                {
                    type: "multiple-choice",
                    question: "Which measure is best for skewed data?",
                    options: ["Mean", "Median", "Mode", "Standard deviation"],
                    correct: 1,
                    explanation: "The median is preferred for skewed distributions as it's less influenced by extreme values."
                }
            ],
            "Probability and Distributions": [
                {
                    type: "multiple-choice",
                    question: "What is the range of probability values?",
                    options: ["-1 to 1", "0 to 1", "0 to 100", "-∞ to +∞"],
                    correct: 1,
                    explanation: "Probability values range from 0 (impossible) to 1 (certain)."
                },
                {
                    type: "true-false",
                    question: "The normal distribution is symmetric around the mean.",
                    correct: true,
                    explanation: "True. The normal distribution is bell-shaped and symmetric around the mean."
                },
                {
                    type: "multiple-choice",
                    question: "What percentage of data falls within 2 standard deviations in a normal distribution?",
                    options: ["68%", "95%", "99%", "99.7%"],
                    correct: 1,
                    explanation: "Approximately 95% of data falls within 2 standard deviations from the mean in a normal distribution."
                },
                {
                    type: "short-answer",
                    question: "What is a p-value?",
                    correctAnswers: ["probability of result by chance", "statistical significance measure"],
                    explanation: "A p-value is the probability of obtaining results at least as extreme as observed, assuming the null hypothesis is true."
                },
                {
                    type: "multiple-choice",
                    question: "Which distribution is used for small sample sizes?",
                    options: ["Normal", "t-distribution", "Chi-square", "F-distribution"],
                    correct: 1,
                    explanation: "The t-distribution is used when sample sizes are small (typically n < 30) and population standard deviation is unknown."
                }
            ],
            "Hypothesis Testing": [
                {
                    type: "multiple-choice",
                    question: "What is a null hypothesis?",
                    options: ["Alternative explanation", "No effect or difference", "Positive result", "Research hypothesis"],
                    correct: 1,
                    explanation: "The null hypothesis states there is no effect, difference, or relationship between variables."
                },
                {
                    type: "true-false",
                    question: "A Type I error occurs when we reject a true null hypothesis.",
                    correct: true,
                    explanation: "True. Type I error (false positive) occurs when we incorrectly reject a true null hypothesis."
                },
                {
                    type: "multiple-choice",
                    question: "What is the conventional significance level (alpha)?",
                    options: ["0.01", "0.05", "0.10", "0.25"],
                    correct: 1,
                    explanation: "The conventional significance level (alpha) is 0.05, meaning 5% chance of Type I error."
                },
                {
                    type: "short-answer",
                    question: "What is statistical power?",
                    correctAnswers: ["probability of detecting true effect", "1 minus beta"],
                    explanation: "Statistical power is the probability of correctly rejecting a false null hypothesis (detecting a true effect)."
                },
                {
                    type: "multiple-choice",
                    question: "Which test is used to compare means of two independent groups?",
                    options: ["Paired t-test", "Independent t-test", "Chi-square test", "ANOVA"],
                    correct: 1,
                    explanation: "An independent (unpaired) t-test compares means between two separate groups."
                }
            ],
            "Study Design and Sampling": [
                {
                    type: "multiple-choice",
                    question: "Which study design is considered the gold standard for clinical research?",
                    options: ["Case-control", "Cross-sectional", "Cohort", "Randomized controlled trial"],
                    correct: 3,
                    explanation: "Randomized controlled trials (RCTs) are considered the gold standard due to their ability to establish causation."
                },
                {
                    type: "true-false",
                    question: "Random sampling helps ensure sample representativeness.",
                    correct: true,
                    explanation: "True. Random sampling helps ensure that the sample is representative of the target population."
                },
                {
                    type: "multiple-choice",
                    question: "What is selection bias?",
                    options: ["Random error", "Systematic error in participant selection", "Measurement error", "Confounding variable"],
                    correct: 1,
                    explanation: "Selection bias is systematic error in how participants are chosen or retained in a study."
                },
                {
                    type: "short-answer",
                    question: "What is a confounding variable?",
                    correctAnswers: ["variable affecting both exposure and outcome", "third variable"],
                    explanation: "A confounding variable is associated with both the exposure and outcome, potentially distorting the true relationship."
                },
                {
                    type: "multiple-choice",
                    question: "What is the purpose of blinding in clinical trials?",
                    options: ["Increase sample size", "Reduce bias", "Improve randomization", "Ensure compliance"],
                    correct: 1,
                    explanation: "Blinding prevents bias by keeping participants and/or investigators unaware of treatment assignments."
                }
            ],
            "Epidemiological Measures": [
                {
                    type: "multiple-choice",
                    question: "What does incidence measure?",
                    options: ["Total disease cases", "New disease cases over time", "Disease severity", "Treatment response"],
                    correct: 1,
                    explanation: "Incidence measures the rate of new cases of disease occurring in a population over a specific time period."
                },
                {
                    type: "true-false",
                    question: "Prevalence includes both new and existing cases.",
                    correct: true,
                    explanation: "True. Prevalence is the proportion of a population that has a disease at a specific time, including both new and existing cases."
                },
                {
                    type: "multiple-choice",
                    question: "What is relative risk?",
                    options: ["Absolute difference in risk", "Ratio of risks between groups", "Percentage increase in risk", "Number needed to treat"],
                    correct: 1,
                    explanation: "Relative risk is the ratio of the risk in the exposed group to the risk in the unexposed group."
                },
                {
                    type: "short-answer",
                    question: "What is the odds ratio?",
                    correctAnswers: ["ratio of odds", "measure of association"],
                    explanation: "Odds ratio is the ratio of odds of an event occurring in one group compared to another group."
                },
                {
                    type: "multiple-choice",
                    question: "What does a confidence interval indicate?",
                    options: ["Exact value", "Range of plausible values", "Statistical significance", "Sample size"],
                    correct: 1,
                    explanation: "A confidence interval provides a range of plausible values for a population parameter with a specified level of confidence."
                }
            ]
        }
    },

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

// Featured Quizzes Management for Home Page
function loadFeaturedQuizzes() {
    const featuredContainer = document.getElementById('featuredQuizzesGrid');
    if (!featuredContainer) return;
    
    // Define featured categories with enhanced descriptions
    const featuredCategories = [
        {
            name: 'Cell Biology',
            icon: 'fas fa-microscope',
            color: '#3b82f6',
            description: 'Explore cellular structures, organelles, and fundamental processes that govern life at the microscopic level.',
            questionCount: getQuestionCount('Cell Biology'),
            difficulty: 'Intermediate',
            popularity: 95
        },
        {
            name: 'Biochemistry',
            icon: 'fas fa-flask',
            color: '#10b981',
            description: 'Master molecular interactions, metabolic pathways, and chemical processes within living organisms.',
            questionCount: getQuestionCount('Biochemistry'),
            difficulty: 'Advanced',
            popularity: 89
        },
        {
            name: 'Genetics',
            icon: 'fas fa-dna',
            color: '#8b5cf6',
            description: 'Understand heredity, gene expression, and genetic variations that shape biological diversity.',
            questionCount: getQuestionCount('Genetics'),
            difficulty: 'Intermediate',
            popularity: 92
        },
        {
            name: 'Physiology',
            icon: 'fas fa-heartbeat',
            color: '#ef4444',
            description: 'Study organ systems, homeostasis, and physiological mechanisms that maintain life.',
            questionCount: getQuestionCount('Physiology'),
            difficulty: 'Advanced',
            popularity: 87
        },
        {
            name: 'Immunology',
            icon: 'fas fa-shield-alt',
            color: '#f59e0b',
            description: 'Discover immune responses, defense mechanisms, and protection against pathogens.',
            questionCount: getQuestionCount('Immunology'),
            difficulty: 'Advanced',
            popularity: 84
        },
        {
            name: 'Pharmacology',
            icon: 'fas fa-pills',
            color: '#06b6d4',
            description: 'Learn drug mechanisms, therapeutic effects, and pharmaceutical interventions.',
            questionCount: getQuestionCount('Pharmacology'),
            difficulty: 'Expert',
            popularity: 78
        }
    ];
    
    // Sort by popularity and take top 6
    const topFeatured = featuredCategories.sort((a, b) => b.popularity - a.popularity).slice(0, 6);
    
    featuredContainer.innerHTML = topFeatured.map(category => `
        <div class="featured-quiz-card" 
             style="border-left-color: ${category.color}"
             onclick="startFeaturedQuiz('${category.name}')"
             data-category="${category.name}">
            <div class="quiz-card-header">
                <div class="quiz-category-icon" style="background: ${category.color}">
                    <i class="${category.icon}"></i>
                </div>
                <div>
                    <div class="quiz-card-title">${category.name}</div>
                    <div class="quiz-difficulty" style="color: ${category.color}; font-weight: 600; font-size: 0.9rem;">
                        ${category.difficulty} Level
                    </div>
                </div>
            </div>
            <div class="quiz-card-description">
                ${category.description}
            </div>
            <div class="quiz-card-stats">
                <div class="quiz-stat">
                    <i class="fas fa-question-circle"></i>
                    <span>${category.questionCount} Questions</span>
                </div>
                <div class="quiz-stat">
                    <i class="fas fa-fire"></i>
                    <span>${category.popularity}% Popular</span>
                </div>
            </div>
        </div>
    `).join('');
}

function getQuestionCount(category) {
    // Map display names to database keys
    const categoryMap = {
        'Cell Biology': 'cellbiology',
        'Biochemistry': 'biochemistry',
        'Genetics': 'genetics',
        'Molecular Biology': 'molecularbiology',
        'Physiology': 'physiology',
        'Immunology': 'immunology',
        'Pharmacology': 'pharmacology',
        'Pathology': 'pathology',
        'Microbiology': 'microbiology',
        'Anatomy': 'anatomy',
        'Biostatistics': 'biostatistics'
    };
    
    const dbKey = categoryMap[category] || category.toLowerCase();
    return questionDatabase[dbKey] ? questionDatabase[dbKey].length : 0;
}

function startFeaturedQuiz(categoryName) {
    // Map display name to category key for the quiz system
    const categoryMap = {
        'Cell Biology': 'cellbiology',
        'Biochemistry': 'biochemistry',
        'Genetics': 'genetics',
        'Molecular Biology': 'molecularbiology',
        'Physiology': 'physiology',
        'Immunology': 'immunology',
        'Pharmacology': 'pharmacology',
        'Pathology': 'pathology',
        'Microbiology': 'microbiology',
        'Anatomy': 'anatomy',
        'Biostatistics': 'biostatistics'
    };
    
    const categoryKey = categoryMap[categoryName] || categoryName.toLowerCase();
    
    // Start the quiz
    startCategoryQuiz(categoryKey);
}

// Enhanced stats loading for home page
function loadHomeStats() {
    // Update total questions count
    const totalQuestions = Object.values(questionDatabase).reduce((total, questions) => total + questions.length, 0);
    const totalQuestionsElement = document.getElementById('totalQuestionsCount');
    if (totalQuestionsElement) {
        totalQuestionsElement.textContent = totalQuestions + '+';
    }
    
    // Update categories count
    const totalCategoriesElement = document.getElementById('totalCategoriesCount');
    if (totalCategoriesElement) {
        totalCategoriesElement.textContent = Object.keys(questionDatabase).length;
    }
    
    // Update user and session counts
    const totalUsersElement = document.getElementById('totalUsersCount');
    if (totalUsersElement) {
        // Get actual registered users count
        const users = JSON.parse(localStorage.getItem('registeredUsers')) || {};
        const userCount = Object.keys(users).length;
        totalUsersElement.textContent = userCount > 0 ? userCount.toLocaleString() : '1,234';
    }
    
    const totalSessionsElement = document.getElementById('totalSessionsCount');
    if (totalSessionsElement) {
        // Calculate total sessions from all users
        let totalSessions = 0;
        const users = JSON.parse(localStorage.getItem('registeredUsers')) || {};
        Object.keys(users).forEach(username => {
            const userSessions = JSON.parse(localStorage.getItem(`${username}_sessions`)) || [];
            totalSessions += userSessions.length;
        });
        totalSessionsElement.textContent = totalSessions > 0 ? totalSessions.toLocaleString() : '5,678';
    }
}

// Enhanced navigation function for home page buttons
function showCategories() {
    showSection('categories');
}

// Category filtering functionality
function filterCategories(filter) {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const categoryGroups = document.querySelectorAll('.category-group');
    
    // Update active tab
    filterTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.filter === filter) {
            tab.classList.add('active');
        }
    });
    
    // Show/hide category groups
    categoryGroups.forEach(group => {
        if (filter === 'all' || group.dataset.group === filter) {
            group.classList.remove('hidden');
        } else {
            group.classList.add('hidden');
        }
    });
}

// Update question counts for categories
function updateCategoryCounts() {
    const categoryMap = {
        'anatomy': 'anatomy-count',
        'physiology': 'physiology-count', 
        'biochemistry': 'biochemistry-count',
        'cellbiology': 'cellbiology-count',
        'genetics': 'genetics-count',
        'molecularbiology': 'molecularbiology-count',
        'pathology': 'pathology-count',
        'pharmacology': 'pharmacology-count',
        'immunology': 'immunology-count',
        'microbiology': 'microbiology-count',
        'biostatistics': 'biostatistics-count'
    };
    
    Object.entries(categoryMap).forEach(([category, elementId]) => {
        const element = document.getElementById(elementId);
        if (element) {
            const count = questionDatabase[category] ? questionDatabase[category].length : 0;
            element.textContent = `${count} questions`;
        }
    });
}

// Quick start functions
function startRandomQuiz() {
    const categories = Object.keys(questionDatabase);
    if (categories.length === 0) return;
    
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    startCategoryQuiz(randomCategory);
}

function startPersonalizedQuiz() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please log in to access personalized quizzes based on your performance.');
        return;
    }
    
    const userSessions = JSON.parse(localStorage.getItem(`${currentUser.username}_sessions`)) || [];
    
    if (userSessions.length === 0) {
        // If no history, start with a foundational category
        startCategoryQuiz('cellbiology');
        return;
    }
    
    // Find weakest performing category
    const categoryScores = {};
    userSessions.forEach(session => {
        if (!categoryScores[session.category]) {
            categoryScores[session.category] = [];
        }
        categoryScores[session.category].push(session.score);
    });
    
    let weakestCategory = 'cellbiology';
    let lowestScore = 100;
    
    Object.entries(categoryScores).forEach(([category, scores]) => {
        const avgScore = scores.reduce((a, b) => a + b) / scores.length;
        if (avgScore < lowestScore) {
            lowestScore = avgScore;
            weakestCategory = category;
        }
    });
    
    startCategoryQuiz(weakestCategory);
}

function startChallengeMode() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please log in to access challenge mode.');
        return;
    }
    
    // Set challenge mode parameters
    currentQuiz.challengeMode = true;
    currentQuiz.timeLimit = 15; // 15 seconds per question
    
    // Mix questions from multiple categories for challenge
    const allQuestions = [];
    Object.values(questionDatabase).forEach(categoryQuestions => {
        allQuestions.push(...categoryQuestions);
    });
    
    // Select 20 random difficult questions
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    currentQuiz.questions = shuffled.slice(0, 20);
    currentQuiz.category = 'Challenge Mode';
    
    showSection('quiz');
    startQuizSession();
}

// Initialize home page features
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure other initializations complete first
    setTimeout(() => {
        loadFeaturedQuizzes();
        loadHomeStats();
        updateCategoryCounts();
        
        // Update stats periodically
        setInterval(() => {
            loadHomeStats();
            updateCategoryCounts();
        }, 30000);
    }, 100);
});