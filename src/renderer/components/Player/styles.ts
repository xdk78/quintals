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

const Time = styled.div`
  cursor: default;
  padding: 4px;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  width: 62px;
  background-color: #cddc39;
`

export { Wrapper, Time, Button }
