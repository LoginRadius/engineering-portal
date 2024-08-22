import React from "react"
import { Link } from "gatsby"

const List = ({ featurePost, slug }) => {
  return (
    <React.Fragment>
      {featurePost.length ? (
        <React.Fragment>
          <h3>Featured Posts</h3>
          <ul>
            {featurePost.map(({ node }, i) =>
              slug === node.fields.slug ? null : (
                <li key={i}>
                  <Link to={node.fields.slug} rel="prev">
                    {node.frontmatter.title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  )
}
export default List
