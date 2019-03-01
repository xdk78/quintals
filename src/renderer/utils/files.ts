import Promise from 'bluebird'
import path from 'path'

Promise.config({
  warnings: {
    wForgottenReturn: false
  }
})

const fs = Promise.promisifyAll(require('fs'))

export type TFile = {
  filePath: string
  isDirectory: boolean
}

/**
 * Returns files for for given path recursively
 */
export const getAllFiles = (dir: string) => {
  return fs.readdirAsync(dir).then((fileNamesArr: string[]) => {
    const fileStatPromises = fileNamesArr.map((fileName: string) => {
      return fs.statAsync(`${dir}/${fileName}`).then(stats => {
        const file = {
          filePath: null,
          isDirectory: null
        } as TFile
        file.filePath = `${dir}/${fileName}`
        file.isDirectory = !stats.isFile()
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
