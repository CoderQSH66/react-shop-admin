import type { ILoginProps } from '@/types'
import type { FormProps } from 'antd'
import loginPng from '@/assets/img/login.png'
import { LoginInfo } from '@/store/moudles/user'
import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import style from './style.module.less'

const Login = memo(() => {
  const navigate = useNavigate()
  const dispatch = useDispatch<any>()
  const onLogin: FormProps<ILoginProps>['onFinish'] = (value) => {
    dispatch(LoginInfo({
      info: value,
      navigate
    }))
    setTimeout(() => {
      message.success('登录成功')
    }, 100)
  }
  return (
    <div className={style.root}>
      <div className="left">
        <img className="img" src={loginPng} alt="" />
      </div>
      <div className="right">
        <div className="login">
          <h2 className="title">帝莎后台管理系统</h2>
          <Divider style={{
            color: '#696969',
            borderColor: '#e3e3e3',
            letterSpacing: '2px',
            fontSize: '14px',
            marginBottom: '50px'
          }}
          >
            账号、密码
          </Divider>
          <div className="form">
            <Form
              labelCol={{
                span: 6
              }}
              wrapperCol={{
                span: 15
              }}
              onFinish={onLogin}
              size="large"
            >
              <FormItem
                label="账号"
                name="username"
                required
                rules={[{
                  required: true,
                  message: '请输入账号'
                }]}
              >
                <Input prefix={<UserOutlined />}></Input>
              </FormItem>
              <FormItem
                label="密码"
                name="password"
                required
                rules={[{
                  required: true,
                  message: '请输入密码'
                }]}
              >
                <Input.Password prefix={
                  <SettingOutlined />
                }
                >
                </Input.Password>
              </FormItem>
              <FormItem
                wrapperCol={{
                  offset: 3
                }}

              >
                <div className="action">
                  <Button type="primary" htmlType="submit">登录</Button>
                  <Button>重置</Button>
                </div>

              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Login
