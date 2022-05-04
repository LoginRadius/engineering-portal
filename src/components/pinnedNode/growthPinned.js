import { graphql, StaticQuery } from "gatsby"
import React from "react"
import PinnedCard from "../pinnedCard"

const GrowthPinned = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            filter: { fields: { slug: { regex: "//growth//" } } }
            limit: 1
            sort: { fields: [frontmatter___date], order: DESC }
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
                  }
                }
              }
            }
          }
        }
      `}
      render={({ allMarkdownRemark: { edges } }) => (
        <PinnedCard node={edges[0].node} />
      )}
    />
  )
}

export default GrowthPinned
