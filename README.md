# 리액트 칸반 보드 프로젝트

이 프로젝트는 **Create React App**을 기반으로 생성된 칸반 보드 애플리케이션입니다.  
사용자는 작업을 추가, 삭제, 이동(드래그 앤 드롭)을 통해 작업 상태를 관리할 수 있으며,  
직관적인 인터페이스로 프로젝트 관리를 편리하게 할 수 있습니다.

---

## 🛠 사용된 기술 스택

- **React**: UI 라이브러리
- **TypeScript**: 정적 타입을 지원하는 JavaScript
- **Styled-Components**: CSS-in-JS 방식의 스타일링 도구
- **Cypress**: E2E(End-to-End) 테스트 도구
- **SWR**: React를 위한 데이터 패칭 라이브러리

---

## ✨ 주요 기능

1. **작업 추가** - 팝업을 통해 새로운 작업을 추가할 수 있습니다.
2. **작업 삭제** - 각 작업 우측의 삭제 버튼으로 제거할 수 있습니다.
3. **드래그 앤 드롭** - 작업을 다른 상태("To Do", "In Progress", "Done")로 이동할 수 있습니다.
4. **상태 관리** - 작업 상태에 따라 UI가 자동으로 갱신됩니다.

---

## 🚀 설치 및 실행 방법

### 1. 프로젝트 클론

```
git clone https://github.com/your-repo/react-kanban-board.git
cd react-kanban-board
```

### 2. 의존성 설치

```
npm install
```

### 3. 개발 서버 실행

```
npm start
애플리케이션은 http://localhost:3000 에서 확인할 수 있습니다.
```

### 4. E2E 테스트 실행 (Cypress)

GUI 실행

```
npm run cypress:open
```

CLI 실행

```
npm run cypress:run
```

---

## 📁 디렉토리 구조

```
react-kanban-board/
├── cypress/                    # Cypress 테스트 관련 파일
│   ├── e2e/                    # E2E 테스트 파일
│   │   └── test.cy.js          # Cypress 테스트 코드
│   ├── fixtures/               # 테스트에 사용할 더미 데이터
│   └── support/                # 공통 설정 및 커스텀 명령어
│       ├── commands.js         # Cypress 커스텀 명령어
│       └── e2e.js              # Cypress 설정 파일
├── public/                     # 정적 파일
│   ├── index.html              # HTML 템플릿
│   └── favicon.ico             # 파비콘
├── src/                        # 소스 코드
│   ├── components/             # UI 컴포넌트
│   │   ├── Board.tsx           # 칸반 보드 컴포넌트
│   │   ├── Card.tsx            # 카드 컴포넌트
│   │   ├── Footer.tsx          # 푸터 컴포넌트
│   │   ├── Popup.tsx           # 팝업 컴포넌트
│   │   └── Title.tsx           # 제목 컴포넌트
│   ├── hooks/                  # 커스텀 훅
│   │   ├── useKanban.ts        # 칸반 보드 상태 관리 훅
│   │   └── useDragAndDrop.ts   # 드래그 앤 드롭 훅
│   ├── interfaces/             # TypeScript 인터페이스
│   │   └── kanban.interface.ts # 칸반 보드 관련 인터페이스
│   ├── App.tsx                 # 메인 컴포넌트
│   ├── index.tsx               # 엔트리 포인트
│   └── react-app-env.d.ts      # React 환경 타입 정의
├── .gitignore                  # Git에서 제외할 파일 목록
├── package.json                # 프로젝트 설정 파일
├── tsconfig.json               # TypeScript 설정 파일
├── README.md                   # 프로젝트 설명 파일
└── package-lock.json           # 의존성 잠금 파일
```

감사합니다 :)