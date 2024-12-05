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

export function findEqualAncestorIdsByRuleId(dataList: ITreeData[], targetRuleId: number): number[] {
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

export default parentRuleId
