#!groovy

build('koffing', 'docker-host') {
  checkoutRepo()
  loadBuildUtils()

  def pipeDefault
  def withWsCache
  runStage('load pipeline') {
    env.JENKINS_LIB = "build_utils/jenkins_lib"
    pipeDefault = load("${env.JENKINS_LIB}/pipeDefault.groovy")
    withWsCache = load("${env.JENKINS_LIB}/withWsCache.groovy")
  }

  def pipeline = {
    runStage('init') {
      withGithubSshCredentials {
        withWsCache("node_modules") {
          sh 'make wc_init'
        }
      }
    }
    runStage('build') {
      sh 'make wc_build'
    }
    runStage('build image') {
      sh 'make build_image'
    }

    runStage('test image') {
      sh 'make test'
    }

    try {
      if (env.BRANCH_NAME == 'master') {
        runStage('push image') {
          sh 'make push_image'
        }
      }
    } finally {
      runStage('rm local image') {
        sh 'make rm_local_image'
      }
    }
  }
  pipeDefault(pipeline, 'dr2.rbkmoney.com', 'jenkins_harbor')
}
