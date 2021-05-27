import React from "react"

import styled from "styled-components"
import { Link } from "react-router-dom"

import { List, Card, Avatar } from 'antd'
const { Meta } = Card

interface RestaurantListProps {
  restaurants: Restaurant[]
}

interface RestaurantProps {
  restaurant: Restaurant
}

export interface Restaurant {
  id: string
  name: string
  type: number
  restaurantType: RestaurantType
}

export interface RestaurantType {
  id: string
  displayName: string
}



const RestaurantItem: React.SFC<RestaurantProps> = (props: RestaurantProps) => {
  const StyledCard = styled(Card)`
    width: 30rem;
  `

  const { restaurant } = props
  return (
    <List.Item>
      <Link to={"/menu/" + restaurant.id}>
        <StyledCard loading={false}>
          <Meta
            avatar={
              <Avatar src="https://ocs-pl.oktawave.com/v1/AUTH_876e5729-f8dd-45dd-908f-35d8bb716177/amrest-web-ordering/GRD4/GRD4590/Real%20Deal/pizzahut_szynka-1000x1000px.jpg" />
            }
            title={restaurant.name}
            description={restaurant.restaurantType.displayName}
          />
        </StyledCard>
      </Link>
    </List.Item>
  )
}

const RestaurantList: React.SFC<RestaurantListProps> = (props: RestaurantListProps) => {
  const { restaurants } = props

  return (
    <List
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 20,
      }}
      locale={{ emptyText: 'Brak restauracji' }}
      split={false}
      dataSource={restaurants}
      renderItem={item => <RestaurantItem restaurant={item} />}
    />
  )
}

export default RestaurantList