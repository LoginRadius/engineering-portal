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
        title={""}
        image={data.allMarkdownRemark.edges[0].node.frontmatter.coverImage}
        pathname={location.pathname}
      />
      <main>
        <CardList posts={data.allMarkdownRemark.edges} total={total} />
        <Pagination pages={numPages} currentPage={currentPage} />
      </main>
    </Layout>
  )
}

export default BlogList

const SERVER_DATE = new Date().toISOString().slice(0, 10)

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { date: { lte: "${SERVER_DATE}" } }
      }
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
