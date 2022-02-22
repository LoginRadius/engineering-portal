import { Link } from "gatsby"
import React, { useState } from "react"
import LogoLr from "../../static/logo-blog.svg"
import headerStyles from "./header.module.scss"
import searchStyles from "./search.module.scss"
import Search from "./search"

const Header = ({ searchIndex, pathname, type }) => {
  const [showMenu, toggleMenu] = useState(false)
  const [active, setActive] = useState(type ? pathname : "/")

  return (
    <>
      <div className={headerStyles.header}>
        <div
          className={`${headerStyles.hamburger} ${
            showMenu ? headerStyles.active : ""
          }`}
          onClick={() => toggleMenu(!showMenu)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link className={headerStyles.logo} to={"/"}>
          <img src={LogoLr} alt={`logo`} className={headerStyles.lrLogo} />
        </Link>
        <Search
          customClass={`${
            showMenu ? searchStyles.deactive : searchStyles.active
          }`}
          searchIndex={searchIndex}
        />
      </div>
      <div
        className={`${headerStyles.navigation} ${
          showMenu ? headerStyles.open : headerStyles.close
        }`}
      >
        <ul>
          <li className={active === "/" ? headerStyles.active : ""}>
            <Link
              to={"/"}
              activeClassName={headerStyles.active}
              partiallyActive={true}
              onClick={e => {
                setActive("/")
              }}
            >
              All
            </Link>
          </li>
          <li
            className={
              active.includes("engineering") ? headerStyles.active : ""
            }
          >
            <Link
              to={"/engineering"}
              activeClassName={headerStyles.active}
              partiallyActive={true}
              onClick={e => {
                setActive("engineering")
              }}
            >
              Engineering
            </Link>
          </li>
          <li
            className={active.includes("identity") ? headerStyles.active : ""}
          >
            <Link
              to={"/identity"}
              activeClassName={headerStyles.active}
              partiallyActive={true}
              onClick={e => {
                setActive("identity")
              }}
            >
              Identity
            </Link>
          </li>
          <li className={active.includes("growth") ? headerStyles.active : ""}>
            <Link
              to={"/growth"}
              activeClassName={headerStyles.active}
              partiallyActive={true}
              onClick={e => {
                setActive("growth")
              }}
            >
              Growth
            </Link>
          </li>
          <hr />
        </ul>
      </div>
    </>
  )
}
export default Header
