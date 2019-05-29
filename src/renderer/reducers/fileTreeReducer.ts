import { Reducer } from 'redux'

import {
  OPEN_DIRECTORY,
  TOGGLE_VISIBILITY,
  OpenDirectoryAction,
  ToggleVisibilityAction
} from '../actions/fileTreeActions'

export interface FileTreeState {
  isVisible: any | boolean
  openedDirectories: any
}

const defaultState: FileTreeState = {
  isVisible: {},
  openedDirectories: {}
}

export const fileTreeReducer: Reducer<FileTreeState> = (
  state = defaultState,
  action: ToggleVisibilityAction | OpenDirectoryAction
) => {
  switch (action.type) {
    case TOGGLE_VISIBILITY:
      return {
        ...state,
        isVisible: {
          ...state.isVisible,
          [action.payload.filePath]: !state.isVisible[action.payload.filePath]
        }
      }
    case OPEN_DIRECTORY:
      return {
        ...state,
        openedDirectories: {
          ...state.openedDirectories,
          [action.payload.filePath]: action.payload.files
        }
      }
    default:
      return state
  }
}
