import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Settings extends Component {
    render() {
        if (this.props.loggedIn) return (
            <div className="settings">
                This is the settings
            </div>
        )
        else return (
            <Redirect to="/login" />
        )
    }
}

export default Settings