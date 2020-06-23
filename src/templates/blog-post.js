import { graphql, Link } from "gatsby"
import React from "react"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Post from "../components/post"
import postStyles from "../components/post.module.scss"
import SEO from "../components/seo"

import Helmet from "react-helmet"

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark
  const image = post.frontmatter.coverImage
  const relatedPost = data.allMarkdownRemark.edges
  return (
    <Layout hideTagMenu postPage>
      <Helmet>
        <script
          id="s9-sdk"
          async
          defer
          content="3eb69d6a4ae94cb1a27493eb04268fdb"
          src="//cdn.social9.com/js/socialshare.min.js"
        ></script>
      </Helmet>
      <Post>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          image={image && image.childImageSharp.fluid.src}
          pathname={post.fields.slug}
          article
        />
        <article>
          <header className={postStyles.header}>
            <div className={postStyles.metaInfo}>
              <p>{post.frontmatter.date}</p>
              {post.frontmatter.tags && (
                <>
                  <span className={postStyles.spaceLine}></span>
                  <p>{post.frontmatter.tags.join(", ")}</p>
                </>
              )}
            </div>
            <h1>{post.frontmatter.title}</h1>
            <Bio
              date={post.frontmatter.date}
              author={post.frontmatter.author}
            />
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <Helmet>
            <script defer src="https://cdn.commento.io/js/commento.js"></script>
          </Helmet>
          <div id="commento"></div>
        </article>
        {relatedPost.length ? (
          <nav className={postStyles.relatedPost}>
            <p> Related Posts </p>
            <ul>
              {relatedPost.map(({ node }, i) => (
                <li>
                  <Link to={node.fields.slug} rel="prev">
                    {node.frontmatter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </Post>
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
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        coverImage {
          childImageSharp {
            fluid(maxWidth: 300) {
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
          }
        }
      }
    }
  }
`
