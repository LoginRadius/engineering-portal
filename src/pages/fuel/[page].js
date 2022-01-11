import React from "react"
import { graphql } from "gatsby"
import BlogList from "../../components/blog-list"

const FuelBlogPage = props => {
  return (
    <BlogList
      data={props.data}
      currentPage={props.page || 1}
      pathname={props.location.pathname}
    />
  )
}

export const FuelBlogQuery = graphql`
  query FuelBlogQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { slug: { regex: "/fuel/" } } }
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

export default FuelBlogPage
