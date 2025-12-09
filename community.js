// Community Management System
class CommunityManager {
    constructor() {
        this.discussions = JSON.parse(localStorage.getItem('communityDiscussions')) || [];
        this.sources = JSON.parse(localStorage.getItem('communitySources')) || [];
        this.userProgress = JSON.parse(localStorage.getItem('userProgress')) || {};
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.loadDiscussions();
        this.loadSources();
        this.loadRecommendations();
        this.setupEventListeners();
    }

    setupTabNavigation() {
        const tabs = document.querySelectorAll('.community-tab');
        const contents = document.querySelectorAll('.community-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetId = e.target.dataset.tab;
                
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                e.target.classList.add('active');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }

    setupEventListeners() {
        // New Discussion Modal
        document.getElementById('newDiscussionBtn')?.addEventListener('click', () => {
            if (this.checkUserAuth()) {
                this.openModal('newDiscussionModal');
            } else {
                this.showLoginPrompt();
            }
        });

        // New Source Modal
        document.getElementById('addSourceBtn')?.addEventListener('click', () => {
            if (this.checkUserAuth()) {
                this.openModal('addSourceModal');
            } else {
                this.showLoginPrompt();
            }
        });

        // Discussion Form Submit
        document.getElementById('discussionForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.createDiscussion();
        });

        // Source Form Submit
        document.getElementById('sourceForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addSource();
        });

