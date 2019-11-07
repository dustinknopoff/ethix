import React, { useContext } from "react"
import { SearchContext } from "./SearchContext"
import { Link } from "gatsby"
import styled from "styled-components"

const Results = () => {
  const [state] = useContext(SearchContext)
  return state.results.length > 0 ? (
    <List>
      {state.results.map(res => (
        <li key={res.id} style={{ textDecoration: `none` }}>
          <SearchResultSmall data={res} />
        </li>
      ))}
    </List>
  ) : (
    ""
  )
}

const SearchResultSmall = ({ data }) => {
  const { category, price, title, imgSrc, path } = data
  return (
    <Lnk as={Link} to={`/${path}`}>
      <img src={imgSrc} style={{ width: "10vw" }} />
      <h5>{title}</h5>
      <div>
        <span>{category}</span>
        <span>
          {[...Array(price).keys()].reduce(function(accumulator, _) {
            return (accumulator += "$")
          }, "")}
        </span>
      </div>
    </Lnk>
  )
}

const Lnk = styled.div`
  display: flex;
`

const List = styled.ul`
  text-decoration: none;
  list-style: none;
  overflow-y: scroll;
  max-height: 20vh;
`

export { SearchResultSmall, Results }
