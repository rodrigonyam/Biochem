// Admin Panel Management System
class AdminManager {
    constructor() {
        this.currentEditingQuestion = null;
        this.filteredQuestions = null;
        this.init();
    }

    init() {
        // Initialize admin panel if user is admin
        this.checkAdminAccess();
    }

    checkAdminAccess() {
        // For now, allow admin access for all users
        // In production, you'd check user roles from the database
        return true;
    }

    showAdminNavigation() {
        const adminNav = document.getElementById('admin-nav');
        const adminDropdown = document.getElementById('admin-dropdown-link');
        
        if (this.checkAdminAccess() && userManager.currentUser) {
            if (adminNav) adminNav.style.display = 'block';
            if (adminDropdown) adminDropdown.style.display = 'block';
        } else {
            if (adminNav) adminNav.style.display = 'none';
            if (adminDropdown) adminDropdown.style.display = 'none';
        }
    }

    loadQuestionsGrid() {
        const grid = document.getElementById('admin-questions-grid');
        if (!grid) return;

        const categoryFilter = document.getElementById('admin-category-filter')?.value || 'all';
        const typeFilter = document.getElementById('admin-type-filter')?.value || 'all';

        // Get all questions from the question database
        let allQuestions = [];
        Object.entries(questionDatabase).forEach(([category, questions]) => {
            questions.forEach((question, index) => {
                allQuestions.push({
                    ...question,
                    category,
                    id: `${category}_${index}`,
                    index
                });
            });
        });

        // Apply filters
        let filteredQuestions = allQuestions;
        if (categoryFilter !== 'all') {
            filteredQuestions = filteredQuestions.filter(q => q.category === categoryFilter);
        }
        if (typeFilter !== 'all') {
            filteredQuestions = filteredQuestions.filter(q => q.type === typeFilter);
        }

        this.filteredQuestions = filteredQuestions;

        if (filteredQuestions.length === 0) {
            grid.innerHTML = `
                <div class="no-questions">
                    <i class="fas fa-question-circle"></i>
                    <h3>No questions found</h3>
                    <p>No questions match your current filters.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filteredQuestions.map(question => this.createQuestionCard(question)).join('');
    }

    createQuestionCard(question) {
        const categoryTitle = getCategoryTitle(question.category);
        const typeTitle = this.formatQuestionType(question.type);
        
        // Format options based on question type
        let optionsHtml = '';
        if (question.type === 'multiple-choice' && question.options) {
            optionsHtml = question.options.map((option, index) => 
                `<div class="question-option ${index === question.correct ? 'correct' : ''}">${option}</div>`
            ).join('');
        } else if (question.type === 'true-false') {
            optionsHtml = `
                <div class="question-option ${question.correct === true ? 'correct' : ''}">True</div>
                <div class="question-option ${question.correct === false ? 'correct' : ''}">False</div>
            `;
        } else if (question.type === 'multiple-select' && question.options) {
            optionsHtml = question.options.map((option, index) => 
                `<div class="question-option ${question.correctAnswers?.includes(index) ? 'correct' : ''}">${option}</div>`
            ).join('');
        } else if (question.type === 'short-answer' && question.correctAnswers) {
            optionsHtml = question.correctAnswers.map(answer => 
                `<div class="question-option correct">${answer}</div>`
            ).join('');
        }

        return `
            <div class="question-card" data-question-id="${question.id}">
                <div class="question-header">
                    <div class="question-meta">
                        <span class="question-type-badge">${typeTitle}</span>
                        <span class="question-category-badge">${categoryTitle}</span>
                    </div>
                    <div class="question-actions">
                        <button class="question-btn edit" onclick="adminManager.editQuestion('${question.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="question-btn delete" onclick="adminManager.deleteQuestion('${question.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
                <div class="question-text">${question.question}</div>
                <div class="question-options">${optionsHtml}</div>
                ${question.explanation ? `<div class="question-explanation"><strong>Explanation:</strong> ${question.explanation}</div>` : ''}
            </div>
        `;
    }

    formatQuestionType(type) {
        const types = {
            'multiple-choice': 'Multiple Choice',
            'true-false': 'True/False',
            'short-answer': 'Short Answer',
            'multiple-select': 'Multiple Select'
        };
        return types[type] || type;
    }

    editQuestion(questionId) {
        const question = this.findQuestionById(questionId);
        if (!question) return;

        this.currentEditingQuestion = questionId;
        this.showQuestionModal('Edit Question', question);
    }

    deleteQuestion(questionId) {
        if (!confirm('Are you sure you want to delete this question? This action cannot be undone.')) {
            return;
        }

        const [category, index] = questionId.split('_');
        const questionIndex = parseInt(index);

        if (questionDatabase[category] && questionDatabase[category][questionIndex]) {
            questionDatabase[category].splice(questionIndex, 1);
            this.saveQuestionsToStorage();
            this.loadQuestionsGrid();
            this.updateCategoryStats();
            showMessage('Question deleted successfully!', 'success');
        }
    }

    findQuestionById(questionId) {
        const [category, index] = questionId.split('_');
        const questionIndex = parseInt(index);
        
        if (questionDatabase[category] && questionDatabase[category][questionIndex]) {
            return {
                ...questionDatabase[category][questionIndex],
                category,
                id: questionId,
                index: questionIndex
            };
        }
        return null;
    }

    showQuestionModal(title = 'Add New Question', question = null) {
        const modal = document.getElementById('question-modal-overlay');
        const titleElement = document.getElementById('question-modal-title');
        const form = document.getElementById('question-form');
        
        if (!modal || !titleElement || !form) return;

        titleElement.textContent = title;
        
        // Reset form
        form.reset();
        
        // If editing, populate form with question data
        if (question) {
            document.getElementById('question-category').value = question.category;
            document.getElementById('question-type').value = question.type;
            document.getElementById('question-text').value = question.question;
            document.getElementById('question-explanation').value = question.explanation || '';
        }

        // Update form fields based on question type
        this.updateQuestionTypeFields();
        
        // If editing, populate type-specific fields
        if (question) {
            this.populateQuestionTypeFields(question);
        }

        modal.style.display = 'flex';
    }

    closeQuestionModal() {
        const modal = document.getElementById('question-modal-overlay');
        if (modal) {
            modal.style.display = 'none';
        }
        this.currentEditingQuestion = null;
    }

    updateQuestionTypeFields() {
        const questionType = document.getElementById('question-type').value;
        const container = document.getElementById('question-options-container');
        
        if (!container) return;

        switch (questionType) {
            case 'multiple-choice':
                container.innerHTML = `
                    <div class="form-group">
                        <label>Options</label>
                        <div class="option-input-group">
                            <input type="text" class="option-input" placeholder="Option 1" required>
                        </div>
                        <div class="option-input-group">
                            <input type="text" class="option-input" placeholder="Option 2" required>
                        </div>
                        <div class="option-input-group">
                            <input type="text" class="option-input" placeholder="Option 3" required>
                        </div>
                        <div class="option-input-group">
                            <input type="text" class="option-input" placeholder="Option 4" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="correct-answer">Correct Answer</label>
                        <select id="correct-answer" class="correct-answer-select" required>
                            <option value="0">Option 1</option>
                            <option value="1">Option 2</option>
                            <option value="2">Option 3</option>
                            <option value="3">Option 4</option>
                        </select>
                    </div>
                `;
                break;

            case 'true-false':
                container.innerHTML = `
                    <div class="form-group">
                        <label for="correct-answer">Correct Answer</label>
                        <select id="correct-answer" class="correct-answer-select" required>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                `;
                break;

            case 'short-answer':
                container.innerHTML = `
                    <div class="form-group">
                        <label>Acceptable Answers</label>
                        <div class="short-answer-inputs" id="short-answer-inputs">
                            <div class="acceptable-answer">
                                <input type="text" placeholder="Acceptable answer..." required>
                                <button type="button" class="remove-answer-btn" onclick="this.parentElement.remove()" style="display: none;">×</button>
                            </div>
                        </div>
                        <button type="button" class="add-answer-btn" onclick="adminManager.addAcceptableAnswer()">
                            <i class="fas fa-plus"></i> Add Another Answer
                        </button>
                    </div>
                `;
                break;

            case 'multiple-select':
                container.innerHTML = `
                    <div class="form-group">
                        <label>Options (check all correct answers)</label>
                        <div class="option-input-group">
                            <input type="checkbox" class="option-checkbox" value="0">
                            <input type="text" class="option-input" placeholder="Option 1" required>
                        </div>
                        <div class="option-input-group">
                            <input type="checkbox" class="option-checkbox" value="1">
                            <input type="text" class="option-input" placeholder="Option 2" required>
                        </div>
                        <div class="option-input-group">
                            <input type="checkbox" class="option-checkbox" value="2">
                            <input type="text" class="option-input" placeholder="Option 3" required>
                        </div>
                        <div class="option-input-group">
                            <input type="checkbox" class="option-checkbox" value="3">
                            <input type="text" class="option-input" placeholder="Option 4" required>
                        </div>
                    </div>
                `;
                break;
        }
    }

    populateQuestionTypeFields(question) {
        const questionType = question.type;

        switch (questionType) {
            case 'multiple-choice':
                if (question.options) {
                    const optionInputs = document.querySelectorAll('.option-input');
                    question.options.forEach((option, index) => {
                        if (optionInputs[index]) {
                            optionInputs[index].value = option;
                        }
                    });
                }
                if (typeof question.correct === 'number') {
                    document.getElementById('correct-answer').value = question.correct.toString();
                }
                break;

            case 'true-false':
                document.getElementById('correct-answer').value = question.correct.toString();
                break;

            case 'short-answer':
                if (question.correctAnswers) {
                    const container = document.getElementById('short-answer-inputs');
                    container.innerHTML = '';
                    question.correctAnswers.forEach((answer, index) => {
                        const answerDiv = document.createElement('div');
                        answerDiv.className = 'acceptable-answer';
                        answerDiv.innerHTML = `
                            <input type="text" value="${answer}" required>
                            <button type="button" class="remove-answer-btn" onclick="this.parentElement.remove()" ${index === 0 ? 'style="display: none;"' : ''}>×</button>
                        `;
                        container.appendChild(answerDiv);
                    });
                }
                break;

            case 'multiple-select':
                if (question.options) {
                    const optionInputs = document.querySelectorAll('.option-input');
                    const checkboxes = document.querySelectorAll('.option-checkbox');
                    
                    question.options.forEach((option, index) => {
                        if (optionInputs[index]) {
                            optionInputs[index].value = option;
                        }
                    });
                    
                    if (question.correctAnswers) {
                        question.correctAnswers.forEach(correctIndex => {
                            if (checkboxes[correctIndex]) {
                                checkboxes[correctIndex].checked = true;
                            }
                        });
                    }
                }
                break;
        }
    }

    addAcceptableAnswer() {
        const container = document.getElementById('short-answer-inputs');
        if (!container) return;

        const answerDiv = document.createElement('div');
        answerDiv.className = 'acceptable-answer';
        answerDiv.innerHTML = `
            <input type="text" placeholder="Acceptable answer..." required>
            <button type="button" class="remove-answer-btn" onclick="this.parentElement.remove()">×</button>
        `;
        container.appendChild(answerDiv);

        // Show remove buttons on all items if there's more than one
        const removeButtons = container.querySelectorAll('.remove-answer-btn');
        removeButtons.forEach(btn => btn.style.display = 'block');
        if (removeButtons.length > 0) {
            removeButtons[0].style.display = 'none'; // Hide first remove button
        }
    }

    saveQuestion(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const questionData = this.extractQuestionData();
        
        if (!questionData) {
            showMessage('Please fill in all required fields correctly.', 'error');
            return;
        }

        if (this.currentEditingQuestion) {
            // Update existing question
            const [category, index] = this.currentEditingQuestion.split('_');
            const questionIndex = parseInt(index);
            
            if (questionDatabase[category] && questionDatabase[category][questionIndex]) {
                // If category changed, move question
                if (category !== questionData.category) {
                    // Remove from old category
                    questionDatabase[category].splice(questionIndex, 1);
                    // Add to new category
                    if (!questionDatabase[questionData.category]) {
                        questionDatabase[questionData.category] = [];
                    }
                    questionDatabase[questionData.category].push(questionData);
                } else {
                    // Update in same category
                    questionDatabase[category][questionIndex] = questionData;
                }
                
                showMessage('Question updated successfully!', 'success');
            }
        } else {
            // Add new question
            if (!questionDatabase[questionData.category]) {
                questionDatabase[questionData.category] = [];
            }
            questionDatabase[questionData.category].push(questionData);
            showMessage('Question added successfully!', 'success');
        }

        this.saveQuestionsToStorage();
        this.loadQuestionsGrid();
        this.updateCategoryStats();
        this.closeQuestionModal();
    }

    extractQuestionData() {
        const category = document.getElementById('question-category').value;
        const type = document.getElementById('question-type').value;
        const questionText = document.getElementById('question-text').value.trim();
        const explanation = document.getElementById('question-explanation').value.trim();

        if (!category || !type || !questionText) {
            return null;
        }

        const questionData = {
            type,
            question: questionText,
            explanation: explanation || undefined
        };

        switch (type) {
            case 'multiple-choice':
                const options = Array.from(document.querySelectorAll('.option-input'))
                    .map(input => input.value.trim())
                    .filter(value => value);
                
                const correctAnswer = parseInt(document.getElementById('correct-answer').value);
                
                if (options.length < 2 || isNaN(correctAnswer)) {
                    return null;
                }
                
                questionData.options = options;
                questionData.correct = correctAnswer;
                break;

            case 'true-false':
                const tfCorrect = document.getElementById('correct-answer').value;
                questionData.correct = tfCorrect === 'true';
                break;

            case 'short-answer':
                const acceptableAnswers = Array.from(document.querySelectorAll('#short-answer-inputs input'))
                    .map(input => input.value.trim())
                    .filter(value => value);
                
                if (acceptableAnswers.length === 0) {
                    return null;
                }
                
                questionData.correctAnswers = acceptableAnswers;
                break;

            case 'multiple-select':
                const msOptions = Array.from(document.querySelectorAll('.option-input'))
                    .map(input => input.value.trim())
                    .filter(value => value);
                
                const msCorrectAnswers = Array.from(document.querySelectorAll('.option-checkbox:checked'))
                    .map(checkbox => parseInt(checkbox.value));
                
                if (msOptions.length < 2 || msCorrectAnswers.length === 0) {
                    return null;
                }
                
                questionData.options = msOptions;
                questionData.correctAnswers = msCorrectAnswers;
                break;

            default:
                return null;
        }

        return questionData;
    }

    saveQuestionsToStorage() {
        localStorage.setItem('bioquiz_questions', JSON.stringify(questionDatabase));
    }

    loadQuestionsFromStorage() {
        const stored = localStorage.getItem('bioquiz_questions');
        if (stored) {
            const storedQuestions = JSON.parse(stored);
            // Merge with existing questions
            Object.entries(storedQuestions).forEach(([category, questions]) => {
                if (!questionDatabase[category]) {
                    questionDatabase[category] = [];
                }
                // Add only new questions (simple approach for demo)
                questionDatabase[category] = [...questionDatabase[category], ...questions];
            });
        }
    }

    updateCategoryStats() {
        const statsGrid = document.getElementById('category-stats-grid');
        if (!statsGrid) return;

        const stats = Object.entries(questionDatabase).map(([category, questions]) => ({
            category: getCategoryTitle(category),
            count: questions.length,
            types: [...new Set(questions.map(q => q.type))].length
        }));

        const totalQuestions = stats.reduce((sum, stat) => sum + stat.count, 0);

        statsGrid.innerHTML = stats.map(stat => `
            <div class="stat-card">
                <div class="stat-number">${stat.count}</div>
                <div class="stat-label">${stat.category}</div>
                <div class="stat-meta">${stat.types} question types</div>
            </div>
        `).join('') + `
            <div class="stat-card">
                <div class="stat-number">${totalQuestions}</div>
                <div class="stat-label">Total Questions</div>
                <div class="stat-meta">${stats.length} categories</div>
            </div>
        `;
    }

    exportQuestions() {
        const category = document.getElementById('export-category').value;
        let questionsToExport = {};

        if (category === 'all') {
            questionsToExport = questionDatabase;
        } else {
            questionsToExport[category] = questionDatabase[category] || [];
        }

        const dataStr = JSON.stringify(questionsToExport, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `bioquiz-questions-${category}-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        showMessage('Questions exported successfully!', 'success');
    }

    importQuestions() {
        const jsonText = document.getElementById('import-json').value.trim();
        
        if (!jsonText) {
            showMessage('Please paste JSON data to import.', 'error');
            return;
        }

        try {
            const importedData = JSON.parse(jsonText);
            
            // Validate the structure
            if (typeof importedData !== 'object') {
                throw new Error('Invalid JSON structure');
            }

            let importedCount = 0;
            Object.entries(importedData).forEach(([category, questions]) => {
                if (Array.isArray(questions)) {
                    if (!questionDatabase[category]) {
                        questionDatabase[category] = [];
                    }
                    
                    questions.forEach(question => {
                        // Validate question structure
                        if (question.type && question.question) {
                            questionDatabase[category].push(question);
                            importedCount++;
                        }
                    });
                }
            });

            this.saveQuestionsToStorage();
            this.loadQuestionsGrid();
            this.updateCategoryStats();
            
            document.getElementById('import-json').value = '';
            showMessage(`Successfully imported ${importedCount} questions!`, 'success');
            
        } catch (error) {
            showMessage('Invalid JSON format. Please check your data and try again.', 'error');
        }
    }
}

// Global admin manager instance
let adminManager;

// Admin navigation functions
function showAdmin() {
    showSection('admin');
    if (!adminManager) {
        adminManager = new AdminManager();
    }
    adminManager.loadQuestionsGrid();
    adminManager.updateCategoryStats();
}

function showAdminTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.admin-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab
    event.target.classList.add('active');
    document.getElementById(`${tabName}-admin`).classList.add('active');
    
    if (tabName === 'questions') {
        adminManager.loadQuestionsGrid();
    } else if (tabName === 'categories') {
        adminManager.updateCategoryStats();
    }
}

function showAddQuestionModal() {
    adminManager.showQuestionModal();
}

function closeQuestionModal() {
    adminManager.closeQuestionModal();
}

function updateQuestionTypeFields() {
    adminManager.updateQuestionTypeFields();
}

function saveQuestion(event) {
    adminManager.saveQuestion(event);
}

function filterQuestionsByCategory() {
    adminManager.loadQuestionsGrid();
}

function filterQuestionsByType() {
    adminManager.loadQuestionsGrid();
}

function exportQuestions() {
    adminManager.exportQuestions();
}

function importQuestions() {
    adminManager.importQuestions();
}

// Initialize admin functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin manager
    adminManager = new AdminManager();
    
    // Load questions from storage on startup
    adminManager.loadQuestionsFromStorage();
});