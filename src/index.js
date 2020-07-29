import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    render() {
        var helloWorld = 'Hello World!'
      return (
          <h1>{helloWorld}</h1>
      )
    }
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)