import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

class Header extends Component {
    logout() {
        this.props.logOut()
        localStorage.setItem("token", "")
        console.log("successfully logged out")
    }
    
    links() {
        if (this.props.loggedIn) {
            return (
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile/me">Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/tasks">Tasks</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/settings">Settings</NavLink>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={() => this.logout()}>Logout</Link>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>
                </ul>
            )
        }
    }
    
    render() {
        return (
            <nav className="sidebar navbar-expand-lg navbar-dark bg-primary justify-content-between">
                <Link className="navbar-brand" to="/">springbored</Link>
                <div className="navbar-nav">
                    { this.links() }
                </div>
            </nav>
        )
    }
}

export default Header