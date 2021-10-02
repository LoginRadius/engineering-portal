import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import * as styles from "./post.module.scss"

// Utilities
import kebabCase from "lodash/kebabCase"

const TagMenu = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark {
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
          <div className={styles.sidebar}>
            <div className={styles.tag}>
              <h3> Most Popular Tags </h3>
              {group.slice(0, 10).map(item => (
                <Link to={`/tags/${kebabCase(item.tag)}/`}>
                  {item.tag}
                </Link>
              ))}
            </div>
          </div>
        )
      }}
    />
  )
}

export default TagMenu
