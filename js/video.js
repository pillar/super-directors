// 视频生成功能
async function generateVideo() {
    const prompt = getElementValue('video-prompt');
    const duration = getElementValue('video-duration') || '4';
    const resolution = getElementValue('video-resolution') || '720p';
    const model = getElementValue('video-model') || 'runway';
    const addAudio = document.getElementById('add-audio')?.checked || false;
    
    if (!prompt.trim()) {
        showAlert(currentLanguage === 'zh' ? '请先输入视频提示词' : 'Please enter video prompt first', 'warning');
        return;
    }
    
    if (!apiSettings.videoApi || !apiSettings.videoApi.key) {
        showAlert(currentLanguage === 'zh' ? '请先在设置中配置视频生成 API' : 'Please configure Video Generation API in settings first', 'warning');
        switchTab('settings');
        return;
    }
    
    const btn = document.getElementById('generate-video-btn');
    const output = document.getElementById('video-output');
    const loading = document.getElementById('video-loading');
    const progressFill = document.getElementById('progress-fill');
    
    if (btn) {
        btn.disabled = true;
        btn.textContent = currentLanguage === 'zh' ? '生成中...' : 'Generating...';
    }
    
    if (output) {
        output.style.display = 'none';
    }
    
    if (loading) {
        loading.classList.add('show');
    }
    
    // 模拟进度更新
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 90) progress = 90;
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
    }, 1000);
    
    try {
        let requestBody;
        let endpoint;
        
        switch (model) {
            case 'runway':
                endpoint = '/generations';
                requestBody = {
                    prompt: prompt,
                    duration: parseInt(duration),
                    resolution: resolution,
                    model: 'gen3'
                };
                break;
            case 'pika':
                endpoint = '/generate';
                requestBody = {
                    prompt: prompt,
                    options: {
                        duration: parseInt(duration),
                        resolution: resolution
                    }
                };
                break;
            default:
                endpoint = '/generate';
                requestBody = {
                    prompt: prompt,
                    duration: parseInt(duration),
                    resolution: resolution
                };
        }

        const response = await fetch(`${apiSettings.videoApi.url}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiSettings.videoApi.key}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API ${currentLanguage === 'zh' ? '请求失败' : 'request failed'}: ${response.status}`);
        }

        const data = await response.json();
        
        clearInterval(progressInterval);
        if (progressFill) {
            progressFill.style.width = '100%';
        }
        
        setTimeout(() => {
            if (loading) {
                loading.classList.remove('show');
            }
            if (output) {
                output.style.display = 'flex';
            }
            
            const videoUrl = data.video_url || data.url || '#';
            
            if (output) {
                output.innerHTML = `
                    <div class="has-content">
                        <h3>🎬 ${currentLanguage === 'zh' ? '视频生成完成' : 'Video Generation Complete'}</h3>
                        <video class="video-preview" controls>
                            <source src="${videoUrl}" type="video/mp4">
                            ${currentLanguage === 'zh' ? '您的浏览器不支持视频播放。' : 'Your browser does not support video playback.'}
                        </video>
                        <div style="margin-top: 15px;">
                            <button class="btn btn-secondary" onclick="downloadVideo('${videoUrl}')">📥 ${currentLanguage === 'zh' ? '下载视频' : 'Download Video'}</button>
                            ${addAudio ? `<button class="btn btn-secondary" onclick="generateAudio()" style="margin-left: 10px;">🎵 ${currentLanguage === 'zh' ? '生成配音' : 'Generate Audio'}</button>` : ''}
                        </div>
                    </div>
                `;
                output.classList.add('has-content');
            }
            
            showAlert(currentLanguage === 'zh' ? '视频生成成功！' : 'Video generation successful!', 'success');
        }, 2000);
        
    } catch (error) {
        clearInterval(progressInterval);
        if (loading) {
            loading.classList.remove('show');
        }
        if (output) {
            output.style.display = 'flex';
            output.innerHTML = `
                <div style="color: #e53e3e;">
                    <h3>${currentLanguage === 'zh' ? '生成失败' : 'Generation Failed'}</h3>
                    <p>${currentLanguage === 'zh' ? '错误信息' : 'Error'}: ${error.message}</p>
                    <small>${currentLanguage === 'zh' ? '请检查 API 配置和网络连接' : 'Please check API configuration and network connection'}</small>
                </div>
            `;
        }
        showAlert((currentLanguage === 'zh' ? '视频生成失败: ' : 'Video generation failed: ') + error.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = translations[currentLanguage].generateVideoBtn;
        }
    }
}

function downloadVideo(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'super-directors-generated-video.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

async function generateAudio() {
    if (!apiSettings.audioApi || !apiSettings.audioApi.key) {
        showAlert(currentLanguage === 'zh' ? '请先在设置中配置音频生成 API' : 'Please configure Audio Generation API in settings first', 'warning');
        switchTab('settings');
        return;
    }
    
    showAlert(currentLanguage === 'zh' ? '音频生成功能开发中...' : 'Audio generation feature under development...', 'info');
}