/* mypage/core.js */

export const convertChatList = ({ chatList }) => {
  const simpleChatList = []

  if (!chatList || !chatList.result) {
    return simpleChatList
  }

  chatList.result.chatList.forEach((chat) => {
    simpleChatList.push(chat)
  })

  return simpleChatList
}


export const convertResponseList = ({ responseList }) => {
  const responseListConverted = []
  if (!responseList || !responseList.result) {
    return responseListConverted
  }

  responseList.result.forEach((response) => {
    responseListConverted.push(response)
  })

  return responseListConverted
}

export default {}

