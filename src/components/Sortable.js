import { SortableContainer, SortableElement } from "react-sortable-hoc"
import React from "react"

const SortableItem = SortableElement(({ value }) => <li>{value}</li>)

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  )
})

export default SortableList
