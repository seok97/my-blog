pipeline {
    agent any // 현재는 단일 노드이므로 any로 설정하되, 각 단계에서 Docker를 활용합니다.

    environment {
        // .env 파일에서 변수 추출 (파일이 없으면 기본값 사용)
        DOCKER_IMAGE = sh(script: "grep '^DOCKER_IMAGE=' .env | cut -d '=' -f2 || echo 'my-nextjs-blog'", returnStdout: true).trim()
        APP_PORT = sh(script: "grep '^APP_PORT=' .env | cut -d '=' -f2 || echo '3000'", returnStdout: true).trim()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                // 이전에 만든 멀티스테이지 Dockerfile을 기반으로 최적화된 앱 이미지를 빌드합니다.
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage('Deploy') {
            steps {
                // 기존 컨테이너가 있다면 중지 및 삭제 후 새로 실행합니다.
                // --env-file을 넘겨주고 Host포트를 맞춰서 실행합니다.
                sh """
                docker stop ${DOCKER_IMAGE} || true
                docker rm ${DOCKER_IMAGE} || true
                docker run -d --name ${DOCKER_IMAGE} --env-file .env -p ${APP_PORT}:3000 ${DOCKER_IMAGE}:latest
                """
            }
        }
    }
}
