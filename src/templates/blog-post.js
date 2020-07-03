import { graphql } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import Post from "../components/post"

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout hideTagMenu postPage>
      <Post post={post} relatedPost={data.allMarkdownRemark.edges} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $tags: [String]!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        description
        title
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
    allMarkdownRemark(
      filter: {
        frontmatter: { tags: { in: $tags } }
        fields: { slug: { ne: $slug } }
      }
      limit: 3
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`
