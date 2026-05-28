# Git Commit Convention

## Format

```bash
<type>: <title>

- 상세 내용 1
- 상세 내용 2
```

## Types

### feat

새로운 기능 추가

```bash
feat: 로그인 기능 추가

- JWT 기반 인증 로직 구현
- 로그인 상태 전역 관리 추가
```

### fix

버그 수정

```bash
fix: 모바일 환경 쿠키 저장 문제 수정

- SameSite 설정 수정
- Safari 환경 대응 로직 추가
```

### style

코드 스타일 및 UI 수정 (기능 변경 없음)

```bash
style: 버튼 스타일 개선

- Tailwind 클래스 정리
- hover 애니메이션 추가
```

### refactor

기능 변화 없이 코드 구조 개선

```bash
refactor: API 요청 로직 분리

- fetch 로직 custom hook으로 이동
- 중복 코드 제거
```

### docs

문서 수정

```bash
docs: README 실행 방법 수정

- Docker 실행 명령어 추가
- 환경 변수 설명 보완
```

### chore

빌드, 설정, 패키지 등 기타 작업

```bash
chore: eslint 설정 추가

- airbnb config 적용
- prettier 연동
```

### test

테스트 코드 추가 및 수정

```bash
test: 회원가입 API 테스트 추가

- 정상 요청 테스트 작성
- 예외 케이스 테스트 추가
```

# Pull Request Convention

## PR Title Format

```bash
[type] 작업 내용 요약
```

### Example

```bash
[feat] 로그인 기능 구현
[fix] 모바일 Safari 쿠키 문제 수정
[refactor] API 요청 구조 개선
```

---

## PR Description Template

```md
## Overview

- 작업 목적 및 변경 사항 설명

## Changes

- 변경 사항 1
- 변경 사항 2
- 변경 사항 3

## Screenshot

- UI 변경 사항이 있다면 첨부

## Test

- [ ] 로컬 실행 확인
- [ ] 빌드 성공
- [ ] 기존 기능 동작 확인

## Related Issues

- close #이슈번호
```

---

## PR Rules

- PR은 하나의 목적만 가지도록 작성
- 불필요한 코드 변경 포함 금지
- UI 변경 시 스크린샷 첨부
- 기능 변경 시 테스트 결과 포함
- 리뷰 반영 후 squash merge 사용
- merge 전 build/test 반드시 확인

---

## Recommended PR Types

- feat : 새로운 기능 추가
- fix : 버그 수정
- refactor : 리팩토링
- style : 스타일 수정
- docs : 문서 수정
- chore : 설정 및 기타 작업
- test : 테스트 코드 작업
