import React from "react"
import PropTypes from "prop-types"

// Components
import { graphql } from "gatsby"
import Layout from "../components/layout"
import CardList from "../components/cardList"
import SEO from "../components/seo"

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  const img = data.allMarkdownRemark.edges[0].node.frontmatter.coverImage

  return (
    <Layout location={""} title={""}>
      <SEO
        title={`${tag} - Tag`}
        description={`LoginRadius blog posts related to ${tag}`}
        image={img ? img.childImageSharp.fluid.src : ""}
        pathname={location.pathname}
      />
      <main>
        <section>
          <div className="pt-96">
            <h1 className="mb-0"> {tagHeader} </h1>
          </div>
        </section>
        <CardList posts={edges} />
      </main>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
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
