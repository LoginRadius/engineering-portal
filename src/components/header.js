import React, { useState } from "react"
import { Link } from "gatsby"

import headerStyles from "./header.module.scss"
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
              isPartiallyCurrent={true}
              onClick={e => {
                setActive("")
              }}
            >
              All
            </Link>
          </li>
          <li className={active.includes("async") ? headerStyles.active : ""}>
            <Link
              to={"/async"}
              activeClassName={headerStyles.active}
              isPartiallyCurrent={true}
              onClick={e => {
                setActive("async")
              }}
            >
              Engineering
            </Link>
          </li>
          <li
            className={
              active.includes("start-with-identity") ? headerStyles.active : ""
            }
          >
            <Link
              to={"/start-with-identity"}
              onClick={e => {
                setActive("start-with-identity")
              }}
            >
              Identity
            </Link>
          </li>
          <li className={active.includes("fuel") ? headerStyles.active : ""}>
            <Link
              to={"/fuel"}
              onClick={e => {
                setActive("fuel")
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
