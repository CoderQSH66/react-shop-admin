import { CoreModal, useCoreModal } from '@/components/core/c-modal'
import { Button } from 'antd'
import React, { memo, useState } from 'react'

const index = memo(() => {
  const [visible, setVisible] = useState<boolean>(false)
  const { ContextHolder, openModal } = useCoreModal()
  return (
    <div>
      <CoreModal
        open={visible}
        onCancel={() => {
          setVisible(false)
        }}
        fullScreen
      >
      </CoreModal>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true)
        }}
      >
        CoreModal
      </Button>

      <Button onClick={openModal}>useCoreModal</Button>
      <ContextHolder></ContextHolder>
    </div>
  )
})

export default index
