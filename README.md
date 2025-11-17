# OZ StudyHub Admin

> OZ 코딩스쿨 Externship 3기 · 프론트엔드 4팀  
> 스터디 서비스 운영을 위한 관리자(Admin) 대시보드 프로젝트

---

## 🔗 Links

- 프론트엔드 배포: https://admin.ozcoding.site/
- GitHub Repository: https://github.com/OZ-Coding-School/oz_externship_fe_03_team4
- 팀 포트폴리오 페이지 : https://ozex3-fe4.vercel.app/

---

## 📌 Project Overview

**OZ StudyHub Admin**은 스터디 모집/관리 서비스를 운영하는  
관리자를 위한 **백오피스 대시보드**입니다.

- 회원 가입/탈퇴 현황을 한눈에 보는 대시보드
- 스터디 구인 공고 관리 및 지원자 관리
- 스터디 그룹(진행 중/완료) 상태 관리
- 강의(강좌) 목록 및 메타데이터 관리
- 공통 UI 컴포넌트 기반의 일관된 관리자 화면

---

## ✨ Main Features

- **로그인 & 인증**
  - Access / Refresh Token 기반 관리자 인증
  - 비인가 사용자의 관리자 페이지 접근 차단

- **회원 관리**
  - 회원 목록 조회, 상세 정보 확인
  - 상태 변경(활성/비활성), 탈퇴/복구 처리

- **스터디 공고 · 지원 관리**
  - 공고 목록/상세 조회
  - 태그/정렬/검색 필터
  - 지원 내역 조회 및 상태 관리(대기/승인/거절)

- **스터디 그룹 관리**
  - 스터디 진행 상태(대기중/진행중/완료) 필터
  - 검색/정렬과 상태 필터가 함께 동작하도록 설계

- **대시보드**
  - 가입/탈퇴 트렌드 차트
  - 탈퇴 사유 분포, 회원 상태 통계 등 시각화

---

## 🛠 Tech Stack

- **Frontend**
  - React
  - TypeScript
  - Vite
  - TailwindCSS
  - TanStack Query (React Query)
  - Lucide React
- **Etc**
  - Axios + 인터셉터 (토큰/에러 공통 처리)
  - MSW (로컬 개발용 Mock API)
  - Recharts (차트 시각화)

---

## 🚀 Getting Started

```bash
# 1. Install
npm install

# 2. Run dev server
npm run dev

# 3. Build
npm run build
```
