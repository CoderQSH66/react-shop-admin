/**
 * @description: 基于antd Modal组件的自定义弹窗hook
 */

import { Modal, type ModalProps } from 'antd'
import React, { useCallback, useRef, useState } from 'react'

type CoreModalProps = Omit<ModalProps, 'open' | 'onCancel'>

const useCoreModal = (modalProps?: CoreModalProps, children?: React.ReactNode): {
  ContextHolder: React.FC
  openModal: () => void
  closeModal: () => void
} => {
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
    return <Modal open={visibleRef.current} onCancel={closeModal} cancelText="取消" okText="确定" {...modalProps}>{children}</Modal>
  }, [])

  return {
    ContextHolder,
    openModal,
    closeModal
  }
}

export default useCoreModal
