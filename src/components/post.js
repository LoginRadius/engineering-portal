import React from "react"
import Helmet from "react-helmet"
import Img from "gatsby-image"
import kebabCase from "lodash/kebabCase"
import _ from "lodash"

import SEO from "./seo"
import Bio from "./bio"

import styles from "./post.module.scss"

import { Link } from "gatsby"

import headStyles from "./cardlist.module.scss"
import TagMenu from "./tagMenu"

import ReactGA from "react-ga"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import getTimeToRead from "../utils/timeToRead"
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
const Post = ({ post, relatedPost }) => {
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
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={image && image.childImageSharp.fluid.src}
        pathname={post.fields.slug}
        article
      />
      <section
        className={`${headStyles.pinnedwrap} ${headStyles.postDetail} py-80`}
      >
        <div className={headStyles.blogContentPinned}>
          <div className={headStyles.avatarPinned}>
            <Img
              fluid={image.childImageSharp.fluid}
              Tag="div"
              className="bs-md"
              alt={post.frontmatter.title}
            />
          </div>
          <div className={headStyles.descriptionPinned}>
            <div className={`${headStyles.tag} ${headStyles.pinned}`}>
              {tags &&
                tags.map(tag => (
                  <Link to={`/tags/${kebabCase(tag)}/`}> {tag} </Link>
                ))}
            </div>
            <div className={headStyles.description}>
              <h1>{post.frontmatter.title || post.fields.slug}</h1>
              <p
                className={`${headStyles.descriptiontext} ${headStyles.pinned}`}
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
              />
            </div>
            {author && (
              <Bio
                readingTime={getTimeToRead(post.html)}
                date={post.frontmatter.date}
                author={author}
                pinned
              />
            )}
          </div>
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
      <section className={`pt-80 ${styles.postDetail}`}>
        <div>
          <div className="grid-70-30">
            <div
              className={styles.postContent}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <div class={styles.sidebar}>
              {relatedPost.length ? (
                <>
                  <div class={styles.relatedPost}>
                    <div className={styles.relatedPostRow}>
                      <h3>Related Posts</h3>
                      <ul className={styles.description}>
                        {relatedPost.map(({ node }, i) => (
                          <li key={i}>
                            <Link to={node.fields.slug} rel="prev">
                              {node.frontmatter.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/*{relatedPost.map(({ node }, i) => (*/}
                    {/*  <div class={styles.relatedPostRow}>*/}
                    {/*    <div class={styles.description}>*/}
                    {/*      <h4>*/}
                    {/*        <Link to={node.fields.slug} rel="prev">*/}
                    {/*          {node.frontmatter.title}*/}
                    {/*        </Link>*/}
                    {/*      </h4>*/}
                    {/*    </div>*/}
                    {/*    <div class={styles.tag}>*/}
                    {/*      {node.frontmatter.tags.map(tag => (*/}
                    {/*        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>*/}
                    {/*      ))}*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*))}*/}
                  </div>
                  <hr />
                </>
              ) : null}
              <div>
                <h3>Follow LoginRadius </h3>
                <div className={styles.followBtn}>
                  <a
                    href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fwww.loginradius.com%2Fblog%2Fasync%2Frss.xml"
                    onClick={() =>
                      eventLogger({
                        category: "Social Clicks",
                        action: "Clicked on Feedly",
                        label: "Feedly",
                      })
                    }
                    target="blank"
                  >
                    <img
                      id="feedlyFollow"
                      src="https://s3.feedly.com/img/follows/feedly-follow-logo-green_2x.png"
                      alt="follow us in feedly"
                      width="28"
                      height="28"
                    />
                    <p> via feedly </p>
                  </a>
                  <a
                    href="https://twitter.com/LoginRadius"
                    onClick={() =>
                      eventLogger({
                        category: "Social Clicks",
                        action: "Clicked on Twitter",
                        label: "Twitter",
                      })
                    }
                    target="blank"
                  >
                    <FontAwesomeIcon icon={faTwitter} title={"Twitter"} />
                    <p> on twitter </p>
                  </a>
                </div>
              </div>
              <hr />
              <div>
                <h3>LoginRadius Docs</h3>
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
                  {"click here"}
                </a>
              </div>
              <hr />
              <TagMenu />
            </div>
          </div>
          <div className="grid-70-30">
            <div className={styles.postContent}>
              <h2>Do you want a free authentication solution?</h2>
              <p>
                Add the world's most secure, reliable and easy to implement user authentication solution on your applications at $0
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
          </div>
          <div class={`${styles.author} d-flex py-80`}>
            <div class={styles.authorImage}>
              <img
                className={`circle extra-large`}
                src={githubUrl}
                alt={author.id}
              />
            </div>
            <div class={styles.aboutAuthor}>
              <div class={styles.aboutAuthorInner}>
                <h3>{author.id}</h3>
                <p>{author.bio}</p>
                <Link to={`/author/${_.kebabCase(author.id)}/`}>
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        <ToC headings = {headings}/>

        <div id="commento"></div>
      </section>
    </>
  )
}

export default Post
