import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 12px;
    background-color: #252525;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
    background-color: #313131;
  }
`

export { Wrapper }
