
export default ({body, title, initialState}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.1/css/bulma.min.css">
      </head>
      <body>
        <header class="hero is-primary level">
          <div class="container is-fluid">
            <h1 class="title is-1 level-left">The news</h1>
          </div>
        </header>
        <div id="app" class="container is-fluid">${body}</div>
        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
        <script src="/js/bundle.js"></script>
        <footer class="footer">
          <div class="container">
            <p>Data from <a href="https://newsapi.org/">NewsAPI.org</a>.</p>
          </div>
        </footer>
      </body>
    </html>
  `
}
