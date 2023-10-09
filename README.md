# [NEXTJS-MARKET]
[Demo](https://nextjs-market-zeta.vercel.app)

## Introduction

Nextjs@13 학습을 목적으로 진행한 상품 플랫폼 프로젝트 입니다.
<br />

주요 기능은 아래와 같습니다.
- 회원가입 및 로그인
  - NextAuth 사용
  - 로그인 성공 이후 사용자 session 생성
- 상품 업로드 및 조회
- 상품 좋아요
- 채팅

## Screen
<table align="center">
  <thead>
    <tr margin-bottom=3px>
      <td width="300" align="center">
        <b>회원가입</b>
      </td>
      <td width="300" align="center">
        <b>로그인</b>
      </td>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td width="300" align="center">
        <img src="https://github.com/HyungJun-Yoo/nextjs-market/assets/70789958/92226fba-427d-489d-bbc6-4956e0cecaaa.gif" width="350">
      </td>
      <td width="300" align="center">
        <img src="https://github.com/HyungJun-Yoo/nextjs-market/assets/70789958/4699bb58-8a1e-4e7d-ab20-fcb4c9d87b8e.gif" width="350">
      </td>
    </tr>
  </tbody>

  <thead>
    <tr margin-bottom=3px>
      <td width="300" align="center">
        <b>상품 업로드</b>
      </td>
      <td width="300" align="center">
        <b>상품 조회</b>
      </td>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td width="300" align="center">
        <img src="https://github.com/HyungJun-Yoo/nextjs-market/assets/70789958/f92bf8b8-ce93-44ed-a005-c422d0029997.gif" width="350">
      </td>
      <td width="300" align="center">
        <img src="https://github.com/HyungJun-Yoo/nextjs-market/assets/70789958/f963b7d0-dd5f-4054-9971-7bfa3ea07025.gif" width="350">
      </td>
    </tr>
  </tbody>

  <thead>
    <tr margin-bottom=3px>
      <td width="300" align="center">
        <b>상품 좋아요</b>
      </td>
      <td width="300" align="center">
        <b>채팅</b>
      </td>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td width="300" align="center">
        <img src="https://github.com/HyungJun-Yoo/nextjs-market/assets/70789958/f9b31153-db96-42a5-9ebc-cad77f43352f.gif" width="350">
      </td>
      <td width="300" align="center">
        <img src="https://github.com/HyungJun-Yoo/nextjs-market/assets/70789958/10cfd701-6ff0-414c-ba91-1a3187f08aec.gif" width="350">
      </td>
    </tr>
  </tbody>
</table>

<br><br>

## Skill

- TypeScript
  - JavaScript에 정적 타입 기능을 추가하여 효율적인 개발 환경을 제공
- Next.js@13
  - React 기반의 서버 사이드 렌더링(SSR) 및 정적 사이트 생성(SSG)을 지원하는 웹 프레임워크
  - Next.js@13에서 app 디렉토리 구조로 변경
- Firestore
  - 회원, 상품, 채팅 데이터베이스
  - 채팅 실시간 업데이트 수신
- NextAuth
  - Next.js로 구현되어 있는 페이지에서 간편하게 인증 기능을 추가할 수 있는 라이브러리
- next-cloudinary
  - 이미지 및 동영상을 전송하고 업로드할 수 있는 라이브러리
  - 상품 이미지 업로드에서 사용
- react-kakao-maps-sdk
  - 카카오 맵 API를 React에서 쉽게 사용할 수 있도록 도와주는 라이브러리
### Etc

- react-toastify (알림 라이브러리)
  - 좋아요, 취소 알림 기능에서 사용
- dayjs (날짜/시간 라이브러리)
  - 날짜 계산에서 사용
- @lucasmogari/react-pagination (페이지네이션 라이브러리)
- react-loader-spinner (로딩 스피너 컴포넌트 라이브러리)
