import { SortableContainer, SortableElement } from "react-sortable-hoc"
import React from "react"
import styled from "styled-components"
import { categoryToIcon } from "./math"

// https://stackoverflow.com/questions/1224433/how-can-i-disable-highlighting-in-html-or-js
const SortableItem = SortableElement(({ value }) => (
  <NoHighLight as="li" style={{ listStyle: "number" }}>
    <div style={{ padding: "10px" }}>
      <span style={{ marginRight: "10px" }}>{value}</span>
      {categoryToIcon[value]}
    </div>
  </NoHighLight>
))

const SortableList = SortableContainer(({ items }) => {
  return (
    <NoHighLight as={"ol"} style={{ listStyle: "number" }}>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </NoHighLight>
  )
})

const NoHighLight = styled.ol`
  user-select: none;
  -moz-user-select: none;
`

export default SortableList
