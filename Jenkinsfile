pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-blog-docker-image'
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
                    sh '''
                        set -e
                        docker stop "$DOCKER_IMAGE" 2>/dev/null || true
                        docker rm   "$DOCKER_IMAGE" 2>/dev/null || true
                        docker run -d \
                            --name "$DOCKER_IMAGE" \
                            -p "$APP_PORT":3000 \
                            --env-file "$ENV_FILE" \
                            --restart unless-stopped \
                            "$DOCKER_IMAGE":latest
                    '''
                }
            }
        }
    }
}
