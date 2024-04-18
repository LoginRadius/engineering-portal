import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import CardList from "../components/cardList"
import Pagination from "../components/pagination"
import SEO from "../components/seo"

const { startCase } = require("lodash")

const BlogList = ({ data, pageContext, location }) => {
  const { currentPage, numPages, type } = pageContext
  const pinnedNode = data.markdownRemark
  const bType = type.replace(/[^a-z]/gi, "")

  return (
    <Layout
      pinned
      pinnedData={pinnedNode}
      type={bType}
      pathname={location.pathname}
    >
      <SEO
        title={
          currentPage === 1
            ? bType
              ? `${startCase(bType)}`
              : ""
            : bType
            ? `Page ${currentPage} - ${startCase(bType)}`
            : `Page ${currentPage}`
        }
        pathname={location.pathname}
        description={
          currentPage === 1
            ? bType
              ? `${startCase(
                  bType
                )} Blog is a place for developers to share their expertise, find solutions for development problems, and become more efficient.`
              : "A list of all the blogs from different categories"
            : bType
            ? `LoginRadius ${startCase(bType)} blog Page ${currentPage}`
            : `LoginRadius blog Page ${currentPage}`
        }
      />
      <main>
        <CardList posts={data.allMarkdownRemark.edges} type={bType} />
        <Pagination pages={numPages} currentPage={currentPage} type={bType} />
      </main>
    </Layout>
  )
}

export default BlogList

export const blogListQuery = graphql`
  query blogListQuery(
    $skip: Int!
    $limit: Int!
    $type: String!
    $pinned: String!
  ) {
    allMarkdownRemark(
      filter: { fields: { slug: { regex: $type } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
                fluid {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            author {
              id
              github
              avatar
            }
          }
        }
      }
    }
    markdownRemark(id: { eq: $pinned }) {
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
            fluid {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        author {
          id
          github
          avatar
        }
      }
    }
  }
`
