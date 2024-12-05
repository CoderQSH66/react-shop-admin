import waitTime from '@/utils/waitTime'
import { type ProColumns, ProFormSwitch } from '@ant-design/pro-components'

interface IRole {
  id: number
  name: string
  desc: string
  status: number
}
export const tableColumns: ProColumns<IRole>[] = [{
  title: '角色名称',
  dataIndex: 'name',
  key: 'name',
  width: '25%'
}, {
  title: '角色描述',
  dataIndex: 'desc',
  key: 'desc',
  width: '25%'

}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render(_, entity) {
    return (
      <ProFormSwitch
        noStyle
        checkedChildren="开"
        unCheckedChildren="关"
        fieldProps={{
          defaultChecked: entity.status === 1,
          onChange: async (e) => {
            await waitTime()
            console.log(e)
          }
        }}

      >
      </ProFormSwitch>
    )
  },
  width: '10%'
}]
