import React from "react"
import styles from "./cardlist.module.scss"
import { Link } from "gatsby"
import Bio from "./bio"
import defaultImg from "../../content/assets/default-blog.jpg"

// Utilities
import kebabCase from "lodash/kebabCase"
import Img from "gatsby-image"

const Card = ({ node }) => {
  const tags = node.frontmatter.tags || ""
  let coverImagePath = node.frontmatter.coverImage
  let descriptionText = node.frontmatter.description || node.excerpt
  return (
    <div className={`${styles.user} mb-80`}>
      <div className={styles.avatar}>
        <Link className="bs-md" to={node.fields.slug}>
          {coverImagePath ? (
            <Img fluid={coverImagePath.childImageSharp.fluid} Tag="div" />
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
                to={`/blog/tags/${kebabCase(tag)}/`}
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
          <Bio date={node.frontmatter.date} author={node.frontmatter.author} />
        )}
      </div>
    </div>
  )
}

export default Card
