import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import headerStyles from "./header.module.scss"
import { isMobile } from "react-device-detect"

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
      toggleOpen: false,
    }
  }

  _shouldClose = false

  _toggleSearch = () => {
    const { toggleOpen } = this.state
    if (toggleOpen) {
      this.setState({
        toggleOpen: false,
        results: [],
        query: "",
      })
    } else {
      document.getElementById("search").focus()
      this.setState({
        toggleOpen: true,
      })
    }
  }

  bodyClickHandler = () => {
    if (this._shouldClose) {
      this.setState({
        toggleOpen: false,
        results: [],
        query: "",
      })
    }
  }

  componentDidMount() {
    document.body.addEventListener("click", this.bodyClickHandler)
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.bodyClickHandler)
  }

  renderContent = () => {
    const { results, toggleOpen } = this.state
    return (
      <div
        className={`${headerStyles.searchWrapper} ${results.length ? headerStyles.searchList : ""
          }`}
        onMouseOver={() => (this._shouldClose = false)}
        onMouseLeave={() => (this._shouldClose = true)}
      >
        {/* <input
          type="text"
          className={`${headerStyles.searchTerm}  ${
            toggleOpen || isMobile ? headerStyles.searchTermOpen : ""
          }`}
          placeholder="Search..."
          onChange={this.search}
          id={"search"}
        /> */}
        <input
          type="text"
          className={`${headerStyles.searchTerm}  ${toggleOpen ? headerStyles.searchTermOpen : ""
            }`}
          placeholder="Search..."
          onChange={this.search}
          id={"search"}
        />
        <a
          className={headerStyles.searchButton}
          onClick={this._toggleSearch}
        ></a>

        {results.length ? (
          <ul>
            {results.slice(0, 4).map(page => (
              <li key={page.id}>
                <div>
                  <Link to={page.path}>{page.title}</Link>
                </div>
                <p>{page.tags ? page.tags.join(`, `) : ""}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    )
  }
  render() {
    return this.renderContent()
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
