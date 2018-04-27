import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { monthNames, callAPI } from '../utils/helpers'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            joinedDate: "",
            description: "",
            name: "",
            email: ""
        }
    }
    
    componentDidMount() {
        if (this.props.loggedIn) {
            callAPI("get","/me").then(result => {
                const d = new Date(result.profile.created_date)
                const joinedDate = monthNames[d.getMonth()] + " " + d.getFullYear()
                this.setState({
                    username: result.username,
                    joinedDate: joinedDate,
                    name: result.name,
                    email: result.email,
                    description: result.profile.description ? result.profile.description : ""
                })
            }).catch(err => {
                console.log(`Error: ${err.message}`)
            })
        }
    }
    
    render() {
        if (this.props.loggedIn) return (
            <div className="profile">
                <div className="avatar">
                    Avatar
                </div>
                <div className="profile-content">
                    <p><strong>Name:</strong> { this.state.name }</p>
                    <p><strong>Username:</strong> { this.state.username }</p>
                    <p><strong>Joined:</strong> { this.state.joinedDate }</p>
                    <p><strong>Email:</strong> { this.state.email }</p>
                    <p><strong>Description:</strong> { this.state.description }</p>
                </div>
            </div>
        )
        else return (
            <Redirect to="/login" />
        )
    }
}

export default Profile