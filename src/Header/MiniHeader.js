import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

class MiniHeader extends Component {
    
    logout() {
        this.props.logOut()
        localStorage.setItem("token", "")
        console.log("successfully logged out")
    }
    
    
    render() {
        return (
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <Link className="nav-link" to="/"><i className="material-icons">chat_bubble_outline</i></Link>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/settings"><i className="material-icons">settings</i></NavLink>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={() => this.logout()}><i className="material-icons">input</i></Link>
                </li>
            </ul>
        )
    }
}

export default MiniHeader