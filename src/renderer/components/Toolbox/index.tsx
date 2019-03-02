import * as React from 'react'
import { Wrapper } from './styles'
import Player from '../Player'

class Toolbox extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Player />
      </Wrapper>
    )
  }
}

export default Toolbox
