# 《복제의 문명》 프로젝트 PRD

- 버전: 1.0
- 상태: 실행 기준안
- 작성 기준: `inbox/` 내 PRD, Technical Architecture, 구현 문서 초안, 구현 답변 통합
- 대상: 제품·콘텐츠·디자인·개발·편집 팀

## 1. 제품 정의

《복제의 문명》은 판화를 출발점으로 예술, 과학, 재료, 언어, 종교, 사회, 산업, 현대 패터닝 기술을 연결하는 지식 탐험 웹사이트다.

이 제품은 판화 백과사전이 아니다. 사용자가 하나의 작품이나 기술에서 출발해 다음 질문을 따라 다른 지식 노드로 이동하도록 만든다.

> 무엇인가? → 어떻게 만드는가? → 왜 작동하는가? → 이름은 어디서 왔는가? → 왜 그 시대에 등장했는가? → 무엇을 변화시켰는가? → 오늘날 무엇과 연결되는가?

### 핵심 원칙

- 질문에서 시작해 정의보다 탐험을 우선한다.
- 예술에서 과학, 역사, 사회, 기술로 자연스럽게 이동시킨다.
- 과정의 암기보다 작동 원리를 이해시킨다.
- 전문용어의 어원과 역사적 필요를 함께 설명한다.
- 기능은 고정하고 콘텐츠 노드와 관계의 밀도로 확장한다.
- 역사적 직접 계보(`A → B`)와 개념적 유사성(`A ≈ B`)을 구분한다.

## 2. 문제와 기회

현재 인쇄·판화 지식은 작품, 기법, 재료, 과학 원리, 산업 기술이 서로 분리된 형태로 제공되는 경우가 많다. 사용자는 개별 정보를 얻더라도 다음 질문으로 이동할 경로를 직접 찾아야 한다.

이 제품은 편집된 연결 구조와 짧은 보충 탐색(Side-track)을 제공해, 한 콘텐츠를 읽는 행위를 여러 분야를 이해하는 탐험으로 바꾼다.

## 3. 대상 사용자

### 1차 사용자

- 판화와 미술사를 흥미롭게 배우려는 일반 독자
- 작품을 계기로 과학·기술 원리까지 이해하려는 학습자
- 전시, 교육, 연구를 위해 신뢰할 수 있는 연결 자료를 찾는 사용자

### 운영 사용자

- 편집자: 콘텐츠, 관계, 출처, 이미지 권리를 관리한다.
- 개발자: 고정된 페이지 템플릿과 CMS 모델을 운영한다.
- 디자이너: 읽기 흐름, 도식, Side-track 경험을 설계한다.

## 4. MVP 목표와 비목표

### 목표

1. 사용자가 홈페이지의 두 진입 경로 중 하나로 탐험을 시작한다.
2. 작품·기술·이야기·과학 개념을 연결해 최소 5개의 고유 Knowledge Node를 방문할 수 있다.
3. 역사적 관계와 개념적 관계를 오해 없이 구분한다.
4. 편집자가 새 콘텐츠를 추가할 때 새 React 페이지 컴포넌트를 만들 필요가 없다.
5. 콘텐츠의 출처와 이미지 권리 정보를 추적할 수 있다.

### 비목표

- 모든 판화 기법을 수록하는 종합 백과사전
- 사용자 계정, 댓글, 좋아요, 개인화 추천
- MVP 단계의 RAG, Vector DB, 생성형 답변
- 임의의 인터랙티브 컴포넌트를 CMS에서 실행하는 구조
- 콘텐츠 추가를 위한 지속적인 기능·메뉴 확장

## 5. MVP 범위

### 핵심 진입 경로

#### 시간을 따라가기

`목판 → 에칭 → 석판 → 빛 → 패터닝`

#### 물건에서 시작하기

MVP 대상은 `책`, `포스터`, `스마트폰`이다. 스마트폰 경로는 다음 역방향 탐험을 지원한다.

`스마트폰 → 회로 → 패턴 → 마스크 → 선택적 제거 → 과거 판화 방식 비교 → Patterning Bridge → PCB / Photolithography / Semiconductor`

