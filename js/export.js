// 导出和文件下载功能
function addExportButtons() {
    const workspace = document.querySelector('.workspace');
    if (!workspace) return;
    
    const exportSection = document.createElement('div');
    exportSection.className = 'export-section';
    exportSection.innerHTML = `
        <h3 style="color: #4a5568; margin-bottom: 15px;" id="export-title">📁 导出与保存</h3>
        <div class="export-buttons">
            <button class="btn btn-secondary" onclick="exportStory()" id="export-story-btn">📝 导出故事</button>
            <button class="btn btn-secondary" onclick="exportScript()" id="export-script-btn">🎬 导出脚本</button>
            <button class="btn btn-secondary" onclick="exportProject()" id="export-project-btn">📦 导出项目</button>
            <button class="btn" onclick="saveAllContent()" id="save-all-btn">💾 保存所有内容</button>
        </div>
    `;
    workspace.appendChild(exportSection);
}

function exportStory() {
    if (!currentStory) {
        showAlert(currentLanguage === 'zh' ? '没有可导出的故事内容' : 'No story content to export', 'warning');
        return;
    }
    
    const content = `Super Directors - ${currentLanguage === 'zh' ? '故事创意' : 'Story Idea'}\n${currentLanguage === 'zh' ? '生成时间' : 'Generated'}: ${new Date().toLocaleString()}\n\n${currentStory}`;
    downloadFile(content, 'story.txt', 'text/plain');
    showAlert(currentLanguage === 'zh' ? '故事已导出' : 'Story exported', 'success');
}

function exportScript() {
    if (!currentScript) {
        showAlert(currentLanguage === 'zh' ? '没有可导出的脚本内容' : 'No script content to export', 'warning');
        return;
    }
    
    const content = `Super Directors - ${currentLanguage === 'zh' ? '视频脚本' : 'Video Script'}\n${currentLanguage === 'zh' ? '生成时间' : 'Generated'}: ${new Date().toLocaleString()}\n\n${currentScript}`;
    downloadFile(content, 'script.txt', 'text/plain');
    showAlert(currentLanguage === 'zh' ? '脚本已导出' : 'Script exported', 'success');
}

function exportProject() {
    const projectData = {
        appName: 'Super Directors',
        version: '1.0.0',
        exportTime: new Date().toISOString(),
        language: currentLanguage,
        content: {
            story: currentStory,
            script: currentScript,
            settings: {
                storyGenre: getElementValue('story-genre'),
                storySetting: getElementValue('story-setting'),
                storyMood: getElementValue('story-mood'),
                sceneStyle: getElementValue('scene-style'),
                cameraMovement: getElementValue('camera-movement'),
                videoDuration: getElementValue('video-duration'),
                videoResolution: getElementValue('video-resolution'),
                videoModel: getElementValue('video-model')
            }
        }
    };
    
    const content = JSON.stringify(projectData, null, 2);
    downloadFile(content, 'super-directors-project.json', 'application/json');
    showAlert(currentLanguage === 'zh' ? '项目已导出' : 'Project exported', 'success');
}

function saveAllContent() {
    const allContent = {
        story: currentStory,
        script: currentScript,
        lastSaved: new Date().toISOString(),
        settings: {
            storyGenre: getElementValue('story-genre'),
            storySetting: getElementValue('story-setting'),
            storyMood: getElementValue('story-mood'),
            sceneStyle: getElementValue('scene-style'),
            cameraMovement: getElementValue('camera-movement'),
            videoDuration: getElementValue('video-duration'),
            videoResolution: getElementValue('video-resolution'),
            videoModel: getElementValue('video-model')
        }
    };
    
    try {
        localStorage.setItem('super-directors-content', JSON.stringify(allContent));
        showAlert(currentLanguage === 'zh' ? '所有内容已保存到本地' : 'All content saved locally', 'success');
    } catch (error) {
        showAlert((currentLanguage === 'zh' ? '保存失败: ' : 'Save failed: ') + error.message, 'error');
    }
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}