// User Management System
class UserManager {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('bioquiz_users')) || {};
        this.sessions = JSON.parse(localStorage.getItem('bioquiz_sessions')) || {};
        this.userProgress = JSON.parse(localStorage.getItem('bioquiz_progress')) || {};
        this.init();
    }

    init() {
        // Check for saved session
        const savedUserId = localStorage.getItem('bioquiz_current_user');
        const rememberMe = localStorage.getItem('bioquiz_remember_me') === 'true';
        
        if (savedUserId && (rememberMe || this.isSessionValid())) {
            this.loginUser(savedUserId);
        }
        
        this.updateUI();
    }

    isSessionValid() {
        const lastActivity = localStorage.getItem('bioquiz_last_activity');
        if (!lastActivity) return false;
        
        const timeDiff = Date.now() - parseInt(lastActivity);
        return timeDiff < 24 * 60 * 60 * 1000; // 24 hours
    }

    updateLastActivity() {
        localStorage.setItem('bioquiz_last_activity', Date.now().toString());
    }

    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    hashPassword(password) {
        // Simple hash for demo purposes - in production use proper hashing
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }

    register(userData) {
        const { name, email, password, studyLevel } = userData;
        
        // Check if email already exists
        const existingUser = Object.values(this.users).find(user => user.email === email);
        if (existingUser) {
            throw new Error('Email already registered');
        }

        const userId = this.generateUserId();
        const user = {
            id: userId,
            name,
            email,
            password: this.hashPassword(password),
            studyLevel,
            createdAt: new Date().toISOString(),
            avatar: 'default',
            preferences: {
                defaultQuestions: 10,
                timerDuration: 30,
                emailNotifications: true,
                reminderNotifications: true
            }
        };

        this.users[userId] = user;
        this.userProgress[userId] = this.createInitialProgress();
        this.saveData();
        
        return userId;
    }

    login(email, password) {
        const user = Object.values(this.users).find(u => u.email === email);
        if (!user) {
            throw new Error('User not found');
        }

        if (user.password !== this.hashPassword(password)) {
            throw new Error('Invalid password');
        }

        return user.id;
    }

    loginUser(userId) {
        this.currentUser = this.users[userId];
        if (this.currentUser) {
            localStorage.setItem('bioquiz_current_user', userId);
            this.updateLastActivity();
            this.updateUI();
            return true;
        }
        return false;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('bioquiz_current_user');
        localStorage.removeItem('bioquiz_remember_me');
        localStorage.removeItem('bioquiz_last_activity');
        this.updateUI();
        showHome();
    }

    updateProfile(userData) {
        if (!this.currentUser) return false;
        
        Object.assign(this.currentUser, userData);
        this.users[this.currentUser.id] = this.currentUser;
        this.saveData();
        this.updateUI();
        return true;
    }

    changePassword(currentPassword, newPassword) {
        if (!this.currentUser) return false;
        
        if (this.currentUser.password !== this.hashPassword(currentPassword)) {
            throw new Error('Current password is incorrect');
        }

        this.currentUser.password = this.hashPassword(newPassword);
        this.users[this.currentUser.id] = this.currentUser;
        this.saveData();
        return true;
    }

    updatePreferences(preferences) {
        if (!this.currentUser) return false;
        
        this.currentUser.preferences = { ...this.currentUser.preferences, ...preferences };
        this.users[this.currentUser.id] = this.currentUser;
        this.saveData();
        return true;
    }

    saveQuizSession(category, results) {
        if (!this.currentUser) return;

        const sessionId = 'session_' + Date.now();
        const session = {
            id: sessionId,
            userId: this.currentUser.id,
            category,
            score: results.score,
            totalQuestions: results.totalQuestions,
            correctAnswers: results.correctAnswers,
            incorrectAnswers: results.incorrectAnswers,
            skippedAnswers: results.skippedAnswers,
            timeTaken: results.timeTaken,
            date: new Date().toISOString(),
            questions: results.questions || []
        };

        if (!this.sessions[this.currentUser.id]) {
            this.sessions[this.currentUser.id] = [];
        }
        this.sessions[this.currentUser.id].unshift(session);
        
        // Keep only last 50 sessions
        if (this.sessions[this.currentUser.id].length > 50) {
            this.sessions[this.currentUser.id] = this.sessions[this.currentUser.id].slice(0, 50);
        }

        this.updateProgress(category, results);
        this.saveData();
    }

    updateProgress(category, results) {
        if (!this.currentUser) return;

        const userId = this.currentUser.id;
        if (!this.userProgress[userId]) {
            this.userProgress[userId] = this.createInitialProgress();
        }

        const progress = this.userProgress[userId];
        
        // Update category progress
        if (!progress.categories[category]) {
            progress.categories[category] = {
                totalAttempts: 0,
                totalQuestions: 0,
                correctAnswers: 0,
                bestScore: 0,
                averageScore: 0,
                timeSpent: 0,
                lastAttempt: null
            };
        }

        const categoryProgress = progress.categories[category];
        categoryProgress.totalAttempts++;
        categoryProgress.totalQuestions += results.totalQuestions;
        categoryProgress.correctAnswers += results.correctAnswers;
        categoryProgress.timeSpent += results.timeTaken;
        categoryProgress.lastAttempt = new Date().toISOString();

        const currentScore = Math.round((results.correctAnswers / results.totalQuestions) * 100);
        if (currentScore > categoryProgress.bestScore) {
            categoryProgress.bestScore = currentScore;
        }

        categoryProgress.averageScore = Math.round(
            (categoryProgress.correctAnswers / categoryProgress.totalQuestions) * 100
        );

        // Update overall progress
        progress.overall.totalQuizzes++;
        progress.overall.totalQuestions += results.totalQuestions;
        progress.overall.correctAnswers += results.correctAnswers;
        progress.overall.timeSpent += results.timeTaken;
        progress.overall.lastActivity = new Date().toISOString();

        progress.overall.averageScore = Math.round(
            (progress.overall.correctAnswers / progress.overall.totalQuestions) * 100
        );

        // Calculate mastered categories (>= 80% average score)
        progress.overall.masteredCategories = Object.values(progress.categories)
            .filter(cat => cat.averageScore >= 80).length;

        this.userProgress[userId] = progress;
    }

    createInitialProgress() {
        return {
            overall: {
                totalQuizzes: 0,
                totalQuestions: 0,
                correctAnswers: 0,
                averageScore: 0,
                timeSpent: 0,
                masteredCategories: 0,
                lastActivity: new Date().toISOString()
            },
            categories: {}
        };
    }

    getUserProgress() {
        if (!this.currentUser) return null;
        return this.userProgress[this.currentUser.id] || this.createInitialProgress();
    }

    getUserSessions(limit = 10) {
        if (!this.currentUser) return [];
        const userSessions = this.sessions[this.currentUser.id] || [];
        return userSessions.slice(0, limit);
    }

    getBestCategory() {
        const progress = this.getUserProgress();
        if (!progress || Object.keys(progress.categories).length === 0) return '-';

        let bestCategory = '';
        let bestScore = 0;

        Object.entries(progress.categories).forEach(([category, data]) => {
            if (data.averageScore > bestScore) {
                bestScore = data.averageScore;
                bestCategory = category;
            }
        });

        return bestCategory ? getCategoryTitle(bestCategory) : '-';
    }

    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    }

    updateUI() {
        const authButtons = document.getElementById('auth-buttons');
        const userInfo = document.getElementById('user-info');
        const profileNav = document.getElementById('profile-nav');
        const leaderboardsNav = document.getElementById('leaderboards-nav');
        const adminNav = document.getElementById('admin-nav');
        const adminDropdown = document.getElementById('admin-dropdown-link');

        if (this.currentUser) {
            authButtons.style.display = 'none';
            userInfo.style.display = 'block';
            profileNav.style.display = 'block';
            leaderboardsNav.style.display = 'block';
            
            // Show admin navigation for all logged-in users (in production, check user roles)
            if (adminNav) adminNav.style.display = 'block';
            if (adminDropdown) adminDropdown.style.display = 'block';
            
            document.getElementById('current-username').textContent = 
                this.currentUser.name.split(' ')[0];
            
            this.updateProfileDisplay();
            this.updateProgressDisplay();
            this.updateLeaderboards();
        } else {
            authButtons.style.display = 'flex';
            userInfo.style.display = 'none';
            profileNav.style.display = 'none';
            leaderboardsNav.style.display = 'none';
            if (adminNav) adminNav.style.display = 'none';
            if (adminDropdown) adminDropdown.style.display = 'none';
        }
    }

    updateProfileDisplay() {
        if (!this.currentUser) return;

        // Update profile section
        document.getElementById('profile-name').textContent = this.currentUser.name;
        document.getElementById('profile-email').textContent = this.currentUser.email;
        document.getElementById('study-level').textContent = this.formatStudyLevel(this.currentUser.studyLevel);
        
        const memberSince = new Date(this.currentUser.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
        document.getElementById('member-since').textContent = memberSince;

        // Update profile statistics
        const progress = this.getUserProgress();
        document.getElementById('total-quizzes').textContent = progress.overall.totalQuizzes;
        document.getElementById('avg-score').textContent = progress.overall.averageScore + '%';
        document.getElementById('total-time').textContent = this.formatTime(progress.overall.timeSpent);
        document.getElementById('best-category').textContent = this.getBestCategory();
    }

    updateProgressDisplay() {
        if (!this.currentUser) return;

        const progress = this.getUserProgress();
        
        // Update overall progress
        document.getElementById('overall-percentage').textContent = progress.overall.averageScore + '%';
        document.getElementById('mastered-categories').textContent = 
            `${progress.overall.masteredCategories}/10`;
        document.getElementById('total-answered').textContent = progress.overall.totalQuestions;

        // Update progress circle
        const circle = document.getElementById('overall-progress-circle');
        const percentage = progress.overall.averageScore;
        circle.style.background = `conic-gradient(white ${percentage * 3.6}deg, transparent ${percentage * 3.6}deg)`;

        // Update category progress
        this.updateCategoryProgress(progress);
        
        // Update recent sessions
        this.updateRecentSessions();
    }

    updateCategoryProgress(progress) {
        const container = document.getElementById('category-progress-grid');
        container.innerHTML = '';

        const categories = [
            'anatomy', 'biochemistry', 'cellbiology', 'genetics', 'microbiology',
            'pharmacology', 'immunology', 'biomaterials', 'tissueengineering', 
            'biomechanics', 'bioinformatics'
        ];

        categories.forEach(category => {
            const categoryData = progress.categories[category] || {
                averageScore: 0,
                totalAttempts: 0,
                totalQuestions: 0
            };

            const card = document.createElement('div');
            card.className = 'category-progress-card';
            card.innerHTML = `
                <div class="category-progress-header">
                    <span class="category-name">${getCategoryTitle(category)}</span>
                    <span class="category-score">${categoryData.averageScore}%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${categoryData.averageScore}%"></div>
                </div>
                <div class="category-stats">
                    <span>Attempts: ${categoryData.totalAttempts}</span>
                    <span>Questions: ${categoryData.totalQuestions}</span>
                </div>
            `;
            container.appendChild(card);
        });
    }

    updateRecentSessions() {
        const container = document.getElementById('sessions-list');
        const sessions = this.getUserSessions(5);
        
        if (sessions.length === 0) {
            container.innerHTML = '<div class="session-item"><p>No quiz sessions yet. Start taking quizzes to see your progress!</p></div>';
            return;
        }

        container.innerHTML = '';
        sessions.forEach(session => {
            const date = new Date(session.date).toLocaleDateString();
            const scorePercentage = Math.round((session.correctAnswers / session.totalQuestions) * 100);
            
            const item = document.createElement('div');
            item.className = 'session-item';
            item.innerHTML = `
                <div class="session-info">
                    <h4>${getCategoryTitle(session.category)}</h4>
                    <p>${date} • ${this.formatTime(session.timeTaken)}</p>
                </div>
                <div class="session-score">
                    <div class="score-value">${scorePercentage}%</div>
                    <div class="score-label">${session.correctAnswers}/${session.totalQuestions}</div>
                </div>
            `;
            container.appendChild(item);
        });
    }

    formatStudyLevel(level) {
        const levels = {
            'high-school': 'High School',
            'undergraduate': 'Undergraduate',
            'graduate': 'Graduate',
            'professional': 'Healthcare Professional'
        };
        return levels[level] || level;
    }

    getTop5Sessions(timeFilter = 'all') {
        if (!this.currentUser) return [];
        
        let sessions = this.sessions[this.currentUser.id] || [];
        
        // Apply time filter
        if (timeFilter !== 'all') {
            const now = new Date();
            const filterDate = new Date();
            
            if (timeFilter === 'week') {
                filterDate.setDate(now.getDate() - 7);
            } else if (timeFilter === 'month') {
                filterDate.setMonth(now.getMonth() - 1);
            }
            
            sessions = sessions.filter(session => new Date(session.date) >= filterDate);
        }
        
        // Sort by score percentage (descending), then by date (most recent)
        return sessions
            .map(session => ({
                ...session,
                scorePercentage: Math.round((session.correctAnswers / session.totalQuestions) * 100)
            }))
            .sort((a, b) => {
                if (b.scorePercentage !== a.scorePercentage) {
                    return b.scorePercentage - a.scorePercentage;
                }
                return new Date(b.date) - new Date(a.date);
            })
            .slice(0, 5);
    }

    getCategoryTop5(category) {
        if (!this.currentUser) return [];
        
        const sessions = this.sessions[this.currentUser.id] || [];
        
        return sessions
            .filter(session => session.category === category)
            .map(session => ({
                ...session,
                scorePercentage: Math.round((session.correctAnswers / session.totalQuestions) * 100)
            }))
            .sort((a, b) => {
                if (b.scorePercentage !== a.scorePercentage) {
                    return b.scorePercentage - a.scorePercentage;
                }
                return new Date(b.date) - new Date(a.date);
            })
            .slice(0, 5);
    }

    getPersonalRecords() {
        if (!this.currentUser) return {};
        
        const sessions = this.sessions[this.currentUser.id] || [];
        const progress = this.getUserProgress();
        
        if (sessions.length === 0) {
            return {
                highestScore: { score: 0, category: '', date: '' },
                bestStreak: 0,
                fastestPerfect: null,
                mostImproved: ''
            };
        }
        
        // Highest Score
        const highestScoreSession = sessions.reduce((best, current) => {
            const currentScore = Math.round((current.correctAnswers / current.totalQuestions) * 100);
            const bestScore = Math.round((best.correctAnswers / best.totalQuestions) * 100);
            return currentScore > bestScore ? current : best;
        });
        
        const highestScore = {
            score: Math.round((highestScoreSession.correctAnswers / highestScoreSession.totalQuestions) * 100),
            category: getCategoryTitle(highestScoreSession.category),
            date: new Date(highestScoreSession.date).toLocaleDateString()
        };
        
        // Best Streak (consecutive correct answers across all sessions)
        let bestStreak = 0;
        let currentStreak = 0;
        
        sessions.forEach(session => {
            if (session.questions) {
                session.questions.forEach(q => {
                    if (q.isCorrect) {
                        currentStreak++;
                        bestStreak = Math.max(bestStreak, currentStreak);
                    } else {
                        currentStreak = 0;
                    }
                });
            }
        });
        
        // Fastest Perfect Score
        const perfectSessions = sessions.filter(session => 
            Math.round((session.correctAnswers / session.totalQuestions) * 100) === 100
        );
        
        let fastestPerfect = null;
        if (perfectSessions.length > 0) {
            const fastest = perfectSessions.reduce((fastest, current) => 
                current.timeTaken < fastest.timeTaken ? current : fastest
            );
            fastestPerfect = {
                time: this.formatTime(fastest.timeTaken),
                category: getCategoryTitle(fastest.category)
            };
        }
        
        // Most Improved Category
        let mostImproved = '';
        let highestImprovement = 0;
        
        Object.entries(progress.categories).forEach(([category, data]) => {
            if (data.totalAttempts >= 3) {
                const categorySessions = sessions
                    .filter(s => s.category === category)
                    .map(s => Math.round((s.correctAnswers / s.totalQuestions) * 100))
                    .slice(-5); // Last 5 sessions
                
                if (categorySessions.length >= 3) {
                    const firstHalf = categorySessions.slice(0, Math.ceil(categorySessions.length / 2));
                    const secondHalf = categorySessions.slice(Math.floor(categorySessions.length / 2));
                    
                    const firstAvg = firstHalf.reduce((a, b) => a + b) / firstHalf.length;
                    const secondAvg = secondHalf.reduce((a, b) => a + b) / secondHalf.length;
                    const improvement = secondAvg - firstAvg;
                    
                    if (improvement > highestImprovement) {
                        highestImprovement = improvement;
                        mostImproved = getCategoryTitle(category);
                    }
                }
            }
        });
        
        return {
            highestScore,
            bestStreak,
            fastestPerfect,
            mostImproved: mostImproved || 'Keep practicing!',
            improvementValue: Math.round(highestImprovement)
        };
    }

    getAchievements() {
        if (!this.currentUser) return [];
        
        const sessions = this.sessions[this.currentUser.id] || [];
        const progress = this.getUserProgress();
        const records = this.getPersonalRecords();
        
        const achievements = [
            {
                id: 'first_quiz',
                title: 'Getting Started',
                description: 'Complete your first quiz',
                icon: '🎯',
                unlocked: sessions.length >= 1
            },
            {
                id: 'perfect_score',
                title: 'Perfectionist',
                description: 'Score 100% on any quiz',
                icon: '💯',
                unlocked: records.highestScore.score === 100
            },
            {
                id: 'quiz_master',
                title: 'Quiz Master',
                description: 'Complete 50 quizzes',
                icon: '🏆',
                unlocked: sessions.length >= 50
            },
            {
                id: 'category_master',
                title: 'Category Expert',
                description: 'Master 5 different categories',
                icon: '📚',
                unlocked: progress.overall.masteredCategories >= 5
            },
            {
                id: 'speed_demon',
                title: 'Speed Demon',
                description: 'Complete a perfect quiz in under 2 minutes',
                icon: '⚡',
                unlocked: records.fastestPerfect && this.parseTime(records.fastestPerfect.time) < 120
            },
            {
                id: 'streak_master',
                title: 'Streak Master',
                description: 'Get 25 questions correct in a row',
                icon: '🔥',
                unlocked: records.bestStreak >= 25
            },
            {
                id: 'dedicated_learner',
                title: 'Dedicated Learner',
                description: 'Study for over 10 hours total',
                icon: '⏰',
                unlocked: progress.overall.timeSpent >= 36000 // 10 hours in seconds
            },
            {
                id: 'well_rounded',
                title: 'Well Rounded',
                description: 'Score above 70% in all categories',
                icon: '🌟',
                unlocked: Object.values(progress.categories).every(cat => cat.averageScore >= 70)
            }
        ];
        
        return achievements;
    }

    parseTime(timeString) {
        const parts = timeString.split(':');
        if (parts.length === 2) {
            return parseInt(parts[0]) * 60 + parseInt(parts[1]);
        }
        const match = timeString.match(/(\d+)m/);
        return match ? parseInt(match[1]) * 60 : 0;
    }

    updateLeaderboards() {
        if (!this.currentUser) return;
        
        this.updateOverallLeaderboard();
        this.updatePersonalRecords();
        this.updateAchievements();
    }

    updateOverallLeaderboard() {
        const timeFilter = document.getElementById('time-filter')?.value || 'all';
        const top5 = this.getTop5Sessions(timeFilter);
        const container = document.getElementById('overall-top5-list');
        
        if (!container) return;
        
        if (top5.length === 0) {
            container.innerHTML = `
                <div class="leaderboard-empty">
                    <i class="fas fa-trophy"></i>
                    <h4>No quiz sessions yet</h4>
                    <p>Complete some quizzes to see your top performances here!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = top5.map((session, index) => {
            const rank = index + 1;
            const date = new Date(session.date).toLocaleDateString();
            
            return `
                <div class="leaderboard-item rank-${rank}">
                    <div class="rank-number">${rank}</div>
                    <div class="session-details">
                        <div class="session-info">
                            <div class="session-category">${getCategoryTitle(session.category)}</div>
                            <div class="session-meta">${date} • ${session.totalQuestions} questions</div>
                        </div>
                        <div class="session-score-display">
                            <div class="score-percentage">${session.scorePercentage}%</div>
                            <div class="score-breakdown">${session.correctAnswers}/${session.totalQuestions}</div>
                        </div>
                        <div class="session-timing">
                            <div class="time-taken">${this.formatTime(session.timeTaken)}</div>
                            <div class="session-date">Quiz #${session.id.split('_')[1]}</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    updatePersonalRecords() {
        const records = this.getPersonalRecords();
        
        const elements = {
            'highest-score': records.highestScore.score + '%',
            'highest-score-detail': `${records.highestScore.category} • ${records.highestScore.date}`,
            'best-streak': records.bestStreak.toString(),
            'fastest-perfect': records.fastestPerfect ? records.fastestPerfect.time : '--',
            'fastest-perfect-detail': records.fastestPerfect ? records.fastestPerfect.category : 'No perfect scores yet',
            'most-improved': records.improvementValue > 0 ? `+${records.improvementValue}%` : '--',
            'most-improved-detail': records.mostImproved
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    updateAchievements() {
        const achievements = this.getAchievements();
        const container = document.getElementById('achievements-grid');
        
        if (!container) return;
        
        container.innerHTML = achievements.map(achievement => `
            <div class="achievement-badge ${achievement.unlocked ? '' : 'locked'}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-description">${achievement.description}</div>
            </div>
        `).join('');
    }

    saveData() {
        localStorage.setItem('bioquiz_users', JSON.stringify(this.users));
        localStorage.setItem('bioquiz_sessions', JSON.stringify(this.sessions));
        localStorage.setItem('bioquiz_progress', JSON.stringify(this.userProgress));
    }
}

// Initialize user manager
const userManager = new UserManager();

// Authentication Functions
function showLogin() {
    const overlay = document.getElementById('modal-overlay');
    const loginModal = document.getElementById('login-modal');
    
    // Hide other modals
    document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('show'));
    
    overlay.classList.add('show');
    loginModal.classList.add('show');
    
    // Focus email field
    setTimeout(() => document.getElementById('login-email').focus(), 300);
}

function showRegister() {
    const overlay = document.getElementById('modal-overlay');
    const registerModal = document.getElementById('register-modal');
    
    // Hide other modals
    document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('show'));
    
    overlay.classList.add('show');
    registerModal.classList.add('show');
    
    // Focus name field
    setTimeout(() => document.getElementById('register-name').focus(), 300);
}

function showAccountSettings() {
    if (!userManager.currentUser) {
        showLogin();
        return;
    }

    const overlay = document.getElementById('modal-overlay');
    const settingsModal = document.getElementById('settings-modal');
    
    // Hide other modals
    document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('show'));
    
    overlay.classList.add('show');
    settingsModal.classList.add('show');
    
    // Populate form fields
    populateSettingsForm();
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('show');
    
    setTimeout(() => {
        document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('show'));
    }, 300);
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('show');
}

function closeUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.remove('show');
}

function showProfile() {
    showSection('profile');
}

function showProgress() {
    showSection('progress');
}

function showLeaderboards() {
    showSection('leaderboards');
    userManager.updateLeaderboards();
}

function showLeaderboardTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.leaderboard-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.leaderboard-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab
    event.target.classList.add('active');
    document.getElementById(`${tabName}-leaderboard`).classList.add('active');
    
    if (tabName === 'category') {
        updateCategoryLeaderboard();
    }
}

function updateLeaderboards() {
    userManager.updateLeaderboards();
}

function updateCategoryLeaderboard() {
    const category = document.getElementById('category-select')?.value || 'anatomy';
    const top5 = userManager.getCategoryTop5(category);
    const progress = userManager.getUserProgress();
    const categoryData = progress.categories[category] || { averageScore: 0, bestScore: 0, totalAttempts: 0 };
    
    // Update category stats
    const titleElement = document.getElementById('category-leaderboard-title');
    const bestScoreElement = document.getElementById('category-best-score');
    const avgScoreElement = document.getElementById('category-avg-score');
    const attemptsElement = document.getElementById('category-attempts');
    
    if (titleElement) titleElement.textContent = `${getCategoryTitle(category)} - Top 5`;
    if (bestScoreElement) bestScoreElement.textContent = `${categoryData.bestScore}%`;
    if (avgScoreElement) avgScoreElement.textContent = `${categoryData.averageScore}%`;
    if (attemptsElement) attemptsElement.textContent = categoryData.totalAttempts.toString();
    
    // Update top 5 list
    const container = document.getElementById('category-top5-list');
    if (!container) return;
    
    if (top5.length === 0) {
        container.innerHTML = `
            <div class="leaderboard-empty">
                <i class="fas fa-chart-line"></i>
                <h4>No ${getCategoryTitle(category).toLowerCase()} quizzes yet</h4>
                <p>Take some ${getCategoryTitle(category).toLowerCase()} quizzes to see your performance here!</p>
            </div>
        `;
        
        // Clear trend chart
        const trendChart = document.getElementById('trend-chart');
        if (trendChart) {
            trendChart.innerHTML = '<div class="trend-empty">No data available for trend analysis</div>';
        }
        return;
    }
    
    container.innerHTML = top5.map((session, index) => {
        const rank = index + 1;
        const date = new Date(session.date).toLocaleDateString();
        
        return `
            <div class="leaderboard-item rank-${rank <= 3 ? rank : ''}">
                <div class="rank-number">${rank}</div>
                <div class="session-details">
                    <div class="session-info">
                        <div class="session-category">${getCategoryTitle(session.category)}</div>
                        <div class="session-meta">${date} • ${session.totalQuestions} questions</div>
                    </div>
                    <div class="session-score-display">
                        <div class="score-percentage">${session.scorePercentage}%</div>
                        <div class="score-breakdown">${session.correctAnswers}/${session.totalQuestions}</div>
                    </div>
                    <div class="session-timing">
                        <div class="time-taken">${userManager.formatTime(session.timeTaken)}</div>
                        <div class="session-date">${new Date(session.date).toLocaleDateString()}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Update trend chart
    updateTrendChart(category);
}

function updateTrendChart(category) {
    const sessions = userManager.sessions[userManager.currentUser?.id] || [];
    const categorySessions = sessions
        .filter(s => s.category === category)
        .map(s => ({
            score: Math.round((s.correctAnswers / s.totalQuestions) * 100),
            date: new Date(s.date)
        }))
        .sort((a, b) => a.date - b.date)
        .slice(-10); // Last 10 sessions
    
    const trendChart = document.getElementById('trend-chart');
    if (!trendChart) return;
    
    if (categorySessions.length < 2) {
        trendChart.innerHTML = '<div class="trend-empty">Need at least 2 quiz sessions to show trend</div>';
        return;
    }
    
    const maxScore = Math.max(...categorySessions.map(s => s.score));
    const minHeight = 20;
    const maxHeight = 100;
    
    trendChart.innerHTML = `
        <div class="trend-bars">
            ${categorySessions.map(session => {
                const height = minHeight + ((session.score / 100) * (maxHeight - minHeight));
                return `<div class="trend-bar" style="height: ${height}px" data-score="${session.score}%"></div>`;
            }).join('')}
        </div>
    `;
}

// Form Handlers
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    try {
        const userId = userManager.login(email, password);
        userManager.loginUser(userId);
        
        if (rememberMe) {
            localStorage.setItem('bioquiz_remember_me', 'true');
        }
        
        closeModal();
        showMessage('Welcome back!', 'success');
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const studyLevel = document.getElementById('study-level-select').value;
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    try {
        const userId = userManager.register({ name, email, password, studyLevel });
        userManager.loginUser(userId);
        
        closeModal();
        showMessage('Account created successfully! Welcome to BioQuiz Hub!', 'success');
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

function populateSettingsForm() {
    if (!userManager.currentUser) return;
    
    const user = userManager.currentUser;
    
    // Profile tab
    document.getElementById('edit-name').value = user.name;
    document.getElementById('edit-email').value = user.email;
    document.getElementById('edit-study-level').value = user.studyLevel;
    
    // Preferences tab
    document.getElementById('default-questions').value = user.preferences.defaultQuestions;
    document.getElementById('timer-duration').value = user.preferences.timerDuration;
    document.getElementById('email-notifications').checked = user.preferences.emailNotifications;
    document.getElementById('reminder-notifications').checked = user.preferences.reminderNotifications;
}

function updateProfile(event) {
    event.preventDefault();
    
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;
    const studyLevel = document.getElementById('edit-study-level').value;
    
    userManager.updateProfile({ name, email, studyLevel });
    showMessage('Profile updated successfully!', 'success');
}

function changePassword(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmNewPassword = document.getElementById('confirm-new-password').value;
    
    if (newPassword !== confirmNewPassword) {
        showMessage('New passwords do not match', 'error');
        return;
    }
    
    try {
        userManager.changePassword(currentPassword, newPassword);
        showMessage('Password changed successfully!', 'success');
        
        // Clear form
        document.getElementById('password-form').reset();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

function updatePreferences(event) {
    event.preventDefault();
    
    const preferences = {
        defaultQuestions: parseInt(document.getElementById('default-questions').value),
        timerDuration: parseInt(document.getElementById('timer-duration').value),
        emailNotifications: document.getElementById('email-notifications').checked,
        reminderNotifications: document.getElementById('reminder-notifications').checked
    };
    
    userManager.updatePreferences(preferences);
    showMessage('Preferences saved successfully!', 'success');
}

function switchTab(tabId) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function logout() {
    userManager.logout();
    showMessage('Logged out successfully', 'success');
}

function editProfile() {
    showAccountSettings();
    switchTab('profile-tab');
}

function changeAvatar() {
    showMessage('Avatar change feature coming soon!', 'info');
}

// Message System
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message-toast');
    existingMessages.forEach(msg => msg.remove());
    
    const toast = document.createElement('div');
    toast.className = `message-toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${getMessageIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function getMessageIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle',
        warning: 'exclamation-triangle'
    };
    return icons[type] || 'info-circle';
}

// Override the original endQuiz function to save session data
const originalEndQuiz = endQuiz;
function endQuiz() {
    // Save quiz session if user is logged in
    if (userManager.currentUser) {
        const endTime = new Date();
        const timeTaken = Math.round((endTime - currentQuiz.startTime) / 1000);
        
        const results = {
            score: currentQuiz.score,
            totalQuestions: currentQuiz.questions.length,
            correctAnswers: currentQuiz.correctAnswers,
            incorrectAnswers: currentQuiz.incorrectAnswers,
            skippedAnswers: currentQuiz.skippedAnswers,
            timeTaken: timeTaken,
            questions: currentQuiz.userAnswers
        };
        
        userManager.saveQuizSession(currentQuiz.category, results);
        
        // Update leaderboards after saving session
        setTimeout(() => {
            userManager.updateLeaderboards();
        }, 100);
    }
    
    // Call original function
    originalEndQuiz();
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const overlay = document.getElementById('modal-overlay');
    const dropdown = document.getElementById('user-dropdown');
    
    if (event.target === overlay) {
        closeModal();
    }
    
    if (!event.target.closest('.user-info')) {
        closeUserDropdown();
    }
});

// Utility function to get category title
function getCategoryTitle(category) {
    const categoryTitles = {
        'anatomy': 'Anatomy & Physiology',
        'biochemistry': 'Biochemistry',
        'cell-biology': 'Cell Biology',
        'genetics': 'Genetics',
        'microbiology': 'Microbiology',
        'pharmacology': 'Pharmacology',
        'immunology': 'Immunology',
        'biomaterials': 'Biomaterials',
        'tissue-engineering': 'Tissue Engineering',
        'biomechanics': 'Biomechanics',
        'bioinformatics': 'Bioinformatics'
    };
    return categoryTitles[category] || category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add message toast styles if not present
    if (!document.querySelector('#message-toast-styles')) {
        const style = document.createElement('style');
        style.id = 'message-toast-styles';
        style.textContent = `
            .message-toast {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 3000;
                display: flex;
                align-items: center;
                gap: 10px;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            .message-toast.show {
                transform: translateX(0);
            }
            .message-toast.success {
                background: #27ae60;
            }
            .message-toast.error {
                background: #e74c3c;
            }
            .message-toast.info {
                background: #3498db;
            }
            .message-toast.warning {
                background: #f39c12;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize leaderboards if user is logged in
    setTimeout(() => {
        if (userManager.currentUser) {
            userManager.updateLeaderboards();
        }
        
        // Add event listeners for leaderboard controls
        const timeFilter = document.getElementById('time-filter');
        const categorySelect = document.getElementById('category-select');
        
        if (timeFilter) {
            timeFilter.addEventListener('change', function() {
                if (userManager.currentUser) {
                    userManager.updateOverallLeaderboard();
                }
            });
        }
        
        if (categorySelect) {
            categorySelect.addEventListener('change', updateCategoryLeaderboard);
        }
    }, 500);
});