### 콘텐츠 인벤토리

| 유형 | MVP 수량 | 내용 |
|---|---:|---|
| Entry | 3 | 시간 여정, 물건 여정 등 진입 허브 |
| Technique | 3 | 목판화, 에칭·아쿼틴트, 석판화 |
| Artwork | 3 | 호쿠사이, 고야, 툴루즈 로트렉 대표작 |
| Bridge | 1 | 새기는 것에서 패터닝으로 |
| Story | 최소 8 | 역사·재료·과학·사회 질문형 서사 |
| Term | 최소 15 | Lithography, Intaglio, Registration 등 |
| Science Concept | 6 | 접촉 전사, 잉크 점도, 부식, 표면화학, 감광성 등 |
| Static Diagram | 최소 5 | Figma에서 제작해 Sanity Asset으로 관리 |
| Interactive Diagram | 최대 2 | 물·잉크 상호작용, Registration 정렬 |

### 독립 URL을 갖는 페이지 타입

- `/entries/{slug}`
- `/techniques/{slug}`
- `/works/{slug}`
- `/stories/{slug}`
- `/terms/{slug}`
- `/science/{slug}`
- `/bridge/{slug}`
- `/search`

Material, Person, Place, Period, Source, Relation, Image Asset Record는 MVP에서 독립 페이지를 만들지 않고 다른 콘텐츠를 구조화한다.

## 6. 주요 사용자 경험

### 콘텐츠 페이지 공통 흐름

1. Hero에서 대상과 핵심 질문을 제시한다.
2. 짧은 설명으로 진입 장벽을 낮춘다.
3. 과정, 과학 원리, 역사적 맥락, 작품을 보여준다.
4. 관련 노드와 Recommended Path를 제공한다.
5. 사용자가 다음 지식 노드로 이동한다.

### 템플릿 요구사항

- Technique: 10초 설명, Process, Diagram, 관련 과학
- Artwork: 작품 이미지, 30초 설명, 제작 방식, 기법·재료·과학, 역사적 의미
- Story: 질문, 짧은 답, 서사, 근거·사례, 연결, 변화, 추가 읽기
- Science: 등장 이유, 역사적 맥락, 대표 작품, Side-track, 출처
- Entry: Intro Question, 연결 노드, 선택 경로
- Bridge: 판화에서 사진제판·PCB·포토리소그래피·반도체로의 연결과 관계 성격

### Side-track

- 짧은 보충 설명은 Popover, Drawer 또는 Bottom Sheet로 제공한다.
- 독립적으로 검색·공유할 가치가 있는 Term, Science, Story는 고유 URL로 이동한다.
- 탐험을 닫으면 사용자가 읽던 위치와 문맥으로 돌아와야 한다.

### 도식

- 일반 설명은 정적 도식으로 처리한다: `Figma → SVG → Sanity Asset → Generic Renderer`
- 상태 변화가 학습의 핵심인 경우에만 인터랙티브 도식을 사용한다.
- MVP 인터랙션은 `lithography-water-ink`, `registration-alignment`로 제한한다.

## 7. 콘텐츠 모델과 편집 규칙

### 엔티티 구분

- Material: 실제 재료·물질. 예: Gum Arabic, Limestone, Copper
- Term: 사람이 붙인 기법·공정·명칭. 예: Lithography, Aquatint
- Science Concept: 여러 재료와 기술에 걸친 일반 원리
- Story: 엔티티와 사건을 질문과 맥락으로 연결하는 서사

콘텐츠가 길어졌다는 이유만으로 엔티티 타입을 변경하지 않는다. 예를 들어 아라비아고무는 항상 Material이고, 질문형 설명은 Story로 만든다.

### 관계

- `relationNature`: `historical` 또는 `conceptual`
- `evidenceLevel`: `documented`, `probable`, `illustrative`
- 수치형 confidence는 사용하지 않는다.
- `historical` 관계는 출처를 강하게 요구한다.
- `source`와 `target`은 같을 수 없다.

### 편집 workflow

