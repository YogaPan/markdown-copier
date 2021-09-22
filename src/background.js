const MENU_ID = 'MARKDOWN_COPIER_MENU_ID'

const isNil = x => x == null

const toMarkdownFormat = (title, url) => {
  if (isNil(title)) title = ''
  if (isNil(url)) url = ''
  return `[${title}](${url})`
}

const sendCopyAction = (tabId, markdownLink) =>
  chrome.tabs.sendMessage(
    tabId,
    { action: 'COPY', payload: markdownLink },
    // eslint-disable-next-line no-console
    response => console.log(`copy ${response.result}`)
  )

const handleBrowserAction = tab =>
  sendCopyAction(tab.id, toMarkdownFormat(tab.title, tab.url))

const handleMenuClick = (info, tab) =>
  sendCopyAction(tab.id, toMarkdownFormat(info.selectionText, info.linkUrl))

chrome.runtime.onInstalled.addListener(() => {
  /* eslint-disable-next-line no-console */
  chrome.contextMenus.create({
    id: MENU_ID,
    title: 'Copy Url as [title](url) format',
    contexts: ['link'],
    onclick: handleMenuClick
  })

  // eslint-disable-next-line no-console
  console.log('markdown copier background script loaded.')
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === MENU_ID) handleMenuClick(info, tab)
})

chrome.browserAction.onClicked.addListener(handleBrowserAction)
