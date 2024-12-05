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

export default getMenuOneId
