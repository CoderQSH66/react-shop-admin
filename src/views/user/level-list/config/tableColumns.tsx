import type { ProColumns } from '@ant-design/pro-components'

export interface IVipLevel {
  id: number
  level: string
  order: number
  status: number
  discount: number
}
export const tableColumns: ProColumns<IVipLevel>[] = [
  {
    title: '会员等级',
    dataIndex: 'level',
    key: 'level',
    valueType: 'text'
  },
  {
    title: '折扣率',
    dataIndex: 'discount',
    key: 'discount',
    valueType: 'text'
  },
  {
    title: '等级序号',
    dataIndex: 'order',
    key: 'order',
    valueType: 'digit'
  }

]
