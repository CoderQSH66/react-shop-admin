import type { ProFormColumnsType } from '@ant-design/pro-components'
import { BetaSchemaForm } from '@ant-design/pro-components'
import roleList from '&/roleData'
import { Tree } from 'antd'
import { memo, useCallback } from 'react'
import TreeItem from './cpns/TreeItem'
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
      options: roleList
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
  const handleRules = useCallback((isUpdate: boolean, treeData: ITreeData) => {
    console.log(isUpdate)
    console.log(treeData)
  }, [])

  const removeRules = useCallback((treeData: ITreeData) => {
    console.log(treeData)
  }, [])
  return (
    <div className="layout-bg">
      <Tree
        className={style.treeContainer}
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
        treeData={roleList}
        blockNode
        fieldNames={{
          title: 'name',
          key: 'id',
          children: 'child'
        }}
      >
      </Tree>
      <BetaSchemaForm
        columns={schemeColumns}
        layout="horizontal"
        initialValues={{
          mode: 0
        }}
        labelCol={{
          span: 6
        }}
      >
      </BetaSchemaForm>
    </div>
  )
})

export default index
