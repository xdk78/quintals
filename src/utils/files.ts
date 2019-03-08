import { constants, readdir, stat, access, mkdir } from 'fs'
import { promisify } from 'util'
import { homedir } from 'os'
import { resolve } from 'path'

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
 * Returns file path from user data
 */
export const getUserData = (relativePath: string): string => {
  try {
    const userData = resolve(homedir(), '.quintals', relativePath).replace(/\\/g, '/')
    return userData
  } catch (error) {
    throw error
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
