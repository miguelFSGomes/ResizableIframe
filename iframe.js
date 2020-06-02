
const windowTemplate =(url) =>(
  `<div class="item">
<header>
  <div class="minimise">
    <div class="minus"></div>
  </div>
  <div>
    <div class="reset"></div>
  </div>
  <div>
    <div class="expand"><img src="./assets/expand.png" alt="" /></div>
  </div>
</header>
<div class="resizer ne"></div>
<div class="resizer nw"></div>
<div class="resizer sw"></div>
<div class="resizer se"></div>
<div class="iframeContainer">
  <iframe seamless  allow="fullscreen"
      sandbox="allow-scripts allow-same-origin"
      loading="lazy" src="${url}" frameborder="0"></iframe>
</div>
</div>`
)



const getGeneratedPageURL = ({ html, css, js }) => {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }

  const cssURL =css;
  const jsURL = js

  console.log("hshshsh ",typeof cssURL, cssURL)
 

  const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        ${js && `<script src="${jsURL}"></script>`}
      </head>
      <body>
        ${html || ''}
      </body>
    </html>
  `

  return getBlobURL(source, 'text/html')
}

const url = getGeneratedPageURL({
  html: windowTemplate('https://abola.pt'),
  css:  'https://cdn.jsdelivr.net/gh/miguelFSGomes/ResizableIframe/style.css',
  js: './main.js'
})
export default url;
