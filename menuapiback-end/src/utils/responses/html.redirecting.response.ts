const SEND_HTML_MESSAGE_AND_REDIRECT = (url: string, timeoutPeriod: number) => {
  return `
        <html>
          <head></head>
          <body>
            <div>
              <p>Please wait to be redirected...</p>
              <script>
                setTimeout(() => {
                  window.location.href = '${url}';
                }, ${timeoutPeriod});
              </script>
            </div>
          </body>
        </html>
      `
}

export default SEND_HTML_MESSAGE_AND_REDIRECT
