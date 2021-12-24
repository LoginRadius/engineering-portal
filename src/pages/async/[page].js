import React, { useState } from "react"
import { graphql } from "gatsby"
import BlogList from "../../components/blog-list"

const AsyncBlogPage = props => {
  return (
    <BlogList
      data={props.data}
      currentPage={props.page || 1}
      pathname={props.location.pathname}
    />
  )
}

export const AsyncBlogQuery = graphql`
  query AsyncBlogQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "async" } } }
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
            type
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
