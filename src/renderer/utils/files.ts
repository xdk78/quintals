import Promise from 'bluebird'
import path from 'path'
import { remote, app } from 'electron'

Promise.config({
  warnings: {
    wForgottenReturn: false
  }
})

const fsp = Promise.promisifyAll(require('fs'))

export type TFile = {
  filePath: string
  isDirectory: boolean
  extension: string
}

/**
 * Returns files for for given path recursively
 */
export const getAllFiles = (dir: string) => {
  return fsp.readdirAsync(dir).then((fileNamesArr: string[]) => {
    const fileStatPromises = fileNamesArr.map((fileName: string) => {
      return fsp.statAsync(`${dir}/${fileName}`).then(stats => {
        const file = {
          filePath: null,
          isDirectory: null,
          extension: null
        } as TFile
        file.filePath = `${dir}/${fileName}`
        file.isDirectory = !stats.isFile()
        file.extension = fileName.split('.').pop()
        return file
      })
    })
    return Promise.all(fileStatPromises)
  })
}

/**
 * Parse an URI for File and returns relative path
 */
export const parseFileUri = (uri: string): string => {
  const location = path.resolve(uri)
  return location
}

/**
 * Returns file path from user data
 */
export const getUserData = (...relativePaths: string[]) => {
  let filePath: string

  if (remote) {
    filePath = remote.app.getPath('userData')
  } else if (app) {
    filePath = app.getPath('userData')
  } else {
    return null
  }

  return path.resolve(filePath, ...relativePaths).replace(/\\/g, '/')
}
