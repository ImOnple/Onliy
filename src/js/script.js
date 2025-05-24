document.addEventListener('DOMContentLoaded', function() {
    const clickMessage = document.getElementById('clickMessage');
    const mainContent = document.getElementById('mainContent');
    const bgMusic = document.getElementById('bgMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const audioControls = document.getElementById('audioControls');
    const mainText = document.getElementById('mainText');
    const playPauseBtn = document.getElementById('playPauseBtn');
    let isContentVisible = false;
    let isPlaying = false;

    audioControls.style.display = 'none';
    bgMusic.volume = 0;

    function updatePlayPauseButton() {
        const playIcon = playPauseBtn.querySelector('.play-icon');
        const pauseIcon = playPauseBtn.querySelector('.pause-icon');
        if (isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
        } else {
            bgMusic.play();
        }
        isPlaying = !isPlaying;
        updatePlayPauseButton();
    });

    volumeSlider.addEventListener('input', function() {
        const value = this.value;
        bgMusic.volume = value / 100;
        const percent = value;
        this.style.background = `linear-gradient(to right, #00FFB2 ${percent}%, #2a3a37 ${percent}%)`;
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
                    isPlaying = true;
                    updatePlayPauseButton();
                }, 100);
                
                isContentVisible = true;
                // 5초 간격으로 텍스트 변경
                setInterval(updateText, 5000);
                
                // 초기 볼륨 슬라이더 시각적 상태 설정
                volumeSlider.style.background = `linear-gradient(to right, #00FFB2 ${volumeSlider.value}%, #2a3a37 ${volumeSlider.value}%)`;

            }, 500);

            // 볼륨 서서히 증가
            let currentVolume = 0;
            const targetVolume = 0.3;
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