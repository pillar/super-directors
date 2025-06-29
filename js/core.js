// 全局变量和配置
let currentStory = '';
let currentScript = '';
let apiSettings = {};
let currentLanguage = 'zh';

// 多语言文本配置
const translations = {
    zh: {
        appTitle: '🎬 Super Directors',
        appSubtitle: '全能 AI 视频创作套件 - 从故事构思到成片制作',
        langToggle: '🌐 English',
        tabStory: '📝 故事生成',
        tabScript: '🎥 脚本制作',
        tabVideo: '🎬 视频生成',
        tabSettings: '⚙️ 设置',
        generateStoryBtn: '🎲 生成故事创意',
        generateScriptBtn: '🤖 生成专业脚本',
        generateVideoBtn: '🎬 生成视频',
        exportTitle: '📁 导出与保存',
        exportStoryBtn: '📝 导出故事',
        exportScriptBtn: '🎬 导出脚本',
        exportProjectBtn: '📦 导出项目',
        saveAllBtn: '💾 保存所有内容',
        connected: '已连接',
        connectionFailed: '连接失败',
        notConfigured: '未配置'
    },
    en: {
        appTitle: '🎬 Super Directors',
        appSubtitle: 'AI Video Creation Suite - From Story to Final Production',
        langToggle: '🌐 中文',
        tabStory: '📝 Story',
        tabScript: '🎥 Script',
        tabVideo: '🎬 Video',
        tabSettings: '⚙️ Settings',
        generateStoryBtn: '🎲 Generate Story',
        generateScriptBtn: '🤖 Generate Professional Script',
        generateVideoBtn: '🎬 Generate Video',
        exportTitle: '📁 Export & Save',
        exportStoryBtn: '📝 Export Story',
        exportScriptBtn: '🎬 Export Script',
        exportProjectBtn: '📦 Export Project',
        saveAllBtn: '💾 Save All Content',
        connected: 'Connected',
        connectionFailed: 'Connection Failed',
        notConfigured: 'Not Configured'
    }
};

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    loadLanguage();
    updateApiStatus();
    addExportButtons();
});

// 显示提示消息
function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        max-width: 400px;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 0.9rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    if (type === 'success') {
        alert.style.background = '#c6f6d5';
        alert.style.color = '#22543d';
        alert.style.border = '1px solid #68d391';
    } else if (type === 'error') {
        alert.style.background = '#fed7d7';
        alert.style.color = '#742a2a';
        alert.style.border = '1px solid #fc8181';
    } else if (type === 'warning') {
        alert.style.background = '#fef5e7';
        alert.style.color = '#744210';
        alert.style.border = '1px solid #f6e05e';
    }
    
    alert.textContent = message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert && alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// 标签页切换
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const targetTab = document.getElementById(tabName + '-tab');
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
}