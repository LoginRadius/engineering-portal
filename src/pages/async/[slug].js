import React from "react"
import { graphql } from "gatsby"
import BlogList from "../../components/blog-list"
import BlogPostTemplate from "../../components/blog-post"
import Layout from "../../components/layout"
import Post from "../../components/post"

const AsyncBlogPage = props => {
  const isInt = Number.isInteger(props.slug)
  const post = props.data.markdownRemark
  console.log(props.page)
  if (isInt) {
    return <BlogList />
  } else {
    return (
      <Layout hideTagMenu postPage>
        <Post post={post} relatedPost={props.data.allMarkdownRemark.edges} />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
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

export default AsyncBlogPage
