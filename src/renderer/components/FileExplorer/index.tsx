import * as React from 'react'
import { Wrapper } from './styles'
import Loadable from 'react-loadable'
import Loading from '../Loading'

const FileTree = Loadable({
  loader: () => import('../../containers/FileTreeContainer'),
  loading: () => <Loading />
})

class FileExplorer extends React.Component {
  state = {
    directory: './src'
  }

  render() {
    return (
      <Wrapper>
        <FileTree directory={this.state.directory} />
      </Wrapper>
    )
  }
}

export default FileExplorer
