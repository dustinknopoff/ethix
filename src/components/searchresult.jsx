import React, { useContext, useRef } from "react"
import { SearchContext } from "./SearchContext"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
import { Search } from "react-feather"
import useSearch from "../components/search"

const SearchForm = ({ index, existing }) => {
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
      <ResponseInput
        placeholder="Start your search here"
        ref={ipt}
        defaultValue={existing}
      ></ResponseInput>
      <SearchBtn>
        <Search color={"white"} />
      </SearchBtn>
    </form>
  )
}

const Results = ({ more }) => {
  const [state, setSearch] = useContext(SearchContext)
  const [showNone, setNone] = React.useState(false)

  React.useEffect(() => {
    const timer = () => {
      if (!state.start && state.results.length === 0) {
        setNone(true)
        setTimeout(() => {
          setNone(false)
        }, 1000)
      }
    }
    timer()
    return () => clearTimeout(timer)
  }, [state])

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
    showNone && <p>No Results Found</p>
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
      <img src={imgSrc} alt={`${title}'s logo`} className="logo" />
      <div style={{ paddingLeft: "10px" }}>
        <h5
          style={{
            fontWeight: 400,
            fontSize: "24px",
          }}
        >
          {title}
        </h5>
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

const SearchBtn = styled.button`
  position: relative;
  padding: 6px 15px;
  border: none;
  left: -4px;
  background: var(--primary);
  border-radius: var(--radius);
`

const ResponseInput = styled.input`
  width: 50vw;

  @media only screen and (max-width: 768px) {
    width: 75vw;
  }
`

export { SearchResultSmall, Results, SearchForm }
