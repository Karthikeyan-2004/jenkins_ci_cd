pipeline {
  agent any

  tools {
    nodejs 'Node23' 
  }

  environment {
    DOCKER_IMAGE = 'karthikeyanr17/cicd'
  }

  stages {
    stage('Clone') {
      steps {
        git credentialsId: 'github_seccred', url: 'https://github.com/Karthikeyan-2004/jenkins_ci_cd.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        dir('react_app') {
          sh 'npm install'
        }
      }
    }

    stage('Build') {
      steps {
        dir('react_app') {
          sh 'npm run build'
        }
      }
    }

    stage('Test') {
      steps {
        dir('react_app') {
          sh 'npm test -- --watchAll=false'
        }
      }
    }

    stage('Docker Build & Push') {
      steps {
        script {
          docker.build(env.DOCKER_IMAGE, 'react_app/')
          docker.withRegistry('https://index.docker.io/v1/', 'docker') {
            docker.image(env.DOCKER_IMAGE).push('latest')
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deployment simulated or handled by next system.'
      }
    }
  }

  post {
    success {
      echo 'CI/CD Pipeline executed successfully!'
    }
    failure {
      echo 'Pipeline failed!'
    }
  }
}
