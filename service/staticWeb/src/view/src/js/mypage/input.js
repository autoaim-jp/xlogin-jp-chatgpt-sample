/* mypage/input.js */

export const getPromptValue = () => {
  const sendPromptInputElm = document.querySelector('#sendPromptInput')
  return sendPromptInputElm.value
}

export const fetchChatList = ({ apiEndpoint, getRequest }) => {
  const url = `${apiEndpoint}/chat/list`
  return getRequest(url)
}

export default {}

