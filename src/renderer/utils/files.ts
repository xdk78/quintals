const Promise = require('bluebird')

Promise.config({
  warnings: {
    wForgottenReturn: false
  }
})

const fs = Promise.promisifyAll(require('fs'))

export const getAllFiles = dir => {
  return fs.readdirAsync(dir).then(fileNamesArr => {
    const fileStatPromises = fileNamesArr.map(fileName => {
      return fs.statAsync(`${dir}/${fileName}`).then(stats => {
        const file = {
          filePath: null,
          isDirectory: null
        }
        file.filePath = `${dir}/${fileName}`
        file.isDirectory = !stats.isFile()
        return file
      })
    })
    return Promise.all(fileStatPromises)
  })
}
