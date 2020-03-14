import ReactDOM from 'react-dom'
import React from 'react'
import { Meteor } from 'meteor/meteor';
import AppRouter from '../imports/routers/AppRouter'

Meteor.startup(() => {
  ReactDOM.render(<AppRouter />, document.getElementById('react-target'));
});

