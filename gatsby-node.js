const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)
const { execSync } = require("child_process")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve("./src/templates/tag.js")
  const authorPage = path.resolve("src/templates/author.js")
  const searchTemplate = path.resolve("./src/templates/search-page.js")
  const result = await graphql(
    `
      {
        siteSearchIndex {
          index
        }
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                authorId
              }
              frontmatter {
                title
                tags
                pinned
                type
              }
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  /*const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 9

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
        pageNumber: Math.ceil(index / postsPerPage),
        tags: post.node.frontmatter.tags || [],
      },
    })
  })*/

  // Extract tag data from query
  const tags = result.data.tagsGroup.group
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  // resolves from the query from 👆
  const authorSet = new Set()
  result.data.allMarkdownRemark.edges.forEach(edge => {
    if (edge.node.fields.authorId) {
      authorSet.add(edge.node.fields.authorId)
    }
  })

  // create author's pages inside export.createPages:
  const authorList = Array.from(authorSet)
  authorList.forEach(author => {
    createPage({
      path: `/author/${_.kebabCase(author)}/`,
      component: authorPage,
      context: {
        authorId: author,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })

    if (Object.prototype.hasOwnProperty.call(node.frontmatter, "author")) {
      createNodeField({
        node,
        name: "authorId",
        value: node.frontmatter.author,
      })
    }
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      coverImage: File @fileByRelativePath
      pinned: Boolean
    }
  `
  createTypes(typeDefs)
}
