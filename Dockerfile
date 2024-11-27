# Step 1: 빌드 단계
FROM node:22.4.1 AS build

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# package.json과 package-lock.json을 복사하여 의존성 설치 전에 캐시 활용을 최적화합니다.
COPY package*.json ./

# 의존성 설치
RUN npm install

# 앱의 소스 코드를 복사합니다.
COPY . .

# 리액트 앱을 빌드합니다.
RUN npm run build

# Step 2: 배포 단계 (nginx)
FROM nginx:latest

# 빌드된 리액트 앱을 Nginx의 기본 디렉토리에 복사합니다.
COPY --from=build /app/build /usr/share/nginx/html

# Nginx가 80번 포트에서 리액트 앱을 서비스하도록 설정
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
