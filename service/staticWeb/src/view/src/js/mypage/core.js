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

export default {}

