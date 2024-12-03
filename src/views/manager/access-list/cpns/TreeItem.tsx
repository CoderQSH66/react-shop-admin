import { Button, Switch, Tag } from 'antd'
import React, { memo } from 'react'
import style from './style.module.less'

interface ITreeData {
  id: number
  rule_id: number
  status: number
  create_time: string
  update_time: string
  name: string
  desc: string
  frontpath: null
  condition: null
  menu: number
  order: number
  icon: string
  method: string
  child: ITreeData[]
}

interface ITreeItemProps {
  treeData: ITreeData
  changeStatus: (status: boolean) => void
  handleRules: (isUpdate: boolean, treeData: any) => void
  removeRules: (treeData: any) => void
}

const TreeItem: React.FC<ITreeItemProps> = memo(({ treeData, changeStatus, handleRules, removeRules }) => {
  return (
    <div className={style.treeItem}>
      <div className="left">
        <Tag color={treeData.menu ? 'blue' : 'default'}>{treeData.menu ? '菜单' : '权限'}</Tag>
        <span>{treeData.name}</span>
      </div>
      <div className="right">
        <Switch
          size="default"
          value={Boolean(treeData.status)}
          onChange={(e) => {
            changeStatus(e)
          }}
        >
        </Switch>
        <Button
          type="link"
          onClick={() => {
            handleRules(true, treeData)
          }}
        >
          修改
        </Button>
        <Button
          type="link"
          onClick={() => {
            handleRules(false, treeData)
          }}
        >
          增加
        </Button>
        <Button
          type="link"
          onClick={() => {
            removeRules(treeData)
          }}
        >
          删除
        </Button>
      </div>
    </div>
  )
})

export default TreeItem
