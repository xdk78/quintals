import { Action, ActionCreator } from 'redux'

export const OPEN_DIRECTORY = 'OPEN_DIRECTORY'
export const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY'

export interface OpenDirectoryAction extends Action {
  type: 'OPEN_DIRECTORY'
  payload: { filePath: string; files: any }
}

export interface ToggleVisibilityAction extends Action {
  type: 'TOGGLE_VISIBILITY'
  payload: { filePath: string }
}

export const openDirectory: ActionCreator<OpenDirectoryAction> = (filePath, files) => ({
  type: OPEN_DIRECTORY,
  payload: { filePath, files }
})

export const toggleVisibility: ActionCreator<ToggleVisibilityAction> = filePath => ({
  type: TOGGLE_VISIBILITY,
  payload: { filePath }
})
