import type { UploadProps } from 'antd/lib'
import { PlusOutlined } from '@ant-design/icons'
import { useControlModel, type WithControlPropsType } from '@ant-design/pro-components'
import { Space, Upload } from 'antd'
import React, { memo, useEffect, useState } from 'react'

const getBase64 = (img: File, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const BaseUpload: React.FC<WithControlPropsType<UploadProps>> = memo((props) => {
  const model = useControlModel(props)

  const [fileList, setFileList] = useState<UploadProps['fileList']>([])
  useEffect(() => {
    model.value && (typeof model.value === 'string') && setFileList([{
      uid: '-1',
      name: 'init.png',
      status: 'done',
      url: model.value
    }])
  }, [model.value])
  return (

    <Space>

      <Upload
        listType="picture-card"
        fileList={fileList}
        {...model}
        onChange={(e) => {
          const { file } = e
          getBase64(file as any, (url) => {
            setFileList([{
              uid: file.uid,
              name: file.name,
              status: 'done',
              url
            }])
          })

          model.onChange(e)
        }}
        beforeUpload={() => {
          return false
        }}
        onRemove={() => {
          setFileList([])
          model.onChange({
            file: null
          })
        }}
      >
        <button
          style={{
            border: 0,
            background: 'none'
          }}
          type="button"
        >
          <PlusOutlined></PlusOutlined>
          <div style={{
            marginTop: 8
          }}
          >
            Upload
          </div>
        </button>
      </Upload>
    </Space>

  )
})

export default BaseUpload