`Idea → Researching → Ready for Draft → Draft → Fact Check → Editorial Review → Visual Production → Ready → Published`

다음 표현은 강한 출처 확인 없이는 사용하지 않는다: 최초, 처음, 발명, 가장 오래된, ~때문에 생겼다, 직접 영향을 주었다, ~에서 발전했다, 유일하다.

### 이미지 권리

Public Domain, CC0, Open Access, 명시적 재사용 허용 자료를 우선한다. 작품 이미지마다 기관, 원문 페이지, 원본 이미지, IIIF, 라이선스, publicDomain, creditLine, accessionNumber, dateVerified를 기록한다.

## 8. 기술 및 운영 요구사항

### 기준 기술

- Next.js App Router, TypeScript strict
- React Server Components 우선
- Tailwind CSS + CSS Variables
- Sanity Studio + `next-sanity`
- pnpm, GitHub, Vercel
- PostHog + Vercel Analytics

### 데이터와 렌더링

- GitHub: 코드, 스키마, 쿼리, 컴포넌트, 테스트, 문서의 원천
- Sanity: 편집 콘텐츠, 관계, 메타데이터, 출처, 권리 정보의 원천
- Vercel: 배포 플랫폼이며 데이터 저장소로 사용하지 않는다.
- 콘텐츠 페이지는 Server Component와 정적 생성 + Sanity Live Content를 기본으로 한다.
- Client Component는 검색, Side-track, 인터랙티브 도식, 분석, Visual Editing에 한정한다.
- 페이지별 명시적 GROQ Query와 공통 최소 Projection을 사용하며 dereference 깊이는 최대 2로 권장한다.
- Draft Mode와 Visual Editing에서도 동일한 Query Layer를 유지한다.
- MVP는 custom webhook ISR을 기본축으로 삼지 않고 공식 `defineLive()`, `sanityFetch`, `SanityLive` 흐름을 사용한다.

### 검색

- MVP는 Sanity 기반 문자열 검색으로 시작한다.
- 검색 대상은 제목, 짧은 설명, 용어, 주요 콘텐츠 메타데이터다.
- RAG와 Vector DB는 사용하지 않는다.

### 접근성·반응형·품질

- 모바일과 데스크톱에서 콘텐츠, 도식, Side-track이 겹치지 않아야 한다.
- 키보드 탐색, 명확한 포커스 상태, 이미지 대체 텍스트, 긴 설명을 지원한다.
- 로딩, 404, 페이지 오류, 전역 오류 상태를 제공한다.
- Production에서 불완전한 콘텐츠가 노출되지 않도록 `status`와 게시 조건을 검사한다.

## 9. 측정 계획

### North Star Metric

`Exploration Depth`: 익명 세션에서 방문한 고유 Knowledge Node 수. 반복 방문은 한 번만 계산한다.

예: `Moulin Rouge → Lithography → Gum Arabic Story → Registration → Patterning` = 5

### 핵심 이벤트

- 노드 조회와 노드 간 이동
- Entry 경로 시작 및 단계 이동
- 검색 수행 및 검색 결과 클릭
- Related Content 클릭
- Side-track 열기·닫기
- 도메인 전환

### 특히 확인할 전환

`art → science`, `art → history`, `history → society`, `science → technology`, `printmaking → semiconductor`

MVP에서 실명·이메일 등 직접식별정보는 수집하지 않는다.

## 10. 단계별 실행계획

### Phase 0. Foundation

- GitHub 저장소와 Next.js 앱 구성
- 환경 변수, TypeScript strict, Tailwind, 이미지 설정
- Sanity 프로젝트 연결과 Studio 진입
- 기본 레이아웃, 오류·404 상태, CI 기반 마련

**완료 조건:** 로컬에서 앱과 Studio가 실행되고, 기본 배포 설정과 환경 변수 문서가 준비된다.

### Phase 1. Schema와 콘텐츠 운영

- 7개 페이지 타입 및 비페이지 엔티티 스키마 구현
- 관계, 출처, 이미지 권리, 게시 상태 검증
- 편집 workflow와 콘텐츠 입력 템플릿 정리
- MVP 콘텐츠를 Draft 상태로 입력

