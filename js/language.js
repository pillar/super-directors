// 语言切换功能
function toggleLanguage() {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    updateLanguage();
    localStorage.setItem('super-directors-language', currentLanguage);
}

function updateLanguage() {
    const t = translations[currentLanguage];
    
    // 安全更新元素文本
    const updateElement = (id, text) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    };
    
    // 更新头部
    updateElement('app-title', t.appTitle);
    updateElement('app-subtitle', t.appSubtitle);
    updateElement('lang-toggle', t.langToggle);
    
    // 更新标签页
    updateElement('tab-story', t.tabStory);
    updateElement('tab-script', t.tabScript);
    updateElement('tab-video', t.tabVideo);
    updateElement('tab-settings', t.tabSettings);
    
    // 更新按钮
    updateElement('generate-story-btn', t.generateStoryBtn);
    updateElement('generate-script-btn', t.generateScriptBtn);
    updateElement('generate-video-btn', t.generateVideoBtn);
    
    // 更新导出按钮
    updateExportButtons();
}

function loadLanguage() {
    const savedLanguage = localStorage.getItem('super-directors-language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        updateLanguage();
    }
}

function updateExportButtons() {
    const t = translations[currentLanguage];
    
    const updateElement = (id, text) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    };
    
    updateElement('export-title', t.exportTitle);
    updateElement('export-story-btn', t.exportStoryBtn);
    updateElement('export-script-btn', t.exportScriptBtn);
    updateElement('export-project-btn', t.exportProjectBtn);
    updateElement('save-all-btn', t.saveAllBtn);
}