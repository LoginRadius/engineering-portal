const getTimeToRead = require("./src/utils/timeToReadRss")
console.log("Google Tag MAnager ====>", process.env.GOOGLE_TAGMANAGER_ID)
console.log("Google Analytics ====>", process.env.GA_TRACKING_ID)
module.exports = {
  siteMetadata: {
    title: `LoginRadius Blog`,
    description: "Company Updates, Technology Articles from LoginRadius",
    siteUrl: "https://www.loginradius.com",
    feedUrl: "https://www.loginradius.com/blog/async",
    image: "/async.svg",
    owner: "LoginRadius",
    menuLinks: [
      {
        name: "ASYNC Blog",
        slug: "https://www.loginradius.com/blog/async/",
        class: "async",
      },
      {
        name: "SWI Blog",
        slug: "https://www.loginradius.com/blog/start-with-identity/",
        class: "swi",
      },
      {
        name: "FUEL Blog",
        slug: "https://www.loginradius.com/blog/fuel/",
        class: "fuel",
      },
      {
        name: "Open Source",
        slug: "https://www.loginradius.com/open-source/",
        class: "opensource",
      },
      {
        name: "Write for Us",
        slug: "https://www.loginradius.com/blog/async/page/guest-blog",
        class: "writeus",
      },
    ],
    footerLinks: [
      {
        name: "Privacy Policy",
        slug: "https://www.loginradius.com/privacy-policy",
      },
      {
        name: "Terms",
        slug: "https://www.loginradius.com/terms/",
      },
      {
        name: "Security Policy",
        slug: "https://www.loginradius.com/security-policy/",
      },
    ],
    socialLinks: [
      {
        name: "twitter",
        slug: "https://twitter.com/LoginRadius",
      },
      {
        name: "linkedin",
        slug: "https://www.linkedin.com/company/loginradius/",
      },
      {
        name: "youtube",
        slug: "https://www.youtube.com/user/LoginRadius",
      },
      {
        name: "feedly",
        slug:
          "https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fwww.loginradius.com%2Fblog%2Fasync%2Frss.xml",
      },
    ],
  },
  flags: {
    QUERY_ON_DEMAND: true,
    PRESERVE_WEBPACK_CACHE: true,
    PARALLEL_QUERY_RUNNING: 16,
    LAZY_IMAGES: true,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
    {
      resolve: "gatsby-plugin-html-attributes",
      options: {
        lang: "en",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 768,
              srcSetBreakpoints: [650],
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: "Dark+ (default dark)",
              languageAliases: {
                html: "js",
              },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
        head: true,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GOOGLE_TAGMANAGER_ID,

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        //defaultDataLayer: { platform: "gatsby" },

        // Specify optional GTM environment details.
        //gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        //gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        //dataLayerName: "YOUR_DATA_LAYER_NAME",

        // Name of the event that is triggered
        // on every Gatsby route change.
        //
        // Defaults to gatsby-route-change
        //routeChangeEventName: "YOUR_ROUTE_CHANGE_EVENT_NAME",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `LoginRadius Engineering`,
        short_name: `LR Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/lr-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `tags`, `text`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tags,
            slug: node => node.fields.slug,
            text: node => node.frontmatter.description,
          },
        },
        // Optional filter to limit indexed nodes
        filter: (node, getNode) => node.frontmatter.tags !== "exempt",
      },
    },
    `gatsby-transformer-yaml`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                feedUrl,
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  title: edge.node.frontmatter.title,
                  url: site.siteMetadata.feedUrl + edge.node.fields.slug,
                  pubDate: edge.node.frontmatter.date,
                  author: edge.node.frontmatter.author.id,
                  categories: edge.node.frontmatter.tags,
                  enclosure: {
                    url:
                      site.siteMetadata.siteUrl +
                      edge.node.frontmatter.coverImage.childImageSharp.fluid
                        .src,
                    type: "image/jpeg",
                    size: 768,
                  },
                  custom_elements: [
                    {
                      "content:encoded": `<p> ${
                        edge.node.frontmatter.description || edge.node.excerpt
                      } </p> <br/>  <a href="${
                        site.siteMetadata.feedUrl + edge.node.fields.slug
                      }">Read On</a>`,
                    },
                    {
                      timeToReadBlog: getTimeToRead(edge.node.html),
                    },
                    {
                      authorImage: edge.node.frontmatter.author.github
                        ? `https://github.com/${edge.node.frontmatter.author.github}.png?size=100v=40`
                        : `https://ui-avatars.com/api/?name=${edge.node.frontmatter.author.id}&size=100`,
                    },
                  ],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000
                  filter: { fileAbsolutePath: { regex: "//content//" } }
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 280)
                      fields { slug }
                      frontmatter {
                        title
                        description
                        date(formatString: "MMMM DD, YYYY")
                        coverImage {
                          publicURL,
                          childImageSharp {
                            fluid {
                              src
                            }
                          }
                        }
                        author {
                          id
                          github
                        }
                        tags
                      }
                      timeToRead
                      html
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "LoginRadius Blog",
            feed_url: "https://www.loginradius.com/blog/async/rss.xml",
            site_url: "https://www.loginradius.com/blog/async/",
            description:
              "Company Updates, Technology Articles from LoginRadius",
            language: "en-us",
          },
        ],
      },
    },
    `gatsby-plugin-smoothscroll`,
  ],
  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorYaml`,
  },
  pathPrefix: `/blog`,
}