**완료 조건:** 대표 Technique, Artwork, Story 한 건씩이 Sanity에서 입력되고 검증된다.

### Phase 2. Vertical Slice

- 홈 → Technique → Science/Story → 관련 콘텐츠의 전체 흐름 구현
- 페이지별 Query, 공통 Card, Hero, Process, Source, Related Content 구현
- 정적 도식 1개와 인터랙티브 도식 1개 연결

**완료 조건:** CMS 데이터만 바꾸어도 새 콘텐츠가 기존 템플릿으로 렌더링되고, 새 페이지 컴포넌트가 필요 없다.

### Phase 3. 탐험 UX와 검색

- 두 Primary Entry Path 구현
- Side-track 열기·닫기와 스크롤 복원
- 검색 결과와 상세 페이지 연결
- Knowledge Tracking 및 핵심 분석 이벤트 연결

**완료 조건:** 한 세션에서 최소 5개 고유 노드를 탐색하고 원래 읽던 위치로 복귀할 수 있다.

### Phase 4. 검수와 출시

- 사실 확인, 출처, 이미지 권리 검수
- 모바일·데스크톱·키보드·오류 상태 QA
- Production 빌드 및 Vercel 배포
- PostHog 이벤트 수집 검증

**완료 조건:** MVP 인벤토리와 출시 체크리스트를 통과하고, 공개 상태가 아닌 콘텐츠가 외부에 노출되지 않는다.

## 11. MVP 완료 기준

- 두 진입 경로가 홈에서 명확히 작동한다.
- 7개 페이지 타입의 URL과 템플릿이 동작한다.
- MVP 인벤토리 수량을 충족한다.
- 역사적 관계와 개념적 관계가 UI와 콘텐츠에서 구분된다.
- 정적 도식 최소 5개와 인터랙티브 도식 최대 2개가 작동한다.
- 검색, Side-track, 스크롤 복원, 404·오류 상태가 동작한다.
- Sanity Draft Mode와 Visual Editing이 작동한다.
- 출처와 이미지 권리 기록이 모든 공개 작품에 존재한다.
- `Exploration Depth` 및 도메인 전환 이벤트가 익명으로 측정된다.
- Vercel Production 배포가 가능하고 TypeScript·빌드·핵심 QA가 통과한다.

## 12. 주요 리스크와 대응

| 리스크 | 대응 |
|---|---|
| 역사적 계보와 개념적 유사성의 혼동 | 관계 타입과 evidence level을 필수 필드로 관리하고 문구를 구분한다. |
| 콘텐츠가 템플릿보다 먼저 복잡해짐 | MVP 페이지 타입과 Projection 깊이를 고정하고 예외는 Story·Relation으로 흡수한다. |
| 이미지 권리 미확정 | 공개 전 권리 필드와 dateVerified를 필수 검수 항목으로 둔다. |
| 인터랙티브 기능 과다 | MVP 상호작용을 2개로 제한하고 새 기법은 정적 도식 우선으로 처리한다. |
| CMS 데이터 품질 저하 | status, 출처, 필수 관계, slug 검증과 Fact Check 단계를 둔다. |
| 탐험 경로가 끊김 | Related Content, Recommended Path, Entry별 최소 연결 수를 QA한다. |

## 13. 출시 후 확장 원칙

기능보다 콘텐츠 Pack을 우선한다. 후보 Pack은 Engraving, Daumier와 정치 풍자, Screen Printing과 Warhol, Photography·Halftone, PCB·Photolithography·Semiconductor 순이다.

새 Pack은 다음을 모두 만족해야 한다.

- 대표 기법 또는 주제가 충분하다.
- 대표 작품과 이미지 권리를 확보했다.
- Story를 최소 3개 만들 수 있다.
- 기존 콘텐츠와 의미 있는 관계가 최소 3개 있다.
- 기존 템플릿으로 표현할 수 있다.

제품은 성장할수록 메뉴와 기능이 복잡해지는 대신, 서로 연결된 지식의 밀도가 높아져야 한다.
