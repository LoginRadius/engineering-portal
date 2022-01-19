import React from "react"
import { graphql } from "gatsby"
import BlogList from "../../components/blog-list"
import SEO from "../../components/seo"

const SWIBlogPage = props => {
  return (
    <>
      <SEO
        title={`Page ${props.page} - Identity | LoginRadius Blog`}
        description={`LoginRadius Identity blog Page ${props.page}`}
        pathname={props.location.pathname}
      />
      <BlogList
        data={props.data}
        currentPage={props.page || 1}
        pathname={props.location.pathname}
        type={"start-with-identity"}
      />
    </>
  )
}

export const SWIBlogQuery = graphql`
  query SWIBlogQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { slug: { regex: "/start-with-identity/" } } }
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

export default SWIBlogPage
