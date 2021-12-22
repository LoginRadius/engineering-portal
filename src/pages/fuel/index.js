import React from "react"
import { graphql } from "gatsby"

const AsyncBlog = ({ page, data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <>
      {" "}
      <h1> This is fuel index page </h1>{" "}
      {posts.map(p => (
        <div>
          {" "}
          <p> {p.node.fields.slug} </p>
        </div>
      ))}
    </>
  )
}

export const asyncBlogQuery = graphql`
  query asyncBlogQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "fuel" } } }
      limit: 9
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
            gitAuthorTime(formatString: "MMMM DD, YYYY")
          }
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            description
            title
            tags
            coverImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            author {
              id
              github
            }
          }
        }
      }
    }
  }
`

export default AsyncBlog
