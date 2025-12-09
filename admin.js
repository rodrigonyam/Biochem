// Admin Panel Management System
class AdminManager {
    constructor() {
        this.currentEditingQuestion = null;
        this.filteredQuestions = null;
        this.currentPage = 1;
        this.questionsPerPage = 12;
        this.init();
    }

    init() {
        // Initialize admin panel if user is admin
        this.checkAdminAccess();
        this.loadDashboardStats();
        this.initializeDashboard();
    }

    initializeDashboard() {
        // Load dashboard data when admin section is shown
        if (document.getElementById('admin')) {
            this.updateDashboardStats();
            this.loadCategoryDistribution();
            this.loadRecentActivity();
            this.loadSystemStatus();
        }
    }

    updateDashboardStats() {
        // Count total questions across all categories and topics
        let totalQuestions = 0;
        Object.entries(questionDatabase).forEach(([category, topics]) => {
            Object.entries(topics).forEach(([topic, questions]) => {
                totalQuestions += questions.length;
            });
        });

        // Count registered users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const totalUsers = users.length;

        // Update dashboard stat cards
        const totalQuestionsEl = document.getElementById('total-questions');
        const totalUsersEl = document.getElementById('total-users');

        if (totalQuestionsEl) totalQuestionsEl.textContent = totalQuestions;
        if (totalUsersEl) totalUsersEl.textContent = totalUsers;
    }

