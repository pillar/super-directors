// 故事生成功能
async function generateStory() {
    const genre = getElementValue('story-genre') || 'sci-fi';
    const setting = getElementValue('story-setting') || 'future';
    const mood = getElementValue('story-mood') || 'optimistic';
    
    if (!apiSettings.textApi || !apiSettings.textApi.key) {
        showAlert(currentLanguage === 'zh' ? '请先在设置中配置文本生成 API' : 'Please configure Text Generation API in settings first', 'warning');
        switchTab('settings');
        return;
    }
    
    const btn = document.getElementById('generate-story-btn');
    const output = document.getElementById('story-output');
    
    if (btn) {
        btn.disabled = true;
        btn.textContent = currentLanguage === 'zh' ? '生成中...' : 'Generating...';
    }
    
    if (output) {
        output.innerHTML = `<div class="spinner"></div><p>${currentLanguage === 'zh' ? '正在生成故事创意...' : 'Generating story idea...'}</p>`;
    }
    
    try {
        const prompt = currentLanguage === 'zh' ? 
            `创建一个${genre}类型的故事创意，背景设定在${setting}，整体基调是${mood}的。请生成一个有趣且独特的故事概要，包含主要角色、核心冲突和大致情节走向。故事应该适合制作成短视频。请用中文回答，控制在150字以内。` :
            `Create a ${genre} genre story idea set in ${setting} with a ${mood} mood. Generate an interesting and unique story summary including main characters, core conflict, and general plot direction. The story should be suitable for short video production. Please respond in English within 150 words.`;
        
        const response = await fetch(`${apiSettings.textApi.url}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiSettings.textApi.key}`
            },
            body: JSON.stringify({
                model: apiSettings.textApi.model,
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 500,
                temperature: 0.8
            })
        });

        if (!response.ok) {
            throw new Error(`API ${currentLanguage === 'zh' ? '请求失败' : 'request failed'}: ${response.status}`);
        }

        const data = await response.json();
        const storyText = data.choices[0].message.content;
        
        currentStory = storyText;
        if (output) {
            output.innerHTML = `
                <div class="has-content">
                    <h3>✨ ${currentLanguage === 'zh' ? 'AI 生成的故事创意' : 'AI Generated Story Idea'}</h3>
                    <p style="margin: 15px 0; line-height: 1.6; color: #4a5568;">${storyText}</p>
                    <button class="btn btn-secondary" onclick="useStoryInScript()">📝 ${currentLanguage === 'zh' ? '用于脚本制作' : 'Use for Script'}</button>
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
        showAlert((currentLanguage === 'zh' ? '故事生成失败: ' : 'Story generation failed: ') + error.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = translations[currentLanguage].generateStoryBtn;
        }
    }
}

function selectStory(element) {
    const title = element.querySelector('h4')?.textContent || '';
    const description = element.querySelector('p')?.textContent || '';
    currentStory = description;
    
    const output = document.getElementById('story-output');
    if (output) {
        output.innerHTML = `
            <div class="has-content">
                <h3>${title}</h3>
                <p style="margin: 15px 0; line-height: 1.6; color: #4a5568;">${description}</p>
                <button class="btn btn-secondary" onclick="useStoryInScript()">📝 ${currentLanguage === 'zh' ? '用于脚本制作' : 'Use for Script'}</button>
            </div>
        `;
        output.classList.add('has-content');
    }
}

function useStoryInScript() {
    setElementValue('story-input', currentStory);
    switchTab('script');
}