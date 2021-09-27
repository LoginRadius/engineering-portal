import React from "react"
import Layout from "../components/layout"
import HeroImage from "../../content/assets/contribute_lr.jpg"
import SEO from "../components/seo"

import "./guest-blog.scss"
const Hacktoberfest2020 = () => {
  return (
    <Layout>
      <SEO
        title={`Write for Us`}
        description={`LoginRadius provides a guest blogging opportunity to write an article for the LoginRadius Engineering blog specific to technical geeks.`}
        image={HeroImage}
      />
      <div className="guest-blog">
        <section className="hero-section">
          <div className="grid-50">
            <div>
              <h1>Write for LoginRadius Guest Blogging Program</h1>
              <p>
                For technical people who have practical, tangible, hands-on
                experience to share with our blog readers about relevant
                industry topics or LoginRadius products, it is a great
                opportunity to write an article for The LoginRadius Engineering
                Blog.
              </p>
            </div>
            <div>
              <img src={HeroImage} alt="LoginRadius Guest Blogging Program" />
            </div>
          </div>
        </section>
        <section className="content py-80">
          <div>
            <h3>Why write for LoginRadius?</h3>
            <p>
              We don’t think about the LoginRadius blog as a marketing channel
              for announcements, but rather a publication where developers and
              industry professionals can learn more about emerging trends, find
              how-tos, and any content that makes their jobs and careers better.
            </p>
            <p>
              Our goal is to provide engaging, inspiring, and educational
              content to our readers to help them in their everyday work and
              career. With LoginRadius you reach out to a vast developer
              audience and get good personal branding apart from monetary
              benefits.
            </p>
            <h3>Monetary Rewards: Upto $200 Per Blog!</h3>
            <p>
              We believe you should be paid for your efforts. For each blog
              shortlisted for our Engineering Blog, we offer Upto $200 USD.
            </p>

            <h3>What is the publication process?</h3>
            {/* <h4> Apply, collaborate, write, revise, publish, and repeat.</h4> */}
            <ul style={{ paddingLeft: "16px" }}>
              <li>
                Apply: Apply to the program with your topic idea, an outline of
                your blog, and a writing sample that showcases your ability to
                explain your technical knowledge to others. We publish only
                original, first-run content under a Creative Commons license.
              </li>
              {/* <li>
                Guidance : If you're accepted, you'll work with the editorial
                team to refine your topic and outline for your tutorial.
              </li> */}
              <li>
                Write: Once your topic is approved, it's time to write. We
                provide resources, like our writing guidelines and best
                practices recommendations to help you get started.
              </li>
              <li>
                Review: Submit your first draft and collaborate one-on-one with
                a professional editor to revise your work. LoginRadius holds all
                the rights to approve or reject any of the blog entries that
                does not follow our guidelines.
              </li>
              <li>
                Refine: After review, you will be asked to make any changes
                necessary before the blog can go live.
              </li>
              <li>
                Go Live: After revisions, your editor will publish your article,
                LoginRadius will also promote your article across all of our
                social networks
              </li>
              <li>
                Repeat: Build a relationship with the editorial team by
                suggesting new articles that you want to write.
              </li>
            </ul>
            {/* <h4>Some tips that you can keep in mind while writing the blog.</h4>
          <ul>
            <li>
              Keep post's language simple and easy to understand, we are making
              our blogs for the mass and our audience doesn't need to be only
              native English speakers
            </li>
            <li>
              Use short paragraphs, break down longer paragraphs into smaller
              one, people lose their interest more while reading a long
              paragraph.
            </li>
            <li>
              Use headers to structure your post, use large headers for the main
              heading and smaller for sub-sections in it
            </li>
            <li>
              Try to use complete words then abbreviations, spell out an acronym
              that isn’t well-known
            </li>
            <li>
              If your code contains code snippets, don't forget to syntax
              highlighting it, You can also specify the programming language for
              which you want syntax highlighting. For example: in markdown
              typing, ```js will give you JavaScript syntax highlighting.
            </li>
            <li>
              Try to use images/screenshots in your post to example things
              better, images are also visible when you share the post in social
              media.
            </li>
            <li>
              Always provide a GitHub demo link whenever your post contains the
              code.
            </li>
            <li>
              Simplicity, Ease of Implementation of the content,
              developer-friendly and effectiveness
            </li>
          </ul> */}

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfgNfb54rpqAob8S7AyK9rUPLmIVs-1GDRHZ2qmiF9KPBdcnw/viewform"
              className="btn btn-primary"
              target="_blank"
            >
              Apply Now
            </a>
            {/* <p>
            If you are familiar with git, we encourage you to raise a pull
            request directly into our{" "}
            <a href="https://github.com/LoginRadius/engineering-portal">
              public repository
            </a>
            . You can directly follow the{" "}
            <a href="https://github.com/LoginRadius/engineering-portal/blob/master/CONTRIBUTING.md">
              contribution guidelines
            </a>{" "}
            and raise a pull request accordingly.
          </p> */}
            {/* <p>
            If not, then no worries, please fill{" "}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfgNfb54rpqAob8S7AyK9rUPLmIVs-1GDRHZ2qmiF9KPBdcnw/viewform">
              this form
            </a>{" "}
            and we will get back to you.
          </p> */}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Hacktoberfest2020
