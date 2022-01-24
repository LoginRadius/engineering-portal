import React from "react"
import { graphql } from "gatsby"
import BlogList from "../../components/blog-list"
import SEO from "../../components/seo"

const AsyncBlog = props => {
  return (
    <>
      <SEO
        title={"Engineering | LoginRadius Blog"}
        description="Engineering Blog is a place for developers to share their expertise, find solutions for development problems, and become more efficient."
        pathname={props.location.pathname}
      />
      <BlogList
        data={props.data}
        currentPage={props.page || 1}
        pathname={props.location.pathname}
        type={"async"}
      />
    </>
  )
}

export const asyncBlogQuery = graphql`
  query asyncBlogQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { slug: { regex: "/engineering/" } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            description
            title
            tags
            pinned
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
