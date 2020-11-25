const path = require(`path`)
const fs = require("fs")
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

require("dotenv").config({ path: `${__dirname}/.env` })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve("./src/templates/tag.js")
  const authorPage = path.resolve("src/templates/author.js")
  const result = await graphql(
    `
      {
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
  const posts = result.data.allMarkdownRemark.edges
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
  })

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

  // Creating Blog List Pages
  const numPages = Math.ceil((posts.length - 1) / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve("./src/templates/blog-list-template.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage + 1,
        numPages,
        currentPage: i + 1,
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

  const staticPages = [
    {
      name: "guest-blog",
    },
  ]
  staticPages.forEach(staticPage => {
    switch (staticPage.name) {
      case "guest-blog":
        createPage({
          path: `/page/${staticPage.name}`,
          component: require.resolve(`./src/templates/guest-blog.js`),
          context: { staticPage },
        })
        break
      default:
        createPage({
          path: `/page/${staticPage.name}`,
          component: require.resolve(`./src/templates/guest-blog.js`),
          context: { staticPage },
        })
    }
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
    }
  `
  createTypes(typeDefs)
}

exports.onPostBuild = function () {
  if (process.env.APP_ENV === "PRODUCTION") {
    fs.renameSync(
      path.join(__dirname, "public"),
      path.join(__dirname, "public-blog")
    )

    fs.mkdirSync(path.join(__dirname, "public"))

    fs.renameSync(
      path.join(__dirname, "public-blog"),
      path.join(__dirname, "public", "blog", "async")
    )
  }
}
