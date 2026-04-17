pipeline {
    agent any // 현재는 단일 노드이므로 any로 설정하되, 각 단계에서 Docker를 활용합니다.
    
    parameters {
        string(name: 'DOCKER_IMAGE', description: '생성할 도커 이미지 및 컨테이너 이름')
        string(name: 'APP_PORT', description: '호스트와 연결할 포트 번호')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                // Jenkins 파라미터가 자동으로 환경 변수로 주입되므로 별도의 .env 파싱 없이 즉시 사용 가능합니다.
                sh '''
                docker build -t ${DOCKER_IMAGE}:latest .
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop ${DOCKER_IMAGE} || true
                docker rm ${DOCKER_IMAGE} || true
                docker run -d --name ${DOCKER_IMAGE} -p ${APP_PORT}:3000 ${DOCKER_IMAGE}:latest
                '''
            }
        }
    }
}
