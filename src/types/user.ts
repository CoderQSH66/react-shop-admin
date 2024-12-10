export interface ILoginProps {
  username: string
  password: string
}

export interface ILoginReturnProps {
  token: string
}

export interface IUserInfoProps {
  id: number
  avatar: string
  super: number
  username: string
  role: {
    id: number
    name: string
  }
  ruleNames: string[]
  menus: IMenuProps[]
}
export interface IMenuProps {
  id: number
  menu_id: number
  status: number
  create_time: string
  update_time: string
  name: string
  desc: string | null
  frontpath: string
  condition: any
  menu: number
  order: number
  icon: string
  method: string
  child: IMenuProps[]
}
