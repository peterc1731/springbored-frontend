import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { callAPI } from '../utils/helpers'

class Header extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            teams: [],
            teamNameList: []
        }
        this.getTeams = this.getTeams.bind(this)
        this.links = this.links.bind(this)
    }

    getTeams() {
        callAPI("get","/teams/user/retrieve")
        .then(response => {
            const teamNameList = response.map((team) => {
                return <NavLink className="nav-link" to={"/teams/" + team._id} key={team._id}>{team.name}</NavLink>
            })
            this.setState({ teams: response, teamNameList: teamNameList })
        }).catch(err => {
            console.log(`Error: ${err.message}`)
        })
    }
    
    logout() {
        this.props.logOut()
        localStorage.setItem("token", "")
        console.log("successfully logged out")
    }
    
    links() {
        if (this.props.loggedIn) {
            return (
                <ul className="nav flex-column pt-5 bg-light pl-4 pr-4 h-100">
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={() => this.logout()}>Logout</Link>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/settings">Settings</NavLink>
                    </li>
                    <li className="nav-item mb-5">
                        <NavLink className="nav-link" to="/profile/me">Profile</NavLink>
                    </li>
                    <li className="nav-item mt-5 mb-5">
                        <NavLink className="nav-link" to="/tasks">Your Tasks</NavLink>
                    </li>
                    <li className="nav-item mt-5">
                        <h6 className="ml-3">Teams</h6>
                    </li>
                    <li className="nav-item">
                        { this.state.teamNameList }
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
        if (!this.props.loggedIn) {
            this.getTeams()
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
                    <Link className="navbar-brand" to="/">springbored</Link>
                    <div className="navbar-nav">
                        { this.links() }
                    </div>
                </nav>
            )
        } else {
            return (
                <div className="v-nav">
                    { this.links() }
                </div>
            )
        }
    }
}

export default Header