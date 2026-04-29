pipeline {
    agent any
    
    environment {
        // 도커 이미지와 포트번호
        DOCKER_IMAGE = 'my-blog-docker-image'
        APP_PORT = 'my-blog-app-port'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Docker Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    file(credentialsId: 'my-blog-env-file', variable: 'ENV_FILE'),
                    string(credentialsId: 'my-blog-app-port', variable: 'APP_PORT')
                ]) {
                    sh """
                        docker stop ${DOCKER_IMAGE} || true
                        docker rm ${DOCKER_IMAGE} || true
                        docker run -d --name ${DOCKER_IMAGE} -p ${APP_PORT}:3000 --env-file .env ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }
    }
}
