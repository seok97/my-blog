pipeline {
    agent any // 현재는 단일 노드이므로 any로 설정하되, 각 단계에서 Docker를 활용합니다.

    environment {
        DOCKER_IMAGE = "my-nextjs-blog"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                // 이전에 만든 Dockerfile을 기반으로 이미지를 빌드합니다.
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage('Deploy') {
            steps {
                // 기존 컨테이너가 있다면 중지 및 삭제 후 새로 실행합니다.
                sh """
                docker stop ${DOCKER_IMAGE} || true
                docker rm ${DOCKER_IMAGE} || true
                docker run -d --name ${DOCKER_IMAGE} -p 3000:80 ${DOCKER_IMAGE}:latest
                """
            }
        }
    }
}
