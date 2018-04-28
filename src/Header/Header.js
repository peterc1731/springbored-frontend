import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { callAPI } from '../utils/helpers'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const customStyles = {
    content : {
        top                   : '30%',
        left                  : '50%',
        width                 : '500px',
        height                : '330px',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(-50%, -50%)'
    }
}

class Header extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            teams: [],
            teamNameList: [],
            modalIsOpen: false,
            name: "",
            usernames: "",
            username: ""
        }
        this.getTeams = this.getTeams.bind(this)
        this.getUser = this.getUser.bind(this)
        this.links = this.links.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    
    componentDidMount() {
        this.getTeams()
        this.getUser()
    }
    
    openModal() {
        this.setState({modalIsOpen: true});
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }
    
    submit() {
        const team = { 
            name: this.state.name,
            members: this.state.usernames
        }
        callAPI("post", "/teams", team )
        .then(response => {
            this.getTeams()
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
    
    getUser() {
        callAPI("get","/me")
        .then(response => {
            this.setState({ username: response.username })
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
                <ul className="nav flex-column pt-5 bg-light pl-5 pr-5 h-100">
                    <li className="nav-item">
                        <NavLink className="nav-link text-success" to="/profile/me">{ this.state.username }</NavLink>
                    </li>
                    <li className="nav-item mt-5 mb-5">
                        <NavLink className="nav-link" to="/tasks">Tasks</NavLink>
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
                        style={customStyles}
                        contentLabel="Create Team Modal"
                     >
                     
                        <form className="w-75 m-auto">
                            <div className="form-group mt-3">
                                <label htmlFor="modal-name">Name</label>
                                <input type="text" className="form-control" id="modal-name" placeholder="Team Name" name="name" value={this.state.name} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="modal-unames">Members</label>
                                <input type="text" className="form-control" id="modal-unames" placeholder="user123,jsmith,bob7..." name="usernames" value={this.state.usernames} onChange={this.handleChange} />
                                <small className="form-text text-muted">Enter a list of usernames separated by commas.</small>
                            </div>
                            <div className="form-group d-flex justify-content-center pt-3">
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