import { Link } from "gatsby"
import React, { useCallback, useEffect, useState } from "react"
import LogoLr from "../../static/logo-blog.svg"
import headerStyles from "./header.module.scss"
import searchStyles from "./search.module.scss"
import Search from "./search"

const Header = ({ searchIndex, pathname, type }) => {
  const [showMenu, toggleMenu] = useState(null)
  const [active, setActive] = useState(type ? pathname : "/")
  const [scrollClass, setClass] = useState("")
  let sY = 0
  if (typeof window !== "undefined") {
    sY = window.scrollY
  }
  const [y, setY] = useState(sY)

  const handleNavigation = useCallback(
    e => {
      const currWin = e.currentTarget
      if (y > currWin.scrollY) {
        setClass("")
      } else if (y < currWin.scrollY) {
        setClass("scrollUp")
      }
      setY(currWin.scrollY)
    },
    [y]
  )

  useEffect(() => {
    if (typeof window !== "undefined") {
      setY(window.scrollY)
    }
    window.addEventListener("scroll", handleNavigation)

    return () => {
      window.removeEventListener("scroll", handleNavigation)
    }
  }, [handleNavigation])

  return (
    <>
      <div
        className={`${headerStyles.header} ${
          showMenu === null
            ? ""
            : showMenu === true
            ? headerStyles.open
            : headerStyles.close
        } ${scrollClass}`}
      >
        <div
          className={`${headerStyles.hamburger} ${
            showMenu ? headerStyles.active : ""
          }`}
          onClick={() => {
            toggleMenu(!showMenu)
            if (showMenu) {
              document.body.classList.add("menu-close")
              document.body.classList.remove("menu-open")
            } else {
              document.body.classList.add("menu-open")
              document.body.classList.remove("menu-close")
            }
          }}
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
          showMenu === null
            ? ""
            : showMenu === true
            ? headerStyles.open
            : headerStyles.close
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
