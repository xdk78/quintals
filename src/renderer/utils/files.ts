import path from 'path'
import { remote } from 'electron'
import { constants, readdir, stat, access, mkdir } from 'fs'
import { promisify } from 'util'

const fsPromises = {
  readdir: promisify(readdir),
  stat: promisify(stat),
  access: promisify(access),
  mkdir: promisify(mkdir)
}

export interface QFile {
  filePath: string
  isDirectory: boolean
  extension: string
}

/**
 * Returns files for for given path recursively
 */
export const getAllFiles = (dir: string): Promise<QFile[]> => {
  return fsPromises.readdir(dir).then((fileNamesArr: string[]) => {
    const fileStatPromises = fileNamesArr.map((fileName: string) => {
      return fsPromises.stat(`${dir}/${fileName}`).then(stats => {
        return {
          filePath: `${dir}/${fileName}`,
          isDirectory: !stats.isFile(),
          extension: fileName.split('.').pop()
        } as QFile
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
export const getUserData = (relativePath: string): string => {
  try {
    const userData = path.resolve(remote.app.getPath('userData'), relativePath)
    return userData
  } catch (error) {
    console.error(error)
  }
}

/**
 * Returns resources path from user data
 */
export const getResourcesData = async (): Promise<string> => {
  try {
    const resourcesPath = getUserData('resources')

    fsPromises.access(resourcesPath, constants.R_OK | constants.W_OK).catch(async () => {
      await fsPromises.mkdir(resourcesPath)
    })

    return resourcesPath
  } catch (error) {
    console.error(error)
  }
}
