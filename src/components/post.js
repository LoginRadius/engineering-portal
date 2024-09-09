import { Link, withPrefix } from "gatsby"
import Img from "gatsby-image"
import kebabCase from "lodash/kebabCase"
import React from "react"
import ReactGA from "react-ga"
import Helmet from "react-helmet"
//import Docs from "../../static/consumer-digital-identity-trends-2023.jpg"
import headStyles from "./cardlist.module.scss"
import AsyncFeatList from "./featurePost/async"
import FuelFeatList from "./featurePost/fuel"
import IdentityFeatList from "./featurePost/identity"
import styles from "./post.module.scss"
import Subscribe from "./subscribe"
import TagMenu from "./tagmenu"
import AsyncTagMenu from "./tagmenu/async"
import IdentityTagMenu from "./tagmenu/identity"
import ToC from "./toc"
import ReactDOMServer from "react-dom/server" // Import renderToString from react-dom/server

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
const Post = ({ post, relatedPost, type }) => {
  const headings = post.headings
  const image = post.frontmatter.coverImage
  const tags = post.frontmatter.tags || []
  const author = post.frontmatter.author
  const githubUrl = author.github
    ? `https://github.com/${author.github}.png?size=100`
    : author.avatar
    ? `${withPrefix("avatar/")}${author.avatar}`
    : `https://ui-avatars.com/api/?name=${author.id}&size=460`

  const headingId = headings[1].value
    .replace(/\s+/g, "-")
    .replace(/[.:;#*+=?!><^&$@%{}()|/[\]\\]/g, "")
    .toLowerCase()
  const regex = new RegExp(`id="${headingId}"`, "g")
  const splitHtml = headings && headings.length && post.html.split(regex)

  // Iterate over the splitHtml array and modify the content
  const modifiedHtml = splitHtml.map((part, index) => {
    // Find the second h2 (assuming it’s the second full match)
    console.log(part)
    if (index === 0) {
      const kkk = part.split("<h")
      console.log(kkk.length - 1)
      return `${kkk
        .slice(0, -1)
        .join("<h")}<div id="toc">${ReactDOMServer.renderToString(
        <ToC headings={headings} />
      )}</div><h${kkk[kkk.length - 1].replace(" ", ` id="${headingId}"`)}`
    }
    return `${part}` // Keep everything else the same
  })

  return (
    <>
      <section
        className={`${headStyles.pinnedwrap} ${headStyles.postDetail} py-96`}
      >
        <div className={headStyles.blogContentPinned}>
          <div className={headStyles.descriptionPinned}>
            <div className={headStyles.description}>
              <h1>{post.frontmatter.title || post.fields.slug}</h1>
              <div className={headStyles.text}>
                <span>By&nbsp;</span>
                <Link to={`/author/${kebabCase(author.id)}/`}>
                  <strong>{author.id}</strong>
                </Link>
              </div>
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
          </div>
          <div className={headStyles.avatarPinned}>
            <Img
              fluid={image.childImageSharp.fluid}
              Tag="div"
              className="bs-md"
              alt={post.frontmatter.title}
            />
          </div>
        </div>
      </section>

      <section className={styles.postDetail}>
        <div>
          <div className={`${styles.postDetailInner} pt-96 grid-67-33`}>
            <div>
              {headings && headings.length ? (
                <>
                  <div
                    className={styles.postContent}
                    dangerouslySetInnerHTML={{
                      __html: `${modifiedHtml.join("")}`,
                    }}
                  />
                </>
              ) : (
                <div
                  className={styles.postContent}
                  dangerouslySetInnerHTML={{ __html: `${post.html}` }}
                />
              )}

              <div className={`${styles.author} d-flex py-96`}>
                <div className={styles.authorImage}>
                  <Link to={`/author/${kebabCase(author.id)}/`}>
                    <img
                      className={`circle extra-large`}
                      src={githubUrl}
                      alt={author.id}
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
              <div className={`${headStyles.sidebarWidget} ${headStyles.cta}`}>
                {
                  <>
                    <div className={headStyles.image}>
                      <img
                        src="https://www.loginradius.com/wp-content/uploads/2024/06/kuppingercole-2024-resource-landing-page-resource.png"
                        alt="Overall CIAM Leader 2024"
                        style={{ backgroundColor: "#fff" }}
                      />
                    </div>
                    <div className={headStyles.text}>
                      <h3 style={{ textAlign: "center" }}>
                        Overall CIAM Leader 2024
                      </h3>
                      <a
                        className={`${headStyles.btnPrimary} btn-primary ga_event`}
                        // className={"btn-primary ga_event"}
                        href={
                          "https://www.loginradius.com/resource/analyst-report/cioreview-names-loginradius-top-ciam-platform-2024/"
                        }
                        key={"overall-ciam-leader-2024"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          eventLogger({
                            category: "Overall CIAM Leader 2024",
                            action: "User clicked on Free Download button",
                            label: "Overall CIAM Leader 2024",
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
      </section>
      <section key={"pinned_card_cta"} className={styles.bgBright01}>
        <div className={`${styles.grid6633} ${styles.ctaSmall}`}>
          <div className={styles.ctaSmallText}>
            <h3>LoginRadius CIAM Platform</h3>
            <p>
              Our Product Experts will show you the power of the LoginRadius
              CIAM platform, discuss use-cases, and prove out ROI for your
              business.
            </p>
          </div>

          <div className={styles.ctaSmallButton}>
            <p>
              <a
                className={`${styles.navcta} btn-primary  ga_event }`}
                href={`https://www.loginradius.com/book-a-demo/`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={signUplogger}
              >
                {"Book A Demo Today"}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Post
