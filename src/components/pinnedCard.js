import React from "react"
import styles from "./cardlist.module.scss"
import { Link, StaticQuery } from "gatsby"
import Bio from "./bio"
import defaultImg from "../../content/assets/default-blog.jpg"

// Utilities
import kebabCase from "lodash/kebabCase"
import Img from "gatsby-image"

const PinnedCard = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1
          ) {
            edges {
              node {
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  date(formatString: "MMMM DD, YYYY")
                  title
                  tags
                  coverImage {
                    childImageSharp {
                      fluid(maxWidth: 300, quality: 80) {
                        ...GatsbyImageSharpFluid_noBase64
                      }
                    }
                  }
                  author {
                    id
                    github
                  }
                }
                fields {
                  authorId
                  slug
                }
              }
            }
          }
        }
      `}
      render={data => {
        const node = data.allMarkdownRemark.edges[0].node
        const tags = node.frontmatter.tags || ""
        let coverImagePath = node.frontmatter.coverImage
        return (
          <div className={`${styles.user} ${styles.pinned}`}>
            {coverImagePath ? (
              <Img
                fluid={coverImagePath.childImageSharp.fluid}
                Tag="div"
                className={styles.avatarPinned}
              />
            ) : (
              <img
                src={defaultImg}
                className={styles.avatarPinned}
                alt="default-img"
              />
            )}
            <div className={styles.description}>
              <header className={styles.header}>
                <h3>
                  <Link className={styles.pinnedtitle} to={node.fields.slug}>
                    {node.frontmatter.title || node.fields.slug}
                  </Link>
                </h3>
              </header>
              <section>
                <p
                  className={styles.pinneddescriptionText}
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
              <div className={styles.pinnedtag}>
                {tags &&
                  tags.map(tag => (
                    <Link to={`/blog/tags/${kebabCase(tag)}/`}> {tag} </Link>
                  ))}
              </div>
              {node.frontmatter.author && (
                <Bio
                  date={node.frontmatter.date}
                  author={node.frontmatter.author}
                />
              )}
            </div>
          </div>
        )
      }}
    />
  )
}

export default PinnedCard
