/**
 * 检查 HTTP 错误
 * @param response
 * @return {Response|Error}
 */
export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const reqWrapper = promise => (
  promise
    .then(checkStatus)
    .then(data => data.json())
    .then(data => {
      if (data.status !== 0) {
        let error = new Error(data.status)
        error.data = data
        throw error
      }
      
      return data
    })
)

export const postAdd = (code, name) => {
  return reqWrapper(fetch(`/api/add`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code,
      name
    })
  }))
}

export const getQuery = () => {
  return reqWrapper(fetch(`/api/query`, {
    credentials: 'same-origin'
  }))
}

export const getCet = () => {
  return reqWrapper(fetch(`/api/cet`, {
    credentials: 'same-origin'
  }))
}