/**
 * @description: 基于antd Modal组件的自定义弹窗hook
 */

import React, { useCallback, useRef, useState } from 'react'
import type { ICoreModalProps } from './types'
import CoreModal from './CoreModal'

type CoreModalProps = Omit<ICoreModalProps, 'open' | 'onCancel'>

function useCoreModal(modalProps?: CoreModalProps, children?: React.ReactNode): {
  ContextHolder: React.FC
  openModal: () => void
  closeModal: () => void
} {
  const [visible, setVisible] = useState<boolean>(false)

  const visibleRef = useRef(visible)
  const openModal = () => {
    setVisible(true)
    visibleRef.current = true
  }
  const closeModal = () => {
    setVisible(false)
    visibleRef.current = false
  }

  /** 暴露出的modal组件（为了可以接收context） */
  const ContextHolder: React.FC = useCallback(() => {
    return <CoreModal open={visibleRef.current} onCancel={closeModal} {...modalProps}>{children}</CoreModal>
  }, [])

  return {
    ContextHolder,
    openModal,
    closeModal
  }
}

export default useCoreModal
