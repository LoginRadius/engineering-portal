import React from "react"
import { graphql } from "gatsby"
import BlogList from "../../components/blog-list"
import SEO from "../../components/seo"

const AsyncBlogPage = props => {
  return (
    <>
      <SEO
        title={`Page ${props.page} - Engineering | LoginRadius Blog`}
        description={`LoginRadius Engineering blog Page ${props.page}`}
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

export const AsyncBlogQuery = graphql`
  query AsyncBlogQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { slug: { regex: "/async/" } } }
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

export default AsyncBlogPage
