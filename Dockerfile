FROM nginx:alpine
# Jenkins가 빌드한 결과물을 이 위치에 복사하게 됩니다.
COPY . /usr/share/nginx/html
