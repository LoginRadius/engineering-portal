import React, { useState } from "react"
import { Link } from "gatsby"

import * as headerStyles from "./header.module.scss"
import LogoLr from "../../static/logo-blog.svg"
import Hamburger from "../../static/iconHamburger.svg"
import Close from "../../static/icon-close.svg"
import Search from "./search"

const Header = ({ searchIndex }) => {
  const [showMenu, toggleMenu] = useState(false)
  let pathname = ""
  if (typeof window !== `undefined`) {
    pathname = window.location.pathname.substring(1)
  }

  const [active, setActive] = useState(pathname)

  return (
    <>
      <div className={headerStyles.header}>
        <div
          className={`${headerStyles.hamburger} ${
            showMenu ? headerStyles.active : ""
          }`}
          onClick={() => toggleMenu(!showMenu)}
        >
          <img src={Hamburger} className={headerStyles.iconHamburger} />
          <img src={Close} className={headerStyles.iconClose} />
        </div>
        <Link className={headerStyles.logo} to={"/"}>
          <img src={LogoLr} alt={`logo`} className={headerStyles.lrLogo} />
        </Link>
        <Search searchIndex={searchIndex} />
      </div>
      <div
        className={`${headerStyles.navigation} ${
          showMenu ? headerStyles.open : ""
        }`}
      >
        <ul>
          <li className={active === "" ? headerStyles.active : ""}>
            <Link
              to={"/"}
              activeClassName={headerStyles.active}
              partiallyActive={true}
              onClick={e => {
                setActive("")
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
