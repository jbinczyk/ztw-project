import React from "react"
import styled from 'styled-components'
import { Link } from "react-router-dom"
import { List, Card, Avatar } from 'antd'
import { Restaurant } from "../../RestaurantList"

const { Meta } = Card;

interface OrderListProps {
  orders: Order[]
}

interface OrderProps {
  order: Order
}

export interface Order {
  id: string
  status: string
  orderDate: string
  restaurant: Restaurant
}

function translateStatus(status: string) {

  if (status === 'WAITING') return 'Oczekujące'
  if (status === 'PROCESSED') return 'Realizowane'
  if (status === 'DELIVERING') return 'W drodze'
  if (status === 'DELIVERED') return 'Dostarczono'

  return status;
};

const OrderList: React.SFC<OrderListProps> = (props: OrderListProps) => {
  const { orders } = props

  return (
    <List
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 20,
      }
      }
      locale={{ emptyText: 'Brak zamówień' }}
      split={false}
      dataSource={orders}
      renderItem={item => <Order order={item} />}
    />
  )

}

export default OrderList

const Order: React.SFC<OrderProps> = (props: OrderProps) => {
  const StyledCard = styled(Card)`
    width: 30rem;
  `

  const { order } = props
  return (
    <List.Item>
      <Link to={"/history/" + order.id}>
        <StyledCard loading={false}>
          <Meta
            avatar={
              <Avatar src="https://ocs-pl.oktawave.com/v1/AUTH_876e5729-f8dd-45dd-908f-35d8bb716177/amrest-web-ordering/GRD4/GRD4590/Real%20Deal/pizzahut_szynka-1000x1000px.jpg" />
            }
            title={order.restaurant.name}
            description={translateStatus(order.status)}
          />
          <h4>Data: {order.orderDate.substr(0, 10)}</h4>
        </StyledCard>
      </Link>
    </List.Item>
  )
}
