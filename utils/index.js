import fs from 'fs'
import readline from 'readline'

export async function processLineByLine(filePath, forEachLine, endOfProcess) {
  const fileStream = fs.createReadStream(process.cwd() + filePath)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    forEachLine(line)
  }

  endOfProcess()
}

export function readFile(filePath) {
  return new Promise((resolve) => {
    let fileContent = ''
    processLineByLine(
      filePath,
      (line) => {
        fileContent += `${line}\n`
      },
      () => {
        resolve(fileContent)
      }
    )
  })
}
