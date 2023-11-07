/* mypage/core.js */

export const convertChatList = ({ chatList }) => {
  const simpleChatList = []

  chatList.result.chatList.forEach((chat) => {
    simpleChatList.push(chat)
  })

  return simpleChatList
}

export default {}

