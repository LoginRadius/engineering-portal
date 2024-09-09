import styled from "@emotion/styled"
import style from "./toc.module.scss"
import React from "react"
import tw from "twin.macro"

import scrollTo from "gatsby-plugin-smoothscroll"

import ScriptTag from "react-script-tag"
import js from "./toc__hyperlinkNavFloating"
//let headingCount = 0;
//let previesHeadingCount = 0;
const ToC = ({ headings }) => (
  <Toc id="tocUl" className={style.tableofcontents + " " + style.slideOut}>
    <Title id="tocTrigger" className={style.tochead}>
      <Text className={style.title}>Table of Contents</Text>
    </Title>
    <List className={style.list}>
      {headings.map((heading, index) => {
        //headingCount = index;
        /*if(index === 0){
          headingCount = index+1;
          previesHeadingCount = heading.depth;
        }else if(previesHeadingCount === heading.depth){
          headingCount = headingCount+1;        
          previesHeadingCount = heading.depth;  
        }*/
        return (
          <ToCElement key={heading.value}>
            <ToCLink
              id={`tocLink-${heading.value}`}
              href={`#${heading.value
                .replace(/\s+/g, "-")
                .replace(/[.:;#*+=?!><^&$@%{}()|/[\]\\]/g, "")
                .toLowerCase()}`}
              className={"ToCLink"}
              onClick={() =>
                scrollTo(
                  `#${CSS.escape(
                    heading.value
                      .replace(/\s+/g, "-")
                      .replace(/[.:;#*+=?!><^&$@%{}()|/[\]\\]/g, "")
                      .toLowerCase()
                  )}`
                )
              }
            >
              {heading.value}
            </ToCLink>
          </ToCElement>
        )
      })}
    </List>

    <Toggle className={style.floatingToggle} />

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
