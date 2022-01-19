import React from "react"
import { graphql } from "gatsby"
import BlogList from "../../components/blog-list"
import SEO from "../../components/seo"

const SWIBlog = props => {
  return (
    <>
      <SEO
        title={"Identity | LoginRadius Blog"}
        description="Blog posts describing security developments in access management, recent observations into identity management, user authentication, digital security, and user interface of CIAM."
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

export const swiBlogQuery = graphql`
  query swiBlogQuery {
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

export default SWIBlog
