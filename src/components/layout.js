/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Header from "./header"
import "./layout.css"
import { UserContextProvider } from "./UserContext"
import styled from "styled-components"
import Footer from "./footer"

const Layout = ({ children, showFooter }) => {
  return (
    <Layer>
      <UserContextProvider>
        <Header />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main style={{ maxHeight: "80vmin" }}>{children}</main>
          {showFooter && <Footer />}
        </div>
      </UserContextProvider>
    </Layer>
  )
}

const Layer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export default Layout
