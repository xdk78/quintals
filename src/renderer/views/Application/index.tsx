import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { MainWrapper, InnerWrapper, FirstColumn, SecondColumn, ThirdColumn } from './styles'
import Loadable from 'react-loadable'
import Loading from '../../components/Loading'

const FileExplorer = Loadable({
  loader: () => import('../../components/FileExplorer'),
  loading: Loading
})

const TrackList = Loadable({
  loader: () => import('../../components/TrackList'),
  loading: Loading
})

const Toolbox = Loadable({
  loader: () => import('../../components/Toolbox'),
  loading: Loading
})

const Plugins = Loadable({
  loader: () => import('../../components/Plugins'),
  loading: Loading
})

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
