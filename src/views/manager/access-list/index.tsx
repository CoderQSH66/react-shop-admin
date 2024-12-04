import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components'
import { BetaSchemaForm } from '@ant-design/pro-components'
import rulesList from '&/roleData'
import { Button, Cascader, Tree } from 'antd'
import { memo, useCallback, useRef, useState } from 'react'
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

/** 工具函数：获取级联菜单 */
const getRules = (rulesList: ITreeData[]) => {
  const newRoleList: ITreeData[] = []
  rulesList.forEach((rule) => {
    const { child, ...rest } = rule
    if (rule.menu === 1 && child && child.length > 0) {
      newRoleList.push({
        ...rest,
        child: getRules(child)
      })
    }
  })
  return newRoleList
}
/** 工具函数：通过子rule_id找到父rule_id列表 */
const parentRuleId = (childId: number, rulesList: ITreeData[]) => {
  const ids: number[] = []
  rulesList.forEach((rule) => {
    // 通过子rule_id找到父rule_id
    if (rule.id === childId) {
      ids.push(rule.rule_id)
    }
    if (rule.child && rule.child.length > 0) {
      ids.push(...parentRuleId(childId, rule.child))
    }
  })
  return ids
}
/** 工具函数：获取所有菜单一级id */
const getMenuOneId = (rulesList: ITreeData[]) => {
  const ids: number[] = []
  rulesList.forEach((rule) => {
    if (rule.menu === 1) {
      ids.push(rule.id)
    }
  })
  return ids
}

function findEqualAncestorIdsByRuleId(dataList: ITreeData[], targetRuleId: number): number[] {
  const ancestorIds: number[] = []
  loopThroughData(dataList, null)
  return ancestorIds

  function loopThroughData(dataList: ITreeData[], parentNode: ITreeData | null) {
    for (const item of dataList) {
      if (item.rule_id === targetRuleId) {
        let currentNode: ITreeData | null = item
        while (currentNode) {
          ancestorIds.push(currentNode.rule_id)
          currentNode = parentNode
          if (parentNode) {
            const parentIndex = dataList.findIndex(node => node.id === parentNode!.id)
            if (parentIndex !== -1) {
              parentNode = dataList[parentIndex]
            }
            else {
              parentNode = null
            }
          }
        }
        return
      }
      if (item.child) {
        loopThroughData(item.child, item)
      }
    }
  }
}

const schemeColumns: ProFormColumnsType<ITreeData>[] = [
  {
    title: '上级菜单',
    dataIndex: 'rule_id',
    key: 'rule_id',
    valueType: 'cascader',
    fieldProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
        children: 'child'
      },
      options: getRules(rulesList),
      showCheckedStrategy: Cascader.SHOW_PARENT
    }
  },
  {
    title: '菜单/规则',
    dataIndex: 'mode',
    key: 'mode',
    valueType: 'radioButton',
    fieldProps: {
      options: [{
        label: '菜单',
        value: 0
      }, {
        label: '规则',
        value: 1

      }]
    }
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 'sm'
  },
  {
    valueType: 'dependency',
    name: ['mode'],
    columns: ({ mode }) => {
      if (mode) {
        return [{
          title: '后端规则',
          dataIndex: 'condition',
          key: 'condition'
        }, {
          title: '请求方式',
          dataIndex: 'method',
          key: 'method',
          valueType: 'select',
          valueEnum: {
            GET: 'GET',
            POST: 'POST',
            PUT: 'PUT',
            DELETE: 'DELETE'
          }
        }]
      }
      return [{
        title: '菜单图标',
        dataIndex: 'icon',
        key: 'icon',
        valueType: 'select'
      }, {
        title: '前端路由',
        dataIndex: 'frontpath',
        key: 'frontpath'
      }]
    }
  },
  {
    title: '排序',
    dataIndex: 'order',
    key: 'order',
    valueType: 'digit'
  }
]

const index = memo(() => {
  const [open, setOpen] = useState(false)

  const formRef = useRef<ProFormInstance<ITreeData>>()
  const handleRules = useCallback((isUpdate: boolean, treeData: ITreeData) => {
    const roleId = treeData.rule_id
    console.log(findEqualAncestorIdsByRuleId(rulesList, roleId))

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
        columns={schemeColumns}
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
