import styled from "@emotion/styled"
import style from "./toc.module.scss"
import React from "react"
import tw from "twin.macro"

import scrollTo from 'gatsby-plugin-smoothscroll';

import ScriptTag from "react-script-tag"
import js from "./toc__hyperlinkNavFloating"

const ToC = ({ headings }) => (
  <Toc id='tocUl' className={style.tableofcontents + ' ' + style.slideOut} >

    <Title id='tocTrigger' className={style.tochead}><Text className={style.title}>TOC</Text></Title>
    <List className={style.list}>
      {headings.map(heading => {
        if (heading.depth > 4) {
          return <div />
        }

        return (
          <ToCElement key={heading.value}>
              <ToCLink
              onClick={() => scrollTo(`#${heading.value
                  .replace(/\s+/g, "-")
                  .replace(/[.:;#*+=?!><^&$@%{}()|[\]\\]/g, '')
                  .toLowerCase()
                }`)}
              >
              {heading.value}
            </ToCLink>
          </ToCElement>
        )
      })}
    </List>

    <Toggle className={style.floatingToggle}/>

    {/*<ScriptTag type="text/javascript" src={js} />*/}
  </Toc>
)

const Toc = styled.ul``

const Title = tw.div``

const Text = tw.p``

const ToCElement = tw.li``

const ToCLink = tw.a``

const Toggle = tw.div``

const List = tw.div``

export default ToC