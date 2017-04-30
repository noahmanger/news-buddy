
export default ({ body, title, initialState }) => `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/styles.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      </head>
      <body>
        <header class="header">
          <div class="container is-fluid">
            <h1>${title}</h1>
          </div>
        </header>
        <div id="app">${body}</div>
        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
        <script src="/js/bundle.js"></script>
        <footer class="footer">
          <div class="container">
            <p>Data from <a href="https://newsapi.org/">NewsAPI.org</a>.</p>
          </div>
        </footer>
      </body>
    </html>
  `;
