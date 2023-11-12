/* mypage/app.js */
import setting from '../_setting/index.js'
import * as lib from '../_lib/index.js'

import * as core from './core.js'
import * as input from './input.js'
import * as action from './action.js'
import * as output from './output.js'

const asocial = {}
asocial.setting = setting
asocial.output = output
asocial.core = core
asocial.input = input
asocial.action = action
asocial.lib = lib

/* a is an alias of asocial */
const a = asocial

const showNotification = () => {
  setInterval(() => {
    a.lib.common.output.showNotification(a.setting.browserServerSetting.getValue('apiEndpoint'), a.lib.xdevkit.output.showModal, a.lib.common.input.getRequest)
  }, 30 * 1000)
}

const loadPromptForm = () => {
  const sendPrompt = a.output.getSendPrompt(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    input: [a.input.getPromptValue],
    lib: [a.lib.common.output.postRequest],
  }))
  const onSubmitSendPromptForm = a.action.getOnSubmitSendPromptForm(argNamed({
    app: { loadChatHistory },
    output: { sendPrompt },
  }))
  a.output.setOnSubmitSendPromptForm(argNamed({
    onSubmit: { onSubmitSendPromptForm },
  }))
}

const loadChatHistory = () => {
  const chatList = a.input.fetchChatList(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.input.getRequest],
  }))

  const simpleChatList = a.core.convertChatList(argNamed({
    input: { chatList },
  }))

  a.output.showChatList(argNamed({
    param: { simpleChatList },
  }))
}

const loadPermission = async () => {
  const splitPermissionListResult = await a.lib.common.input.fetchSplitPermissionList(a.setting.browserServerSetting.getValue('apiEndpoint'))
  a.output.showPromptForm(argNamed({
    param: { splitPermissionListResult },
  }))
  a.output.showChatHistory(argNamed({
    param: { splitPermissionListResult },
  }))

  a.lib.xdevkit.output.reloadXloginLoginBtn(splitPermissionListResult?.result?.clientId)
}

const startChatHistoryLoader = () => {
  a.app.loadChatHistory()
  setTimeout(async () => {
    a.app.loadChatHistory()
  }, 5 * 1000)
}

const main = async () => {
  a.lib.xdevkit.output.switchLoading(true)
  a.lib.common.output.setOnClickNavManu()
  a.lib.monkeyPatch()

  a.app.loadPromptForm()
  a.app.startLookupResponse()

  a.app.showNotification()
  a.app.loadPermission()

  setTimeout(() => {
    a.lib.xdevkit.output.switchLoading(false)
  }, 300)
}

a.app = {
  main,
  showNotification,
  loadPromptForm,
  loadChatHistory,

  lookupResponse,
  startLookupResponse,

  loadPermission,
}

a.app.main()

