const isNil = x => x == null

const toMarkdownFormat = (title, url) => {
  if (isNil(title)) title = ''
  if (isNil(url)) url = ''
  return `[${title}](${url})`
}

chrome.browserAction.onClicked.addListener(tab =>
  chrome.tabs.sendMessage(
    tab.id,
    { action: 'COPY', payload: toMarkdownFormat(tab.title, tab.url) },
    response => console.log(`copy ${response.result}`)
  )
)

const handleMenuClick = (info, tab) => {
  chrome.tabs.sendMessage(
    tab.id,
    {
      action: 'COPY',
      payload: toMarkdownFormat(info.selectionText, info.linkUrl)
    },
    response => console.log(`copy ${response.result}`)
  )
}

chrome.contextMenus.create({
  title: 'Copy Url as [title](url) format',
  contexts: ['all'],
  onclick: handleMenuClick
})

console.log('markdown copier background script loaded.')
