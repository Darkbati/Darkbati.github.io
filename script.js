// ============================================================================
// 상수 정의
// ============================================================================

const SCENE_CONFIG = {
    SCENE_1: { index: 1, scrollPosition: 0 },
    SCENE_2: { index: 2, scrollPosition: 1 },
    SCENE_3: { index: 3, scrollPosition: 2 },
    SCENE_4: { index: 4, scrollPosition: 3 },
    SCENE_5: { index: 5, scrollPosition: 4 }
};

const SCROLL_THRESHOLDS = {
    DOWN: 0.5,    // 아래로 스크롤 시 50% 지점에서 전환
    UP: 0.5       // 위로 스크롤 시 50% 지점에서 전환
};

const TRANSITION_DURATION = 1000; // 전환 애니메이션 지속 시간 (ms)

// ============================================================================
// 데이터 정의
// ============================================================================

// 블로그 관련 영상 데이터
const videos = [
    {
        id: 'cYXaxF_JYvI',
        title: '블로그 소개 영상 - 효정의 일상',
        description: '블로그를 시작하게 된 계기와 앞으로의 계획을 담은 영상입니다.'
    },
    {
        id: 'z4gx6T21iNw',
        title: '봄날의 산책 - 새로운 계절을 맞이하며',
        description: '봄날의 아름다운 풍경과 함께하는 산책 이야기'
    },
    {
        id: 'gxjUszGewJM',
        title: '독서의 즐거움 - 이번 달 읽은 책들',
        description: '최근에 읽은 책들의 감상과 생각을 나누는 시간'
    },
    {
        id: 'H5tc-iJ562E',
        title: '음악과 함께하는 시간',
        description: '좋아하는 음악과 음악에 대한 생각을 담은 영상'
    }
];

// 배경 이미지 데이터
const backgroundImages = {
    scene1: ['https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&h=1080&fit=crop'],
    scene2: ['https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1920&h=1080&fit=crop'],
    scene3: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop'],
    scene4: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop'],
    scene5: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop']
};

// ============================================================================
// 전역 변수
// ============================================================================

let currentScene = 1;
let currentPlayingVideo = null;
let isTransitioning = false;
let currentSlide = 0;
let currentSlide2 = 0;
let slideInterval;
let slideInterval2;

// DOM 요소들
let gridContainer, modalOverlay, videoContainer, closeBtn;
let imageModalOverlay, imageContainer, imageCloseBtn;

// ============================================================================
// 유틸리티 함수
// ============================================================================

/**
 * DOM 요소를 안전하게 가져오는 함수
 * @param {string} id - 요소 ID
 * @returns {HTMLElement|null} DOM 요소 또는 null
 */
function getElement(id) {
    return document.getElementById(id);
}

/**
 * 스크롤 위치를 가져오는 함수 (크로스 브라우저 호환)
 * @returns {number} 스크롤 위치
 */
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

/**
 * 부드러운 스크롤 이동 함수
 * @param {number} position - 이동할 위치
 */
function smoothScrollTo(position) {
    window.scrollTo({
        top: position,
        behavior: 'smooth'
    });
}

// ============================================================================
// 씬 관리 함수
// ============================================================================

/**
 * 씬 전환 함수
 * @param {number} targetScene - 목표 씬 번호
 */
function changeScene(targetScene) {
    if (isTransitioning || targetScene === currentScene) return;
    
    isTransitioning = true;
    currentScene = targetScene;
    
    updateBackgroundImages();
    
    // 부드러운 스크롤로 해당 씬으로 이동
    const targetScrollPosition = (targetScene - 1) * window.innerHeight;
    smoothScrollTo(targetScrollPosition);
    
    // 전환 완료 후 상태 초기화
    setTimeout(() => {
        isTransitioning = false;
    }, TRANSITION_DURATION);
}

/**
 * 배경 이미지 업데이트 함수
 */
function updateBackgroundImages() {
    const scenes = ['scene1', 'scene2', 'scene3', 'scene4', 'scene5'];
    
    scenes.forEach((sceneName, index) => {
        const sceneElement = getElement(`scene${index + 1}`);
        if (sceneElement && backgroundImages[sceneName]) {
            sceneElement.style.backgroundImage = `url(${backgroundImages[sceneName][0]})`;
        }
    });
}

// ============================================================================
// 비디오 관련 함수
// ============================================================================

/**
 * 비디오 그리드 생성 함수
 */
function createVideoGrid() {
    if (!gridContainer) return;
    
    gridContainer.innerHTML = '';
    
    videos.forEach((video) => {
        const videoItem = createVideoItem(video);
        gridContainer.appendChild(videoItem);
    });
}

