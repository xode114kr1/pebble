# 암장 지점 관리 작업 계획

## 1. 암장 생성 기능

### step1 `feat: 암장 지점 스키마 추가`

- 지점 테이블 스키마 확인/추가
- 브랜드와 지점 관계 설정
- 지점명, 위치, 생성/수정 시간 컬럼 정의

### step2 `chore: 암장 지점 마이그레이션 추가`

- Prisma migration 생성
- FK/제약 조건 확인
- Prisma client generate 확인

### step3 `feat: 암장 지점 생성 API 추가`

- `POST /api/gyms` 또는 `POST /api/gym-branches` 추가
- 브랜드 ID, 지점명, 위치 입력 검증
- 존재하지 않는 브랜드 방어
- 중복 지점명 정책 처리

### step4 `feat: 암장 지점 생성 UI 연결`

- 지점 등록 모달 입력 상태 연결
- 브랜드 선택 연결
- 생성 API 호출
- 성공 시 목록 갱신
- 에러/등록 중 상태 처리

### step5 `fix: 암장 지점 생성 입력 검증 추가`

- 지점명 공백 방지
- 위치 공백 방지
- 브랜드 미선택 방지
- 입력 변경 시 에러 초기화

## 2. 암장 검색 기능

### step1 `feat: 암장 지점 조회 API 추가`

- 지점 목록 조회 API 추가
- 브랜드 정보 포함 조회
- 등록일 기준 정렬
- 필요 시 페이지네이션 준비

### step2 `feat: 암장 지점 목록 DB 연결`

- `/admin/gyms`에서 dummy data 제거
- 실제 API 또는 server component Prisma 조회로 목록 연결
- 브랜드명, 지점명, 위치 표시 유지

### step3 `feat: 암장 지점 검색 기능 추가`

- 검색어 query param 처리
- 지점명/브랜드명/위치 검색 조건 추가
- 검색 input URL 연동
- 검색어 유지 처리

### step4 `fix: 암장 지점 검색 빈 상태 정리`

- 전체 데이터 없음 메시지
- 검색 결과 없음 메시지
- 검색어 초기화 흐름 정리

## 3. 암장 수정 기능

### step1 `refactor: 암장 지점 폼 모달 공통화`

- 생성 전용 모달을 생성/수정 공용 폼 모달로 변경
- `mode: create | edit`
- initial data 주입 구조 추가
- 기존 생성 동작 유지

### step2 `feat: 암장 지점 상세 모달 조회 연결`

- 지점 리스트 아이템 클릭 이벤트 추가
- 선택한 지점 상태 관리
- 클릭 시 수정 모드 모달 open
- 기존 브랜드/지점명/위치 값 초기화

### step3 `feat: 암장 지점 수정 API 추가`

- `PATCH /api/gyms/[id]` 또는 `PATCH /api/gym-branches/[id]`
- 브랜드 ID, 지점명, 위치 수정
- 존재하지 않는 지점/브랜드 검증
- 중복 정책 처리

### step4 `feat: 암장 지점 수정 UI 연결`

- 수정 모드 submit 시 PATCH API 호출
- 성공 시 목록 갱신
- 모달 닫기 및 상태 초기화
- 수정 중 버튼 disabled/문구 처리
- API 에러 메시지 표시

### step5 `fix: 암장 지점 폼 상태 동기화 정리`

- 생성/수정 모드 전환 시 이전 값 제거
- initial data 정확히 반영
- 제출 중 닫기/중복 제출 방지

### step6 `chore: 암장 지점 관리 기능 검증`

- `npm run lint`
- `npm run build`
- 지점 생성 확인
- 지점 검색 확인
- 지점 수정 확인
- 브랜드 선택/검증 확인
