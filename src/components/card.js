import React from "react"
import styles from "./cardlist.module.scss"
import { Link } from "gatsby"
import Bio from "./bio"
import defaultImg from "../../content/assets/default-blog.webp"

// Utilities
import kebabCase from "lodash/kebabCase"
import Img from "gatsby-image"
import getTimeToRead from "../utils/timeToRead"

const Card = ({ node }) => {
  const tags = node.frontmatter.tags || ""
  let coverImagePath = node.frontmatter.coverImage
  let descriptionText = node.frontmatter.description || node.excerpt
  return (
    <React.Fragment>
      <div className={`${styles.user} mb-48`}>
        <div className={styles.avatar}>
          <Link className="bs-md" to={node.fields.slug}>
            {coverImagePath ? (
              <img
                src={coverImagePath.childImageSharp.fluid.src}
                alt={node.frontmatter.title || node.fields.slug}
                width={360}
                height={257}
              />
            ) : (
              <img src={defaultImg} alt="default-img" />
            )}
          </Link>
        </div>
        <div className={styles.descriptionWrap}>
          <div className={styles.tag}>
            {tags &&
              tags.map((tag, index) => (
                <Link
                  key={`${tag}-${index}`}
                  aria-label={tag}
                  to={`/tags/${kebabCase(tag)}/`}
                >
                  {tag}
                </Link>
              ))}
          </div>
          <div className={styles.description}>
            <h3>
              <Link to={node.fields.slug}>
                {node.frontmatter.title || node.fields.slug}
              </Link>
            </h3>
            <p
              dangerouslySetInnerHTML={{
                __html: descriptionText,
              }}
            />
          </div>
          {node.frontmatter.author && (
            <Bio
              created_date={node.frontmatter.date}
              updated_date={node.frontmatter.updated_date}
              author={node.frontmatter.author}
              readingTime={getTimeToRead(node.html)}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Card
