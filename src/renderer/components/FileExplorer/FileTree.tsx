import * as React from 'react'

import Directory from './Directory'
import File from './File'
import { getAllFiles } from '../../utils/files'

interface IProps {
  readonly directory: string
  readonly isVisible?: any | boolean
  readonly files?: any
  readonly onFileClick?: any
  readonly toggleVisibility?: any
  readonly openedDirectories?: any
  readonly dispatchOpenDirectory?: (filePath, files) => any
}

interface IState {
  files: any
}

export default class FileTree extends React.Component<IProps, IState> {
  state = {
    files: this.props.files || []
  }

  componentDidMount() {
    const directory = this.props.directory
    if (this.props.openedDirectories && this.props.openedDirectories[directory]) {
      this.setState({ files: this.props.openedDirectories[directory] })
    } else {
      return (
        directory &&
        getAllFiles(directory)
          .then(files => this.setState({ files }))
          .catch(console.error)
      )
    }
  }

  handleDirectoryClick = e => file => {
    this.props.toggleVisibility(file.filePath)
    if ((this.props.openedDirectories && !this.props.openedDirectories[file.filePath]) || this.props.isVisible[file.filePath]) {
      return getAllFiles(file.filePath)
        .then(files => this.props.dispatchOpenDirectory(file.filePath, files))
        .catch(console.error)
    }
  }

  onFileClick = e => file => {
    this.props.onFileClick && this.props.onFileClick(file)
  }

  render() {
    const files = this.state.files
    return (
      files.length > 0 && (
        <ul>
          {files.map(file => {
            const filePath = file.filePath
            const fileName = filePath
              .split('/')
              .slice(-1)
              .join('')

            return file.isDirectory ? (
              <li key={`${filePath}_directory`}>
                <div onClick={this.handleDirectoryClick(file)}>
                  <Directory visible={this.props.isVisible[file.filePath]} />
                  {fileName}
                </div>
                {this.props.isVisible[file.filePath] &&
                  (file.filePath && (
                    <FileTree
                      directory={file.filePath}
                      files={file.files}
                      onFileClick={this.props.onFileClick}
                      toggleVisibility={this.props.toggleVisibility}
                      dispatchOpenDirectory={this.props.dispatchOpenDirectory}
                      openedDirectories={this.props.openedDirectories}
                      isVisible={this.props.isVisible}
                    />
                  ))}
              </li>
            ) : (
              <li key={filePath} onClick={this.onFileClick(file)}>
                <File />
                {fileName}
              </li>
            )
          })}
        </ul>
      )
    )
  }
}
