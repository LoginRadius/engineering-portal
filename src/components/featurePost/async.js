import React from "react"
import { graphql, StaticQuery } from "gatsby"
import List from "./list"

const AsyncFeatList = ({ slug }) => {
  return (
    <div>
      <StaticQuery
        query={graphql`
          query {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              filter: { frontmatter: { type: { eq: "async" } } }
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
                    type
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
    </div>
  )
}

export default AsyncFeatList
