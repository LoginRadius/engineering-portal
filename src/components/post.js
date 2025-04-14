import { Link, withPrefix } from "gatsby"
import Img from "gatsby-image"
import kebabCase from "lodash/kebabCase"
import React, { useState, useEffect } from "react"
import ReactGA from "react-ga"
import Helmet from "react-helmet"
//import Docs from "../../static/consumer-digital-identity-trends-2023.webp"
import freeTrialImg from "../../content/assets/freetrial.webp"
import headStyles from "./cardlist.module.scss"
import AsyncFeatList from "./featurePost/async"
import FuelFeatList from "./featurePost/fuel"
import IdentityFeatList from "./featurePost/identity"
import styles from "./post.module.scss"
import Subscribe from "./subscribe"
import bioStyles from "./bio.module.scss"
import TagMenu from "./tagmenu"
import AsyncTagMenu from "./tagmenu/async"
import IdentityTagMenu from "./tagmenu/identity"
import getTimeToRead from "../utils/timeToRead"
import Bio from "./bio"
import ToC from "./toc"

const eventLogger = function ({ category, action, label }) {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  })
}
const signUplogger = function () {
  ReactGA.event({
    category: "Signup",
    action: "User clicked on Free signup button",
    label: "Signup",
  })
}
const extractFAQs = htmlContent => {
  let faqs = []

  // Locate the FAQ section by finding <h2 id="faqs">
  const faqIndex = htmlContent.indexOf('<h2 id="faqs"')

  if (faqIndex !== -1) {
    const faqContent = htmlContent.slice(faqIndex)
    const questionMatches = [
      ...faqContent.matchAll(/<p><strong>(\s*.*?)<\/strong><\/p>/gi),
    ]
    const allPTags = [...faqContent.matchAll(/<p>(.*?)<\/p>/gi)]
    questionMatches.forEach(match => {
      const question = match[1].trim()
      const questionIndex = allPTags.findIndex(p => p[1].includes(question))
      const answer =
        questionIndex !== -1 && allPTags[questionIndex + 1]
          ? allPTags[questionIndex + 1][1].trim()
          : ""

      faqs.push({ question, answer })
    })
  }
  return faqs
}