/**
 * 비디오 아이템 생성 함수
 * @param {Object} video - 비디오 정보
 * @returns {HTMLElement} 비디오 아이템 요소
 */
function createVideoItem(video) {
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';
    videoItem.dataset.videoId = video.id;
    
    videoItem.innerHTML = `
        <div class="video-thumbnail" data-video-id="${video.id}">
            <img src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg" 
                 alt="${video.title}" 
                 onerror="this.src='https://img.youtube.com/vi/${video.id}/hqdefault.jpg'">
            <div class="play-button">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </div>
        </div>
        <div class="video-info">
            <div class="video-title">${video.title}</div>
            <div class="video-description">${video.description}</div>
        </div>
    `;
    
    videoItem.addEventListener('click', () => openVideoModal(video));
    
    return videoItem;
}

/**
 * 비디오 모달 열기 함수
 * @param {Object} video - 비디오 정보
 */
function openVideoModal(video) {
    console.log('Opening video modal for:', video.id, video.title);
    
    stopCurrentVideo();
    
    if (!videoContainer) return;
    
    videoContainer.innerHTML = `
        <iframe 
            src="https://www.youtube.com/embed/${video.id}?autoplay=1&controls=1&rel=0&modestbranding=1&enablejsapi=1&origin=${window.location.origin}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
        </iframe>
        <div class="video-info">
            <div class="video-title">${video.title}</div>
            <div class="video-description">${video.description}</div>
        </div>
    `;
    
    if (modalOverlay) {
        modalOverlay.classList.add('active');
    }
    
    currentPlayingVideo = video.id;
    document.addEventListener('keydown', handleEscKey);
}

/**
 * 비디오 모달 닫기 함수
 */
function closeVideoModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
    }
    
    stopCurrentVideo();
    currentPlayingVideo = null;
    document.removeEventListener('keydown', handleEscKey);
}

/**
 * 현재 재생 중인 비디오 정지 함수
 */
function stopCurrentVideo() {
    if (videoContainer) {
        videoContainer.innerHTML = '';
    }
}

/**
 * 이미지 모달 열기 함수
 * @param {string} imageUrl - 이미지 URL
 * @param {string} altText - 이미지 대체 텍스트
 * @param {string} date - 이미지 날짜 (선택사항)
 * @param {string} description - 이미지 설명 (선택사항)
 */
function openImageModal(imageUrl, altText, date = '', description = '') {
    if (!imageContainer || !imageModalOverlay) return;
    
    // 모달 오버레이를 먼저 표시
    imageModalOverlay.classList.add('active');
    
    // 약간의 지연 후 이미지 로드 (애니메이션 효과를 위해)
    setTimeout(() => {
        imageContainer.innerHTML = `<img src="${imageUrl}" alt="${altText}">`;
        
        // 날짜와 설명 정보 표시
        const imageDate = document.getElementById('imageDate');
        const imageDescription = document.getElementById('imageDescription');
        
        if (imageDate) {
            imageDate.textContent = date || '';
        }
        
        if (imageDescription) {
            imageDescription.textContent = description || '';
        }
    }, 50);
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', handleImageEscKey);
}

/**
 * 이미지 모달 닫기 함수
 */
function closeImageModal() {
    if (imageModalOverlay) {
        imageModalOverlay.classList.remove('active');
    }
    
    if (imageContainer) {
        imageContainer.innerHTML = '';
    }
    
    document.removeEventListener('keydown', handleImageEscKey);
}

/**
 * 이미지 모달 ESC 키 처리 함수
 * @param {KeyboardEvent} event - 키보드 이벤트
 */
function handleImageEscKey(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
}

/**
 * ESC 키 처리 함수
 * @param {KeyboardEvent} event - 키보드 이벤트
 */
function handleEscKey(event) {
    if (event.key === 'Escape') {
        closeVideoModal();
    }
}

// ============================================================================
// 이미지 슬라이더 함수
// ============================================================================

/**
 * 첫 번째 이미지 슬라이더 초기화
 */
