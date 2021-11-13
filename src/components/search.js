import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import headerStyles from "./header.module.scss"
import { navigate } from "gatsby"

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

  handleSubmit = event => {
    event.preventDefault()
    const query = this.state.query
    const uri =
      process.env.NODE_ENV == "production"
        ? `/blog/async/search/?${query}`
        : `/search/?${query}`

    query && typeof window !== "undefined" && window.open(uri, "_self")
  }

  componentDidMount() {
    document.body.addEventListener("click", this.bodyClickHandler)
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.bodyClickHandler)
  }

  render() {
    const { results, toggleOpen } = this.state
    return (
      <form
        target="_blank"
        onSubmit={this.handleSubmit}
        className={`${headerStyles.searchWrapper} ${
          results.length ? headerStyles.searchList : ""
        }`}
        onMouseOver={() => (this._shouldClose = false)}
        onMouseLeave={() => (this._shouldClose = true)}
      >
        <input
          id="search"
          type="text"
          className={`${headerStyles.searchTerm}  ${
            toggleOpen ? headerStyles.searchTermOpen : ""
          }`}
          placeholder="Search..."
          onChange={this.search}
          onFocus={this.search}
          onSubmit={this.search}
          required
        />
        <label
          htmlFor="search"
          className={headerStyles.searchButton}
          onClick={this._toggleSearch}
        ></label>
        <input type="submit" className={headerStyles.searchButton} />

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
      </form>
    )
  }
  getOrCreateIndex = () => this.index || Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    console.log("props index >> " + this.index)
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
