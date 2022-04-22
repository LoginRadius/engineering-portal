import { Link } from "gatsby"
import React, { useCallback, useEffect, useState } from "react"
import lrLogoAdj from "../../static/lr-logo-adj.svg"
import lrLogoBlogText from "../../static/lr-logo-blog-text.svg"
import headerStyles from "./header.module.scss"
import searchStyles from "./search.module.scss"
import Search from "./search"

const Header = ({ searchIndex, pathname, type }) => {
  const [showMenu, toggleMenu] = useState(null)
  const [active, setActive] = useState(type ? pathname : "/")
  const [scrollClass, setClass] = useState("")
  const [backdrop, showBackdrop] = useState(null)

  const handleNavigation = useCallback(e => {
    const currWin = e.currentTarget
    if (currWin.scrollY < 1) {
      setClass("")
    } else if (currWin.scrollY > 1) {
      setClass("scrollUp")
    }
  })

  useEffect(() => {
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
        }`}
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
              setTimeout(() => {
                showBackdrop(!showMenu)
              }, 300)
            } else {
              document.body.classList.add("menu-open")
              document.body.classList.remove("menu-close")
              showBackdrop(!showMenu)
            }
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        {/* <Link className={headerStyles.logo} to={"https://www.loginradius.com/"}>
          <img src={LogoLr} alt={`logo`} className={headerStyles.lrLogo} />
        </Link> */}
        <div className={headerStyles.logo}>
          <Link target="_blank" to={"https://www.loginradius.com/"}>
            <img
              src={lrLogoAdj}
              alt={`loginradius`}
              className={headerStyles.lrLogo}
            />
          </Link>
          <Link className={headerStyles.logoText} to={"/"}>
            <img
              src={lrLogoBlogText}
              alt={`loginradius Blog`}
              className={headerStyles.lrLogoText}
            />
          </Link>
        </div>
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
        }  ${scrollClass}`}
      >
        <ul>
          <li className={active === "/" ? headerStyles.active : ""}>
            <Link
              to={"/"}
              activeClassName={headerStyles.active}
              partiallyActive={true}
              onClick={e => {
                setActive("/")
                document.body.classList.remove("menu-open")
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
                document.body.classList.remove("menu-open")
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
                document.body.classList.remove("menu-open")
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
                document.body.classList.remove("menu-open")
              }}
            >
              Growth
            </Link>
          </li>
          <hr />
        </ul>
      </div>
      {backdrop === true && (
        <div
          onClick={() => {
            toggleMenu(!showMenu)
            if (showMenu) {
              document.body.classList.add("menu-close")
              document.body.classList.remove("menu-open")
              setTimeout(() => {
                showBackdrop(!showMenu)
              }, 300)
            } else {
              document.body.classList.add("menu-open")
              document.body.classList.remove("menu-close")
              showBackdrop(!showMenu)
            }
          }}
          className={`${headerStyles.backdrop} ${
            showMenu === null
              ? ""
              : showMenu === true
              ? headerStyles.open
              : headerStyles.close
          }`}
        >
          &nbsp;
        </div>
      )}
    </>
  )
}
export default Header
