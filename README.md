# 효정의 블로그

일상의 소소한 이야기와 생각을 담은 개인 블로그입니다. 음악, 여행, 독서, 그리고 삶의 순간들을 기록하는 공간입니다.

## 주요 기능

- 📝 **최신 포스트**: 최근에 작성한 블로그 포스트들을 확인할 수 있습니다
- 📚 **카테고리**: 일상, 여행, 독서, 음악 등 주제별로 분류된 포스트들
- 🎬 **미디어 갤러리**: 블로그와 관련된 영상과 이미지들을 바둑판 형태로 정렬
- 🎯 **클릭 재생**: 영상 클릭 시 모달에서 중앙 재생
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- ⌨️ **키보드 지원**: ESC 키로 모달 닫기
- 🎨 **5단계 씬**: 인트로 → 최신 포스트 → 카테고리 → 미디어 갤러리 → 연락처
- 💬 **소셜 미디어 연동**: 카카오톡, 인스타그램, 유튜브 연동
- 🎭 **블로그 테마**: 아름다운 배경 이미지와 일관된 디자인

## 사용법

1. **첫 번째 씬**: "효정의 블로그" 인트로 및 네비게이션
2. **두 번째 씬**: 최신 블로그 포스트 슬라이더
3. **세 번째 씬**: 카테고리별 포스트 분류
4. **네 번째 씬**: 미디어 갤러리 (클릭하여 재생)
5. **다섯 번째 씬**: 연락처 정보 및 소셜 미디어 링크

## GitHub Pages 배포

이 프로젝트는 GitHub Pages에서 바로 배포할 수 있습니다:

1. GitHub에 저장소 생성
2. 파일 업로드
3. Settings → Pages → Source: main branch 선택
4. 배포 완료 후 `https://사용자명.github.io/저장소명` 접속

## 파일 구조

```
violin.github.io/
├── index.html      # 메인 HTML 파일 (5개 씬)
├── styles.css      # CSS 스타일시트 (반응형)
├── script.js       # JavaScript 기능 (스크롤, 모달, 소셜 미디어)
└── README.md       # 프로젝트 설명
```

## 커스터마이징

### 영상 추가/수정
`script.js` 파일의 `videos` 배열을 수정:

```javascript
const videos = [
    {
        id: 'YOUR_YOUTUBE_VIDEO_ID',
        title: '영상 제목',
        description: '영상 설명'
    }
];
```

### 배경 이미지 변경
`script.js` 파일의 배경 이미지 URL 수정:

```javascript
const backgroundImages = {
    scene1: ['YOUR_IMAGE_URL'],
    scene2: ['YOUR_IMAGE_URL'],
    scene3: ['YOUR_IMAGE_URL'],
    scene4: ['YOUR_IMAGE_URL'],
    scene5: ['YOUR_IMAGE_URL']
};
```

### 소셜 미디어 링크 수정
`script.js` 파일의 소셜 미디어 URL 수정:

```javascript
// 카카오톡
const kakaoChatUrl = 'https://open.kakao.com/o/실제채팅방ID';

// 인스타그램
const instagramUrl = 'https://www.instagram.com/your_username/';

// 유튜브
const youtubeUrl = 'https://www.youtube.com/@your_channel';
```

### 블로그 포스트 슬라이더 수정
`index.html` 파일의 슬라이더 이미지와 설명을 수정:

```html
<div class="slide">
    <img src="YOUR_IMAGE_URL" alt="포스트 제목" class="slide-image" 
         data-image-url="YOUR_LARGE_IMAGE_URL" 
         data-date="2024.03.15" 
         data-description="포스트 설명">
</div>
```

## 기술 스택

- **HTML5**: 시맨틱 마크업, 5단계 씬 구조
- **CSS3**: Grid Layout, Flexbox, 애니메이션, 반응형 디자인
- **JavaScript**: ES6+, DOM 조작, 스크롤 이벤트, 소셜 미디어 연동
- **YouTube Embed API**: 유튜브 영상 임베드

## 블로그 기능

### 포스트 관리
- 최신 포스트 슬라이더
- 카테고리별 분류
- 이미지 갤러리
- 영상 콘텐츠

### 사용자 경험
- 부드러운 스크롤 전환
- 반응형 디자인
- 모바일 최적화
- 키보드 접근성

### 소셜 미디어
- 카카오톡 문의
- 인스타그램 연동
- 유튜브 채널 연결

## 브라우저 지원

- Chrome (권장)
- Firefox
- Safari
- Edge
- 모바일 브라우저 (iOS Safari, Android Chrome)

## 라이선스

MIT License

## 연락처

- **이메일**: hyojeong@example.com
- **블로그**: https://hyojeong.github.io
- **GitHub**: https://github.com/hyojeong
- **위치**: 서울특별시 강남구 