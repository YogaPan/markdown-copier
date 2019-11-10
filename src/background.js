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
    response => console.log(`copy ${response.result}`)
  )

const handleBrowserAction = tab =>
  sendCopyAction(tab.id, toMarkdownFormat(tab.title, tab.url))

const handleMenuClick = (info, tab) =>
  sendCopyAction(tab.id, toMarkdownFormat(info.selectionText, info.linkUrl))

chrome.browserAction.onClicked.addListener(handleBrowserAction)

chrome.contextMenus.create({
  title: 'Copy Url as [title](url) format',
  contexts: ['link'],
  onclick: handleMenuClick
})

console.log('markdown copier background script loaded.')
