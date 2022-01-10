---
type: async
title: Deep Dive into Container Security Scanning
date: "2020-08-04"
coverImage: "cover_container_security.png"
author: "Rashmi Jain"
tags: ["Docker", "Container", "Security"]
description: "At the heart of any image scanning tool is static analysis against a “Common Vulnerabilities and Exposures” (CVE) database. Each layer within the container image is analyzed and queried to discover known vulnerabilities."
---

Audience: Anyone who wishes to deliver secure code to the rest of the world.

## Answer to **What it is?**

At the heart of any image scanning tool is static analysis against a “Common Vulnerabilities and Exposures” (CVE) database. Each layer within the container image is analyzed and queried to discover known vulnerabilities.

In addition to vulnerability scanning, a comprehensive tool should compare the architecture of your application against best practices to identify potential vulnerabilities.

## Answer to **Why it is important?**

While tools like Kubernetes and Container Registries have become household names for developer community because these tools make their life much easier to develop and deploy applications, many are still catching up on the need to integrate container security tools to secure their containerized application throughout the container lifecycle. As the world is already shifted to containerized applications, taking good care of you docker images is also equally important.

One of the main unique features of containers is how layers are used to build a container image. A service is piled up with an application server layer, a Linux layer and so on. One of these layers is updated, we can rebuild the application with a new updated version.

It would be an unthinking idea to get into a container-based strategy without integrating a well-grounded and inclusive container scanning security solution into the CI/CD setup.

## What are the factors to keep in mind while selecting the right tool?

- The CVE database should be up-to-date to any new vulnerability.

- The tool should give good coverage and should be easy to integrate.

- Few Image registries like Amazon ECR and Docker Hub, they have it as inbuild container security solution.

## Let's get Implemented.

I am here, implementing a Clair tool in gitlab-ci.yml to get secure docker images.

```
image_scanning:
  stage: scan
  image: docker:stable
  tags:
    - gitlab-org-docker
  services:
    - docker:19.03.8-dind
  variables:
    DOCKER_DRIVER: overlay2
  allow_failure: true
  before_script:
    - echo $CI_BUILD_TOKEN | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY
  script:
  - docker run -d --name db arminc/clair-db:latest
  - docker run -p 6060:6060 --link db:postgres -d --name clair --restart on-failure arminc/clair-local-scan:v2.0.1
  - apk add -U wget ca-certificates
  - docker pull $CI_REGISTRY_IMAGE:$PROJECT_NAME-latest || true
  - wget https://github.com/arminc/clair-scanner/releases/download/v8/clair-scanner_linux_amd64
  - mv clair-scanner_linux_amd64 clair-scanner
  - chmod +x clair-scanner
  - touch clair-whitelist.yml
  - while( ! wget -q -O /dev/null http://docker:6060/v1/namespaces ) ; do sleep 1 ; done
  - retries=0
  - echo "Waiting for clair daemon to start"
  - while( ! wget -T 10 -q -O /dev/null http://docker:6060/v1/namespaces ) ; do sleep 1 ; echo -n "." ; if [ $retries -eq 10 ] ; then echo " Timeout, aborting." ; exit 1 ; fi ; retries=$(($retries+1)) ; done
  - ./clair-scanner -c http://docker:6060 --ip $(hostname -i) -r gl-container-scanning-report.json -l clair.log -w clair-whitelist.yml $CI_REGISTRY_IMAGE:$PROJECT_NAME-latest || true
  - cat gl-container-scanning-report.json
  artifacts:
    paths: [gl-container-scanning-report.json]
  rules:
    - if: '$CI_COMMIT_BRANCH == "staging"'
      when: always

```

`gitlab-org-docker` is a GitLab shared-runner to run this analysis (an agent on which the above-described job will run), it will fetch the latest ms image and will run it against the CVE database, at last record the report in the JSON file which we can store as artifacts. These artifacts can be further used by the developer to see and resolve the vulnerabilities.
