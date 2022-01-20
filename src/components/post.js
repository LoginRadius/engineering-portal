import { Link } from "gatsby"
import Img from "gatsby-image"
import kebabCase from "lodash/kebabCase"
import React from "react"
import ReactGA from "react-ga"
import Helmet from "react-helmet"
import Docs from "../../static/consumer-identity-trend.png"
import headStyles from "./cardlist.module.scss"
import AsyncFeatList from "./featurePost/async"
import FuelFeatList from "./featurePost/fuel"
import IdentityFeatList from "./featurePost/identity"
import styles from "./post.module.scss"
import Subscribe from "./subscribe"
import TagMenu from "./tagMenu"
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
const Post = ({ post, relatedPost, type }) => {
  const headings = post.headings
  const image = post.frontmatter.coverImage
  const tags = post.frontmatter.tags || []
  const author = post.frontmatter.author
  const githubUrl = author.github
    ? `https://github.com/${author.github}.png?size=100`
    : `https://ui-avatars.com/api/?name=${author.id}&size=460`

  return (
    <>
      <Helmet>
        <script
          id="s9-sdk"
          async
          defer
          content="3eb69d6a4ae94cb1a27493eb04268fdb"
          src="//cdn.social9.com/js/socialshare.min.js"
        ></script>
        <script
          defer
          src="https://social9.com/comments/js/commento.js"
        ></script>
      </Helmet>

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
                tags.map(tag => (
                  <Link to={`/tags/${kebabCase(tag)}/`}> {tag} </Link>
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
              <div
                className={styles.postContent}
                dangerouslySetInnerHTML={{ __html: post.html }}
              />

              <div class={`${styles.author} d-flex py-96`}>
                <div class={styles.authorImage}>
                  <Link to={`/author/${kebabCase(author.id)}/`}>
                    <img
                      className={`circle extra-large`}
                      src={githubUrl}
                      alt={author.id}
                    />
                  </Link>
                </div>
                <div class={styles.aboutAuthor}>
                  <div class={styles.aboutAuthorInner}>
                    <h3>
                      Writter by&nbsp;
                      <Link to={`/author/${kebabCase(author.id)}/`}>
                        {author.id}
                      </Link>
                    </h3>
                    <p>{author.bio}</p>
                  </div>
                </div>
              </div>
              <div class={`${headStyles.sidebar} ${headStyles.detailPage}`}>
                {relatedPost && relatedPost.length ? (
                  <div
                    class={`${headStyles.sidebarWidget} ${headStyles.posts}`}
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
                <div class={headStyles.subscribeDetail}>
                  <h3>
                    Did you enjoy this article? Subscribe to new articles!
                  </h3>
                  <Subscribe type={type} />
                </div>
              </div>
            </div>
            <div class={headStyles.sidebar}>
              <div class={`${headStyles.sidebarWidget} ${headStyles.posts}`}>
                {type === "async" ? (
                  <AsyncFeatList slug={post.fields.slug} />
                ) : type === "fuel" ? (
                  <FuelFeatList slug={post.fields.slug} />
                ) : (
                  <IdentityFeatList slug={post.fields.slug} />
                )}
              </div>
              <div class={`${headStyles.sidebarWidget} ${headStyles.tags}`}>
                <TagMenu />
              </div>

              <div class={`${headStyles.sidebarWidget} ${headStyles.cta}`}>
                <div class={headStyles.image}>
                  <img src={Docs} alt="LoginRadius Docs" />
                </div>
                <div class={headStyles.text}>
                  <h3>Implement Authentication in Minutes</h3>
                  <a
                    className={`${headStyles.btnPrimary} btn-primary ga_event`}
                    // className={"btn-primary ga_event"}
                    href={"https://www.loginradius.com/docs/developer"}
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
            </div>
          </div>
        </div>
        {headings && headings.length && <ToC headings={headings} />}

        <div>
          <div id="commento"></div>
        </div>
      </section>
      <section className={styles.bgBright01}>
        <div className={`${styles.grid6633} ${styles.ctaSmall}`}>
          <div className={styles.ctaSmallText}>
            <h3>Free, Secure and Trusted Way to Authenticate Your Visitors</h3>
            <p>
              Add login to your website in <b>5 minutes</b> completely{" "}
              <b>for free</b>!
            </p>
          </div>

          <div className={styles.ctaSmallButton}>
            <p>
              <a
                className={`${styles.navcta} btn-primary  ga_event }`}
                href={`https://accounts.loginradius.com/auth.aspx?action=register&return_url=https://dashboard.loginradius.com/login`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={signUplogger}
              >
                {"Free Sign Up"}
              </a>
              <span>No hidden costs. No credit card needed.</span>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Post
