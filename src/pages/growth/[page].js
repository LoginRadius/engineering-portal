import React from "react"
import { graphql } from "gatsby"
import BlogList from "../../components/blog-list"
import SEO from "../../components/seo"

const FuelBlogPage = props => {
  return (
    <>
      <SEO
        title={`Page ${props.page} - Growth | LoginRadius Blog`}
        description={`LoginRadius Growth blog Page ${props.page}`}
        pathname={props.location.pathname}
      />
      <BlogList
        data={props.data}
        currentPage={props.page || 1}
        pathname={props.location.pathname}
        type={"fuel"}
      />
    </>
  )
}

export const FuelBlogQuery = graphql`
  query FuelBlogQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { slug: { regex: "/growth/" } } }
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
                gatsbyImageData(layout: FIXED)
              }
            }
            author {
              jsonId
              github
            }
          }
        }
      }
    }
  }
`

export default FuelBlogPage
