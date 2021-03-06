import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 24;
`

const Button = styled.div`
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.24);
  }
  font-size: 24px;
  padding: 4px;
`

export { Wrapper, Button }
