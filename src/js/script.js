document.addEventListener('DOMContentLoaded', function() {
    const clickMessage = document.getElementById('clickMessage');
    const mainContent = document.getElementById('mainContent');
    const bgMusic = document.getElementById('bgMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const audioControls = document.getElementById('audioControls');
    const mainText = document.getElementById('mainText');
    let isContentVisible = false;

    audioControls.style.display = 'none';
    bgMusic.volume = 0;

    volumeSlider.addEventListener('input', function() {
        bgMusic.volume = this.value / 100;
    });

    document.addEventListener('click', function() {
        if (!isContentVisible) {
            clickMessage.style.opacity = '0';
            setTimeout(() => {
                clickMessage.style.display = 'none';
                mainContent.style.display = 'block';
                audioControls.style.display = 'flex';
                
                setTimeout(() => {
                    mainText.style.opacity = '1';
                    document.body.style.transition = 'background 1s ease';
                    document.body.style.background = 'linear-gradient(to bottom, #000 50%,rgb(0, 71, 50))';
                    document.querySelector('.grid-overlay').style.opacity = '0.15';
                    mainContent.style.opacity = '0.9';
                    mainContent.style.transform = 'translateY(0)';
                    audioControls.style.opacity = '0.9';
                    audioControls.style.transform = 'translateY(0)';
                    bgMusic.play();
                }, 100);
                
                isContentVisible = true;
                // 5초 간격으로 텍스트 변경
                setInterval(updateText, 5000);
            }, 500);

            // 볼륨 서서히 증가
            let currentVolume = 0;
            const targetVolume = 0.05;
            const volumeInterval = setInterval(() => {
                currentVolume += 0.01;
                bgMusic.volume = currentVolume;
                volumeSlider.value = currentVolume * 100;
                if (currentVolume >= targetVolume) {
                    clearInterval(volumeInterval);
                }
            }, 10);
        }
    });

    // 그리드 시차 효과
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        document.querySelector('.grid-overlay').style.transform = 
            `translateY(${scrolled * 0.5}px)`;
    });
});

const textArray = ['ONLIY', 'IMONPLE', 'H1TA'];
let currentIndex = 0;

function updateText() {
    // 페이드 아웃 효과 (1.5초)
    mainText.style.transition = 'opacity 1.5s ease';
    mainText.style.opacity = '0';
    
    setTimeout(() => {
        // 텍스트 변경
        currentIndex = (currentIndex + 1) % textArray.length;
        mainText.textContent = textArray[currentIndex];
        document.title = textArray[currentIndex];
        
        // 페이드 인 효과 (1.5초)
        mainText.style.opacity = '1';
    }, 1000);
}