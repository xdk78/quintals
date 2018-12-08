import styled from 'styled-components'

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`

const FirstColumn = styled.div`
  display: flex;
  flex-flow: column;
  flex: 0.8;
`

const SecondColumn = styled.div`
  flex: 3;
  display: flex;
  flex-flow: column;
`

const ThirdColumn = styled.div`
  flex: 0.6;
  display: flex;
  flex-flow: column;
`

export { MainWrapper, InnerWrapper, FirstColumn, SecondColumn, ThirdColumn }
