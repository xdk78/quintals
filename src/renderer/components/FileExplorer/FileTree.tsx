import * as React from 'react'
import Directory from './Directory'
import File from './File'
import { getAllFiles, QFile } from '../../../utils/files'
import { ItemWrapper, TreeWrapper } from './styles'
import audioDecode from 'audio-decode'

interface IProps {
  readonly directory: string
  readonly isVisible?: boolean
  readonly files?: any[]
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

  onFileClick = (file: QFile) => e => {
    this.props.onFileClick && this.props.onFileClick(file)

    const { filePath, extension } = file

    if (filePath && extension === 'wav') {
      // TODO: use native fs to laod file instead getting it from url
      fetch(filePath)
        .then(response => response.arrayBuffer())
        .then(buffer => {
          audioDecode(buffer).then((audioBuffer: AudioBuffer) => {
            const audioContext = new AudioContext()
            const source = audioContext.createBufferSource()

            source.buffer = audioBuffer
            source.connect(audioContext.destination)
            source.start()
          })
        })
    }
  }

  render() {
    const files = this.state.files
    return (
      files &&
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