function initializeImageSlider() {
    const prevBtn = getElement('prevBtn');
    const nextBtn = getElement('nextBtn');
    const dots = document.querySelectorAll('#sliderDots .dot');
    const track = document.querySelector('#scene2 .slider-track');
    
    if (!prevBtn || !nextBtn || !track) return;
    
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // 슬라이드 이미지 클릭 이벤트 추가
    const slideImages = document.querySelectorAll('#scene2 .slide-image');
    slideImages.forEach(img => {
        img.addEventListener('click', () => {
            const imageUrl = img.dataset.imageUrl;
            const altText = img.alt;
            const date = img.dataset.date || '';
            const description = img.dataset.description || '';
            openImageModal(imageUrl, altText, date, description);
        });
    });
    
    startAutoSlide();
    
    const slider = document.querySelector('#scene2 .image-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
}

/**
 * 두 번째 이미지 슬라이더 초기화
 */
function initializeImageSlider2() {
    const prevBtn = getElement('prevBtn2');
    const nextBtn = getElement('nextBtn2');
    const dots = document.querySelectorAll('#sliderDots2 .dot');
    const track = document.querySelector('#scene3 .slider-track');
    
    if (!prevBtn || !nextBtn || !track) return;
    
    prevBtn.addEventListener('click', () => goToSlide2(currentSlide2 - 1));
    nextBtn.addEventListener('click', () => goToSlide2(currentSlide2 + 1));
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide2(index));
    });
    
    // 슬라이드 이미지 클릭 이벤트 추가
    const slideImages = document.querySelectorAll('#scene3 .slide-image');
    slideImages.forEach(img => {
        img.addEventListener('click', () => {
            const imageUrl = img.dataset.imageUrl;
            const altText = img.alt;
            const date = img.dataset.date || '';
            const description = img.dataset.description || '';
            openImageModal(imageUrl, altText, date, description);
        });
    });
    
    startAutoSlide2();
    
    const slider = document.querySelector('#scene3 .image-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide2);
        slider.addEventListener('mouseleave', startAutoSlide2);
    }
}

/**
 * 첫 번째 슬라이더 슬라이드 이동
 * @param {number} slideIndex - 이동할 슬라이드 인덱스
 */
function goToSlide(slideIndex) {
    const track = document.querySelector('#scene2 .slider-track');
    const dots = document.querySelectorAll('#sliderDots .dot');
    const totalSlides = 4;
    
    if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    } else if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    
    currentSlide = slideIndex;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

/**
 * 두 번째 슬라이더 슬라이드 이동
 * @param {number} slideIndex - 이동할 슬라이드 인덱스
 */
