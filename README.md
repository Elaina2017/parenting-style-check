# SAiU 부모 양육스타일 검사

AI 개인화 분석이 포함된 양육스타일 검사 도구입니다.

## 📋 기능

- **25문항 Baumrind 양육스타일 검사**
  - 따뜻함, 규칙, 자율성, 일관성, 소통 차원 측정
  - 4가지 양육 유형 분류 (권위적/권위주의적/허용적/방임적)

- **✨ AI 개인화 분석**
  - Claude API를 활용한 완전 맞춤형 심층해설
  - 응답 패턴 기반 구체적 조언
  - 전문가 톤의 따뜻한 피드백

- **따뜻한 결과 리포트**
  - 2차원 그래프 시각화
  - 세부 차원별 점수
  - 실용적인 양육 팁

## 🚀 배포 가이드

### 1. GitHub에 업로드

1. GitHub에서 새 repository 생성: `parenting-style-check`
2. 이 폴더의 모든 파일 업로드
3. Commit

### 2. Vercel 배포

1. [vercel.com](https://vercel.com) 로그인
2. **Add New Project** → GitHub repository 선택
3. **Deploy** 클릭
4. 완료! (예: parenting-style-check.vercel.app)

### 3. 서브도메인 연결 (선택사항)

**예: parents.saiu.co.kr**

1. Vercel → Settings → Domains
2. `parents.saiu.co.kr` 입력
3. DNS 설정:
   - Type: `CNAME`
   - Name: `parents`
   - Value: `cname.vercel-dns.com`
4. 5-30분 대기

## 🎨 일러스트 추가 방법

### 현재 일러스트 위치

**상단 배경 이미지**
- 파일: `src/App.jsx` 378번째 줄 근처
- 크기: 500x500px 권장
- 형식: PNG (투명 배경)

### 추가 방법

1. `public/images/` 폴더 생성
2. 일러스트 파일 업로드
3. 코드 수정:

```jsx
// 이 부분 찾기
<div className="absolute top-0 right-0 w-48 h-48 opacity-10">
  <div className="w-full h-full bg-white rounded-full"></div>
</div>

// 이렇게 변경
<div className="absolute top-0 right-0 w-48 h-48 opacity-10">
  <img 
    src="/images/parent-child.png" 
    className="w-full h-full object-contain" 
    alt="" 
  />
</div>
```

4. GitHub에 push → Vercel 자동 재배포

## 💡 로컬 개발

```bash
npm install
npm run dev
```

## 🔧 기술 스택

- React 18
- Vite
- Tailwind CSS
- Lucide React (아이콘)
- Claude API (AI 분석)

## 📝 참고

- AI 분석 기능은 Claude API를 사용하며, Artifact 환경에서 자동으로 API 키가 처리됩니다
- 검사 결과는 저장되지 않으며, 브라우저 세션에만 유지됩니다

---

**Made with ❤️ by SAiU Insight Lab**
