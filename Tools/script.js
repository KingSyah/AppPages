/**
 * Button Editor - User-Friendly Tool for Adding Menu Buttons
 * Allows non-programmers to easily add buttons to the main menu
 */

// ==========================================================================
// DOM Elements
// ==========================================================================
const elements = {
    form: document.getElementById('buttonForm'),
    appName: document.getElementById('appName'),
    appDescription: document.getElementById('appDescription'),
    appUrl: document.getElementById('appUrl'),
    appIcon: document.getElementById('appIcon'),
    appCategory: document.getElementById('appCategory'),
    previewBtn: document.getElementById('previewBtn'),
    buttonPreview: document.getElementById('buttonPreview'),
    resultSection: document.getElementById('resultSection'),
    generatedCode: document.getElementById('generatedCode'),
    copyBtn: document.getElementById('copyBtn'),
    emojiOptions: document.querySelectorAll('.emoji-option')
};

// ==========================================================================
// Button Editor Class
// ==========================================================================
class ButtonEditor {
    constructor() {
        this.currentData = {
            name: '',
            description: '',
            url: '',
            icon: '📱',
            category: 'aplikasi-umum'
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updatePreview();
    }

    bindEvents() {
        // Form input events
        elements.appName.addEventListener('input', () => this.updateData());
        elements.appDescription.addEventListener('input', () => this.updateData());
        elements.appUrl.addEventListener('input', () => this.updateData());
        elements.appIcon.addEventListener('input', () => this.updateData());
        elements.appCategory.addEventListener('change', () => this.updateData());

        // Emoji picker events
        elements.emojiOptions.forEach(option => {
            option.addEventListener('click', () => this.selectEmoji(option));
        });

        // Button events
        elements.previewBtn.addEventListener('click', () => this.updatePreview());
        elements.form.addEventListener('submit', (e) => this.generateCode(e));
        elements.copyBtn.addEventListener('click', () => this.copyCode());

        // Real-time preview update
        elements.appName.addEventListener('input', () => this.updatePreview());
        elements.appDescription.addEventListener('input', () => this.updatePreview());
        elements.appIcon.addEventListener('input', () => this.updatePreview());
    }

    updateData() {
        this.currentData = {
            name: elements.appName.value || 'Nama Aplikasi',
            description: elements.appDescription.value || 'Deskripsi aplikasi akan muncul di sini',
            url: elements.appUrl.value,
            icon: elements.appIcon.value || '📱',
            category: elements.appCategory.value
        };
    }

    selectEmoji(option) {
        // Remove previous selection
        elements.emojiOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selection to clicked emoji
        option.classList.add('selected');
        
        // Update input and data
        const emoji = option.dataset.emoji;
        elements.appIcon.value = emoji;
        this.currentData.icon = emoji;
        
        // Update preview
        this.updatePreview();
    }

    updatePreview() {
        this.updateData();
        
        const preview = elements.buttonPreview;
        const iconElement = preview.querySelector('.app-icon');
        const nameElement = preview.querySelector('.app-name');
        const descElement = preview.querySelector('.app-description');
        
        iconElement.textContent = this.currentData.icon;
        nameElement.textContent = this.currentData.name;
        descElement.textContent = this.currentData.description;
        
        // Add hover effect preview
        preview.style.cursor = this.currentData.url ? 'pointer' : 'default';
    }

    generateCode(event) {
        event.preventDefault();
        
        // Validate form
        if (!this.validateForm()) {
            return;
        }
        
        this.updateData();
        
        // Generate HTML code
        const htmlCode = this.createHTMLCode();
        
        // Display result
        elements.generatedCode.textContent = htmlCode;
        elements.resultSection.style.display = 'block';
        
        // Scroll to result
        elements.resultSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Show success message
        this.showMessage('Code berhasil di-generate! Scroll ke bawah untuk melihat hasilnya.', 'success');
    }

    validateForm() {
        const requiredFields = [
            { element: elements.appName, message: 'Nama aplikasi harus diisi' },
            { element: elements.appDescription, message: 'Deskripsi aplikasi harus diisi' },
            { element: elements.appUrl, message: 'URL aplikasi harus diisi' }
        ];
        
        for (const field of requiredFields) {
            if (!field.element.value.trim()) {
                this.showMessage(field.message, 'error');
                field.element.focus();
                return false;
            }
        }
        
        // Validate URL format
        try {
            new URL(elements.appUrl.value);
        } catch {
            this.showMessage('URL tidak valid. Pastikan dimulai dengan https://', 'error');
            elements.appUrl.focus();
            return false;
        }
        
        return true;
    }

    createHTMLCode() {
        const data = this.currentData;
        const className = this.generateClassName(data.name);
        
        return `<a href="${data.url}" class="app-card compact ${this.getCategoryTheme(data.category)} ${className}" target="_blank">
    <div class="app-icon">${data.icon}</div>
    <div class="app-content">
        <div class="app-name">${data.name}</div>
        <div class="app-description">${data.description}</div>
    </div>
    <div class="app-arrow">›</div>
</a>`;
    }

    generateClassName(name) {
        return name.toLowerCase()
                  .replace(/[^a-z0-9\s]/g, '')
                  .replace(/\s+/g, '-')
                  .substring(0, 20);
    }

    getCategoryTheme(category) {
        const themes = {
            'aplikasi-umum': 'beach-theme',
            'tools': 'ocean-theme',
            'aplikasi-eve': 'star-theme',
            'games': 'star-theme'
        };
        return themes[category] || 'beach-theme';
    }

    copyCode() {
        const code = elements.generatedCode.textContent;
        
        navigator.clipboard.writeText(code).then(() => {
            // Update button text
            const originalText = elements.copyBtn.textContent;
            elements.copyBtn.textContent = '✅ Copied!';
            elements.copyBtn.classList.add('copied');
            
            // Reset after 2 seconds
            setTimeout(() => {
                elements.copyBtn.textContent = originalText;
                elements.copyBtn.classList.remove('copied');
            }, 2000);
            
            this.showMessage('Code berhasil di-copy ke clipboard!', 'success');
        }).catch(() => {
            // Fallback for older browsers
            this.selectText(elements.generatedCode);
            this.showMessage('Code telah dipilih. Tekan Ctrl+C untuk copy.', 'info');
        });
    }

    selectText(element) {
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        
        // Style message
        Object.assign(messageEl.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '1000',
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            animation: 'slideIn 0.3s ease-out'
        });
        
        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        messageEl.style.backgroundColor = colors[type] || colors.info;
        
        // Add to page
        document.body.appendChild(messageEl);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => messageEl.remove(), 300);
            }
        }, 5000);
    }
}

// ==========================================================================
// Initialize Application
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    new ButtonEditor();
    
    // Add CSS animations
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
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .message {
            animation: slideIn 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);
});

// ==========================================================================
// Utility Functions
// ==========================================================================

// Auto-resize textareas
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Format URL helper
function formatUrl(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return 'https://' + url;
    }
    return url;
}

// Validate emoji
function isValidEmoji(str) {
    const emojiRegex = /^[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]$/u;
    return emojiRegex.test(str);
}
