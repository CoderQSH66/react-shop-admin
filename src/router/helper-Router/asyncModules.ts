type TimportType = typeof import('**/*.tsx')

type TmodulesType = Record<string, () => Promise<TimportType>>

const modules: TmodulesType = {
  ...import.meta.glob<TimportType>('../../views/**/*.tsx'),
  ...import.meta.glob<TimportType>('../../layout/**/*.tsx')
}
const asyncModules = Object.keys(modules).reduce((originModules, fullpath) => {
  const path = fullpath.replace('/index.tsx', '').split('/').at(-1)
  originModules[path!] = modules[fullpath]
  return originModules
}, {
} as TmodulesType)

export default asyncModules
