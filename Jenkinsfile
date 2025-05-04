pipeline {
  agent any

  tools {
    nodejs 'NodeJS 23' // name you gave in Global Tools
  }

  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/your-username/hello-world-ci.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test -- --watchAll=false'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Simulating Deployment...'
        // Replace with actual deploy script or commands
      }
    }
  }

  post {
    success {
      echo 'Build and Deploy Successful!'
    }
    failure {
      echo 'Build Failed!'
    }
  }
}
