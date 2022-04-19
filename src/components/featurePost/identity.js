import React from "react"
import { graphql, StaticQuery } from "gatsby"
import List from "./list"

const IdentityFeatList = ({ slug }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { fields: { slug: { regex: "//identity//" } } }
            limit: 4
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
      `}
      render={data => {
        return (
          <>
            <List featurePost={data.allMarkdownRemark.edges} slug={slug} />
          </>
        )
      }}
    />
  )
}

export default IdentityFeatList
