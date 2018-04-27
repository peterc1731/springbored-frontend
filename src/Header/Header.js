import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { callAPI } from '../utils/helpers'
import Modal from 'react-modal'

Modal.setAppElement('#root')

class Header extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            teams: [],
            teamNameList: [],
            modalIsOpen: false,
            name: ""
        }
        this.getTeams = this.getTeams.bind(this)
        this.links = this.links.bind(this)
        this.openModal = this.openModal.bind(this)
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    
    openModal() {
        this.setState({modalIsOpen: true});
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            alert: {
                show: false,
                message: ""
            }
        })
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        console.log("after modal")
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }
    
    submit() {
        const team = { name: this.state.name }
        callAPI("post", "/teams", team )
        .then(response => {
            this.closeModal()
        })
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
                    <li className="nav-item mt-3">
                        <i className="material-icons ml-5 text-success" onClick={this.openModal}>add_circle_outline</i>
                    </li>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal"
                     >
                     
                     <form className="w-75 m-auto">
                        <div className="form-group">
                            <label htmlFor="login-password">Name</label>
                            <input type="text" className="form-control" id="modal-name" placeholder="Team Name" name="name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                        <div className="form-group d-flex justify-content-center pt-5">
                            <button type="button" className="btn btn-outline-primary m-auto" onClick={this.submit}>Create</button>
                        </div>
                    </form>
                     
                     </Modal>
                    
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