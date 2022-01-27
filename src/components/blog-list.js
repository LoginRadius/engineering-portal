import React from "react"
import CardList from "../components/cardList"
import Layout from "../components/layout"
import Pagination from "../components/pagination"

const BlogList = props => {
  const { data, pathname, currentPage, type } = props
  const total = data.allMarkdownRemark.totalCount
  const numPages = Math.ceil(total / 6)
  const posts = data.allMarkdownRemark.edges
  const pinnedNode = posts.filter(edges => edges.node.frontmatter.pinned)
  const pinnedData =
    pinnedNode && pinnedNode.length != 0
      ? pinnedNode[0].node
      : data.allMarkdownRemark.edges[0].node
  return (
    <Layout pinnedData={pinnedData} pinned>
      <main>
        <CardList
          posts={data.allMarkdownRemark.edges}
          total={total}
          currentPage={currentPage}
          type={type || "all"}
          isPagination={type}
        />
        {type && (
          <Pagination
            pages={numPages}
            currentPage={parseInt(currentPage)}
            type={type}
          />
        )}
      </main>
    </Layout>
  )
}

export default BlogList
