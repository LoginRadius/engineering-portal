import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import CardList from "../components/cardList"
import Pagination from "../components/pagination"
import SEO from "../components/seo"

const BlogList = ({ data, pageContext, location }) => {
  const total = data.allMarkdownRemark.totalCount
  const { currentPage, numPages } = pageContext
  return (
    <Layout pinned>
      <SEO
        title={currentPage === 1 ? "" : `Page ${currentPage}`}
        image={data.allMarkdownRemark.edges[0].node.frontmatter.coverImage}
        pathname={location.pathname}
        description={`LoginRadius Engineering Blog - Page ${currentPage} of ${Math.ceil(
          total / 6
        )}`}
      />
      <main>
        <CardList posts={data.allMarkdownRemark.edges} total={total} />
        <Pagination pages={numPages} currentPage={currentPage} />
      </main>
    </Layout>
  )
}

export default BlogList

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
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
