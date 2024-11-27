import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { Modal, Space } from 'antd'
import classnames from 'classnames'
import React, { memo, useRef, useState } from 'react'
import { createPortal, unstable_batchedUpdates } from 'react-dom'
import type { ICloseIconProps, ICoreModalProps } from './types'
import style from './style.module.less'

const CloseIcon: React.FC<ICloseIconProps> = ({ fullScreen, onCancel, setFullScreen }) => {
  const initFullScreen = useRef(fullScreen)
  return (
    <div className="close-icon">
      <Space onClick={e => e.stopPropagation()}>
        {
          !fullScreen
            ? <FullscreenOutlined onClick={() => setFullScreen(true)} />
            : <FullscreenExitOutlined onClick={() => setFullScreen(false)} />
        }
        <CloseOutlined onClick={() => {
          unstable_batchedUpdates(() => {
            setFullScreen(initFullScreen.current)
            onCancel()
          })
        }}
        />
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
const CoreModal: React.FC<ICoreModalProps> = memo((props) => {
  // 外部传递参数
  const { open = false, fullScreen = false, onCancel, width = 500, children = ininContent, ...restProps } = props

  // 挂载容器
  const modalWrapper = useRef<HTMLDivElement>(null)

  // 全屏控制变量
  const [fullScreenModal, setFullScreenModal] = useState<boolean>(fullScreen)

  // 监听fullScreenModal
  React.useEffect(() => {
    console.log(fullScreenModal)
  }, [fullScreenModal])
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
