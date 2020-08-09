// import request from '@/utils/request'

export function getErrorList() {
  return fetch('http://localhost:3090/error-list').then(res => {
    return res.json()
  })
}

export function getErrorDetail(id) {
  return fetch(`http://localhost:3090/error-detail/${id}`).then(res => {
    return res.json()
  })
}