const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const tagTemplate = path.resolve("./src/templates/tag.js")
  const tagResults = await graphql(
    `
      {
        allMarkdownRemark {
          totalCount
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
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
        ) {
          totalCount
        }
      }
    `
  )
  const identityResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "//identity//" } } }
        ) {
          totalCount
        }
      }
    `
  )
  const growthResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "//growth//" } } }
        ) {
          totalCount
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
      },
    })
  })
}
