import React from "react"
import Layout from "../components/layout"
import CardList from "../components/cardList"
import Pagination from "../components/pagination"
import SEO from "../components/seo"

const BlogList = props => {
  const { data, pathname, currentPage } = props
  const total = data.allMarkdownRemark.totalCount
  const numPages = Math.ceil(total / 6)
  const posts = data.allMarkdownRemark.edges
  const pinnedNode = posts.filter(edges => edges.node.frontmatter.pinned)
  const pinnedData =
    pinnedNode.length != 0
      ? pinnedNode[0].node
      : data.allMarkdownRemark.edges[0].node
  return (
    <Layout pinnedData={pinnedData} pinned>
      <SEO
        title={currentPage === 1 ? "" : `Page ${currentPage}`}
        image={data.allMarkdownRemark.edges[0].node.frontmatter.coverImage}
        pathname={pathname}
        description={
          currentPage === 1
            ? ""
            : `LoginRadius Async Blog - Page ${currentPage} of ${Math.ceil(
                total / 6
              )}`
        }
      />
      <main>
        <CardList
          posts={data.allMarkdownRemark.edges}
          total={total}
          currentPage={currentPage}
        />
        <Pagination
          pages={numPages}
          currentPage={parseInt(currentPage)}
          type={data.allMarkdownRemark.edges[0].node.frontmatter.type}
        />
      </main>
    </Layout>
  )
}

export default BlogList
