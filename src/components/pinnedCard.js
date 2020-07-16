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
                  description
                  coverImage {
                    childImageSharp {
                      fluid(quality: 80) {
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
        const tags = node.frontmatter.tags || []
        let coverImagePath = node.frontmatter.coverImage
        return (
          <section className={`${styles.pinnedwrap} py-80`}>
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
                      <Link to={`/blog/tags/${kebabCase(tag)}/`}> {tag} </Link>
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
                  />
                )}
              </div>
            </div>
          </section>
        )
      }}
    />
  )
}

export default PinnedCard
