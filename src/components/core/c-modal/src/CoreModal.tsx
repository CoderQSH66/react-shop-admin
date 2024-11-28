import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { Modal, Space } from 'antd'
import classnames from 'classnames'
import React, { memo, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ICloseIconProps, ICoreModalProps } from './types'
import style from './style.module.less'

const CloseIcon: React.FC<ICloseIconProps> = ({ fullScreen, onCancel, setFullScreen }) => {
  return (
    <div className="close-icon">
      <Space onClick={e => e.stopPropagation()}>
        {
          !fullScreen
            ? <FullscreenOutlined onClick={() => setFullScreen(true)} />
            : <FullscreenExitOutlined onClick={() => setFullScreen(false)} />
        }
        <CloseOutlined onClick={onCancel} />
      </Space>
    </div>
  )
}
const ininContent = (
  <div>
    ① 窗口可以拖动；
    <br />
    ② 窗口可以通过八个方向改变大小；
    <br />
    ③ 窗口可以最小化、最大化、还原、关闭；
    <br />
    ④ 限制窗口最小宽度/高度。
  </div>
)
const cursour = {
  top: 'n-resize',
  left: 'w-resize',
  right: 'e-resize',
  bottom: 's-resize',
  topLeft: 'nw-resize',
  topRight: 'ne-resize',
  bottomLeft: 'sw-resize',
  bottomRight: 'se-resize',
  auto: 'auto'
} as const

