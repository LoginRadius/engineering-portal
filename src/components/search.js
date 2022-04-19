import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import searchStyle from "./search.module.scss"
import { navigate } from "gatsby"

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
    this._toggleSearch = this._toggleSearch.bind(this)
    this.state = {
      query: ``,
      results: [],
      toggleOpen: null,
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
      this.textInput.current.focus()
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
    navigate(`/search?query=${query}`)
    this.setState({
      toggleOpen: false,
      results: [],
      query: "",
    })
  }

  componentDidMount() {
    document.body.addEventListener("click", this.bodyClickHandler)
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.bodyClickHandler)
  }

  render() {
    const { results, toggleOpen, query } = this.state
    return (
      <>
        <a
          className={`${searchStyle.btnSearch} ${this.props.customClass}`}
          tabIndex={0}
          onClick={e => {
            if (query === "") {
              this._toggleSearch()
            } else {
              this.handleSubmit(e)
            }
          }}
          onMouseOver={() => (this._shouldClose = false)}
          onMouseLeave={() => (this._shouldClose = true)}
        >
          <div
            className={`${searchStyle.megaMenuSearchDarkIcon} ${
              toggleOpen === null
                ? ""
                : toggleOpen
                ? searchStyle.searchIconWtoB
                : searchStyle.searchIconBtoW
            }`}
          ></div>
        </a>
        <form
          target="_blank"
          onSubmit={this.handleSubmit}
          className={`${searchStyle.searchForm} ${
            toggleOpen === null
              ? ""
              : toggleOpen
              ? searchStyle.searchInputOpen
              : searchStyle.searchInputClose
          }`}
          onMouseOver={() => (this._shouldClose = false)}
          onMouseLeave={() => (this._shouldClose = true)}
        >
          <input
            id="search"
            type="text"
            className={`${searchStyle.searchFormInput}  ${
              toggleOpen === null
                ? ""
                : toggleOpen
                ? searchStyle.searchInputBtoW
                : searchStyle.searchInputWtoB
            }`}
            onChange={this.search}
            onFocus={this.search}
            onSubmit={this.search}
            value={this.state.query}
            required
            ref={this.textInput}
          />
          <label htmlFor="search" className={searchStyle.searchButton}></label>
          <input type="submit" className={searchStyle.searchButton} />
        </form>
        {results.length ? (
          <ul className={searchStyle.result}>
            {results.slice(0, 4).map(page => (
              <li key={page.id}>
                <div>
                  <Link to={page.slug}>{page.title}</Link>
                </div>
                {/* <p>{page.tags ? page.tags.join(`, `) : ""}</p> */}
              </li>
            ))}
          </ul>
        ) : this.state.query != "" ? (
          <ul className={searchStyle.result}>
            <li className={searchStyle.noresult}>
              <div>
                <span>No results found</span>
              </div>
            </li>
          </ul>
        ) : null}
      </>
    )
  }
  getOrCreateIndex = () => this.index || Index.load(this.props.searchIndex)

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