        // Discussion Filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterDiscussions(e.target.dataset.filter);
            });
        });

        // Source Filters
        document.getElementById('sourceTypeFilter')?.addEventListener('change', (e) => {
            this.filterSources();
        });

        document.getElementById('sourceCategoryFilter')?.addEventListener('change', (e) => {
            this.filterSources();
        });
    }

    checkUserAuth() {
        return localStorage.getItem('currentUser') !== null;
    }

    showLoginPrompt() {
        alert('Please log in to participate in community discussions and add sources.');
        // You can enhance this to show a proper login modal
    }

    openModal(modalId) {
        document.getElementById(modalId).style.display = 'flex';
    }

    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
        // Clear form data
        const form = document.querySelector(`#${modalId} form`);
        if (form) form.reset();
    }

    // Discussion Management
    createDiscussion() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        const formData = new FormData(document.getElementById('discussionForm'));
        const discussion = {
            id: Date.now().toString(),
            title: formData.get('title'),
            content: formData.get('content'),
            category: formData.get('category'),
            author: currentUser.username,
            authorEmail: currentUser.email,
            createdAt: new Date().toISOString(),
            replies: [],
            views: 0,
            likes: 0,
            isUrgent: formData.get('urgent') === 'on'
        };

        this.discussions.unshift(discussion);
        this.saveDiscussions();
        this.loadDiscussions();
        this.closeModal('newDiscussionModal');
        this.showSuccess('Discussion created successfully!');
    }

    loadDiscussions() {
        const container = document.getElementById('discussionsContainer');
        if (!container) return;

        if (this.discussions.length === 0) {
            container.innerHTML = this.getEmptyStateHTML('discussions');
            return;
        }

        container.innerHTML = this.discussions.map(discussion => 
            this.createDiscussionCard(discussion)
        ).join('');

        // Add click listeners to discussion cards
        container.querySelectorAll('.discussion-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const discussionId = card.dataset.discussionId;
                this.openDiscussion(discussionId);
            });
        });
    }

    createDiscussionCard(discussion) {
        const timeAgo = this.getTimeAgo(discussion.createdAt);
        const urgentClass = discussion.isUrgent ? 'urgent' : '';
        
        return `
            <div class="discussion-card ${urgentClass}" data-discussion-id="${discussion.id}">
                <div class="discussion-title">${discussion.title}</div>
                <div class="discussion-preview">${this.truncateText(discussion.content, 150)}</div>
                <div class="discussion-category-tag">${discussion.category}</div>
                <div class="discussion-meta">
                    <div class="discussion-author">
                        <i class="fas fa-user"></i>
                        <span>${discussion.author}</span>
                    </div>
                    <div class="discussion-stats">
                        <span><i class="fas fa-eye"></i> ${discussion.views}</span>
                        <span><i class="fas fa-comments"></i> ${discussion.replies.length}</span>
                        <span><i class="fas fa-heart"></i> ${discussion.likes}</span>
                        <span><i class="fas fa-clock"></i> ${timeAgo}</span>
                    </div>
                </div>
            </div>
        `;
    }

    openDiscussion(discussionId) {
        const discussion = this.discussions.find(d => d.id === discussionId);
        if (!discussion) return;

        // Increment view count
        discussion.views++;
        this.saveDiscussions();

        // Create discussion details modal
        const modal = document.createElement('div');
        modal.className = 'modal discussion-details-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${discussion.title}</h2>
                    <span class="close-btn" onclick="communityManager.closeDiscussionModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="discussion-category-tag">${discussion.category}</div>
                    <div class="discussion-meta" style="margin: 1rem 0;">
                        <div class="discussion-author">
                            <i class="fas fa-user"></i>
                            <span>${discussion.author}</span>
                            <span style="color: #64748b; margin-left: 0.5rem;">${this.getTimeAgo(discussion.createdAt)}</span>
                        </div>
                    </div>
                    <div class="discussion-content" style="margin: 1.5rem 0; line-height: 1.6; color: #374151;">
                        ${discussion.content.replace(/\n/g, '<br>')}
                    </div>
                    
                    <div class="discussion-replies">
                        <h4><i class="fas fa-comments"></i> Replies (${discussion.replies.length})</h4>
                        ${discussion.replies.map(reply => this.createReplyHTML(reply)).join('')}
                    </div>
                    
                    ${this.checkUserAuth() ? `
                        <div class="reply-form">
                            <h5>Add a Reply</h5>
                            <form onsubmit="communityManager.addReply(event, '${discussion.id}')">
                                <textarea name="replyContent" placeholder="Write your reply..." rows="4" required></textarea>
                                <div class="reply-actions">
                                    <button type="button" class="community-btn secondary" onclick="communityManager.closeDiscussionModal()">Cancel</button>
                                    <button type="submit" class="community-btn primary">
                                        <i class="fas fa-reply"></i> Reply
                                    </button>
                                </div>
                            </form>
                        </div>
                    ` : `
                        <div class="login-prompt">
                            <p>Please log in to reply to this discussion.</p>
                            <button class="community-btn primary" onclick="document.getElementById('loginModal').style.display='flex'">
                                <i class="fas fa-sign-in-alt"></i> Log In
                            </button>
                        </div>
                    `}
                    
                    <div class="discussion-actions">
                        <button class="community-btn secondary" onclick="communityManager.likeDiscussion('${discussion.id}')">
                            <i class="fas fa-heart"></i> Like (${discussion.likes})
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    closeDiscussionModal() {
        const modal = document.querySelector('.discussion-details-modal');
        if (modal) {
            modal.remove();
        }
    }

    createReplyHTML(reply) {
        return `
            <div class="reply-item">
                <div class="reply-author">${reply.author}</div>
                <div class="reply-content">${reply.content.replace(/\n/g, '<br>')}</div>
                <div class="reply-time">${this.getTimeAgo(reply.createdAt)}</div>
            </div>
        `;
    }

    addReply(event, discussionId) {
        event.preventDefault();
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        const form = event.target;
        const content = form.replyContent.value.trim();
        if (!content) return;

        const discussion = this.discussions.find(d => d.id === discussionId);
        if (!discussion) return;

        const reply = {
            id: Date.now().toString(),
            content: content,
            author: currentUser.username,
            createdAt: new Date().toISOString()
        };

        discussion.replies.push(reply);
        this.saveDiscussions();
        this.loadDiscussions();
        this.closeDiscussionModal();
        this.openDiscussion(discussionId); // Reopen with new reply
        this.showSuccess('Reply added successfully!');
    }

    likeDiscussion(discussionId) {
        if (!this.checkUserAuth()) {
            this.showLoginPrompt();
            return;
        }

        const discussion = this.discussions.find(d => d.id === discussionId);
        if (discussion) {
            discussion.likes++;
            this.saveDiscussions();
            this.closeDiscussionModal();
            this.openDiscussion(discussionId);
        }
    }

    filterDiscussions(filter) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        let filteredDiscussions = [...this.discussions];
        
        if (filter !== 'all') {
            filteredDiscussions = this.discussions.filter(d => 
                d.category.toLowerCase() === filter.toLowerCase()
            );
        }

        const container = document.getElementById('discussionsContainer');
        if (filteredDiscussions.length === 0) {
            container.innerHTML = '<div class="empty-state">No discussions found for this category.</div>';
            return;
        }

        container.innerHTML = filteredDiscussions.map(discussion => 
            this.createDiscussionCard(discussion)
        ).join('');

        // Re-add click listeners
        container.querySelectorAll('.discussion-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const discussionId = card.dataset.discussionId;
                this.openDiscussion(discussionId);
            });
        });
    }

    // Source Management
    addSource() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        const formData = new FormData(document.getElementById('sourceForm'));
        const source = {
            id: Date.now().toString(),
            title: formData.get('title'),
            description: formData.get('description'),
            url: formData.get('url'),
            type: formData.get('type'),
            category: formData.get('category'),
            difficulty: formData.get('difficulty'),
            author: currentUser.username,
            addedAt: new Date().toISOString(),
            rating: 0,
            ratingCount: 0
        };

        this.sources.unshift(source);
        this.saveSources();
        this.loadSources();
        this.closeModal('addSourceModal');
        this.showSuccess('Source added successfully!');
    }

    loadSources() {
        const container = document.getElementById('sourcesContainer');
        if (!container) return;

        if (this.sources.length === 0) {
            container.innerHTML = this.getEmptyStateHTML('sources');
            return;
        }

        container.innerHTML = this.sources.map(source => 
            this.createSourceCard(source)
        ).join('');
    }

    createSourceCard(source) {
        const rating = source.ratingCount > 0 ? (source.rating / source.ratingCount).toFixed(1) : 'N/A';
        const stars = source.ratingCount > 0 ? '★'.repeat(Math.round(source.rating / source.ratingCount)) : '☆☆☆☆☆';
        
        return `
            <div class="source-card" data-source-id="${source.id}">
                <div class="source-header">
                    <div class="source-type-icon ${source.type}">
                        <i class="fas fa-${this.getSourceIcon(source.type)}"></i>
                    </div>
                </div>
                <div class="source-title">${source.title}</div>
                <div class="source-description">${source.description}</div>
                <div class="source-footer">
                    <div class="source-badges">
                        <span class="source-badge difficulty">${source.difficulty}</span>
                        <span class="source-badge category">${source.category}</span>
                    </div>
                    <div class="source-rating">
                        <span class="stars">${stars}</span>
                        <span>(${source.ratingCount})</span>
                    </div>
                </div>
                <div style="margin-top: 1rem;">
                    <a href="${source.url}" target="_blank" class="community-btn primary" style="width: 100%; text-align: center;">
                        <i class="fas fa-external-link-alt"></i> View Source
                    </a>
                </div>
            </div>
        `;
    }

    getSourceIcon(type) {
        const icons = {
            'textbook': 'book',
            'video': 'play-circle',
            'article': 'newspaper',
            'website': 'globe',
            'course': 'graduation-cap'
        };
        return icons[type] || 'file';
    }

    filterSources() {
        const typeFilter = document.getElementById('sourceTypeFilter').value;
        const categoryFilter = document.getElementById('sourceCategoryFilter').value;

        let filteredSources = [...this.sources];

        if (typeFilter !== 'all') {
            filteredSources = filteredSources.filter(s => s.type === typeFilter);
        }

        if (categoryFilter !== 'all') {
            filteredSources = filteredSources.filter(s => s.category === categoryFilter);
        }

        const container = document.getElementById('sourcesContainer');
        if (filteredSources.length === 0) {
            container.innerHTML = '<div class="empty-state">No sources found matching your filters.</div>';
            return;
        }

        container.innerHTML = filteredSources.map(source => 
            this.createSourceCard(source)
        ).join('');
    }

    // Recommendations System
    loadRecommendations() {
        if (!this.checkUserAuth()) return;

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userSessions = JSON.parse(localStorage.getItem(`${currentUser.username}_sessions`)) || [];
        
        this.updateRecommendationStats();
        this.generatePersonalizedRecommendations(userSessions);
        this.generateCategoryRecommendations();
        this.generateStudyPlanRecommendations();
    }

    updateRecommendationStats() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        const userSessions = JSON.parse(localStorage.getItem(`${currentUser.username}_sessions`)) || [];
        const totalQuizzes = userSessions.length;
        const avgScore = userSessions.length > 0 ? 
            (userSessions.reduce((sum, s) => sum + s.score, 0) / userSessions.length).toFixed(1) : 0;
        const discussionsCreated = this.discussions.filter(d => d.author === currentUser.username).length;
        const sourcesAdded = this.sources.filter(s => s.author === currentUser.username).length;

        document.getElementById('totalQuizzesStat').textContent = totalQuizzes;
        document.getElementById('avgScoreStat').textContent = `${avgScore}%`;
        document.getElementById('discussionsStat').textContent = discussionsCreated;
        document.getElementById('sourcesStat').textContent = sourcesAdded;
    }

    generatePersonalizedRecommendations(userSessions) {
        const container = document.getElementById('personalizedRecommendations');
        if (!container) return;

        if (userSessions.length === 0) {
            container.innerHTML = '<p>Complete some quizzes to get personalized recommendations!</p>';
            return;
        }

        // Analyze weak areas
        const categoryScores = {};
        userSessions.forEach(session => {
            if (!categoryScores[session.category]) {
                categoryScores[session.category] = [];
            }
            categoryScores[session.category].push(session.score);
        });

        const weakAreas = Object.entries(categoryScores)
            .map(([category, scores]) => ({
                category,
                avgScore: scores.reduce((a, b) => a + b) / scores.length
            }))
            .filter(area => area.avgScore < 70)
            .sort((a, b) => a.avgScore - b.avgScore)
            .slice(0, 3);

        if (weakAreas.length === 0) {
            container.innerHTML = '<p>Great job! You\'re performing well in all areas.</p>';
            return;
        }

        container.innerHTML = weakAreas.map(area => `
            <div class="recommendation-card">
                <div class="recommendation-title">
                    <i class="fas fa-chart-line"></i>
                    Improve ${area.category}
                </div>
                <div class="recommendation-description">
                    Current average: ${area.avgScore.toFixed(1)}%. Practice more questions in this category to improve your understanding.
                </div>
                <div class="recommendation-tags">
                    <span class="recommendation-tag">Weak Area</span>
                    <span class="recommendation-tag">${area.category}</span>
                </div>
            </div>
        `).join('');
    }

    generateCategoryRecommendations() {
        const container = document.getElementById('categoryRecommendations');
        if (!container) return;

        const categories = [
            'Cell Biology', 'Biochemistry', 'Genetics', 'Molecular Biology',
            'Physiology', 'Immunology', 'Pharmacology', 'Pathology',
            'Microbiology', 'Anatomy', 'Biostatistics'
        ];

        const recommendations = categories.slice(0, 6).map(category => ({
            title: `Study ${category} Fundamentals`,
            description: `Explore comprehensive study materials and practice questions for ${category}.`,
            tags: [category, 'Study Plan']
        }));

        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-card">
                <div class="recommendation-title">
                    <i class="fas fa-book"></i>
                    ${rec.title}
                </div>
                <div class="recommendation-description">
                    ${rec.description}
                </div>
                <div class="recommendation-tags">
                    ${rec.tags.map(tag => `<span class="recommendation-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    generateStudyPlanRecommendations() {
        const container = document.getElementById('studyPlanRecommendations');
        if (!container) return;

        const studyPlans = [
            {
                title: '30-Day Biochemistry Intensive',
                description: 'Complete biochemistry review with daily practice sessions and progress tracking.',
                tags: ['30 Days', 'Intensive', 'Biochemistry']
            },
            {
                title: 'Weekly Cell Biology Deep Dive',
                description: 'Comprehensive cell biology study plan with molecular focus.',
                tags: ['Weekly', 'Cell Biology', 'Advanced']
            },
            {
                title: 'Exam Prep Marathon',
                description: 'High-intensity review covering all major biomedical topics.',
                tags: ['Exam Prep', 'Comprehensive', 'Review']
            }
        ];

        container.innerHTML = studyPlans.map(plan => `
            <div class="recommendation-card">
                <div class="recommendation-title">
                    <i class="fas fa-calendar-alt"></i>
                    ${plan.title}
                </div>
                <div class="recommendation-description">
                    ${plan.description}
                </div>
                <div class="recommendation-tags">
                    ${plan.tags.map(tag => `<span class="recommendation-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // Utility Methods
    getEmptyStateHTML(type) {
        const emptyStates = {
            discussions: `
                <div class="login-prompt">
                    <div class="prompt-content">
                        <i class="fas fa-comments"></i>
                        <h3>No Discussions Yet</h3>
                        <p>Be the first to start a discussion in the biomedical community!</p>
                        ${this.checkUserAuth() ? 
                            '<button class="community-btn primary" onclick="communityManager.openModal(\'newDiscussionModal\')">Start Discussion</button>' :
                            '<button class="community-btn primary" onclick="document.getElementById(\'loginModal\').style.display=\'flex\'">Log In to Participate</button>'
                        }
                    </div>
                </div>
            `,
            sources: `
                <div class="login-prompt">
                    <div class="prompt-content">
                        <i class="fas fa-book-open"></i>
                        <h3>No Study Sources Yet</h3>
                        <p>Help the community by adding valuable study resources!</p>
                        ${this.checkUserAuth() ? 
                            '<button class="community-btn primary" onclick="communityManager.openModal(\'addSourceModal\')">Add Source</button>' :
                            '<button class="community-btn primary" onclick="document.getElementById(\'loginModal\').style.display=\'flex\'">Log In to Contribute</button>'
                        }
                    </div>
                </div>
            `
        };
        return emptyStates[type] || '';
    }

    getTimeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return `${Math.floor(diffInSeconds / 604800)}w ago`;
    }

    truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    showSuccess(message) {
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    saveDiscussions() {
        localStorage.setItem('communityDiscussions', JSON.stringify(this.discussions));
    }

    saveSources() {
        localStorage.setItem('communitySources', JSON.stringify(this.sources));
    }
}

// Initialize Community Manager
let communityManager;

document.addEventListener('DOMContentLoaded', () => {
    communityManager = new CommunityManager();
});

// Global functions for HTML onclick handlers
function openCommunityModal(modalId) {
    if (communityManager) {
        communityManager.openModal(modalId);
    }
}

function closeCommunityModal(modalId) {
    if (communityManager) {
        communityManager.closeModal(modalId);
    }
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Add CSS for toast animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);