pipeline {
  agent none
  stages {
    stage('Deploy') {
      agent any
      steps {
        echo 'Deploying'
        sh "chmod +x -R deploy_jenkins.sh"
        sh './deploy_jenkins.sh'
      }
    }
  }
}
