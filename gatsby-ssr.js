/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import { UserContextProvider } from "./src/components/UserContext"
import { SearchContextProvider } from "./src/components/SearchContext"

export const wrapRootElement = ({ element }) => (
  <UserContextProvider>
    <SearchContextProvider>{element}</SearchContextProvider>
  </UserContextProvider>
)
