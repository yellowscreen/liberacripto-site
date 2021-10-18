import { fetch } from '../'

import type { PostAOrder, ResponsePostAOrder } from './types'

export function postAOrder(order: PostAOrder): ResponsePostAOrder {
  return fetch({
    method: 'POST',
    path: '/user/orders',
    data: order,
  })
}
