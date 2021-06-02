import styled from 'styled-components'
import { Link } from "react-router-dom"

export const StyledForm = styled.form`
  padding: 1rem;
  margin: 0 auto;
  max-width: 30rem;
`

export const FormRow = styled.div`
  margin-bottom: 1rem;
`

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
`

export const FormLink = styled(Link)`
  text-decoration: none;
  color: #4c8ffb;
`

export const Button = styled.button`
  color: white;
  background: #4c8ffb;
  border: 0.1rem #3079ed solid;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  box-sizing: border-box;
  width: 100%;
`
