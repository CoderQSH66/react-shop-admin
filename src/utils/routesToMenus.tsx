import type { IMenuProps } from '@/types'
import type { MenuProps } from 'antd'
import { splitPath } from '@/router/helper-Router/handleDynamicRouter'

type MenuItem = Required<MenuProps>['items'][number]

export default function routesToMenus(menus: IMenuProps[]): Omit<MenuItem, 'type'>[] {
  return menus.map<Omit<MenuItem, 'type'>>((menu) => {
    // const IconRender = iconModules[route.meta?.icon as string]
    return {
      key: (menu.frontpath && splitPath(menu.frontpath)) || menu.desc || menu.icon,

      label: menu.name,
      // icon: IconRender
      //   ? (
      //       <Icon
      //         component={IconRender}
      //       >
      //       </Icon>
      //     )
      //   : null,
      children: menu.child.length > 0 && routesToMenus(menu.child)
    }
  })
}