function goToSlide2(slideIndex) {
    const track = document.querySelector('#scene3 .slider-track');
    const dots = document.querySelectorAll('#sliderDots2 .dot');
    const totalSlides = 4;
    
    if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    } else if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    
    currentSlide2 = slideIndex;
    track.style.transform = `translateX(-${currentSlide2 * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide2);
    });
}

/**
 * 첫 번째 자동 슬라이드 시작
 */
function startAutoSlide() {
    slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 3000);
}

/**
 * 첫 번째 자동 슬라이드 정지
 */
function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

/**
 * 두 번째 자동 슬라이드 시작
 */
function startAutoSlide2() {
    slideInterval2 = setInterval(() => {
        goToSlide2(currentSlide2 + 1);
    }, 3000);
}

/**
 * 두 번째 자동 슬라이드 정지
 */
function stopAutoSlide2() {
    if (slideInterval2) {
        clearInterval(slideInterval2);
    }
}

// ============================================================================
// 소셜 링크 함수
// ============================================================================

/**
 * 카카오톡 열기 함수
 */
function openKakaoTalk() {
    const kakaoChatUrl = 'https://open.kakao.com/o/채팅방ID';
    
    if (isMobileDevice()) {
        const kakaoAppUrl = 'kakaotalk://open';
        window.location.href = kakaoAppUrl;
        
        setTimeout(() => {
            window.location.href = kakaoChatUrl;
        }, 2000);
    } else {
        window.open(kakaoChatUrl, '_blank');
    }
    
    alert('카카오톡이 열립니다. 블로그 관련 문의사항이 있으시면 언제든 연락주세요!');
}

/**
 * 인스타그램 열기 함수
 */
function openInstagram() {
    const instagramUrl = 'https://www.instagram.com/hyojeong_blog/';
    
    if (isMobileDevice()) {
        const instagramAppUrl = 'instagram://user?username=hyojeong_blog';
        window.location.href = instagramAppUrl;
        
        setTimeout(() => {
            window.location.href = instagramUrl;
        }, 2000);
    } else {
        window.open(instagramUrl, '_blank');
    }
    
    alert('인스타그램이 열립니다. @hyojeong_blog 프로필을 확인해보세요!');
}

/**
 * 유튜브 열기 함수
 */
function openYouTube() {
    const youtubeUrl = 'https://www.youtube.com/@hyojeong_blog';
    
    if (isMobileDevice()) {
        const youtubeAppUrl = 'youtube://channel/hyojeong_blog';
        window.location.href = youtubeAppUrl;
        
        setTimeout(() => {
            window.location.href = youtubeUrl;
        }, 2000);
    } else {
        window.open(youtubeUrl, '_blank');
    }
    
    alert('유튜브가 열립니다. 효정의 블로그 채널을 확인해보세요!');
}

/**
 * 모바일 디바이스 확인 함수
 * @returns {boolean} 모바일 디바이스 여부
 */
function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ============================================================================
// 이벤트 핸들러
// ============================================================================

/**
 * 스크롤 이벤트 핸들러
 */
function handleScroll() {
    if (isTransitioning) return;
    
    const scrollTop = getScrollTop();
    const windowHeight = window.innerHeight;
    
    // 현재 씬 번호 계산
    const targetScene = Math.round(scrollTop / windowHeight) + 1;
    const clampedTargetScene = Math.max(1, Math.min(5, targetScene));
    
    // 씬이 변경되었을 때만 전환
    if (clampedTargetScene !== currentScene) {
        changeScene(clampedTargetScene);
    }
}


// ============================================================================
// 초기화 함수
// ============================================================================

/**
 * 씬 이동 버튼 이벤트 리스너 설정
 */
function setupSceneButtons() {
    const sceneButtons = [
        { id: 'scene2Btn', targetScene: 2 },
        { id: 'scene3Btn', targetScene: 3 },
        { id: 'scene4Btn', targetScene: 4 },
        { id: 'scene5Btn', targetScene: 5 }
    ];
    
    sceneButtons.forEach(({ id, targetScene }) => {
        const button = getElement(id);
        if (button) {
            button.addEventListener('click', () => changeScene(targetScene));
        }
    });
}

/**
 * 모달 이벤트 리스너 설정
 */
function setupModalListeners() {
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideoModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeVideoModal();
            }
        });
    }
    
    // 이미지 모달 이벤트 리스너 설정
    if (imageCloseBtn) {
        imageCloseBtn.addEventListener('click', closeImageModal);
    }
    
    if (imageModalOverlay) {
        imageModalOverlay.addEventListener('click', (event) => {
            if (event.target === imageModalOverlay) {
                closeImageModal();
            }
        });
    }
}

/**
 * 소셜 링크 버튼 이벤트 리스너 설정
 */
function setupSocialButtons() {
    const socialButtons = [
        { id: 'kakaoBtn', handler: openKakaoTalk },
        { id: 'instagramBtn', handler: openInstagram },
        { id: 'youtubeBtn', handler: openYouTube }
    ];
    
    socialButtons.forEach(({ id, handler }) => {
        const button = getElement(id);
        if (button) {
            button.addEventListener('click', handler);
        }
    });
}

/**
 * 스크롤 이벤트 리스너 설정
 */
function setupScrollListeners() {
    window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * 애플리케이션 초기화
 */
function initializeApp() {
    // DOM 요소 초기화
    gridContainer = getElement('gridContainer');
    modalOverlay = getElement('modalOverlay');
    videoContainer = getElement('videoContainer');
    closeBtn = getElement('closeBtn');
    
    // 이미지 모달 DOM 요소 초기화
    imageModalOverlay = getElement('imageModalOverlay');
    imageContainer = getElement('imageContainer');
    imageCloseBtn = getElement('imageCloseBtn');
    
    // 페이지 로드 시 스크롤 위치에 따라 현재 씬 설정
    setCurrentSceneFromScroll();
    
    // 기본 설정
    updateBackgroundImages();
    createVideoGrid();
    
    // 이벤트 리스너 설정
    setupSceneButtons();
    setupModalListeners();
    setupSocialButtons();
    setupScrollListeners();
    
    // 이미지 슬라이더 초기화
    initializeImageSlider();
    initializeImageSlider2();
    
    // 페이지 로드 완료 후 스크롤 위치 재확인
    setTimeout(() => {
        setCurrentSceneFromScroll();
    }, 100);
}

/**
 * 첫 번째 씬으로 초기화하는 함수
 */
function resetToFirstScene() {
    currentScene = 1;
    window.scrollTo({
        top: 0,
        behavior: 'auto'
    });
}

/**
 * 현재 스크롤 위치에 따라 씬을 설정하는 함수
 */
function setCurrentSceneFromScroll() {
    const scrollTop = getScrollTop();
    const windowHeight = window.innerHeight;
    
    // 스크롤 위치에 따라 현재 씬 계산
    const sceneNumber = Math.floor(scrollTop / windowHeight) + 1;
    currentScene = Math.max(1, Math.min(5, sceneNumber));
}

// ============================================================================
// 애플리케이션 시작
// ============================================================================

document.addEventListener('DOMContentLoaded', initializeApp);

// 새로고침 시 첫 번째 씬으로 초기화
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('shouldResetToFirstScene', 'true');
});

// 페이지 로드 시 새로고침 여부 확인
window.addEventListener('load', () => {
    if (sessionStorage.getItem('shouldResetToFirstScene') === 'true') {
        resetToFirstScene();
        sessionStorage.removeItem('shouldResetToFirstScene');
    }
});

 
 
 
 
 
 
 
 
 