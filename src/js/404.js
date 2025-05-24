document.addEventListener('DOMContentLoaded', function() {
    const gridoverlay = document.getElementById('grid-overlay');
    gridoverlay.style.opacity = '0.1';
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0;
    bgMusic.play();
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
});