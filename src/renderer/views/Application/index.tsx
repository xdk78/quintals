import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { MainWrapper, InnerWrapper, FirstColumn, SecondColumn, ThirdColumn } from './styles'
import Toolbox from '../../components/Toolbox'
import FileExplorer from '../../components/FileExplorer'
import TrackList from '../../components/TrackList'
import Plugins from '../../components/Plugins'

class Application extends React.Component {
  render() {
    return (
      <MainWrapper>
        <Toolbox />
        <InnerWrapper>
          <FirstColumn>
            <FileExplorer />
          </FirstColumn>
          <SecondColumn>
            <TrackList />
          </SecondColumn>
          <ThirdColumn>
            <Plugins />
          </ThirdColumn>
        </InnerWrapper>
      </MainWrapper>
    )
  }
}

export default withRouter(Application as any)
