pipeline {
    agent any // 현재는 단일 노드이므로 any로 설정하되, 각 단계에서 Docker를 활용합니다.
    
    environment {
        // 직접 명시하여 파라미터 입력 창(Build with Parameters)이 뜨지 않도록 방지합니다.
        DOCKER_IMAGE = 'my-nextjs-blog'
        APP_PORT = '3000'
        
        // 내 공개된 Github 리포지토리 주소를 입력하세요.
        REPO_URL = 'https://github.com/USER/MY_REPO.git'
    }

    stages {
        stage('Checkout') {
            steps {
                // SCM에서 Jenkinsfile을 가져오지 않는 직접입력 환경이므로 명시적으로 git 코드를 호출합니다.
                git branch: 'main', url: "${REPO_URL}"
            }
        }

        stage('Inject Secrets') {
            steps {
                // Jenkins Credentials (Secret file)에 .env 파일을 업로드하고 ID를 'my-blog-env'로 지정합니다.
                withCredentials([file(credentialsId: 'my-blog-env', variable: 'ENV_FILE')]) {
                    sh 'cp $ENV_FILE .env'
                }
            }
        }

        stage('Docker Build') {
            steps {
                // 위에서 생성한 .env를 빌드 단계에서도 활용할 수 있습니다. 
                // Next.js 빌드 시점에 환경변수가 필요하다면, Dockerfile 최적화 상태에 따라 COPY명령으로 처리됨
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage('Deploy') {
            steps {
                sh """
                docker stop ${DOCKER_IMAGE} || true
                docker rm ${DOCKER_IMAGE} || true
                docker run -d --name ${DOCKER_IMAGE} -p ${APP_PORT}:3000 --env-file .env ${DOCKER_IMAGE}:latest
                """
            }
        }
    }
}