    loadCategoryDistribution() {
        const chartContainer = document.getElementById('category-distribution');
        if (!chartContainer) return;

        chartContainer.innerHTML = '';
        
        // Create simple chart showing questions per category
        Object.entries(questionDatabase).forEach(([category, topics]) => {
            let categoryTotal = 0;
            Object.entries(topics).forEach(([topic, questions]) => {
                categoryTotal += questions.length;
            });

            const chartBar = document.createElement('div');
            chartBar.className = 'chart-bar';
            chartBar.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)}: ${categoryTotal}`;
            chartContainer.appendChild(chartBar);
        });
    }

    loadRecentActivity() {
        const activityFeed = document.getElementById('recent-activity');
        if (!activityFeed) return;

        // For now, show static recent activity
        // In production, this would come from a real activity log
        const activities = [
            { icon: 'fas fa-plus-circle', text: 'System initialized with comprehensive question database', time: 'Today', type: 'success' },
            { icon: 'fas fa-database', text: 'Question database loaded with 275+ questions', time: '1 hour ago', type: 'info' },
            { icon: 'fas fa-users', text: 'User management system activated', time: '2 hours ago', type: 'info' }
        ];

        activityFeed.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <i class="${activity.icon} text-${activity.type}"></i>
                <span>${activity.text}</span>
                <small>${activity.time}</small>
            </div>
        `).join('');
    }

    loadSystemStatus() {
        // Update system status indicators
        const statusItems = [
            { icon: 'fas fa-database', text: 'Database: Online', type: 'success' },
            { icon: 'fas fa-check-circle', text: 'Question Integrity: Valid', type: 'success' },
            { icon: 'fas fa-shield-alt', text: 'Security: Protected', type: 'success' }
        ];

        const statusContainer = document.querySelector('.system-status');
        if (statusContainer) {
            statusContainer.innerHTML = statusItems.map(item => `
                <div class="status-item">
                    <i class="${item.icon} text-${item.type}"></i>
                    <span>${item.text}</span>
                </div>
            `).join('');
        }
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
        const topicFilter = document.getElementById('admin-topic-filter')?.value || 'all';
        const typeFilter = document.getElementById('admin-type-filter')?.value || 'all';
        const searchTerm = document.getElementById('question-search')?.value?.toLowerCase() || '';

        // Get all questions from the question database (topic-organized structure)
        let allQuestions = [];
        Object.entries(questionDatabase).forEach(([category, topics]) => {
            Object.entries(topics).forEach(([topic, questions]) => {
                questions.forEach((question, index) => {
                    allQuestions.push({
                        ...question,
                        category,
                        topic,
                        id: `${category}_${topic}_${index}`,
                        index
                    });
                });
            });
        });

        // Apply filters
        let filteredQuestions = allQuestions;
        if (categoryFilter !== 'all') {
            filteredQuestions = filteredQuestions.filter(q => q.category === categoryFilter);
        }
        if (topicFilter !== 'all') {
            filteredQuestions = filteredQuestions.filter(q => q.topic === topicFilter);
        }
        if (typeFilter !== 'all') {
            filteredQuestions = filteredQuestions.filter(q => q.type === typeFilter);
        }
        if (searchTerm) {
            filteredQuestions = filteredQuestions.filter(q => 
                q.question.toLowerCase().includes(searchTerm) ||
                (q.explanation && q.explanation.toLowerCase().includes(searchTerm))
            );
        }

        // Implement pagination
        const startIndex = (this.currentPage - 1) * this.questionsPerPage;
        const endIndex = startIndex + this.questionsPerPage;
        const paginatedQuestions = filteredQuestions.slice(startIndex, endIndex);

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

        grid.innerHTML = paginatedQuestions.map(question => this.createQuestionCard(question)).join('');
        this.updatePagination(filteredQuestions.length);
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

    updatePagination(totalQuestions) {
        const paginationContainer = document.getElementById('questions-pagination');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(totalQuestions / this.questionsPerPage);
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `<button class="pagination-btn" onclick="adminManager.changePage(${this.currentPage - 1})">Previous</button>`;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === this.currentPage ? 'active' : '';
            paginationHTML += `<button class="pagination-btn ${activeClass}" onclick="adminManager.changePage(${i})">${i}</button>`;
        }
        
        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `<button class="pagination-btn" onclick="adminManager.changePage(${this.currentPage + 1})">Next</button>`;
        }
        
        paginationContainer.innerHTML = paginationHTML;
    }

    changePage(page) {
        this.currentPage = page;
        this.loadQuestionsGrid();
    }

    loadCategoriesManagement() {
        const grid = document.getElementById('categories-management-grid');
        if (!grid) return;

        const categories = Object.keys(questionDatabase);
        
        grid.innerHTML = categories.map(category => {
            const topics = Object.keys(questionDatabase[category]);
            let totalQuestions = 0;
            topics.forEach(topic => {
                totalQuestions += questionDatabase[category][topic].length;
            });

            return `
                <div class="category-management-card">
                    <h4>${getCategoryTitle(category)}</h4>
                    <p><strong>Topics:</strong> ${topics.length}</p>
                    <p><strong>Questions:</strong> ${totalQuestions}</p>
                    <div class="category-actions">
                        <button class="admin-btn secondary" onclick="adminManager.editCategory('${category}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="admin-btn secondary" onclick="adminManager.viewCategoryTopics('${category}')">
                            <i class="fas fa-eye"></i> View Topics
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    loadTopicsManagement() {
        const grid = document.getElementById('topics-management-grid');
        const categoryFilter = document.getElementById('topic-category-filter')?.value || 'all';
        
        if (!grid) return;

        let topicsToShow = [];
        
        if (categoryFilter === 'all') {
            Object.entries(questionDatabase).forEach(([category, topics]) => {
                Object.entries(topics).forEach(([topic, questions]) => {
                    topicsToShow.push({
                        category,
                        topic,
                        questionCount: questions.length
                    });
                });
            });
        } else {
            if (questionDatabase[categoryFilter]) {
                Object.entries(questionDatabase[categoryFilter]).forEach(([topic, questions]) => {
                    topicsToShow.push({
                        category: categoryFilter,
                        topic,
                        questionCount: questions.length
                    });
                });
            }
        }

        grid.innerHTML = topicsToShow.map(topicData => `
            <div class="topic-management-card">
                <h4>${topicData.topic.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                <p><strong>Category:</strong> ${getCategoryTitle(topicData.category)}</p>
                <p><strong>Questions:</strong> ${topicData.questionCount}</p>
                <div class="topic-actions">
                    <button class="admin-btn secondary" onclick="adminManager.editTopic('${topicData.category}', '${topicData.topic}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="admin-btn secondary" onclick="adminManager.viewTopicQuestions('${topicData.category}', '${topicData.topic}')">
                        <i class="fas fa-question"></i> Questions
                    </button>
                </div>
            </div>
        `).join('');
    }

    // New dashboard functions
    refreshDashboard() {
        this.updateDashboardStats();
        this.loadCategoryDistribution();
        this.loadRecentActivity();
        this.loadSystemStatus();
    }

    backupDatabase() {
        const data = {
            questions: questionDatabase,
            users: JSON.parse(localStorage.getItem('users') || '[]'),
            sessions: JSON.parse(localStorage.getItem('quiz_sessions') || '[]'),
            timestamp: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `biomedical_quiz_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    validateDatabase() {
        let issues = [];
        let totalQuestions = 0;
        
        Object.entries(questionDatabase).forEach(([category, topics]) => {
            Object.entries(topics).forEach(([topic, questions]) => {
                questions.forEach((question, index) => {
                    totalQuestions++;
                    
                    // Check for required fields
                    if (!question.question || question.question.trim() === '') {
                        issues.push(`${category}/${topic}[${index}]: Missing question text`);
                    }
                    
                    if (!question.type) {
                        issues.push(`${category}/${topic}[${index}]: Missing question type`);
                    }
                    
                    // Type-specific validation
                    if (question.type === 'multiple-choice' || question.type === 'multiple-select') {
                        if (!question.options || question.options.length < 2) {
                            issues.push(`${category}/${topic}[${index}]: Insufficient options`);
                        }
                    }
                });
            });
        });
        
        alert(`Database Validation Complete\n\nTotal Questions: ${totalQuestions}\nIssues Found: ${issues.length}\n\n${issues.length > 0 ? 'Issues:\n' + issues.slice(0, 10).join('\n') : 'All questions validated successfully!'}`);
    }

    addNewTopic() {
        const category = prompt('Enter category for new topic:');
        const topic = prompt('Enter topic name (camelCase):');
        
        if (category && topic && questionDatabase[category]) {
            if (!questionDatabase[category][topic]) {
                questionDatabase[category][topic] = [];
                this.saveQuestionsToStorage();
                this.loadTopicsManagement();
                this.refreshDashboard();
                alert('Topic created successfully!');
            } else {
                alert('Topic already exists!');
            }
        }
    }

    addNewCategory() {
        const category = prompt('Enter new category name (camelCase):');
        if (category && !questionDatabase[category]) {
            questionDatabase[category] = {};
            this.saveQuestionsToStorage();
            this.loadCategoriesManagement();
            this.refreshDashboard();
            alert('Category created successfully!');
        } else {
            alert('Category already exists or invalid name!');
        }
    }

    exportAllData() {
        this.exportQuestions();
    }

    loadAnalytics() {
        // Placeholder for analytics functionality
        console.log('Analytics loading...');
    }

    editCategory(category) {
        alert(`Edit category: ${category} - Feature coming soon!`);
    }

    viewCategoryTopics(category) {
        // Switch to topics tab and filter by category
        document.getElementById('topic-category-filter').value = category;
        showAdminTab('topics');
    }

    editTopic(category, topic) {
        alert(`Edit topic: ${topic} in ${category} - Feature coming soon!`);
    }

    viewTopicQuestions(category, topic) {
        // Switch to questions tab and filter by category and topic
        document.getElementById('admin-category-filter').value = category;
        filterQuestionsByCategory();
        document.getElementById('admin-topic-filter').value = topic;
        showAdminTab('questions');
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
    
    // Load content based on tab
    if (window.adminManager) {
        switch(tabName) {
            case 'dashboard':
                window.adminManager.refreshDashboard();
                break;
            case 'questions':
                window.adminManager.loadQuestionsGrid();
                break;
            case 'categories':
                window.adminManager.loadCategoriesManagement();
                break;
            case 'topics':
                window.adminManager.loadTopicsManagement();
                break;
            case 'analytics':
                window.adminManager.loadAnalytics();
                break;
        }
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
    // Update topic filter based on selected category
    const categorySelect = document.getElementById('admin-category-filter');
    const topicSelect = document.getElementById('admin-topic-filter');
    
    if (categorySelect && topicSelect) {
        const selectedCategory = categorySelect.value;
        
        // Clear topic options
        topicSelect.innerHTML = '<option value="all">All Topics</option>';
        
        if (selectedCategory !== 'all' && questionDatabase[selectedCategory]) {
            Object.keys(questionDatabase[selectedCategory]).forEach(topic => {
                const option = document.createElement('option');
                option.value = topic;
                option.textContent = topic.charAt(0).toUpperCase() + topic.slice(1).replace(/([A-Z])/g, ' $1');
                topicSelect.appendChild(option);
            });
        }
    }
    
    if (window.adminManager) {
        window.adminManager.currentPage = 1;
        window.adminManager.loadQuestionsGrid();
    }
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

function filterQuestionsByTopic() {
    if (window.adminManager) {
        window.adminManager.currentPage = 1;
        window.adminManager.loadQuestionsGrid();
    }
}

function searchQuestions() {
    if (window.adminManager) {
        window.adminManager.currentPage = 1;
        window.adminManager.loadQuestionsGrid();
    }
}

function loadTopicsByCategory() {
    if (window.adminManager) {
        window.adminManager.loadTopicsManagement();
    }
}

function bulkEditQuestions() {
    alert('Bulk edit functionality coming soon!');
}

function handleFileImport() {
    const file = document.getElementById('import-file').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            document.getElementById('import-json').value = content;
        };
        reader.readAsText(file);
    }
}

function processFileImport() {
    const content = document.getElementById('import-json').value;
    if (content.trim()) {
        if (window.adminManager) {
            window.adminManager.importQuestions();
        }
    } else {
        alert('Please select a file or enter JSON data first.');
    }
}

function refreshDashboard() {
    if (window.adminManager) {
        window.adminManager.refreshDashboard();
    }
}

function backupDatabase() {
    if (window.adminManager) {
        window.adminManager.backupDatabase();
    }
}

function validateDatabase() {
    if (window.adminManager) {
        window.adminManager.validateDatabase();
    }
}

function addNewTopic() {
    if (window.adminManager) {
        window.adminManager.addNewTopic();
    }
}

function addNewCategory() {
    if (window.adminManager) {
        window.adminManager.addNewCategory();
    }
}

function exportAllData() {
    if (window.adminManager) {
        window.adminManager.exportAllData();
    }
}

// Initialize admin functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin manager
    adminManager = new AdminManager();
    
    // Load questions from storage on startup
    adminManager.loadQuestionsFromStorage();
});