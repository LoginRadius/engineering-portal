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
  return (
    <Layout pinnedData={pinnedNode} pinned pathname={pathname} type={type}>
      <main>
        <CardList
          posts={data.allMarkdownRemark.edges}
          currentPage={currentPage}
          type={type || "all"}
        />
        <Pagination
          pages={numPages}
          currentPage={parseInt(currentPage)}
          type={type}
        />
      </main>
    </Layout>
  )
}

export default BlogList
