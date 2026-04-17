pipeline {
    agent any // 현재는 단일 노드이므로 any로 설정하되, 각 단계에서 Docker를 활용합니다.

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Prepare Environment') {
            steps {
                // .env 파일은 .gitignore에 의해 무시되므로 Jenkins 환경에 없을 수 있습니다.
                // 보안 또는 외부 주입을 사용하지 않았을 경우를 대비해 .env.example을 복사하여 기본값을 보장합니다.
                sh 'cp -n .env.example .env || true'
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                export DOCKER_IMAGE=$(grep '^DOCKER_IMAGE=' .env | cut -d '=' -f2 | tr -d '\\r')
                docker build -t ${DOCKER_IMAGE:-my-nextjs-blog}:latest .
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                export DOCKER_IMAGE=$(grep '^DOCKER_IMAGE=' .env | cut -d '=' -f2 | tr -d '\\r')
                export APP_PORT=$(grep '^APP_PORT=' .env | cut -d '=' -f2 | tr -d '\\r')
                
                docker stop ${DOCKER_IMAGE:-my-nextjs-blog} || true
                docker rm ${DOCKER_IMAGE:-my-nextjs-blog} || true
                docker run -d --name ${DOCKER_IMAGE:-my-nextjs-blog} --env-file .env -p ${APP_PORT:-3000}:3000 ${DOCKER_IMAGE:-my-nextjs-blog}:latest
                '''
            }
        }
    }
}
