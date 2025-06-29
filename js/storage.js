// 本地存储管理
function saveAllSettings() {
    const settings = {
        textApi: {
            provider: getElementValue('text-api-provider'),
            url: getElementValue('text-api-url'),
            key: getElementValue('text-api-key'),
            model: getElementValue('text-model')
        },
        videoApi: {
            provider: getElementValue('video-api-provider'),
            url: getElementValue('video-api-url'),
            key: getElementValue('video-api-key')
        },
        audioApi: {
            provider: getElementValue('audio-api-provider'),
            url: getElementValue('audio-api-url'),
            key: getElementValue('audio-api-key')
        }
    };

    try {
        localStorage.setItem('super-directors-settings', JSON.stringify(settings));
        apiSettings = settings;
        showAlert(currentLanguage === 'zh' ? '设置已保存到本地！' : 'Settings saved locally!', 'success');
    } catch (error) {
        showAlert((currentLanguage === 'zh' ? '保存设置失败：' : 'Failed to save settings: ') + error.message, 'error');
    }
}

function loadSettings() {
    try {
        const savedSettings = localStorage.getItem('super-directors-settings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            apiSettings = settings;
            
            // 恢复设置
            if (settings.textApi) {
                setElementValue('text-api-provider', settings.textApi.provider || 'openai');
                setElementValue('text-api-url', settings.textApi.url || '');
                setElementValue('text-api-key', settings.textApi.key || '');
                setElementValue('text-model', settings.textApi.model || '');
            }
            
            if (settings.videoApi) {
                setElementValue('video-api-provider', settings.videoApi.provider || 'runway');
                setElementValue('video-api-url', settings.videoApi.url || '');
                setElementValue('video-api-key', settings.videoApi.key || '');
            }
            
            if (settings.audioApi) {
                setElementValue('audio-api-provider', settings.audioApi.provider || 'elevenlabs');
                setElementValue('audio-api-url', settings.audioApi.url || '');
                setElementValue('audio-api-key', settings.audioApi.key || '');
            }
        }

        // 加载保存的内容
        const savedContent = localStorage.getItem('super-directors-content');
        if (savedContent) {
            const content = JSON.parse(savedContent);
            if (content.story) currentStory = content.story;
            if (content.script) currentScript = content.script;
        }
    } catch (error) {
        console.error('加载设置失败:', error);
    }
}

function clearAllSettings() {
    const confirmMessage = currentLanguage === 'zh' ? 
        '确定要清除所有设置吗？此操作不可撤销。' : 
        'Are you sure you want to clear all settings? This action cannot be undone.';
        
    if (confirm(confirmMessage)) {
        localStorage.removeItem('super-directors-settings');
        localStorage.removeItem('super-directors-content');
        localStorage.removeItem('super-directors-language');
        apiSettings = {};
        currentStory = '';
        currentScript = '';
        
        // 清空表单
        document.querySelectorAll('#settings-tab input, #settings-tab select').forEach(field => {
            if (field.type === 'checkbox') {
                field.checked = false;
            } else {
                field.value = '';
            }
        });
        
        updateApiStatus();
        showAlert(currentLanguage === 'zh' ? '所有设置已清除！' : 'All settings cleared!', 'success');
    }
}

// 工具函数
function getElementValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
}

function setElementValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.value = value;
    }
}