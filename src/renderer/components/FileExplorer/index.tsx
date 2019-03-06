import * as React from 'react'
import { Wrapper } from './styles'
import * as Loadable from 'react-loadable'
import Loading from '../Loading'
import { getUserData } from '../../utils/files'

const FileTree = Loadable({
  loader: () => import('../../containers/FileTreeContainer'),
  loading: Loading
})

class FileExplorer extends React.PureComponent {
  state = {
    directory: getUserData('./')
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
