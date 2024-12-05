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

export default getRules
