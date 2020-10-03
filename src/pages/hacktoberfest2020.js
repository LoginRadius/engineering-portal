import React from "react"
import Layout from "../components/layout"
import HeroImage from "../../static/hacktober-fest-cover-image.png"
import "./hacktoberfest.scss"
const Hacktoberfest = () => {
  console.log("HeroImage ", HeroImage);
  return (
    <Layout>
      <div className="wrapper hacktoberfest">
        <div className="hero-section">
          <img src={HeroImage} />
        </div>
        <section className="content py-80">
          <div>
            <h2>
              Hacktoberfest 2020 is here and{" "}
              <span className="highlight">LoginRadius</span> welcomes it.
            </h2>
            <p>
              Hacktoberfest 2020 is around the corner and this year
              <span className="highlight"> LoginRadius </span> is welcoming
              Hacktoberfest with open hands by open sourcing some of it's code
              for people to contribute.
            </p>
            <p>
              Hacktoberfest is a month-long celebration of open-source software
              in October month run by DigitalOcean in partnership with GitHub
              and DEV. Hacktoberfest is open to everyone in our global
              community!
            </p>
            <p className="highlight">
              <em>
                "Open 4 pull requests and win a limited edition t-shirt by
                DigitalOcean."
              </em>
            </p>
            <h3>LoginRadius is supporting Hacktoberfest 2020.</h3>
            <p>
              Yes, this year LoginRadius will be supporting hacktoberfest by
              open sourcing some of it's codebase. Check out the{" "}
              <a href="">LoginRadius Github </a> for we will be providing
              well-labeled issues for people to contribute. We will soon update
              the list of our open source projects on our{" "}
              <a href="/">Engineering Blog</a>.
            </p>
            <h3>Rewards from LoginRadius</h3>
            <p>
              Apart from getting limited edition t-shirts from DigitalOcean,
              LoginRadius will also provide it's{" "}
              <span className="highlight">limited edition branded swags</span>
              including <span className="highlight">t-shirts </span>, to people
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
                Submit atleast 1 successful pull request on LoginRadius Open
                Source projects.
              </li>
              <li>
                Fill out the{" "}
                <a href="https://forms.gle/aUYJXoVJVivPgGuM8">form</a>
              </li>
              <li>
                That's it! We will contact you through the email provided in the
                form.
              </li>
            </ol>
            <h3> How can you contribute to LoginRadius Open Source projects?</h3>
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
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Hacktoberfest
