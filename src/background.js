const COPY_PAGE_TITLE = 'COPY_PAGE_TITLE'
const COPY_LINK = 'COPY_LINK'

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

const handleCopyPageTitle = tab =>
  sendCopyAction(tab.id, toMarkdownFormat(tab.title, tab.url))

const handleCopyLink = (info, tab) =>
  sendCopyAction(tab.id, toMarkdownFormat(info.selectionText, info.linkUrl))

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: COPY_PAGE_TITLE,
    title: 'Copy [Page Title](URL)',
    contexts: ['page']
  })
  chrome.contextMenus.create({
    id: COPY_LINK,
    title: 'Copy [Link](URL)',
    contexts: ['link']
  })
  // eslint-disable-next-line no-console
  console.log('markdown copier background script loaded.')
})

chrome.action.onClicked.addListener(handleCopyPageTitle)

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === COPY_PAGE_TITLE) handleCopyPageTitle(tab)
  if (info.menuItemId === COPY_LINK) handleCopyLink(info, tab)
})

chrome.commands.onCommand.addListener(async (command, tab) => {
  /* eslint-disable-next-line no-console */
  console.log('trigger command', command)

  switch (command) {
    case 'copy_title':
      handleCopyPageTitle(tab)
  }
})
