import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default  ( { isAuthenticated, component: Component, ...rest} ) => (
    <div>
        <Route {...rest} component={(props)=>(
            isAuthenticated ? (            
                <Redirect to="/link"/>            
            ) : (
                <Component {...props}/> 
                )
        )} />
    </div>
)