import React from "react"
import styled from "styled-components"
import { Menu } from "../manageRestaurantMenu/ManageRestaurantMenu"

const ListElemDiv = styled.div`
  background-color: white;
  padding-left: 2vh;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 5px;
  color: black;
`


interface MenuItemListProps {
  items: MenuItem[]
}

export interface MenuItem {
  id: string
  name: string
  menu: Menu
  description: string
  price: number
  weight: number
}



const MenuItemsInSummary: React.SFC<MenuItemListProps> = (props: MenuItemListProps) => {
  const { items } = props

  const list = items.map((items) => {
    return (
      <ListElemDiv key={items.id}>
        <h3>{items.name}</h3>
        <h4>Opis: {items.description}</h4>
        <h4>Waga: {items.weight}</h4>
        <h4>Cena: {items.price}</h4>
      </ListElemDiv>
    )
  })

  return <div>{list}</div>
}

export default MenuItemsInSummary
