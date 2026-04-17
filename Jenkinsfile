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
                sh '''
                export DOCKER_IMAGE=$(grep '^DOCKER_IMAGE=' .env | cut -d '=' -f2 | tr -d '\\r')
                docker build -t ${DOCKER_IMAGE}:latest .
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                export DOCKER_IMAGE=$(grep '^DOCKER_IMAGE=' .env | cut -d '=' -f2 | tr -d '\\r')
                export APP_PORT=$(grep '^APP_PORT=' .env | cut -d '=' -f2 | tr -d '\\r')
                
                docker stop ${DOCKER_IMAGE} || true
                docker rm ${DOCKER_IMAGE} || true
                docker run -d --name ${DOCKER_IMAGE} --env-file .env -p ${APP_PORT}:3000 ${DOCKER_IMAGE}:latest
                '''
            }
        }
    }
}
