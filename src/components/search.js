import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import headerStyles from "./header.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    const { results } = this.state
    return (
      <div
        className={`${headerStyles.searchWrapper} ${
          results.length ? headerStyles.searchList : ""
        }`}
      >
        <div className={headerStyles.search}>
          <input
            type="text"
            className={headerStyles.searchTerm}
            placeholder="Search..."
            onChange={this.search}
          />
          <span className={headerStyles.searchButton}>
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
        {results.length ? (
          <ul>
            {results.slice(0, 4).map(page => (
              <li key={page.id}>
                <div>
                  <Link to={"/" + page.path}>{page.title}</Link>
                </div>
                <p>{page.tags ? page.tags.join(`, `) : ""}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true })
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}
