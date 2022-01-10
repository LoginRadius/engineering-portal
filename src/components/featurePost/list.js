import React from "react"
import { Link } from "gatsby"

const List = ({ featurePost, slug }) => {
  return (
    <>
      {featurePost.length ? (
        <div>
          <h3>Featured Posts</h3>
          {featurePost.map(({ node }, i) =>
            slug === node.fields.slug ? (
              <div> </div>
            ) : (
              <ul>
                <li>
                  <Link
                    to={`/${node.frontmatter.type}${node.fields.slug}`}
                    rel="prev"
                  >
                    {node.frontmatter.title}
                  </Link>
                </li>
              </ul>
            )
          )}
        </div>
      ) : null}
    </>
  )
}
export default List
