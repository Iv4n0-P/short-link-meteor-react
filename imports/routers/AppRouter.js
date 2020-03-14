import React, { useEffect, useState } from 'react';
//komponente
import Signup from '../ui/Signup'
import Link from '../ui/Link'
import NotFound from '../ui/NotFound'
import Login from '../ui/Login'
//sve što je potrebno za rutanje
import browserHistory from '../api/myHistory'
import { Router, Switch } from 'react-router'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import { Tracker } from 'meteor/tracker';

export default () => {

    const [isAuthenticated, setIsAuthenticated] = useState() //postavlja state o trenutnom statusu

    useEffect(() => { 
        Tracker.autorun(() => {
            setIsAuthenticated(!!Meteor.userId())
        });
        //ovo će updejtat state
    })

    return (
        <div>
            <Router history={browserHistory}>
                <Switch>
                    <PublicRoute isAuthenticated={isAuthenticated} path="/" component={Login} exact={true} />
                    <PrivateRoute isAuthenticated={isAuthenticated} path="/link" component={Link} />
                    <PublicRoute isAuthenticated={isAuthenticated} path="/signup" component={Signup} exact={true} />
                    <PublicRoute isAuthenticated={isAuthenticated} path="*" component={NotFound} exact={true} />
                </Switch>
            </Router>
        </div>
    )
}
//public i private rute su kreirani jsx/komponente koje smo kreirali, koje prihvaćaju par argumenata, jedan od tih je trenutni status korisnika tj. isAuthenticated, zatim provjerava jeli korisnik logiran ili ne, ako je generira <Route > komponentu sa pripadajućim propsima a ako nije redirektira ga i obrnuto