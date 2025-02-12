import { Link } from "gatsby"
import Img from "gatsby-image"
// Utilities
import kebabCase from "lodash/kebabCase"
import React from "react"
import ReactGA from "react-ga"
import defaultImg from "../../content/assets/default-blog.jpg"
import freeTrialImg from "../../content/assets/freetrial.png"
import getTimeToRead from "../utils/timeToRead"
import Bio from "./bio"
import styles from "./cardlist.module.scss"
import poststyle from "./post.module.scss"

const signUplogger = function () {
  ReactGA.event({
    category: "Signup",
    action: "User clicked on Free signup button",
    label: "Signup",
  })
}
const PinnedCard = props => {
  const { node } = props
  const tags = node.frontmatter.tags || []
  let coverImagePath = node.frontmatter.coverImage
  return (
    <React.Fragment>
      <section key={"pinned_card"} className={`${styles.pinnedwrap} py-96`}>
        <div className={styles.blogContentPinned}>
          <div className={styles.avatarPinned}>
            <Link to={node.fields.slug} className="bs-md">
              {coverImagePath ? (
                <img
                  src={coverImagePath.childImageSharp.fluid.src}
                  alt={node.frontmatter.title}
                  width={600}
                  height={
                    600 / coverImagePath.childImageSharp.fluid.aspectRatio
                  }
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
                date={node.frontmatter.date}
                author={node.frontmatter.author}
                pinned
                readingTime={getTimeToRead(node.html)}
              />
            )}
          </div>
        </div>
      </section>
      <section
        key={"pinned_card_cta"}
        className={poststyle.bgLightbluebright01}
      >
        <div className={`${poststyle.grid50} ${poststyle.ctaSmall}`}>
          <div className={poststyle.ctaSmallText}>
            <img src={freeTrialImg} alt="Free Trial" />
          </div>

          <div className={poststyle.ctaSmallButton}>
            <h3>LoginRadius CIAM Platform</h3>
            <p>
              Our Product Experts will show you the power of the LoginRadius
              CIAM platform, discuss use-cases, and prove out ROI for your
              business.
            </p>
            <br />
            <a
              className={`${poststyle.navcta}  btn-blueprimary  ga_event }`}
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
    </React.Fragment>
  )
}

export default PinnedCard
