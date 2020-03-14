import React from 'react'
import browserHistory from '../api/myHistory'
import { Accounts } from 'meteor/accounts-base'

export default (props) => (
    <div className="header">
    <div className="header__content">
    <h1 className="header__title">{props.title}</h1>
    <button className="button button--to-button"onClick={() => { Accounts.logout(), browserHistory.push('/') }}>Logout</button>
    </div>
    </div>
)