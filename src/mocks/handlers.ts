import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/v1/example', () => {
    return HttpResponse.json({ message: 'MSW 연결에 성공하였습니다.!!' })
  }),
]
