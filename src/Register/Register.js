import React, { Component } from 'react'
import { callAPI } from '../utils/helpers'

class Register extends Component {
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    submit() {
        callAPI("post","/register",{
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            console.log("successfully registered")
        }).catch(err => {
            console.log(`Error: ${err.message}`)
        })
    }
    
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            username: "",
            email: "",
            password: ""
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    
    render() {
        return (
            <form className="w-75 m-auto">
                <div className="form-group">
                    <label htmlFor="register-name">Full Name</label>
                    <input type="name" className="form-control" id="register-name" placeholder="John Smith" name="name" value={this.state.name} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="register-username">Username</label>
                    <input type="username" className="form-control" id="register-username" placeholder="jsmith123" name="username" value={this.state.username} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="register-email">Email address</label>
                    <input type="email" className="form-control" id="register-email" placeholder="your@email.com" name="email" value={this.state.email} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="register-password">Password</label>
                    <input type="password" className="form-control" id="register-password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <small className="form-text text-muted">Your password should contain at least one number and one uppercase letter.</small>
                </div>
                <div className="form-group d-flex justify-content-center pt-5">
                    <button type="button" className="btn btn-outline-primary m-auto" onClick={this.submit}>Register</button>
                </div>
            </form>
        )
    }
}

export default Register