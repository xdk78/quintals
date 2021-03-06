import * as React from 'react'
import { Wrapper, Button, Time } from './styles'

class Player extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Time>0:00:00</Time>
        <Button className="material-icons">play_circle_outline</Button>
        <Button className="material-icons">pause</Button>
        <Button className="material-icons">stop</Button>
      </Wrapper>
    )
  }
}

export default Player
