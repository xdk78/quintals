import { combineReducers } from 'redux'
import { FileTreeState, fileTreeReducer } from './fileTreeReducer'

export interface RootState {
  fileTree: FileTreeState
}

export const rootReducer = combineReducers<RootState | undefined>({
  fileTree: fileTreeReducer
})
