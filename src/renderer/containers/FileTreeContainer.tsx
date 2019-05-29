import { connect } from 'react-redux'
import { RootState } from '../reducers'
import {
  OpenDirectoryAction,
  openDirectory,
  ToggleVisibilityAction,
  toggleVisibility
} from '../actions/fileTreeActions'
import { Dispatch } from 'redux'
import FileTree from '../components/FileExplorer/FileTree'

const mapStateToProps = (state: RootState, props) => ({
  ...props,
  isVisible: state.fileTree.isVisible,
  openedDirectories: state.fileTree.openedDirectories
})

const mapDispatchToProps = (dispatch: Dispatch<OpenDirectoryAction | ToggleVisibilityAction>) => ({
  toggleVisibility: filePath => dispatch(toggleVisibility(filePath)),
  dispatchOpenDirectory: (filePath, files) => dispatch(openDirectory(filePath, files))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileTree)
