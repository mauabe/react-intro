//Code from https://reactarmory.com/guides/react-events-cheatsheet

//HTML
<html>
  <head>
    <title>Untitled App</title>
    <script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>

  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="main.js"></script>
  </body>
</html>



// KEYBOARD EVENTS

// • onKeyDown is called when a key is depressed
// • onKeyPress is called after the key is released, but before onKeyUp is triggered
// • onKeyUp is called last, after the key is pressed


//supposed this is main.js
function handler(event) {
  alert(`
    key: ${event.key}
    keyCode: ${event.keyCode}
    altKey: ${event.altKey}
    ctrlKey: ${event.ctrlKey}
    metaKey: ${event.metaKey}
    shiftKey: ${event.shiftKey}
  `)
}

ReactDOM.render(
  <input
    placeholder='Hit a key...'
    onKeyDown={handler}
    onKeyPress={handler}
    onKeyUp={handler}
  />,
  document.getElementById('app')
)


//Keyboard events on non-form elements
ReactDOM.render(
  <div>
    <p tabIndex={-1}
       style={{ backgroundColor: 'lightgreen' }}
       onKeyDown={event => alert(event.key)}>
      Click to focus, then hit a key.
    </p>

    <p style={{ backgroundColor: 'pink' }}
       onKeyDown={event => alert(event.keyCode)}>
      No tabIndex means no keyboard events
    </p>
  </div>,
  document.getElementById('app')
)


// FOCUS

// • onBlur is called when a control loses focus
// • onFocus is called when a control receives focus

//focus on button clicked, blur the other button
function render(history=[]) {
  function handleFocus(n) { render(history.concat(<div>focused {n}</div>)) }
  function handleBlur(n) { render(history.concat(<div>blurred {n}</div>)) }

  ReactDOM.render(
    <div>
      <button onFocus={handleFocus.bind(null, 1)}
              onBlur={handleBlur.bind(null, 1)}>
        Button 1
      </button>
      <br />
      <button onFocus={handleFocus.bind(null, 2)}
              onBlur={handleBlur.bind(null, 2)}>
         Button 2
      </button>
      <div style={{height: 400, overflow: 'scroll'}}>{history}</div>
    </div>,
    document.getElementById('app')
  )
}
render()


// FORM

// • onChange is called when the user changes the value in a form control.
// • onInput is identical to onChange. Prefer onChange where possible.
// • onSubmit is a special prop for <form> elements that is called when a <button type='submit'> is pressed, or when the user hits the return key within a field.


// Modifying user input

function render(value='') {
  ReactDOM.render(
    <input value={'$'+value}
      onChange={event => render(event.target.value.replace(/^\$/, ''))}
    />,
    document.getElementById('app')
  )
}
render()

//Preventing navigation on form submission

// Without `event.preventDefault()`, pressing submit will cause the browser
// to reload the page.
ReactDOM.render(
  <form onSubmit={event => { event.preventDefault(); alert('submitted') }}>
    <input placeholder='Press enter to submit' /><br />
    <button type='submit'>Submit</button>
  </form>,
  document.getElementById('app')
)

// MOUSE

// • onClick: a mouse button was pressed and released. Called before onMouseUp.
// • onContextMenu: the right mouse button was pressed.
// • onDoubleClick
// • onMouseDown: a mouse button is depressed
// • onMouseEnter: the mouse moves over an element or its children
// • onMouseLeave: the mouse leaves an element
// • onMouseMove
// • onMouseOut: the mouse moves off of an element, or onto one of its children
// • onMouseOver: the mouse moves directly over an element
// • onMouseUp: a mouse button was released

// React’s drag and drop events have access to the same event object properties as the mouse events. However, I’d recommend using react-dnd instead of using the raw events where possible. For reference, the drag/drop events are:
// onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop

// Mouse Positioning properties
// • clientX and clientY contain the coordinates measured from the top left of the visible part of the page (regardless of the scroll position)
// • pageX and pageY contain the coordinates from the top of the page – which may be currently off-screen due to scrolling.
// • screenX and screenY give the position within the entire screen.


//Visualizing the mouse position

const style =
  {position:'absolute',top:0,left:0,right:0,bottom:0,backgroundColor:'beige'}
function render(event, show) {
  ReactDOM.render(
    <div onMouseMove={(event) => render(Object.assign({}, event), show)}
         onMouseEnter={(event) => render(Object.assign({}, event), true)}
         onMouseLeave={(event) => render(Object.assign({}, event), false)}
         style={style}>
       {show &&
       <div style={{position:'fixed',top:event.clientY,left:event.clientX}}>
         clientX: {event.clientX}<br />
         clientY: {event.clientY}<br />
         pageX: {event.pageX}<br />
         pageY: {event.pageY}<br />
         screenX: {event.screenX}<br />
         screenY: {event.screenY}<br />
       </div>}
    </div>,
    document.getElementById('app')
  )
}
render({}, false)

// Preventing navigation when links are clicked

ReactDOM.render(
  <a onClick={e => e.preventDefault()}
     href='/resources/react-events-cheatsheet'>
    React Events Cheatsheet
  </a>,
  document.getElementById('app')
)

// Right button events

function showButton(event) {
  event.preventDefault()
  alert(event.button == 2 ? 'right' : 'not right')
}

ReactDOM.render(
  <div>
    <button onClick={showButton}
            onMouseUp={showButton}>
      Right button events don't work reliably with onClick or OnMouseUp
    </button><br/>
    <button onMouseDown={showButton}>
      preventDefault stops right button events from working with onMouseDown
    </button><br/>
    <button onContextMenu={showButton}>
      Only right button events work with onContextMenu
    </button>
  </div>,
  document.getElementById('app')
)


//  onMouseEnter/onMouseLeave vs. onMouseOver/onMouseOut

// Note how onMouseEnter and onMouseLeave are only called when you move your mosue over the red box, while onMouseOver and onMouseOut are called when the mouse movers over the blue child too.

let enter = 0, leave = 0, over = 0, out = 0
function render() {
  ReactDOM.render(
    <div style={{width: 200, height: 200, backgroundColor: 'red'}}
         onMouseEnter={() => { enter++; render() }}
         onMouseLeave={() => { leave++; render() }}
         onMouseOver={() => { over++; render() }}
         onMouseOut={() => { out++; render() }}>
      Enter called {enter} times<br />
      Leave called {leave} times<br />
      Over called {over} times<br />
      Out called {out} times<br />
      <div style={{width: 100, height: 100, backgroundColor: 'blue'}}>

      </div>
    </div>,
    document.getElementById('app')
  )
}
render()
