/* mypage/core.js */

export const convertChatList = ({ chatList }) => {
  const simpleChatList = { isUpdated: false, chatList: [] }

  if (!chatList || !chatList.result) {
    return simpleChatList
  }
  simpleChatList.isUpdated = true

  chatList.result.chatList.forEach((chat) => {
    simpleChatList.chatList.push(chat)
  })

  return simpleChatList
}

export default {}

