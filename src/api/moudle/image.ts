import $request from '../request'

export function upladImg(img: File, image_class_id = 168) {
  return $request.request({
    method: 'post',
    url: '/image/upload',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: {
      image_class_id,
      img
    }
  })
}
