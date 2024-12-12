export interface IUserProps {
  id: number
  username: string
  avatar: string
  nickname: string
  phone: string
  email: string
  user_level_id: number
  create_time: string
  update_time: string
  last_login_time: null
  status: number
  user_level: Userlevel
}

export interface Userlevel {
  id: number
  name: string
}

export interface IUserList {
  list: IUserProps[]
  totalCount: number
}

export interface IAddUserProps {
  username: string
  password: string
  status: string
  nickname: string
  phone: string
  email: string
  avatar: string
  user_level_id: string
  create_time: string
  update_time: string
  id: string
}
