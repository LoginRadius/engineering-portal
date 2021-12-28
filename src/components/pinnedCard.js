import React from "react"
import styles from "./cardlist.module.scss"
import { Link, StaticQuery } from "gatsby"
import Bio from "./bio"
import defaultImg from "../../content/assets/default-blog.jpg"
import style from "./post.module.scss"
// Utilities
import kebabCase from "lodash/kebabCase"
import Img from "gatsby-image"
import getTimeToRead from "../utils/timeToRead"
import ReactGA from "react-ga"
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
const PinnedCard = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          markdownRemark(frontmatter: { pinned: { eq: true } }) {
            html
            frontmatter {
              title
              tags
              author {
                github
                id
              }
              description
              coverImage {
                childImageSharp {
                  fluid(pngQuality: 80) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
            fields {
              gitAuthorTime(formatString: "MMMM DD, YYYY")
              slug
            }
          }
          allMarkdownRemark(
            filter: {}
            sort: { fields: frontmatter___date, order: DESC }
            limit: 1
          ) {
            edges {
              node {
                html
                frontmatter {
                  title
                  tags
                  author {
                    github
                    id
                  }
                  description
                  coverImage {
                    childImageSharp {
                      fluid(pngQuality: 80) {
                        ...GatsbyImageSharpFluid_noBase64
                      }
                    }
                  }
                }
                fields {
                  gitAuthorTime(formatString: "MMMM DD, YYYY")
                  slug
                }
              }
            }
          }
        }
      `}
      render={data => {
        const node = data.markdownRemark || data.allMarkdownRemark.edges[0].node
        const tags = node.frontmatter.tags || []
        const { gitAuthorTime } = node.fields
        let coverImagePath = node.frontmatter.coverImage
        return (
          <React.Fragment>
            <section className={`${styles.pinnedwrap} py-96`}>
              <div className={styles.blogContentPinned}>
                <div className={styles.avatarPinned}>
                  <Link to={node.fields.slug} className="bs-md">
                    {coverImagePath ? (
                      <Img
                        fluid={coverImagePath.childImageSharp.fluid}
                        Tag="div"
                      />
                    ) : (
                      <img src={defaultImg} alt="default-img" />
                    )}
                  </Link>
                </div>
                <div className={styles.descriptionPinned}>
                  <div className={`${styles.tag} ${styles.pinned}`}>
                    {tags &&
                      tags.map(tag => (
                        <Link to={`/tags/${kebabCase(tag)}/`}> {tag} </Link>
                      ))}
                  </div>
                  <div className={styles.description}>
                    <h1>
                      <Link to={node.fields.slug}>
                        {node.frontmatter.title || node.fields.slug}
                      </Link>
                    </h1>
                    <p
                      className={`${styles.descriptiontext} ${styles.pinned}`}
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </div>
                  {node.frontmatter.author && (
                    <Bio
                      date={
                        node.frontmatter.date === gitAuthorTime ||
                        gitAuthorTime === "Invalid date" ||
                        gitAuthorTime === undefined
                          ? node.frontmatter.date
                          : gitAuthorTime
                      }
                      author={node.frontmatter.author}
                      pinned
                      readingTime={getTimeToRead(node.html)}
                    />
                  )}
                </div>
              </div>
            </section>
            <section className={style.bgBright01}>
              <div className={`${style.grid6633} ${style.ctaSmall}`}>
                <div className={style.ctaSmallText}>
                  <h3>
                    Free, Secure and Trusted Way to Authenticate Your Visitors
                  </h3>
                  <p>
                    Add login to your website in <b>5 minutes</b> completely{" "}
                    <b>for free</b>!
                  </p>
                </div>

                <div className={style.ctaSmallButton}>
                  <p>
                    <a
                      className={`${style.navcta} btn-primary  ga_event }`}
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
          </React.Fragment>
        )
      }}
    />
  )
}

export default PinnedCard
