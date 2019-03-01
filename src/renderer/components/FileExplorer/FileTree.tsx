import * as React from 'react'

import Directory from './Directory'
import File from './File'
import { getAllFiles, TFile, parseFileUri } from '../../utils/files'
import { ItemWrapper, TreeWrapper } from './styles'
import { Howl } from 'howler'
import { resolve } from 'path'

interface IProps {
  readonly directory: string
  readonly isVisible?: boolean
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

  handleDirectoryClick = file => e => {
    this.props.toggleVisibility(file.filePath)
    if (
      (this.props.openedDirectories && !this.props.openedDirectories[file.filePath]) ||
      this.props.isVisible[file.filePath]
    ) {
      return getAllFiles(file.filePath)
        .then(files => this.props.dispatchOpenDirectory(file.filePath, files))
        .catch(console.error)
    }
  }

  onFileClick = (file: TFile) => e => {
    this.props.onFileClick && this.props.onFileClick(file)

    const path = file.filePath
    const parsedFile = parseFileUri(path)

    const sound = new Howl({
      src: [parsedFile],
      onload() {
        console.log(`Loaded ${parsedFile}`)
      },
      onend(soundId) {
        console.log(`Finished ${parsedFile} ${soundId}`)
      }
    })
    sound.play()
  }

  render() {
    const files = this.state.files
    return (
      files.length > 0 && (
        <TreeWrapper>
          {files.map(file => {
            const filePath = file.filePath
            const fileName = filePath
              .split('/')
              .slice(-1)
              .join('')

            return file.isDirectory ? (
              <ItemWrapper key={`${filePath}_directory`}>
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
              </ItemWrapper>
            ) : (
              <ItemWrapper key={filePath} onClick={this.onFileClick(file)}>
                <File />
                {fileName}
              </ItemWrapper>
            )
          })}
        </TreeWrapper>
      )
    )
  }
}
