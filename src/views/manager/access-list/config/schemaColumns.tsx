import type { ProFormColumnsType } from '@ant-design/pro-components'
import getRules from '@/utils/getRules'
import rulesList from '&/roleData'
import { Cascader } from 'antd'

export interface ITreeData {
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

export const schemaColumns: ProFormColumnsType<ITreeData>[] = [
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
