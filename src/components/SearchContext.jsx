import React, { useState } from "react"

const SearchContext = React.createContext([{}, () => {}])

const SearchContextProvider = props => {
  const [state, setState] = useState({
    query: ``,
    results: [],
    start: true,
  })
  return (
    <SearchContext.Provider value={[state, setState]}>
      {props.children}
    </SearchContext.Provider>
  )
}

export { SearchContext, SearchContextProvider }
