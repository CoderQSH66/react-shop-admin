import type { ProFormInstance } from '@ant-design/pro-components'
import getMenuOneId from '@/utils/getMenuOneId'
import parentRuleId from '@/utils/parentRuleId'
import { BetaSchemaForm } from '@ant-design/pro-components'
import rulesList from '&/roleData'
import { Button, Tree } from 'antd'
import { memo, useCallback, useRef, useState } from 'react'
import { schemaColumns } from './config/schemaColumns'
import TreeItem from './cpns/TreeItem'
import style from './style.module.less'

interface ITreeData {
  id: number
  rule_id: number
  status: number
  create_time: string
  update_time: string
  name: string
  desc: string | null
  frontpath: any
  condition: any
  menu: number
  order: number
  icon: string
  method: string
  child: ITreeData[]
}

const index = memo(() => {
  const [open, setOpen] = useState(false)

  const formRef = useRef<ProFormInstance<ITreeData>>()
  const handleRules = useCallback((isUpdate: boolean, treeData: ITreeData) => {
    const roleId = treeData.rule_id

    const parentIds = parentRuleId(roleId, rulesList).filter(Boolean)
    setOpen(true)

    if (isUpdate) {
      formRef.current?.setFieldsValue({
        ...treeData,
        rule_id: roleId ? [...parentIds, roleId] as any : [],
        mode: 0
      } as any)
    }
    else {
      formRef.current?.setFieldsValue({
        ...treeData,
        rule_id: roleId ? [...parentIds, roleId] as any : [],
        mode: 1
      } as any)
    }
  }, [])

  const removeRules = useCallback((treeData: ITreeData) => {
    console.log(treeData)
  }, [])
  return (
    <div className="layout-bg">
      <Button
        type="primary"
        onClick={() => {
          setOpen(true)
          formRef.current?.resetFields()
        }}
      >
        新增
      </Button>
      <Tree
        className={style.treeContainer}
        defaultExpandedKeys={getMenuOneId(rulesList)}
        titleRender={(node) => {
          return (
            <TreeItem
              treeData={node as any}
              changeStatus={(status) => {
                console.log(status)
                node.status = Number(status)
              }}
              handleRules={handleRules}
              removeRules={removeRules}
            >
            </TreeItem>
          )
        }}
        treeData={rulesList}
        blockNode
        fieldNames={{
          title: 'name',
          key: 'id',
          children: 'child'
        }}
      >
      </Tree>
      <BetaSchemaForm
        formRef={formRef}
        layoutType="DrawerForm"
        drawerProps={{
          forceRender: true
        }}
        resize={{
          minWidth: 500,
          maxWidth: window.innerWidth * 0.8
        }}
        open={open}
        onOpenChange={setOpen}
        columns={schemaColumns}
        layout="horizontal"
        initialValues={{
          mode: 0
        }}
        labelCol={{
          span: 6
        }}
        onFinish={async (data) => {
          console.log(data)
        }}
      >
      </BetaSchemaForm>
    </div>
  )
})

export default index