const Post = ({ post, relatedPost, type }) => {
  const headings = post.headings
  const image = post.frontmatter.coverImage
  const tags = post.frontmatter.tags || []
  const author = post.frontmatter.author
  const githubUrl = author.avatar
    ? `${withPrefix("avatar/")}${author.avatar}`
    : author.github
    ? `https://github.com/${author.github}.png?size=50`
    : `https://ui-avatars.com/api/?name=${author.id}&size=460`

  const [modifiedHtml, setModifiedHtml] = useState(post.html)

  useEffect(() => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(post.html, "text/html")

    doc.querySelectorAll("a").forEach(anchor => {
      try {
        const url = new URL(anchor.href, window.location.origin)
        if (!url.href.includes("www.loginradius.com")) {
          anchor.setAttribute("target", "_blank")
        }
      } catch (e) {
        console.error("Invalid URL:", anchor.href)
      }
    })

    setModifiedHtml(doc.body.innerHTML)
  }, [post.html])
  const faqJsonData = extractFAQs(post.html)
  let faqSchema = {}
  if (faqJsonData.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqJsonData.map(faq => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    }
  }
  return (
    <>
      {faqJsonData.length > 0 && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        </Helmet>
      )}
      <section
        className={`${headStyles.pinnedwrap} ${headStyles.postDetail} py-96`}
      >
        <div className={headStyles.blogContentPinned}>
          <div className={headStyles.descriptionPinned}>
            <div className={`${bioStyles.bio} ${headStyles.description}`}>
              <h1>{post.frontmatter.title || post.fields.slug}</h1>
              <p
                className={`${headStyles.descriptiontext} ${headStyles.pinned}`}
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
              />
            </div>

            <div className={`${headStyles.tag} ${headStyles.pinned}`}>
              {tags &&
                tags.map((tag, i) => (
                  <Link key={i} to={`/tags/${kebabCase(tag)}/`}>
                    {" "}
                    {tag}{" "}
                  </Link>
                ))}
            </div>
            <Bio
              created_date={post.frontmatter.date}
              updated_date={post.frontmatter.updated_date}
              author={author}
              readingTime={getTimeToRead(post.html)}
            />
          </div>
          <div className={headStyles.avatarPinned}>
            <img
              src={image.childImageSharp.fluid.src}
              alt={post.frontmatter.title}
              width={552}
              height={552 / image.childImageSharp.fluid.aspectRatio}
            />
          </div>
        </div>
      </section>

      <section className={styles.postDetail}>
        <div>
          <div className={`${styles.postDetailInner} pt-96 grid-67-33`}>
            <div>
              <div
                className={styles.postContent}
                dangerouslySetInnerHTML={{ __html: modifiedHtml }}
              />
              <div className={`${styles.author} d-flex py-96`}>
                <div className={styles.authorImage}>
                  <Link to={`/author/${kebabCase(author.id)}/`}>
                    <img
                      className={`circle extra-large`}
                      src={githubUrl}
                      alt={author.id}
                      width={100}
                      height={100}
                    />
                  </Link>
                </div>
                <div className={styles.aboutAuthor}>
                  <div className={styles.aboutAuthorInner}>
                    <h3>
                      Written by&nbsp;
                      <Link to={`/author/${kebabCase(author.id)}/`}>
                        {author.id}
                      </Link>
                    </h3>
                    <p dangerouslySetInnerHTML={{ __html: author.bio }}></p>
                  </div>
                </div>
              </div>
              <div className={`${headStyles.sidebar} ${headStyles.detailPage}`}>
                {relatedPost && relatedPost.length ? (
                  <div
                    className={`${headStyles.sidebarWidget} ${headStyles.posts}`}
                  >
                    <h3>Related Posts</h3>
                    <ul>
                      {relatedPost.map(({ node }, i) => (
                        <li>
                          <Link
                            to={`/${node.frontmatter.type}${node.fields.slug}`}
                            rel="prev"
                          >
                            {node.frontmatter.title}
                          </Link>
                          <a href="#">
                            Everything You Need to Know Before Buying Cyber
                            Insurance in 2022
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {/*<div className={headStyles.subscribeDetail}>
                  <h3>
                    Did you enjoy this article? Subscribe to new articles!
                  </h3>
                  <Subscribe type={type} />
                </div>*/}
              </div>
            </div>
            <div className={headStyles.sidebar}>
              <div className={`${headStyles.sidebarWidget} ${headStyles.cta}`}>
                {
                  <>
                    <div className={headStyles.image}>
                      <img
                        src="https://www.loginradius.com/blog/webinar-banner.webp"
                        alt="This image shows how LoginRadius powers several secure authentication methods like social login, biometrics, passkeys, passwordless login, and OTP."
                        style={{ backgroundColor: "#fff" }}
                      />
                    </div>
                    <div className={headStyles.text}>
                      <h3 style={{ textAlign: "center" }}>
                        LoginRadius Product Roadmap 2025
                      </h3>
                      <a
                        className={`${headStyles.btnPrimary} btn-primary ga_event`}
                        // className={"btn-primary ga_event"}
                        href={
                          "https://www.loginradius.com/resource/webinar/loginradius-roadmap-2025?utm_source=website&utm_medium=web&utm_campaign=blog-post"
                        }
                        key={"overall-ciam-leader-2024"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          eventLogger({
                            category: "LoginRadius Product Roadmap 2025",
                            action: "User clicked on Free Download button",
                            label: "LoginRadius Product Roadmap 2025",
                          })
                        }
                      >
                        {"Watch On-Demand"}
                      </a>
                    </div>
                  </>
                }
              </div>
              <div className={`${headStyles.sidebarWidget} ${headStyles.cta}`}>
                {
                  <>
                    <div className={headStyles.image}>
                      <img
                        src="https://www.loginradius.com/wp-content/uploads/2024/09/Industry-Report-2024-cover.png"
                        alt="The State of Consumer Digital ID 2024"
                        style={{ backgroundColor: "#fff" }}
                      />
                    </div>
                    <div className={headStyles.text}>
                      <h3 style={{ textAlign: "center" }}>
                        The State of Consumer Digital ID 2024
                      </h3>
                      <a
                        className={`${headStyles.btnPrimary} btn-primary ga_event`}
                        // className={"btn-primary ga_event"}
                        href={
                          "https://www.loginradius.com/resource/2024-consumer-digital-identity-trends-report/"
                        }
                        key={"the-state-of-consumer-digital-id-2024"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          eventLogger({
                            category: "The State of Consumer Digital ID 2024",
                            action: "User clicked on Free Download button",
                            label: "The State of Consumer Digital ID 2024",
                          })
                        }
                      >
                        {"LEARN MORE"}
                      </a>
                    </div>
                  </>
                }
              </div>

              <div
                className={`${headStyles.sidebarWidget} ${headStyles.posts}`}
              >
                {type === "engineering" ? (
                  <AsyncFeatList slug={post.fields.slug} />
                ) : type === "growth" ? (
                  <FuelFeatList slug={post.fields.slug} />
                ) : (
                  <IdentityFeatList slug={post.fields.slug} />
                )}
              </div>

              {type == "engineering" && (
                <>
                  <div
                    className={`${headStyles.sidebarWidget} ${headStyles.cta}`}
                  >
                    <div className={headStyles.text}>
                      <h3>LoginRadius Identity Platform Documentation</h3>
                      <a
                        className={`${headStyles.btnPrimary} btn-primary ga_event`}
                        // className={"btn-primary ga_event"}
                        href={"https://www.loginradius.com/docs/"}
                        key={"docs-link"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          eventLogger({
                            category: "LoginRadius Docs",
                            action: "User clicked on Loginradius Docs button",
                            label: "Docs",
                          })
                        }
                      >
                        {"LoginRadius Docs"}
                      </a>
                    </div>
                  </div>
                </>
              )}

              <div className={`${headStyles.sidebarWidget} ${headStyles.cta}`}>
                {
                  <>
                    <div className={headStyles.image}>
                      <img
                        src="https://www.loginradius.com/wp-content/uploads/2024/03/Website-I-Resource-LP-Feature-2-.png"
                        alt="Top CIAM Platform 2024"
                      />
                    </div>
                    <div className={headStyles.text}>
                      <h3 style={{ textAlign: "center" }}>
                        Top CIAM Platform 2024
                      </h3>
                      <a
                        className={`${headStyles.btnPrimary} btn-primary ga_event`}
                        // className={"btn-primary ga_event"}
                        href={
                          "https://www.loginradius.com/resource/analyst-report/cioreview-names-loginradius-top-ciam-platform-2024/"
                        }
                        key={"top-ciam-platform-2024"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          eventLogger({
                            category: "Top CIAM Platform 2024",
                            action: "User clicked on Free Download button",
                            label: "Top CIAM Platform 2024",
                          })
                        }
                      >
                        {"LEARN MORE"}
                      </a>
                    </div>
                  </>
                }
              </div>

              {type !== "growth" && (
                <div
                  className={`${headStyles.sidebarWidget} ${headStyles.tags}`}
                >
                  {type === "all" && <TagMenu />}
                  {type === "engineering" && <AsyncTagMenu />}
                  {type === "identity" && <IdentityTagMenu />}
                </div>
              )}
            </div>
          </div>
        </div>
        {headings && headings.length && <ToC headings={headings} />}
      </section>
      <section key={"pinned_card_cta"} className={styles.bgLightbluebright01}>
        <div className={`${styles.grid50} ${styles.ctaSmall}`}>
          <div className={styles.ctaSmallText}>
            <img src={freeTrialImg} alt="Free Trial" />
          </div>

          <div className={styles.ctaSmallButton}>
            <h3>LoginRadius CIAM Platform</h3>
            <p>
              Our Product Experts will show you the power of the LoginRadius
              CIAM platform, discuss use-cases, and prove out ROI for your
              business.
            </p>
            <br />
            <a
              className={`${styles.navcta}  btn-blueprimary  ga_event }`}
              href={`https://accounts.loginradius.com/auth.aspx?return_url=https://console.loginradius.com/login&action=register`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={signUplogger}
            >
              {"Start Building for Free"}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Post
