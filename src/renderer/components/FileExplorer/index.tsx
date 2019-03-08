import * as React from 'react'
import { Wrapper } from './styles'
import { getResourcesData, getUserData } from '../../../utils/files'
import FileTree from '../../containers/FileTreeContainer'

class FileExplorer extends React.Component {
  state = {
    directory: getUserData('resources')
  }

  componentDidMount = async () => {
    const resourcesPath = await getResourcesData()
    this.setState({ directory: resourcesPath })
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
