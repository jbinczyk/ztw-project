import React, { useState } from "react"

import styled from "styled-components"
import { withRouter, RouteComponentProps } from "react-router-dom"

import { Input } from 'antd'

import pizza from '../../../img/pizza.jpg'

const { Search } = Input

const StyledHome = styled.div`
  min-height: 100vh;
  background-image: url(${pizza});
`
const Main = styled.div`
  margin: 0 auto;
  max-width: 31rem;
`

const HomeText = styled.div`
    font-size: 4rem;
    color: white;
    font-weight: bold;
    text-shadow: 0 0 1rem black;
    margin: 0 auto;
    padding: 3rem 2rem;
    text-align: center;
    background-image: linear-gradient(to top, rgba(255,0,0,0), white);
`


function Home({ history }: RouteComponentProps) {
  const [text, setText] = useState("")
  const handleChangeText = (event: any) => {
    setText(event.target.value)
  }

  const handleSubmit = () => {
    const location = text
    console.log(`Szukanie dla ${text}`)
    history.push(`/browse/${location}`)
  }

  return (
    <StyledHome>
      <HomeText>
        <p>ZJEDZ COŚ</p>
        <p>Smaczne jedzenie czeka</p>
      </HomeText>
      <Main>
        <Search
          onChange={handleChangeText}
          onSearch={handleSubmit}
          placeholder="Wpisz swoje miasto"
          enterButton="Szukaj"
          size="large"
        />
      </Main>
    </StyledHome>
  )
}

export default withRouter(Home)
