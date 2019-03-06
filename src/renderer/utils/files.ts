import BPromise from 'bluebird'
import path from 'path'
import { remote, app } from 'electron'
import { constants } from 'fs'

BPromise.config({
  warnings: {
    wForgottenReturn: false
  }
})

const fsPromises = BPromise.promisifyAll(require('fs'))

export interface QFile {
  filePath: string
  isDirectory: boolean
  extension: string
}

/**
 * Returns files for for given path recursively
 */
export const getAllFiles = (dir: string): BPromise<BPromise<QFile>[]> => {
  return fsPromises.readdirAsync(dir).then((fileNamesArr: string[]) => {
    const fileStatPromises = fileNamesArr.map((fileName: string) => {
      return fsPromises.statAsync(`${dir}/${fileName}`).then(stats => {
        return {
          filePath: `${dir}/${fileName}`,
          isDirectory: !stats.isFile(),
          extension: fileName.split('.').pop()
        } as QFile
      })
    })
    return BPromise.all(fileStatPromises)
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
export const getUserData = (...relativePaths: string[]): string => {
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

/**
 * Returns resources path from user data
 */
export const getResourcesData = async (): Promise<string> => {
  const resourcesPath = getUserData('resources')

  fsPromises.accessAsync(resourcesPath, constants.R_OK | constants.W_OK).catch(async () => {
    await fsPromises.mkdirAsync(resourcesPath)
  })

  return resourcesPath
}
