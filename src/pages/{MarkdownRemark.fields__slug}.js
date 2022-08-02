import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Post from "../components/post"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark
  const pathname = post.fields.slug
  const {
    title,
    metatitle,
    metadescription,
    description,
    coverImage,
  } = post.frontmatter
  let type = ""
  if (pathname.includes("/engineering/")) {
    type = "engineering"
  } else if (pathname.includes("/growth/")) {
    type = "growth"
  } else if (pathname.includes("/identity/")) {
    type = "identity"
  } else {
    type = ""
  }
  return (
    <Layout hideTagMenu postPage pathname={pathname} type={type}>
      <SEO
        title={`${metatitle || title} | LoginRadius Blog`}
        description={metadescription || description || post.excerpt}
        image={coverImage && coverImage.childImageSharp.fluid.src}
        pathname={pathname}
        article
      />
      <Post post={post} type={type} />
    </Layout>
  )
}
export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
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
        metatitle
        metadescription
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
