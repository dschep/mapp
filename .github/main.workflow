workflow "Lint then if on master Build and deploy to dev" {
  resolves = [
    "deploy",
  ]
  on = "push"
}

action "install dependencies" {
  needs = ["non-delete branches only"]
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "ci"
}

action "lint" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run lint"
  needs = ["install dependencies"]
}

action "build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run build"
  env = {
    REACT_APP_STAGE = "dev"
  }
  needs = ["master branch only"]
}

action "deploy" {
  uses = "actions/aws/cli@efb074ae4510f2d12c7801e4461b65bf5e8317e6"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
  env = {
    AWS_DEFAULT_REGION = "us-east-1"
    STAGE = "dev"
  }
  runs = "./deploy"
  needs = ["build"]
}

workflow "Build and deploy to prod" {
  on = "release"
  resolves = [
    "deploy ",
    "only on publish of release",
  ]
}

action "install dependencies " {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "ci"
  needs = ["only on publish of release"]
}

action "build " {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run build"
  env = {
    REACT_APP_STAGE = "prod"
  }
  needs = ["install dependencies "]
}

action "deploy " {
  uses = "actions/aws/cli@efb074ae4510f2d12c7801e4461b65bf5e8317e6"
  runs = "./deploy"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
  env = {
    STAGE = "prod"
    AWS_DEFAULT_REGION = "us-east-1"
  }
  needs = ["build "]
}

action "master branch only" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch master"
  needs = ["lint"]
}

action "non-delete branches only" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "not deleted"
}

action "only on publish of release" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "action published"
}
