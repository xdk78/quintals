import { Reducer } from 'redux'

import { OPEN_DIRECTORY, TOGGLE_VISIBILITY, OpenDirectoryAction, ToggleVisibilityAction } from '../actions/fileTreeActions'

export interface FileTreeState {
  isVisible: any | boolean
  openedDirectories: any
}

const defaultState: FileTreeState = {
  isVisible: {},
  openedDirectories: {}
}

export const fileTreeReducer: Reducer<FileTreeState> = (state = defaultState, action: ToggleVisibilityAction | OpenDirectoryAction) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case TOGGLE_VISIBILITY:
      newState.isVisible = Object.assign({}, newState.isVisible)
      newState.isVisible[action.payload.filePath] = !newState.isVisible[action.payload.filePath]
      break
    case OPEN_DIRECTORY:
      newState.openedDirectories = Object.assign({}, newState.openedDirectories, { [action.payload.filePath]: action.payload.files })
      break
    default:
      return state
  }
  return newState
}
