import { Layout } from 'antd'
import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
import MyHeader from './cpns/my-header'
import MyMenu from './cpns/my-menu'
import style from './style.module.less'

const { Header, Sider, Content } = Layout

const layoutStyle: React.CSSProperties = {
  width: '100%',
  height: '100%'
}

const contentStyle: React.CSSProperties = {
  padding: 20
}

const AppLayout = memo(() => {
  return (
    <Layout style={layoutStyle} className={style.root}>
      <Sider className="sider">
        <MyHeader></MyHeader>
        <MyMenu></MyMenu>
      </Sider>
      <Layout>
        <Header className="header"></Header>
        <Content style={contentStyle} className="main">
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
})

export default AppLayout
