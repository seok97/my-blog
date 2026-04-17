pipeline {
    agent any // 현재는 단일 노드이므로 any로 설정하되, 각 단계에서 Docker를 활용합니다.

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                // Checkout 이후에 .env 파일이 존재하므로 sh 명령 내에서 동적으로 파싱합니다.
                // 따옴표를 ''' (싱글쿼트 3개)로 사용하여 Groovy 변수 내삽을 방지하고 쉘 변수 치환으로 위임합니다.
                sh '''
                export DOCKER_IMAGE=$(grep '^DOCKER_IMAGE=' .env | cut -d '=' -f2 | tr -d '\\r' || echo 'my-nextjs-blog')
                docker build -t ${DOCKER_IMAGE}:latest .
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                export DOCKER_IMAGE=$(grep '^DOCKER_IMAGE=' .env | cut -d '=' -f2 | tr -d '\\r' || echo 'my-nextjs-blog')
                export APP_PORT=$(grep '^APP_PORT=' .env | cut -d '=' -f2 | tr -d '\\r' || echo '3000')
                
                docker stop ${DOCKER_IMAGE} || true
                docker rm ${DOCKER_IMAGE} || true
                docker run -d --name ${DOCKER_IMAGE} --env-file .env -p ${APP_PORT}:3000 ${DOCKER_IMAGE}:latest
                '''
            }
        }
    }
}
