import React from "react"
import Layout from "../components/layout"
import HeroImage from "../../static/hacktober-fest-banner.png"
import "./hacktoberfest.scss"
const Hacktoberfest = () => {
  return (
    <Layout>
      <div className="wrapper hacktoberfest">
        <div className="hero-section">
          <img src={HeroImage} />
        </div>
        <section className="content py-80">
          <div>
            <h2>
              Hacktoberfest 2020 is here and <span>LoginRadius</span> welcomes
              it.
            </h2>
            <p>
              Hacktoberfest 2020 is around the corner and this year
              <span>LoginRadius</span> is welcoming Hacktoberfest with open
              hands by open sourcing some of it's code for people to contribute.
            </p>
            <p>
              Hacktoberfest is a month-long celebration of open-source software
              in October month run by DigitalOcean in partnership with GitHub
              and DEV. Hacktoberfest is open to everyone in our global
              community!
            </p>
            <p className="highlight">
              <em>
                Open 4 pull requests and win a limited edition t-shirt by
                DigitalOcean.
              </em>
            </p>
            <h3>
              Didn't we say LoginRadius is supporting hacktoberfest 2020!!!
            </h3>
            <p>
              Yes, this year LoginRadius will be supporting hacktoberfest by
              open sourcing some of it's codebase and we will be providing
              well-labeled issues for people to contribute. We will soon update
              the list of our open source projects on our{" "}
              <a href="/">Engineering Blog</a>.
            </p>
            <h3>But there is more to it!</h3>
            <p>
              Apart from getting limited edition t-shirts from DigitalOcean,
              LoginRadius will also provide LoginRadius branded limited t-shirts
              and swags to people contributing to our codebase. Yes we have got
              around 500 swags waiting for you all.
            </p>
            <h3>How do you get LoginRadius Swags?</h3>
            <p>
              Getting LoginRadius Swags is easy. Just 3 steps and that's it! 😃
            </p>
            <ol>
              <li>
                Submit 1 Successfull Pull Request on LoginRadius Open Source
                Projects
              </li>
              <li>Fill out this Form</li>
              <li>That's it! We will ship your swags.</li>
            </ol>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Hacktoberfest
