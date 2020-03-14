import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import browserHistory from '../api/myHistory'
import { Meteor } from 'meteor/meteor'

export default () => {

  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault()

    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        setErrorMessage(err.reason)
      } else {
        setEmail('')
        setPassword('')
        setErrorMessage('')
        browserHistory.push('/')
      }
    })
  }

  return (
    <div className="boxed-view">
    <div className="boxed-view__box">
      <h1>Short Link</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleOnSubmit} noValidate className="boxed-view__form">
        <input type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => { setEmail(e.target.value.trim()) }} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value.trim()) }} />
        <button className="button">Login</button>
      </form>
      <Link to="/signup">Need an account?</Link>
      </div>
    </div>
  )
}


/* class Login extends React.Component {
    constructor(props) {
      super(props)

      this.handleSetErrorMessage = this.handleSetErrorMessage.bind(this)
      this.state = {error: ''}
    }

    handleSetErrorMessage(formErrorMessage) {
      this.setState({
        error: formErrorMessage
      })
    }

    render() {
      return (
        <div>
      {this.state.error && <p>{this.state.error}</p>}
          <p>This is Login component</p>
          <Form formSubmit={'login'} handleSetErrorMessage={this.handleSetErrorMessage}/>
          <Link to="/signup">Need an account?</Link>
      </div>
      )
    }
  }

  export default Login */


