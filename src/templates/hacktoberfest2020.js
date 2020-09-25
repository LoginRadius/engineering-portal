import React from "react"
import Layout from "../components/layout"
import HeroImage from "../../static/hacktober-fest-cover-image.png"

import "./hacktoberfest.scss"
const Hacktoberfest2020 = () => {
  return (
    <Layout>
      <div className="wrapper hacktoberfest">
        <div className="hero-section">
          <img src={HeroImage} />
        </div>
        <section className="content py-80">
          <div>
            <h2>
              <span className="highlight">500 Swags</span> Are Waiting For You!
            </h2>
            <p>
              Hacktoberfest 2020 is around the corner and this year
              <span className="highlight"> LoginRadius </span> is welcoming
              hacktoberfest with open hands by open sourcing many of it's
              projects on GitHub for people to contribute on.
            </p>
            <p>
              Hacktoberfest is a month-long celebration of open-source software
              in October month run by DigitalOcean in partnership with GitHub
              and DEV. Hacktoberfest is open to everyone in our global
              community! Read more on{" "}
              <a
                target="_blank"
                href="https://www.loginradius.com/engineering/blog/loginradius-supports-hacktoberfest-2020/"
              >
                LoginRadius supports hacktoberfest 2020
              </a>
              .
            </p>
            <h3>LoginRadius is supporting Hacktoberfest 2020</h3>
            <p>
              Yes, this year LoginRadius will be part of hacktoberfest by open
              sourcing many of it's projects on Github. We will be providing
              well-labeled issues for anyone to contribute to our projects on
              our GitHub Repositories. We will soon update the list of our open
              source projects on our{" "}
              <a href="https://www.loginradius.com/engineering/blog">
                Engineering Blog
              </a>
              .
            </p>
            <h3>Why should you contribute?</h3>
            <p>
              Hacktoberfest is a great opportunity for anyone trying to get
              started in open source and get involved in the community. It is
              the easiest way to get into open source community and also show
              off some cool swags which you get by contributing to lot of open
              source projects.
            </p>
            <h3>Rewards from LoginRadius</h3>
            <p>
              Apart from getting limited edition t-shirts from DigitalOcean,
              LoginRadius will also provide it's{" "}
              <span className="highlight">limited edition branded swags </span>
              including <span className="highlight">awesome t-shirts </span>,
              and <span className="highlight">stickers</span> to people
              contributing to our codebase. Yes!{" "}
              <span className="highlight">
                we have got around 500 swags waiting for you all.
              </span>
            </p>
            <h4>How do you get LoginRadius Swags?</h4>
            <p>
              Getting LoginRadius Swags is easy. Just 3 steps and that's it! 😃
            </p>
            <ol>
              <li>
                Fill out the{" "}
                <a href="https://forms.gle/aUYJXoVJVivPgGuM8">form</a>
              </li>
              <li>
                Submit atleast 1 successfull pull request on LoginRadius Open
                Source projects.
              </li>
              <li>
                That's it! We will contact you through the email provided in the
                form.
              </li>
            </ol>
            <h3>
              {" "}
              How can you contribute to LoginRadius Open Source projects?
            </h3>
            <p>
              We accept all kinds of contributions, be it improving our{" "}
              <a href="https://github.com/LoginRadius/docs">Docs</a>, writing
              guest blogs for us on our{" "}
              <a href="https://www.loginradius.com/engineering/page/contribute">
                Engineering Blog
              </a>{" "}
              or contributing to our different open source projects on{" "}
              <a href="https://github.com/LoginRadius/">Github</a>.
            </p>
            <br></br>
            <div className="github-project">
              <h2 className="text-center">
                Projects on<span className="highlight"> Github</span>
              </h2>
              <div className="github-project-inner">
                <div className="mb-80">
                  <div className="description-wrap">
                    <div className="tag">
                      <a
                        aria-label="blog"
                        href="https://github.com/topics/blog"
                        target="_blank"
                      >
                        Blog
                      </a>
                      <a
                        aria-label="Technology"
                        href="https://github.com/topics/technology"
                        target="_blank"
                      >
                        Technology
                      </a>
                      <a
                        aria-label="knowledge"
                        href="https://github.com/topics/knowledge"
                        target="_blank"
                      >
                        knowledge
                      </a>
                    </div>
                    <div>
                      <h3>
                        <a
                          href="https://github.com/LoginRadius/engineering-portal"
                          target="_blank"
                        >
                          Engineering Blog
                        </a>
                      </h3>
                      <p>
                        A collection of resources by Loginradius engineering
                        team to share their practical learning, development
                        challenges, open-source initiatives in dev, QA, Infra,
                        or implementation.
                      </p>
                    </div>
                    <div className="bio-module--bio--3cpvH d-flex">
                      <div class="text">
                        <a
                          href="https://github.com/LoginRadius/engineering-portal"
                          target="_blank"
                        >
                          <strong>View Github Repo</strong>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-80">
                  <div className="description-wrap">
                    <div className="tag">
                      <a
                        aria-label="gatsby"
                        href="https://github.com/topics/gatsby"
                        target="_blank"
                      >
                        Gatsby
                      </a>
                      <a
                        aria-label="markdown"
                        href="https://github.com/topics/markdown"
                        target="_blank"
                      >
                        Markdown
                      </a>
                      <a
                        aria-label="loginradius"
                        href="https://github.com/topics/loginradius"
                        target="_blank"
                      >
                        LoginRadius
                      </a>
                      <a
                        aria-label="open-source"
                        href="https://github.com/topics/open-source"
                        target="_blank"
                      >
                        open-source
                      </a>
                    </div>
                    <div>
                      <h3>
                        <a
                          href="https://github.com/LoginRadius/docs"
                          target="_blank"
                        >
                          Developer Documentation
                        </a>
                      </h3>
                      <p>LoginRadius Developer Documentation</p>
                    </div>
                    <div className="bio-module--bio--3cpvH d-flex">
                      <div class="text">
                        <a
                          href="https://github.com/LoginRadius/docs"
                          target="_blank"
                        >
                          <strong>View Github Repo</strong>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-80">
                  <div className="description-wrap">
                    <div className="tag">
                      <a
                        aria-label="golang"
                        href="https://github.com/topics/golang"
                        target="_blank"
                      >
                        golang
                      </a>
                      <a
                        aria-label="go"
                        href="https://github.com/topics/go"
                        target="_blank"
                      >
                        go
                      </a>
                      <a
                        aria-label="SAML"
                        href="https://github.com/topics/saml"
                        target="_blank"
                      >
                        SAML
                      </a>
                      <a
                        aria-label="open-source"
                        href="https://github.com/topics/sso"
                        target="_blank"
                      >
                        SSO
                      </a>
                    </div>
                    <div>
                      <h3>
                        <a
                          href="https://github.com/LoginRadius/go-saml"
                          target="_blank"
                        >
                          go-saml
                        </a>
                      </h3>
                      <p>
                        High Level API Implementation of SAML 2.0 (Currently
                        Supported Identity Provider Implementation) Single Sign
                        On
                      </p>
                    </div>
                    <div className="bio-module--bio--3cpvH d-flex">
                      <div class="text">
                        <a
                          href="https://github.com/LoginRadius/go-saml"
                          target="_blank"
                        >
                          <strong>View Github Repo</strong>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-80">
                  <div className="description-wrap">
                    <div className="tag">
                      <a
                        aria-label="golang"
                        href="https://github.com/topics/golang"
                        target="_blank"
                      >
                        Tag
                      </a>
                      <a
                        aria-label="go"
                        href="https://github.com/topics/go"
                        target="_blank"
                      >
                        Tag
                      </a>
                      <a
                        aria-label="SAML"
                        href="https://github.com/topics/saml"
                        target="_blank"
                      >
                        Tag
                      </a>
                      <a
                        aria-label="open-source"
                        href="https://github.com/topics/sso"
                        target="_blank"
                      >
                        Tag
                      </a>
                    </div>
                    <div>
                      <h3>
                        <a
                          href="https://github.com/LoginRadius/cascade"
                          target="_blank"
                        >
                          Cascade
                        </a>
                      </h3>
                      <p>Create your internal developers' portal</p>
                    </div>
                    <div className="bio-module--bio--3cpvH d-flex">
                      <div class="text">
                        <a
                          href="https://github.com/LoginRadius/cascade"
                          target="_blank"
                        >
                          <strong>View Github Repo</strong>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            Here is a list of some of our Projects on Github:
            <ul>
              <li>
                <a href="https://github.com/LoginRadius/engineering-portal">
                  Engineering Blog
                </a>
              </li>
              <li>
                <a href="https://github.com/LoginRadius/docs">
                  Developer Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/LoginRadius/go-saml">go-saml</a>
              </li>
              <li>
                <a href="https://github.com/LoginRadius/cascade">
                  Developer Portal
                </a>
              </li>
            </ul>
            <p>
              Check out{" "}
              <a href="https://github.com/LoginRadius">LoginRadius Github</a>{" "}
              for more awesome projects.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Hacktoberfest2020
