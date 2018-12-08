import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 26px;
  background: #202020;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  user-select: none;
`

const WrapperLine = styled.div`
  display: flex;
  flex-direction: row;
  height: 2px;
  background: transparent;
  -webkit-app-region: no-drag;
`

const WrapperItems = styled.div`
  display: flex;
  flex-direction: row;
  height: 24;
  -webkit-app-region: drag;
`

const Title = styled.div`
  -webkit-app-region: drag;
  cursor: default;
  margin-top: -1px;
  padding-top: 4px;
  padding-left: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  width: 16px;
  background-color: #cddc39;
`

const Button = styled.div`
  cursor: pointer;
  -webkit-app-region: no-drag;
  &:hover {
    background: rgba(255, 255, 255, 0.24);
  }
  font-size: 18px;
  margin-top: -2px;
  padding: 4px;
`

const TextButton = styled.div`
  cursor: pointer;
  -webkit-app-region: no-drag;
  &:hover {
    background: rgba(255, 255, 255, 0.24);
  }
  font-size: 14px;
  margin-top: -2px;
  padding: 4px;
`

const CloseButton = styled(Button)`
  &:hover {
    background: #ed2939;
  }
`

const Buttons = styled.div`
  margin-left: auto;
`

export { WrapperLine, Wrapper, WrapperItems, Title, TextButton, Button, CloseButton, Buttons }
