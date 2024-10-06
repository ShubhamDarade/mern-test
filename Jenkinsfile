pipeline {
    agent any

     environment {
        PORT = '7000'
    }

    stages {
        stage('Checkout') {
            steps {
                // checkout scm
                git credentialsId: 'github-credentials', url: 'https://github.com/ShubhamDarade/mern-test.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install' // Install your Node.js dependencies
            }
        }
        stage('Run Unit Tests') {
            steps {
              
                withCredentials([string(credentialsId: 'mongo-credentials', variable: 'MONGO_URI')]) {
                    sh 'PORT=$PORT MONGO_URI=$MONGO_URI npm test' // Use environment variables when running tests
                }


            }
        }
    }

    post {
        success {
            updateGitHubCommitStatus('SUCCESS', "All unit tests passed")
        }
        failure {
            updateGitHubCommitStatus('FAILURE', "Unit tests failed")
        }
    }
}
