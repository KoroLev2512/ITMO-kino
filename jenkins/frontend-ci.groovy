pipeline {
    agent any

    environment {
        HOST = '127.0.0.1'
        GENERATE_SOURCEMAP = "true"
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'jenkins-github-itmo-kino',
                    url: 'git@github.com:KoroLev2512/ITMO-kino.git'
                    //url: 'git@github-ITMO-kino:KoroLev2512/ITMO-kino.git'
        }
        stage('Check current state') {
            steps {
                sh 'pwd'
            }
        }
        stage('Stop previous dev-server') {
            steps {
                sh 'pm2 stop itmo-kino || true'
                sh 'pm2 delete itmo-kino || true'
            }
        }
        stage('Update node version && setup frontend server') {
            steps {
                sh '''#!/bin/bash
                echo "=== Before sourcing nvm ==="
                node --version || true

                source ~/.nvm/nvm.sh
                nvm use 22.14.0

                echo "=== After nvm use 22.14.0 ==="
                node --version
                
                npm i
                npm run build
                pm2 start npm --name "itmo-kino" -- run server
                '''
            }
        }
    }
}
