pipeline {
    agent any
    environment {
        FRONTEND_IMAGE = "ramirachdi/booking-frontend"
        BACKEND_IMAGE = "ramirachdi/booking-backend"
    }
    stages {
        stage('Clone Repository') {
            steps {
                
                git branch: 'main', credentialsId: 'githubtoken', url: 'https://github.com/ramirachdi/BookingDeployment.git'
            }
        }
        stage('Build Frontend') {
            when {
                anyOf {
                    changeset "BookingFrontend/**"
                    changeset "Jenkinsfile"
                }
            }//,
            steps {
                script {
                    dir('BookingFrontend') {
                        docker.build("${FRONTEND_IMAGE}:${env.BUILD_ID}")
                    }
                }
            }
        }
        stage('Push Frontend') {
            when {
                anyOf {
                    changeset "BookingFrontend/**"
                    changeset "Jenkinsfile"
                }
            }
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-frontend') {
                        docker.image("${FRONTEND_IMAGE}:${env.BUILD_ID}").push()
                    }
                }
            }
        }
        stage('Build Backend') {
            when {
                anyOf {
                    changeset "BookingBackend/**"
                    changeset "Jenkinsfile"
                }
            }
            steps {
                script {
                    dir('BookingBackend') {
                        docker.build("${BACKEND_IMAGE}:${env.BUILD_ID}")
                    }
                }
            }
        }
        stage('Push Backend') {
            when {
                anyOf {
                    changeset "BookingBackend/**"
                    changeset "Jenkinsfile"
                }
            }
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-backend') {
                        docker.image("${BACKEND_IMAGE}:${env.BUILD_ID}").push()
                    }
                }
            }
        }
    }
}
