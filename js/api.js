// API 配置和测试
function updateTextApiFields() {
    const provider = getElementValue('text-api-provider');
    
    const configs = {
        'openai': {
            url: 'https://api.openai.com/v1',
            model: 'gpt-4'
        },
        'claude': {
            url: 'https://api.anthropic.com/v1',
            model: 'claude-3-opus-20240229'
        },
        'gemini': {
            url: 'https://generativelanguage.googleapis.com/v1',
            model: 'gemini-pro'
        },
        'custom': {
            url: '',
            model: ''
        }
    };
    
    if (configs[provider]) {
        setElementValue('text-api-url', configs[provider].url);
        setElementValue('text-model', configs[provider].model);
    }
}

function updateVideoApiFields() {
    const provider = getElementValue('video-api-provider');
    
    const configs = {
        'runway': 'https://api.runwayml.com/v1',
        'pika': 'https://api.pika.art/v1',
        'stable': 'https://api.stability.ai/v1',
        'custom': ''
    };
    
    if (configs[provider]) {
        setElementValue('video-api-url', configs[provider]);
    }
}

function updateAudioApiFields() {
    const provider = getElementValue('audio-api-provider');
    
    const configs = {
        'elevenlabs': 'https://api.elevenlabs.io/v1',
        'openai': 'https://api.openai.com/v1',
        'mubert': 'https://api.mubert.com/v2',
        'custom': ''
    };
    
    if (configs[provider]) {
        setElementValue('audio-api-url', configs[provider]);
    }
}

async function testTextApi() {
    const url = getElementValue('text-api-url');
    const key = getElementValue('text-api-key');
    const model = getElementValue('text-model');

    if (!url || !key) {
        showAlert(currentLanguage === 'zh' ? '请填写完整的 API 配置' : 'Please fill in complete API configuration', 'warning');
        return;
    }

    try {
        const response = await fetch(`${url}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: 'user', content: 'test' }],
                max_tokens: 10
            })
        });

        if (response.ok) {
            updateApiStatusIndicator('text-api-status', 'connected');
            showAlert(currentLanguage === 'zh' ? '文本 API 连接成功！' : 'Text API connection successful!', 'success');
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        updateApiStatusIndicator('text-api-status', 'error');
        showAlert(`${currentLanguage === 'zh' ? '文本 API 连接失败: ' : 'Text API connection failed: '}${error.message}`, 'error');
    }
}

async function testVideoApi() {
    const url = getElementValue('video-api-url');
    const key = getElementValue('video-api-key');

    if (!url || !key) {
        showAlert(currentLanguage === 'zh' ? '请填写完整的 API 配置' : 'Please fill in complete API configuration', 'warning');
        return;
    }

    try {
        const response = await fetch(`${url}/generations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`
            },
            body: JSON.stringify({
                prompt: 'test',
                model: 'gen3'
            })
        });

        if (response.ok || response.status === 402) {
            updateApiStatusIndicator('video-api-status', 'connected');
            showAlert(currentLanguage === 'zh' ? '视频 API 连接成功！' : 'Video API connection successful!', 'success');
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        updateApiStatusIndicator('video-api-status', 'error');
        showAlert(`${currentLanguage === 'zh' ? '视频 API 连接失败: ' : 'Video API connection failed: '}${error.message}`, 'error');
    }
}

async function testAudioApi() {
    const url = getElementValue('audio-api-url');
    const key = getElementValue('audio-api-key');

    if (!url || !key) {
        showAlert(currentLanguage === 'zh' ? '请填写完整的 API 配置' : 'Please fill in complete API configuration', 'warning');
        return;
    }

    try {
        const response = await fetch(`${url}/text-to-speech`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': key
            },
            body: JSON.stringify({
                text: 'test',
                voice_id: 'default'
            })
        });

        if (response.ok || response.status === 402) {
            updateApiStatusIndicator('audio-api-status', 'connected');
            showAlert(currentLanguage === 'zh' ? '音频 API 连接成功！' : 'Audio API connection successful!', 'success');
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        updateApiStatusIndicator('audio-api-status', 'error');
        showAlert(`${currentLanguage === 'zh' ? '音频 API 连接失败: ' : 'Audio API connection failed: '}${error.message}`, 'error');
    }
}

function updateApiStatusIndicator(elementId, status) {
    const indicator = document.getElementById(elementId);
    if (indicator) {
        indicator.className = `status-indicator ${status}`;
    }
}

function updateApiStatus() {
    ['text-api-status', 'video-api-status', 'audio-api-status'].forEach(id => {
        updateApiStatusIndicator(id, '');
    });
}