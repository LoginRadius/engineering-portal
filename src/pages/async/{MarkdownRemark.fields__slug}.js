import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Post from "../../components/post"

const AsyncPostTemplate = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout hideTagMenu postPage>
      <Post post={post} />
    </Layout>
  )
}
export default AsyncPostTemplate

export const pageQuery = graphql`
  query AsyncPostBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      headings {
        value
        depth
      }
      fields {
        slug
      }
      frontmatter {
        description
        title
        type
        date(formatString: "MMMM DD, YYYY")
        tags
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
          bio
        }
      }
    }
  }
`
