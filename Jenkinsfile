build('build_utils', 'docker-host') {
  checkoutRepo()

  def pipeDefault
  runStage('load pipeline') {
    env.JENKINS_LIB = "./jenkins_lib"
    pipeDefault = load("${env.JENKINS_LIB}/pipeDefault.groovy")
  }

  pipeDefault() {
    runStage('dummy') {
        echo 'OK'
    }
    //if (env.BRANCH_NAME == 'master') {
    //  runStage('build image') {
    //    sh "make build_image"
    //  }

    //  runStage('push image') {
    //    sh "make push_image"
    //  }
    // }
  }
}