const CoreModal: React.FC<ICoreModalProps> = memo((props) => {
  // 外部传递参数
  const { open = false, fullScreen = false, onCancel, width = 500, title = '默认标题', children = ininContent, ...restProps } = props

  // 挂载容器
  const modalWrapper = useRef<HTMLDivElement>(null)

  // 全屏控制变量
  const [fullScreenModal, setFullScreenModal] = useState<boolean>(fullScreen)

  // 监听fullScreenModal
  useEffect(() => {
    open && setFullScreenModal(fullScreen)
  }, [open])

  // modal居中
  const modalCenter = () => {
    setTimeout(() => {
      const modalWrapperEle = modalWrapper.current
      if (modalWrapperEle) {
        const modalEle = modalWrapperEle.querySelector<HTMLDivElement>('.ant-modal')
        if (open && modalEle && modalEle.getBoundingClientRect().left <= 0) {
          modalEle.style.left = `${(window.innerWidth - modalEle.offsetWidth) / 2}px`
        }
      }
    })
  }

  // 拖拽方法
  const handleDrag = (modalEle: HTMLDivElement, handleEle: HTMLDivElement) => {
    handleEle?.addEventListener('mousedown', (event) => {
      // 全屏禁止拖拽
      if (fullScreenModal)
        return
      modalEle.style.userSelect = 'none'
      const mouseLeft = event.clientX
      const mouseTop = event.clientY
      const left = modalEle.offsetLeft
      const top = modalEle.offsetTop
      const maxMoveWidth = window.innerWidth - modalEle.offsetWidth
      const maxMoveHeight = window.innerHeight - modalEle.offsetHeight

      // 监听鼠标移动
      const mousemove = (event: MouseEvent) => {
        let moveWidth = left + event.clientX - mouseLeft
        let moveHeight = top + event.clientY - mouseTop

        // 移动编辑判断
        moveWidth < 0 && (moveWidth = 0)
        moveWidth > maxMoveWidth && (moveWidth = maxMoveWidth)
        moveHeight < 0 && (moveHeight = 0)
        moveHeight > maxMoveHeight && (moveHeight = maxMoveHeight)

        modalEle.style.left = `${moveWidth}px`
        modalEle.style.top = `${moveHeight}px`
      }

      // 移除监听
      const mouseover = () => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseover)
        modalEle.style.userSelect = 'auto'
      }
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseover)
    })
  }

  // 拉伸方法
  const handelStretch = (modalEle: HTMLDivElement, modalWrapEle: HTMLDivElement) => {
    // 全屏禁止拉伸
    if (fullScreenModal)
      return

    modalWrapEle?.addEventListener('mousemove', (event) => {
      // 记录鼠标所在位置
      const MLeft = event.clientX - modalEle.offsetLeft
      const MTop = event.clientY - modalEle.offsetTop
      const MRight = event.clientX - modalEle.offsetLeft - modalEle.offsetWidth
      const MBottom = event.clientY - modalEle.offsetTop - modalEle.offsetHeight

      // 判断鼠标所在位置
      const isLeft = MLeft < 5 && MLeft > -5
      const isRight = MRight < 5 && MRight > -5
      const isTop = MTop < 5 && MTop > -5
      const isBottom = MBottom < 5 && MBottom > -5
      // 设置鼠标游标
      if (isLeft && MTop > 8 && MBottom < -8) {
        modalWrapEle.style.cursor = cursour.left
      }
      else if (isRight && MTop > 8 && MBottom < -8) {
        modalWrapEle.style.cursor = cursour.right
      }
      else if (isTop && MLeft > 8 && MRight < -8) {
        modalWrapEle.style.cursor = cursour.top
      }
      else if (isBottom && MLeft > 8 && MRight < -8) {
        modalWrapEle.style.cursor = cursour.bottom
      }
      else if (isLeft && isTop) {
        modalWrapEle.style.cursor = cursour.topLeft
      }
      else if (isRight && isTop) {
        modalWrapEle.style.cursor = cursour.topRight
      }
      else if (isLeft && isBottom) {
        modalWrapEle.style.cursor = cursour.bottomLeft
      }
      else if (isRight && isBottom) {
        modalWrapEle.style.cursor = cursour.bottomRight
      }
      else {
        modalWrapEle.style.cursor = cursour.auto
      }
    })

    modalWrapEle?.addEventListener('mousedown', (event) => {
      // 全屏禁止拉伸
      if (fullScreenModal)
        return
      const cursor = modalWrapEle?.style.cursor

      const { left, top } = modalEle.getBoundingClientRect()
      const disX = event.clientX - left
      const disY = event.clientY - top
      const tureWidth = modalEle.offsetWidth
      const tureHeight = modalEle.offsetHeight
      // 监听拉伸事件
      const mousemove = (event: MouseEvent) => {
        modalWrapEle.style.userSelect = 'none'
        // 全屏禁止拉伸
        if (fullScreenModal)
          return
        if (cursor !== cursour.auto) {
          modalWrapEle.style.userSelect = 'none'
        }
        const MinLeft = Math.max(0, event.clientX - disX)
        const MinTop = Math.max(0, event.clientY - disY)

        const leftWidth = tureWidth + left - MinLeft
        const topHeight = tureHeight + top - MinTop
        const rightWidth = event.clientX - left
        const bottomHeight = event.clientY - top
        if (cursor === cursour.left) {
          modalEle.style.left = `${MinLeft}px`
          modalEle.style.width = `${leftWidth}px`
        }
        else if (cursor === cursour.top) {
          modalEle.style.top = `${MinTop}px`
          modalEle.style.height = `${topHeight}px`
        }
        else if (cursor === cursour.right) {
          modalEle.style.width = `${rightWidth}px`
        }
        else if (cursor === cursour.bottom) {
          modalEle.style.height = `${bottomHeight}px`
        }
        else if (cursor === cursour.topLeft) {
          modalEle.style.left = `${MinLeft}px`
          modalEle.style.top = `${MinTop}px`
          modalEle.style.width = `${leftWidth}px`
          modalEle.style.height = `${topHeight}px`
        }
        else if (cursor === cursour.topRight) {
          modalEle.style.width = `${rightWidth}px`
          modalEle.style.top = `${MinTop}px`
          modalEle.style.height = `${topHeight}px`
        }
        else if (cursor === cursour.bottomLeft) {
          modalEle.style.height = `${bottomHeight}px`
          modalEle.style.left = `${MinLeft}px`
          modalEle.style.width = `${leftWidth}px`
        }
        else if (cursor === cursour.bottomRight) {
          modalEle.style.height = `${bottomHeight}px`
          modalEle.style.width = `${rightWidth}px`
        }
      }

      const mouseup = () => {
        modalWrapEle?.removeEventListener('mousemove', mousemove)
        modalWrapEle?.removeEventListener('mouseup', mouseup)
        modalWrapEle.style.userSelect = 'auto'
      }
      modalWrapEle?.addEventListener('mousemove', mousemove)
      modalWrapEle?.addEventListener('mouseup', mouseup)
    })
  }

  // 初始化modal
  const initModal = () => {
    const modalWrapperEle = modalWrapper.current

    if (modalWrapperEle) {
      const modalEle = modalWrapperEle.querySelector<HTMLDivElement>('.ant-modal')
      const handleEle = modalWrapperEle.querySelector<HTMLDivElement>('.ant-modal-header')
      const modalWrapEle = modalWrapperEle.querySelector<HTMLDivElement>('.ant-modal-wrap')
      handleDrag(modalEle!, handleEle!)
      handelStretch(modalEle!, modalWrapEle!)
      modalCenter()
    }
  }

  // 初始化拖拽、拉伸modal
  useEffect(() => {
    initModal()
  }, [open])
  return (
    <>
      {
        createPortal(
          <div
            className={classnames('core-modal', style.root, {
              [style.fullscreen]: fullScreenModal
            })}
            ref={modalWrapper}
          >
            <Modal
              open={open}
              onCancel={onCancel}
              maskClosable={false}
              getContainer={() => modalWrapper.current!}
              width={fullScreenModal ? '100vw' : width}
              closeIcon={(
                <CloseIcon
                  fullScreen={fullScreenModal}
                  setFullScreen={setFullScreenModal}
                  onCancel={() => (onCancel as any)()}
                />
              )}
              forceRender
              okText="确定"
              cancelText="取消"
              title={title}
              {...restProps}
            >
              {
                children
              }
            </Modal>
          </div>
          , document.body
        )
      }
    </>
  )
})

export default CoreModal
