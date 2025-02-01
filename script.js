document.addEventListener('DOMContentLoaded', () => {
    const sceneTabs = document.querySelectorAll('.scene-tab');
    const partBtns = document.querySelectorAll('.part-btn');
    const rightPanel = document.querySelector('.right-panel');
    const uploadButton = document.getElementById('uploadButton');
    const imageUpload = document.getElementById('imageUpload');
    const imageUrl = document.getElementById('imageUrl');
    const displayImage = document.getElementById('displayImage');

    // Load saved data from localStorage
    const loadSavedData = () => {
        const savedScenes = JSON.parse(localStorage.getItem('sceneTexts')) || {};
        sceneTabs.forEach(tab => {
            const sceneNum = tab.dataset.scene;
            tab.textContent = savedScenes[sceneNum] || tab.dataset.text;
        });

        const savedParts = JSON.parse(localStorage.getItem('partTexts')) || {};
        partBtns.forEach(btn => {
            const partNum = btn.dataset.part;
            btn.textContent = savedParts[partNum] || btn.dataset.text;
        });

        const savedImage = localStorage.getItem('imageSrc');
        if (savedImage) displayImage.src = savedImage;

        const savedText = localStorage.getItem('rightPanelText');
        if (savedText) rightPanel.innerHTML = savedText;
    };

    // Save data to localStorage
    const saveData = () => {
        const sceneTexts = {};
        sceneTabs.forEach(tab => {
            sceneTexts[tab.dataset.scene] = tab.textContent;
        });
        localStorage.setItem('sceneTexts', JSON.stringify(sceneTexts));

        const partTexts = {};
        partBtns.forEach(btn => {
            partTexts[btn.dataset.part] = btn.textContent;
        });
        localStorage.setItem('partTexts', JSON.stringify(partTexts));

        localStorage.setItem('imageSrc', displayImage.src);
        localStorage.setItem('rightPanelText', rightPanel.innerHTML);
    };

    // Editable elements functionality
    document.querySelectorAll('.editable').forEach(el => {
        el.addEventListener('click', (e) => {
           // if (e.target.tagName === 'BUTTON') return;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = el.textContent;
            input.style.width = '100%';
            input.style.boxSizing = 'border-box';
            
            el.replaceWith(input);
            input.focus();
            
            input.addEventListener('blur', () => {
                el.textContent = input.value;
                el.classList.remove('editing');
                saveData();
                input.replaceWith(el);
            });

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    input.blur();
                }
            });
        });
    });

    // Image upload functionality
    uploadButton.addEventListener('click', () => {
        imageUpload.click();
    });

    imageUpload.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                displayImage.src = e.target.result;
                saveData();
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    imageUrl.addEventListener('input', () => {
        const url = imageUrl.value;
        if (url) {
            displayImage.src = url;
            saveData();
        }
    });

    // Right panel editing
    rightPanel.addEventListener('blur', saveData);
    rightPanel.addEventListener('input', saveData);

    
    // Scene navigation
    sceneTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            sceneTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Part navigation
    partBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            partBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Initialize active states
    const initialScene = document.querySelector('.scene-tab[data-scene="1"]');
    initialScene?.classList.add('active');

    // Initialize saved data
    loadSavedData();
});

//----------

