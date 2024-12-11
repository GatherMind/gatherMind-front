# Step 1: 빌드 단계
FROM node:22.4.1 AS build

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일만 먼저 복사하여 캐시 최적화
COPY package*.json ./
RUN npm install

# 앱 소스 코드 복사
COPY . .

# 리액트 앱 빌드
RUN npm run build

# Step 2: 빌드된 리액트 앱을 EC2 Nginx로 복사
# 이 부분은 실제 Nginx가 실행 중인 EC2 서버의 Nginx 웹 루트 디렉토리로 복사하는 부분입니다.
# 예를 들어, /usr/share/nginx/html로 복사한다고 가정합니다.
COPY --from=build /app/build /usr/share/nginx/html
