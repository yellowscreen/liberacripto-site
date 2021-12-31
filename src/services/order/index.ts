import { AxiosResponse } from 'axios'
import { fetch } from '../'

import type { PostAOrder, ResponseS3Fields, ResponsePostAOrder, ResponseSellOrderPix, S3Fields, SellOrderPix, PaymentOrder } from './types'

export function postAOrder(order: Partial<PostAOrder>): ResponsePostAOrder {
  return fetch({
    method: 'POST',
    path: '/user/orders',
    data: order,
  })
}

export function getS3Credentials(extension: string): ResponseS3Fields {
  return fetch({
    path: `/utils/upload_url?extension=${extension}`,
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

export function getNetworks(): Promise<AxiosResponse> {
  return fetch({
    path: '/user/networks',
  })
}

export function getBanks(): Promise<AxiosResponse> {
  return fetch({
    path: '/user/banks',
  })
}

export function postSellOrderPix(sellOrder: Partial<SellOrderPix>): ResponseSellOrderPix {
  return fetch({
    method: 'POST',
    path: '/user/orders',
    data: sellOrder,
  })
}

export function postPayABillOrder(payOrder: Partial<PaymentOrder>): ResponseSellOrderPix {
  return fetch({
    method: 'POST',
    path: '/user/orders',
    data: payOrder,
  })
}
