import { withPrefix } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "../components/cardlist.module.scss"
import "./guest-blog.scss"
const Hacktoberfest2020 = () => {
  return (
    <Layout>
      <SEO
        title={`Write for Us`}
        description={`Async Blog provides a guest blogging opportunity to write an article for the LoginRadius Engineering blog specific to technical geeks.`}
        image={withPrefix("/contribute_lr.jpg")}
      />
      <div className="guest-blog">
        <section key={"pinned_card"} className={`${styles.pinnedwrap} py-96`}>
          <div className={styles.blogContentPinned}>
            <div className={styles.avatarPinned}>
              <img
                src={HeroImage}
                className="bs-md"
                alt="LoginRadius Guest Blogging Program"
              />
            </div>
            <div className={styles.descriptionPinned}>
              <div className={styles.description}>
                <h1>Write for LoginRadius</h1>
                <p className={`${styles.descriptiontext} ${styles.pinned}`}>
                  Thank you for showing interest in writing for us. Join our
                  community of IT leaders and tech practitioners and become a
                  contributor today!
                </p>
                <p>
                  At{" "}
                  <a href="https://www.loginradius.com/" target="_blank">
                    LoginRadius
                  </a>
                  , we like to keep the discussion going. So, if you are a
                  passionate writer and would love to contribute to our niche
                  industry that includes Customer Identity and Access Management
                  (CIAM), Authentication, Cybersecurity, Data Security, Consumer
                  Experience, and Data Governance, you are welcome to write for
                  us.
                </p>
                <p className="mb-0">
                  All you need to have is the ability to contribute fresh,
                  highly engaging and 100% original content. We'll do our best
                  to include your piece in our coverage.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="content ">
          <div>
            <div className="content-inner py-96">
              <div>
                <h3>Guidelines for Article Submission</h3>
                <ul>
                  <li>
                    Kindly go through our blogs and submit 3 best headline ideas
                    for your proposed guest posts
                  </li>
                  <li>
                    We will confirm a topic from your given suggestions and you
                    can start writing thereafter.
                  </li>
                  <li>
                    Use Google docs to submit your drafts as it is easier for
                    our editors to provide feedback directly on your draft.
                  </li>
                  <li>Send us a copy that's easier to read.</li>
                  <li>
                    Submit a summary (two sentences), author byline, author bio,
                    author photo. We'd love to add your social media handles
                    too.
                  </li>
                </ul>
                <h3>What Are We Looking For?</h3>
                <ul>
                  <li>
                    We welcome creative, 100% original, well-researched content
                    with actionable tips. So, when you are pitching your ideas
                    to us, make sure you mention how it fills our requirements.
                  </li>
                  <li>
                    Posts must not be written in an overly salesy or promotional
                    tone. We reserve the right to reject any post that does not
                    conform to our guidelines.
                  </li>
                  <li>
                    Write in your voice. We'd love your distinct opinion on the
                    topic.
                  </li>
                  <li>
                    Your blogs should be at least 800 words long, most are in
                    the 800-1000 range.
                  </li>
                  <li>
                    Any claim you make must be backed by links to research. Use
                    primary sources only and they should not be 1-1.5 years old.
                    However, make sure they aren't our competitors.
                  </li>
                  <li>
                    Try to explain with examples or case studies, and add
                    relevant images to illustrate your point, wherever possible.
                    We do not entertain stock photos, as they do not add any
                    value.
                  </li>
                  <li>
                    Use proper formatting: titles, H1, H2, and H3 tags as
                    required.
                  </li>
                </ul>

                <h3>What Not To Pitch?</h3>
                <ul>
                  <li>
                    Do not pitch topics that we have already covered on our
                    blogs.
                  </li>
                  <li>Do not pitch topics that are too promotional.</li>
                </ul>

                <h3>How to Get Your Blogs Accepted?</h3>
                <ul>
                  <li>
                    Your blogs should be unique, and provide tactical insights
                    based on your real-world expertise; we give preference to
                    articles that offer guidance, experiences, how-tos,
                    innovations, and success stories, over others
                  </li>
                  <li>
                    Your blog should provide value to our target readers who
                    are: Developers, Technical Architects, CTOs, Engineering
                    Leads, Project Managers, IAM Architects, IAM Admins, IAM
                    experts, IAM evangelist, Product Marketers, Growth Hackers,
                    CEOs, and Product managers.
                  </li>
                </ul>

                <h3>Will Your Submissions Be Edited?</h3>
                <ul>
                  <li>
                    We only accept readable and clean copies. If yours doesn't
                    match our standards, we reserve the right to decline the
                    submission. However, for small changes, we may have some
                    follow-up questions, which we will be happy to discuss with
                    the author.
                  </li>
                  <li>
                    Once we publish your article, we will send an
                    acknowledgement email with your article link.
                  </li>
                </ul>
                <h3>Can You Submit Your Blog Elsewhere?</h3>
                <ul>
                  <li>
                    No. All drafts for LoginRadius must be exclusive, meaning it
                    cannot appear anywhere else.
                  </li>
                  <li>
                    Once your article is live on our site, we reserve the right
                    to refuse the deletion of your published content.
                  </li>
                </ul>
                <h3>What Is the Approval Time?</h3>
                <ul>
                  <li>
                    We're excited that you want to write for us. But we
                    experience a heavy volume of new applications and replies
                    may not be immediate. Therefore, please be patient with us.
                  </li>
                  <li>
                    If we reject your idea this time, please do not shy away
                    from trying again.
                  </li>
                </ul>

                <h3>Monetary Rewards: Upto $200 Per Blog!</h3>
                <p>
                  For each blog shortlisted for our Engineering Blog category,
                  we offer upto $200 USD.
                </p>

                <h3>Ready to Write?</h3>
                <p>
                  Submit your topic idea and if we think it's the right fit,
                  we'll get in touch to discuss the next steps.
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfll5X95GweK5nuXxe9u7WD-xhBVj31Hk9KbLyeNIv3N8KZjA/viewform"
                  className="btn btn-primary guest-blog-btn"
                  target="_blank"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Hacktoberfest2020
