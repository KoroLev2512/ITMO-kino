pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github',
                    url: 'git@github.com:KoroLev2512/ITMO-kino.git'
            }
        }
        stage('Check current state') {
            steps {
                sh 'pwd'
            }
        }
        stage('Stop previous dev-server') {
            steps {
                sh 'pm2 stop dev-server || true'
                sh 'pm2 delete dev-server || true'
            }
        }
        stage('Setup frontend dev-server') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'pm2 start npm --name "dev-server" -- run dev'
            }
        }
    }
}
