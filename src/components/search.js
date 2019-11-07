import React, { useState, useContext } from "react"
import { Index } from "elasticlunr"
import { SearchContext } from "./SearchContext"

export const Search = searchIndex => {
  const [state, setState] = useContext(SearchContext)
  console.log(state)
  const [index, setIndex] = useState(Index.load(searchIndex))

  const getOrCreateIndex = () =>
    index
      ? index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(searchIndex)

  const search = evt => {
    const query = evt
    setIndex(getOrCreateIndex())
    setState(stt => ({
      ...stt,
      query,
      results: index
        .search(query, { expand: true }) // Accept partial matches
        // Map over each ID and return the full document
        .map(({ ref }) => index.documentStore.getDoc(ref)),
    }))
    console.log(query, state)
  }

  return [state, search]
}

export default Search
