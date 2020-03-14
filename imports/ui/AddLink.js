import React from 'react'
import { Meteor } from 'meteor/meteor'
import Modal from 'react-modal'

export default () => {

    let [value, changeValue] = React.useState('')
    let [isOpen, setIsOpen] = React.useState(false)
    let [error, setError] = React.useState('')

    const handleModalClose = () => {
        changeValue('')
        setIsOpen(false)
        setError('')
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const url = value.trim()

        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                handleModalClose()
            } else {
                setError(err.reason)
            }
        })
    }

    return (
        <div>
            <button className="button" onClick={() => { setIsOpen(true) }}>+Add Link</button>
            <Modal
                isOpen={isOpen}
                contentLabel='Add Link'
                onRequestClose={() => {handleModalClose()}}
                className="boxed-view__box"
                overlayClassName="boxed-view boxed-view--modal"
            >
                <h1>Add link</h1>
                {error && <p>{error}</p>}
                <form className="boxed-view__form" onSubmit={onSubmit}>
                    <input value={value} onChange={(e) => { changeValue(e.target.value) }} type="text" name="url" placeholder="Enter your URL here" autoFocus />
                    <button className="button">Add Link</button>
                    <button type="button" className="button button--secondary" onClick={() => {handleModalClose()}}>Cancel</button>
                </form>
                
            </Modal>

        </div>
    )
}