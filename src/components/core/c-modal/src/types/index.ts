import type { ModalProps } from 'antd'

export interface ICoreModalProps extends Omit<ModalProps, 'getContainer'> {
  /** 是否全屏 */
  fullScreen?: boolean
}

export interface ICloseIconProps {
  fullScreen: boolean
  onCancel: () => void
  setFullScreen: (value: boolean) => void
}
