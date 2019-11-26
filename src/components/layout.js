/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Header from "./header"
import "./layout.css"
import styled, { css } from "styled-components"
import Footer from "./footer"

const Layout = ({ children, showFooter, displayCenter }) => {
  return (
    <Layer>
      <Header />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: `80vw`,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <Main displayCenter={displayCenter}>{children}</Main>
        {showFooter && <Footer />}
      </div>
    </Layer>
  )
}

const Main = styled.main`
  maxheight: 80vh;

  ${props =>
    props.displayCenter &&
    css`
      height: 80vh;
      display: flex;
      align-items: center;
    `}
`

const Layer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export default Layout
