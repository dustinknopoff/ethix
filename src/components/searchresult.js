import React, { useContext, useRef } from "react"
import { SearchContext } from "./SearchContext"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
import { MAROON } from "./shared_css"
import { Search } from "react-feather"
import useSearch from "../components/search"

const SearchForm = ({ index }) => {
  const [, search] = useSearch(index)
  const ipt = useRef(null)
  return (
    <form
      style={{
        display: `flex`,
        alignContent: `center`,
      }}
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        search(ipt.current.value)
      }}
    >
      <input
        placeholder="Start your search here"
        style={{ width: "50vw" }}
        ref={ipt}
      ></input>
      <button
        style={{
          position: `relative`,
          padding: `6px 15px`,
          left: `-4vw`,
          border: `none`,
          background: `none`,
        }}
      >
        <Search color={MAROON} />
      </button>
    </form>
  )
}

const Results = ({ more }) => {
  const [state, setSearch] = useContext(SearchContext)
  return state.results.length > 0 ? (
    <List>
      {state.results.map(res => (
        <li key={res.id} style={{ textDecoration: `none` }}>
          <SearchResultSmall data={res} setSearch={setSearch} />
        </li>
      ))}
      <li>
        <Link to="/search" state={{ ...state }}>
          {more ? "No More Results" : "See All Results"}
        </Link>
      </li>
    </List>
  ) : (
    !state.start && <p>No Results Found</p>
  )
}

const SearchResultSmall = ({ data, setSearch }) => {
  const { category, price, title, imgSrc, path } = data
  return (
    <Lnk
      onClick={() => {
        navigate(`/${path}`)
        setSearch(state => ({ ...state, query: ``, results: [], start: true }))
      }}
    >
      <img src={imgSrc} style={{ width: "10vw" }} alt={`${title}'s logo`} />
      <div style={{ paddingLeft: "10px" }}>
        <h5>{title}</h5>
        <div style={{ display: "flex" }}>
          <span>{category}</span>
          <span style={{ paddingLeft: "10px" }}>
            {[...Array(price).keys()].reduce(function(accumulator, _) {
              return (accumulator += "$")
            }, "")}
          </span>
        </div>
      </div>
    </Lnk>
  )
}

const Lnk = styled.button`
  display: flex;
  border: none;
  background: none;
`

const List = styled.ul`
  text-decoration: none;
  list-style: none;
  overflow-y: scroll;
  max-height: 20vh;
`

export { SearchResultSmall, Results, SearchForm }
