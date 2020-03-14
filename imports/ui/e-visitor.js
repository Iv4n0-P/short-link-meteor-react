import React from 'react'

export default () => {

    const pathToFile = "/var/www/HTZ_REST_client/";
    const authenticationServiceUrl = "https://www.evisitor.hr/eVisitorRhetos_API/Resources/AspNetFormsAuth/Authentication/";
    const restServiceUrl = "https://www.evisitor.hr/eVisitorRhetos_API/Rest/Htz/";

    const username = "79315920997";
    const password = "Ad5WdS6N";
    const data = {
    UserName:username,
    Password:password,
    PersistCookie:false}
    const dataString = JSON.stringify(data);

    const resource = "Login";
    const loginUrl = `${authenticationServiceUrl}${resource}`
    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    //const ch = curl_init(login_url);

    const getUrl = () => {
         fetch(proxyurl + loginUrl, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
             // 'Content-Length': dataString.lenght
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: dataString // body data type must match "Content-Type" header
          }).then((response) => {
           console.log(response)
        })
    }
    
    /* getPuzzle ('3').then((data) => {
        console.log(data.puzzle)
    }).catch ((err) => {
        console.log(`Error: ${err}`)
    }) */

    return (
        <div>
            {/* Login section */}
            <h3>Login</h3>
            {dataString}
            <button onClick={()=>{getUrl()}}>Try</button>
            {console.log(dataString.length)}
        </div>
    )

}
