import type { UploadProps } from 'antd/lib'
import { PlusOutlined } from '@ant-design/icons'
import { useControlModel, type WithControlPropsType } from '@ant-design/pro-components'
import { Image, Space, Upload } from 'antd'
import React, { memo } from 'react'

const BaseUpload: React.FC<WithControlPropsType<UploadProps>> = memo((props) => {
  const model = useControlModel(props)
  return (

    <Space>
      {
        model.value && (typeof model.value === 'string') && (
          <Image
            src={model.value}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10
            }}
          >
          </Image>
        )
      }
      <Upload
        listType="picture-card"
        beforeUpload={() => false}
        {...model}
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
