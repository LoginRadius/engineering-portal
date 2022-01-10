import React from "react"
import Helmet from "react-helmet"
import Img from "gatsby-image"
import kebabCase from "lodash/kebabCase"
import _ from "lodash"
import SEO from "./seo"
import Bio from "./bio"
import ToC from "./toc"
import styles from "./post.module.scss"

import { Link } from "gatsby"

import headStyles from "./cardlist.module.scss"
import TagMenu from "./tagMenu"

import ReactGA from "react-ga"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import getTimeToRead from "../utils/timeToRead"
import Docs from "../../static/consumer-identity-trend.png"

import AsyncFeatList from "./featurePost/async"
import FuelFeatList from "./featurePost/fuel"
import IdentityFeatList from "./featurePost/identity"

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
const Post = ({ post, relatedPost }) => {
  const headings = post.headings
  const image = post.frontmatter.coverImage
  const type = post.frontmatter.type
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
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={image && image.childImageSharp.fluid.src}
        pathname={post.fields.slug}
        article
      />

      <section
        className={`${headStyles.pinnedwrap} ${headStyles.postDetail} py-96`}
      >
        <div className={headStyles.blogContentPinned}>
          <div className={headStyles.descriptionPinned}>
            <div className={headStyles.description}>
              <h1>{post.frontmatter.title || post.fields.slug}</h1>
              <div className={headStyles.text}>
                <span>By&nbsp;</span>
                <a href="#">
                  <strong>Authar Name</strong>
                </a>
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
            <div
              className={styles.postContent}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <div class={styles.sideBar}>
              <div class={`${styles.sideBarWidget} ${styles.posts}`}>
                {type === "async" ? (
                  <AsyncFeatList slug={post.fields.slug} />
                ) : type === "fuel" ? (
                  <FuelFeatList slug={post.fields.slug} />
                ) : (
                  <IdentityFeatList slug={post.fields.slug} />
                )}
              </div>
              <div class={`${styles.sideBarWidget} ${styles.tags}`}>
                <TagMenu />
              </div>
              <div class={`${styles.sideBarWidget} ${styles.cta}`}>
                <div class="image">
                  <img src={Docs} alt="LoginRadius Docs" />
                </div>
                <div class="text">
                  <p>Implement Authentication in Minutes</p>
                  <a
                    className={"btn-primary ga_event"}
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
          {/* <div className="grid-70-30">
            <div className={styles.postContent}>
              <h2>Do you want a free authentication solution?</h2>
              <p>
                Add the world's most secure, reliable and easy to implement user
                authentication solution on your applications at $0
                <a
                  href="https://accounts.loginradius.com/auth.aspx?action=register&return_url=https://dashboard.loginradius.com/login&utm_source=async&utm_medium=blog&utm_campaign=fodb"
                  className={"btn-primary btn-cta ga_event"}
                  onClick={() =>
                    eventLogger({
                      category: "LoginRadius Home",
                      action: "User clicked on LoginRadius home page",
                      label: "LoginRadius Home",
                    })
                  }
                  target="blank"
                >
                  Get Started Free
                </a>
              </p>
            </div>
          </div> */}
          <div class={`${styles.author} d-flex py-96`}>
            <div class={styles.authorImage}>
              <img
                className={`circle extra-large`}
                src={githubUrl}
                alt={author.id}
              />
            </div>
            <div class={styles.aboutAuthor}>
              <div class={styles.aboutAuthorInner}>
                <h3>
                  Writter by&nbsp;
                  <Link to={`/author/${_.kebabCase(author.id)}/`}>
                    {author.id}
                  </Link>
                </h3>
                <p>{author.bio}</p>
                {/* <Link to={`/author/${_.kebabCase(author.id)}/`}>
                  View Profile
                </Link> */}
              </div>
            </div>
          </div>

          <div class={styles.sideBar}>
            {relatedPost && relatedPost.length ? (
              <div class={`${styles.sideBarWidget} ${styles.posts}`}>
                <h3>Related Posts</h3>
                {relatedPost.map(({ node }, i) => (
                  <ul>
                    <li>
                      <Link
                        to={`/${node.frontmatter.type}${node.fields.slug}`}
                        rel="prev"
                      >
                        {node.frontmatter.title}
                      </Link>
                    </li>
                  </ul>
                ))}
              </div>
            ) : null}
            <div
              className={`${headStyles.landing} ${headStyles.sidebar} ${headStyles.detailPage}`}
            >
              <div className={headStyles.subscribe}>
                <h3>Did you enjoy this article? Subscribe to new articles!</h3>
                <form>
                  <input type="text" placeholder="Enter your email" />
                  <button
                    className={`${headStyles.btn} btn-primary`}
                    type="submit"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToC headings={headings} />

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
