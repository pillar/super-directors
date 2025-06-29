// 脚本生成功能
async function generateScript() {
    const storyInput = getElementValue('story-input');
    const sceneStyle = getElementValue('scene-style') || 'cinematic';
    const cameraMovement = getElementValue('camera-movement') || 'static';
    
    if (!storyInput.trim()) {
        showAlert(currentLanguage === 'zh' ? '请先输入故事概要' : 'Please enter story summary first', 'warning');
        return;
    }
    
    if (!apiSettings.textApi || !apiSettings.textApi.key) {
        showAlert(currentLanguage === 'zh' ? '请先在设置中配置文本生成 API' : 'Please configure Text Generation API in settings first', 'warning');
        switchTab('settings');
        return;
    }
    
    const btn = document.getElementById('generate-script-btn');
    const output = document.getElementById('script-output');
    
    if (btn) {
        btn.disabled = true;
        btn.textContent = currentLanguage === 'zh' ? '生成中...' : 'Generating...';
    }
    
    if (output) {
        output.innerHTML = `<div class="spinner"></div><p>${currentLanguage === 'zh' ? 'AI 导演正在创作专业脚本...' : 'AI Director is creating professional script...'}</p>`;
    }
    
    try {
        const prompt = currentLanguage === 'zh' ? 
            `基于以下故事概要，创作一个专业的视频拍摄脚本：

故事概要：${storyInput}

要求：
- 场景风格：${sceneStyle}
- 摄影机运动：${cameraMovement}
- 适合4-8秒的短视频
- 包含详细的视觉描述
- 包含摄影指导
- 包含灯光和色彩建议
- 用中文输出
- 格式清晰，便于视频生成 AI 理解

请生成一个完整的拍摄脚本。` :
            `Based on the following story summary, create a professional video shooting script:

Story Summary: ${storyInput}

Requirements:
- Scene Style: ${sceneStyle}
- Camera Movement: ${cameraMovement}
- Suitable for 4-8 second short videos
- Include detailed visual descriptions
- Include cinematography guidance
- Include lighting and color suggestions
- Output in English
- Clear format, easy for video generation AI to understand

Please generate a complete shooting script.`;

        const response = await fetch(`${apiSettings.textApi.url}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiSettings.textApi.key}`
            },
            body: JSON.stringify({
                model: apiSettings.textApi.model,
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 800,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API ${currentLanguage === 'zh' ? '请求失败' : 'request failed'}: ${response.status}`);
        }

        const data = await response.json();
        const scriptText = data.choices[0].message.content;
        
        currentScript = scriptText;
        if (output) {
            output.innerHTML = `
                <div class="has-content" style="text-align: left;">
                    <h3>🎬 ${currentLanguage === 'zh' ? 'AI 生成的专业脚本' : 'AI Generated Professional Script'}</h3>
                    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0; line-height: 1.6; white-space: pre-wrap;">${scriptText}</div>
                    <button class="btn btn-secondary" onclick="useScriptInVideo()">🎬 ${currentLanguage === 'zh' ? '用于视频生成' : 'Use for Video'}</button>
                </div>
            `;
            output.classList.add('has-content');
        }
        
    } catch (error) {
        if (output) {
            output.innerHTML = `
                <div style="color: #e53e3e;">
                    <h3>${currentLanguage === 'zh' ? '生成失败' : 'Generation Failed'}</h3>
                    <p>${currentLanguage === 'zh' ? '错误信息' : 'Error'}: ${error.message}</p>
                    <small>${currentLanguage === 'zh' ? '请检查 API 配置和网络连接' : 'Please check API configuration and network connection'}</small>
                </div>
            `;
        }
        showAlert((currentLanguage === 'zh' ? '脚本生成失败: ' : 'Script generation failed: ') + error.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = translations[currentLanguage].generateScriptBtn;
        }
    }
}

function useScriptInVideo() {
    setElementValue('video-prompt', currentScript);
    switchTab('video');
}