const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const tagTemplate = path.resolve("./src/templates/tag.js")
  const tagResults = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
          totalCount
          edges {
            node {
              id
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
        markdownRemark(frontmatter: { pinned: { eq: true } }) {
          id
        }
      }
    `
  )

  if (tagResults.errors) {
    throw tagResults.errors
  }
  // Extract tag data from query
  const tags = tagResults.data.tagsGroup.group
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

  const engResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "//engineering//" } } }
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          totalCount
          edges {
            node {
              id
            }
          }
        }
        markdownRemark(
          frontmatter: { pinned: { eq: true } }
          fields: { slug: { regex: "//engineering//" } }
        ) {
          id
        }
      }
    `
  )
  const identityResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "//identity//" } } }
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          totalCount
          edges {
            node {
              id
            }
          }
        }
        markdownRemark(
          frontmatter: { pinned: { eq: true } }
          fields: { slug: { regex: "//identity//" } }
        ) {
          id
        }
      }
    `
  )
  const growthResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "//growth//" } } }
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          totalCount
          edges {
            node {
              id
            }
          }
        }
        markdownRemark(
          frontmatter: { pinned: { eq: true } }
          fields: { slug: { regex: "//growth//" } }
        ) {
          id
        }
      }
    `
  )

  // Creating Blog List Pages
  createTypePages("/", tagResults, createPage)
  createTypePages("/engineering/", engResult, createPage)
  createTypePages("/identity/", identityResult, createPage)
  createTypePages("/growth/", growthResult, createPage)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode }).toLowerCase()

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

const createTypePages = (type, results, createPage) => {
  const postsPerPage = 6
  let pinnedId = ""
  if (results.data.markdownRemark) {
    pinnedId = results.data.markdownRemark.id
  } else {
    pinnedId = results.data.allMarkdownRemark.edges[0].node.id
  }
  const total = results.data.allMarkdownRemark.totalCount
  const numPages = Math.ceil(total / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `${type}` : `${type}${i + 1}`,
      component: path.resolve("./src/templates/blog-list-template.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        currentPage: i + 1,
        type: `/${type}/`,
        numPages: numPages,
        pinned: pinnedId,
      },
    })
  })
}
