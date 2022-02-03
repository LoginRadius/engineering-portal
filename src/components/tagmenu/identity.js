import React from "react"
import { Link, StaticQuery } from "gatsby"
import { graphql } from "gatsby"

// Utilities
import kebabCase from "lodash/kebabCase"

const IdentityTagMenu = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            filter: { fields: { slug: { regex: "/identity/" } } }
          ) {
            group(field: frontmatter___tags) {
              tag: fieldValue
              totalCount
            }
          }
        }
      `}
      render={({ allMarkdownRemark: { group } }) => {
        group.sort((t1, t2) => {
          return t2.totalCount - t1.totalCount
        })
        return (
          <React.Fragment>
            {group.slice(0, 10).map((item, index) => (
              <Link key={`tag_${index}`} to={`/tags/${kebabCase(item.tag)}/`}>
                {item.tag}
              </Link>
            ))}
          </React.Fragment>
        )
      }}
    />
  )
}

export default IdentityTagMenu
