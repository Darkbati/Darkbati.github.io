# 오케스트라 음악 갤러리 웹사이트

오케스트라 음악 영상들을 바둑판식으로 배열하고, 클릭 시 중앙에서 재생하는 반응형 웹사이트입니다.

## 주요 기능

- 🎼 **오케스트라 음악 갤러리**: 베토벤, 모차르트, 차이콥스키, 바흐의 작품
- 🎬 **바둑판 레이아웃**: 유튜브 영상들이 그리드 형태로 정렬
- 🎯 **클릭 재생**: 영상 클릭 시 모달에서 중앙 재생
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- ⌨️ **키보드 지원**: ESC 키로 모달 닫기
- 🎨 **3단계 씬**: 인트로 → 갤러리 → 인사말
- 💬 **카카오톡 연동**: 문의하기 기능
- 🎭 **오케스트라 테마**: 배경 이미지와 음악 통일

## 사용법

1. **첫 번째 씬**: "음악의 세계로 떠나세요" 인트로
2. **두 번째 씬**: 오케스트라 영상 갤러리 (클릭하여 재생)
3. **세 번째 씬**: "감사합니다" 인사말 및 카카오톡 문의

## GitHub Pages 배포

이 프로젝트는 GitHub Pages에서 바로 배포할 수 있습니다:

1. GitHub에 저장소 생성
2. 파일 업로드
3. Settings → Pages → Source: main branch 선택
4. 배포 완료 후 `https://사용자명.github.io/저장소명` 접속

## 파일 구조

```
violin/
├── index.html      # 메인 HTML 파일 (3개 씬)
├── styles.css      # CSS 스타일시트 (반응형)
├── script.js       # JavaScript 기능 (스크롤, 모달, 카카오톡)
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
const scene1Backgrounds = ['YOUR_IMAGE_URL'];
const scene2Backgrounds = ['YOUR_IMAGE_URL'];
const scene3Backgrounds = ['YOUR_IMAGE_URL'];
```

### 카카오톡 채팅방 연결
`script.js` 파일의 카카오톡 URL 수정:

```javascript
const kakaoChatUrl = 'https://open.kakao.com/o/실제채팅방ID';
```

## 기술 스택

- **HTML5**: 시맨틱 마크업, 3단계 씬 구조
- **CSS3**: Grid Layout, Flexbox, 애니메이션, 반응형
- **JavaScript**: ES6+, DOM 조작, 스크롤 이벤트, 카카오톡 연동
- **YouTube Embed API**: 유튜브 영상 임베드

## 브라우저 지원

- Chrome (권장)
- Firefox
- Safari
- Edge
- 모바일 브라우저 (iOS Safari, Android Chrome)

## 라이선스

MIT License 