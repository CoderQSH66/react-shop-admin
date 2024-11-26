import * as antIcons from '@ant-design/icons'

const iconModules: { [key: string]: any } = {
}
Object.keys(antIcons).forEach((key) => {
  iconModules[key] = (antIcons as any)[key]
})
export default iconModules
