import React from 'react'
import LinksList from './LinksList'
import PrivateHeader from './PrivateHeader'
import AddLink from './AddLink'

export default () => (
    <div>
        <PrivateHeader title={'Your Links'} />
        <div className="content__box">
            <AddLink />
            <LinksList />
        </div>
    </div>
)