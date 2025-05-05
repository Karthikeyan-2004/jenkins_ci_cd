pipeline {
  agent any

  tools {
    nodejs 'Node23' // name you gave in Global Tools
  }

  environment {
    USERNAME = 'karthikeyan_r'  // Replace with your Jenkins username
    API_TOKEN = '111d7845cc38a35cbd7b1837a7df8a2868'  // Replace with your Jenkins API token
  }

  stages {
    stage('Start Ngrok and Capture URL') {
      steps {
        script {
          // Start ngrok and capture the URL dynamically
          def ngrokUrl = sh(script: 'curl -s http://localhost:4040/api/tunnels | jq -r .tunnels[0].public_url', returnStdout: true).trim()
          env.JENKINS_URL = ngrokUrl
          echo "Ngrok URL: ${env.JENKINS_URL}"
        }
      }
    }

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

    stage('Deploy') {
      steps {
        script {
          // Fetch the CSRF token (crumb)
          def crumb = sh(script: '''
            curl -s -u ${USERNAME}:${API_TOKEN} ${JENKINS_URL}/crumbIssuer/api/json | jq -r .crumb
          ''', returnStdout: true).trim()

          if (crumb) {
            echo "CSRF Crumb Token: ${crumb}"

            // Trigger a Jenkins job or make other requests with the crumb (example)
            sh(script: """
              curl -X POST -u ${USERNAME}:${API_TOKEN} -H "Jenkins-Crumb:${crumb}" \
              -d "parameter1=value1&parameter2=value2" \
              ${JENKINS_URL}/your-api-endpoint
            """)
          } else {
            error "Failed to retrieve CSRF token"
          }
        }
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
