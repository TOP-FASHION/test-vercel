const fs = require('fs')
const chalk = require('chalk')
const {i18n, defaultNS} = require('./next-i18next.config')
const {locales, defaultLocale} = i18n

const i18nextScannerConfig = {
  input: [
    'src/**/*.{ts,tsx}',
    'src/**/*.i18next.yml',
    '!**/node_modules/**',
  ],
  output: './',
  options: {
    removeUnusedKeys: true,
    sort: true,
    attr: false,
    func: {
      list: ['t'],
    },
    trans: false,
    lngs: locales,
    fallbackLng: defaultLocale,
    ns: [defaultNS],
    defaultLng: defaultLocale,
    defaultNs: defaultNS,
    defaultValue: customDefaultName,
    resource: {
      loadPath: 'public/locales/en-GB/{{ns}}.json',
      savePath: 'public/locales/en-GB/{{ns}}.json',
    },
    keySeparator: false,
  },
  transform: customTransform,
}

module.exports = i18nextScannerConfig

// PARTS

function customDefaultName(lng, ns, key) {
  return `{${key}}`
}

function customTransform(file, enc, done) {
  const parser = this.parser
  const content = fs.readFileSync(file.path, enc)
  const filePath = file.relative
  const extension = file.extname.slice(1)
  const keysParser = getKeysParser(extension)
  const keyPrefixParser = getKeyPrefixParser(extension)
  const keyPrefix = keyPrefixParser(content, filePath)
  let keysFound = 0

  keysParser.call(this, content, (key) => {
    const extendedKey = keyPrefix ? keyPrefix + '.' + key : key
    parser.set(extendedKey)
    keysFound++
  })

  if (keysFound > 0) {
    report(filePath, keysFound)
  }

  done()
}

function getKeysParser(extension) {
  if (extension === 'yml') {
    return parseYml
  }
  return parseTs

  function parseYml(content, callback = (key) => {}) {
    const regex = /^.+$/gm
    const keys = Array.from(content.matchAll(regex), (m) => m[0])
    keys.forEach((key) => {
      callback(key)
    })
  }

  function parseTs(content, callback = (key) => {}) {
    const parser = this.parser
    parser.parseFuncFromString(content, (key) => {
      callback(key)
    })
  }
}

function getKeyPrefixParser(extension) {
  if (extension === 'yml') {
    return parseYml
  }
  return parseTs

  function parseYml(content, filePath) {
    const regex = /([^/\\]+)\.i18next\.yml$/
    return filePath.match(regex)[1]
  }

  function parseTs(content, filePath) {
    const regex = /useTranslation\(['"](.+?)['"]\)/g
    const prefixesAll = Array.from(content.matchAll(regex), (m) => m[1])
    const prefixesUnique = [...new Set(prefixesAll)]
    const prefixesUniqueNumber = prefixesUnique.length

    if (prefixesUniqueNumber > 1) {
      throw new Error(
        `Found multiple declaration of the key prefix [${prefixesUnique}] in the file "${filePath}". Please make a refactoring.`
      )
    }

    return prefixesAll[0]
  }
}

function report(fileName, keysFound = 0) {
  const keysNumberFormatted = chalk.cyan((keysFound + '   ').slice(0, 3))
  const fileNameFormatted = chalk.yellow(JSON.stringify(fileName))
  console.log(`  ${keysNumberFormatted} ${fileNameFormatted}`)
}
