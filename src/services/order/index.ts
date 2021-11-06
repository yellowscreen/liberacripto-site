import { AxiosResponse } from 'axios'
import { fetch } from '../'

import type { PostAOrder, ReponseS3Fields, ResponsePostAOrder, S3Fields } from './types'

export function postAOrder(order: Partial<PostAOrder>): ResponsePostAOrder {
  return fetch({
    method: 'POST',
    path: '/user/orders',
    data: order,
  })
}

export function getS3Credentials(): ReponseS3Fields {
  return fetch({
    path: '/utils/upload_url',
  })
}

export function postUploadReceipt(fields: S3Fields, url: string, file: any): Promise<AxiosResponse> {
  const formData = new FormData()

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value)
  })

  formData.append('file', file)

  return fetch({
    method: 'post',
    baseURL: url,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
}

export function patchReceiptOrder(orderId: string | number, receiptUrl: string): Promise<AxiosResponse> {
  return fetch({
    method: 'PUT',
    path: `/user/orders/${orderId}/add-receipt`,
    data: {
      receipt_url: receiptUrl,
    },
  })
}

export function getOrderReceipt(shareableCode: string): Promise<AxiosResponse> {
  return fetch({
    path: `/user/orders/${shareableCode}/`,
  })
}
