let message = `
  Hello, there!
  HTML doesn't render new line characters by default,
  but you can add them back in as <br> tags!
`

let messageWithLineBreaks =
  message.split('\n').map((line, i, lines) =>
    <React.Fragment key={i}>
      {line}
      {i !== lines.length - 1 && <br />}
    </React.Fragment>
  )

ReactDOM.render(
  <div>{messageWithLineBreaks}</div>,
  document.querySelector('#root')
)

// THIS RENDERS THREE LINES:
// Hello, there!
// HTML doesn't render new line characters by default,
// but you can add them back in as <br> tags!