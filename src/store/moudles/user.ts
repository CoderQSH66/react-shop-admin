import type { ILoginProps, IMenuProps, IUserInfoProps } from '@/types'
import { getUserInfo, login } from '@/api'
import { local } from '@/utils/Storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface IUserState {
  token: string
  userInfo: Omit<IUserInfoProps, 'menus'>
  menus: IMenuProps[]
}

const initialState: IUserState = {
  token: local.get('token') || '',
  userInfo: local.get('userInfo') || {
  },
  menus: local.get('menus') || []
}

// 异步action
export const LoginInfo = createAsyncThunk('getLoginToken', async (info: ILoginProps, { dispatch }) => {
  try {
    // 登录获取token
    const res = await login(info)
    const token = res.data.token
    local.set('token', token)
    dispatch(setUsetToken(token))
    // 获取用户信息
    const { data: userInfos } = await getUserInfo()
    const { menus, ...userinfo } = userInfos
    local.set('userInfo', userinfo)
    local.set('menus', menus)
    dispatch(setUserInfo(userinfo))
    dispatch(setMenus(menus))
  }
  catch (error: any) {
    throw new Error(error)
  }
})

const userStore = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsetToken(state, { payload }) {
      state.token = payload
    },
    setUserInfo(state, { payload }) {
      state.userInfo = payload
    },
    setMenus(state, { payload }) {
      state.menus = payload
    }
  }
})

export const { setUsetToken, setUserInfo, setMenus } = userStore.actions
export const userReducer = userStore.reducer
