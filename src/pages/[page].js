import React from "react"
import { graphql } from "gatsby"
import BlogList from "../components/blog-list"
import SEO from "../components/seo"

const Home = props => {
  return (
    <>
      <SEO
        title={`Page ${props.page} - LoginRadius Blog`}
        description={`LoginRadius blog Page ${props.page}`}
        pathname={props.location.pathname}
      />
      <BlogList
        data={props.data}
        currentPage={props.page || 1}
        pathname={props.location.pathname}
      />
    </>
  )
}

export const allBlogQuery = graphql`
  query allBlogPageQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
export default Home
