import React from "react"

import styled from "styled-components"
import { List, Card, Avatar } from 'antd'
import { MenuItem } from "../manageRestaurantMenu/MenuItemList"

const { Meta } = Card

interface OrderItemListProps {
  items: OrederItem[]
}

interface OrderItemProps {
  item: OrederItem
}

export interface OrederItem {
  id: string
  name: string
  price: number
  quantity: number
  menuItem: MenuItem
}

const OrderItemList: React.SFC<OrderItemListProps> = (props: OrderItemListProps) => {
  const { items } = props

  return (
    <List
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 20,
      }}
      locale={{ emptyText: 'Brak pozycji w zamówieniu' }}
      split={false}
      dataSource={items}
      renderItem={item => <OrderItem item={item} />}
    />
  )
}

export default OrderItemList

const OrderItem: React.SFC<OrderItemProps> = (props: OrderItemProps) => {
  const StyledCard = styled(Card)`
    width: 30rem;
  `


  const { item } = props
  return (
    <StyledCard loading={false}>
      <Meta
        avatar={
          <Avatar src="https://ocs-pl.oktawave.com/v1/AUTH_876e5729-f8dd-45dd-908f-35d8bb716177/amrest-web-ordering/GRD4/GRD4590/Real%20Deal/pizzahut_szynka-1000x1000px.jpg" />
        }
        title={item.menuItem.name}
        description={item.menuItem.price + " zł"}
      />
      <h3>Ilość: {item.quantity}</h3>
    </StyledCard>
  )
}