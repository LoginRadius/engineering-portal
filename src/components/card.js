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
    <div className={styles.user}>
      {coverImagePath ? (
        <Img
          fluid={coverImagePath.childImageSharp.fluid}
          Tag="div"
          className={styles.avatar}
        />
      ) : (
        <img src={defaultImg} className={styles.avatar} alt="default-img" />
      )}
      <div className={styles.description}>
        <header className={styles.header}>
          <h3>
            <Link className={styles.title} to={node.fields.slug}>
              {node.frontmatter.title || node.fields.slug}
            </Link>
          </h3>
        </header>
        {descriptionText && (
          <section>
            <p
              className={styles.descriptionText}
              dangerouslySetInnerHTML={{
                __html: descriptionText,
              }}
            />
          </section>
        )}
        <div className={styles.tag}>
          {tags &&
            tags.map((tag, index) => (
              <Link
                key={`${tag}-${index}`}
                aria-label={tag}
                to={`/blog/tags/${kebabCase(tag)}/`}
              >
                {" "}
                {tag}{" "}
              </Link>
            ))}
        </div>
        {node.frontmatter.author && (
          <Bio date={node.frontmatter.date} author={node.frontmatter.author} />
        )}
      </div>
    </div>
  )
}

export default Card
