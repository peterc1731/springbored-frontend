import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { callAPI } from '../utils/helpers'

class Login extends Component {
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            alert: {
                show: false,
                message: ""
            }
        })
    }
    
    submit() {
        
        if (this.state.email === "") {
            this.setState({
                alert: {
                    show: true,
                    message: "Please enter an email address."
                }
            })
        } else if (this.state.password === "") {
            this.setState({
                alert: {
                    show: true,
                    message: "Please enter a password."
                }
            })
        } else {
            callAPI("post","/login",{
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                if (response.success) {
                    console.log("successfully logged in")
                    localStorage.setItem("token", response.token)
                    this.props.logIn()
                } else {
                    console.log("login failed")
                    this.setState({
                        alert: {
                            show: true,
                            message: "Username or Password is incorrect."
                        }
                    })
                }
            }).catch(err => {
                console.log(`Error: ${err.message}`)
            })
            }
    }
    
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            alert: {
                show: false,
                message: ""
            }
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    
    render() {
        if (!this.props.loggedIn) return (
            <form className="w-75 m-auto">
                <div className={"alert alert-danger" + (!this.state.alert.show ? "d-none" : "")} role="alert">
                    { this.state.alert.message }
                </div>
                <div className="form-group">
                    <label htmlFor="login-email">Email address</label>
                    <input type="email" className="form-control" id="login-email" placeholder="your@email.com" name="email" value={this.state.email} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input type="password" className="form-control" id="login-password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <div className="form-group d-flex justify-content-center pt-5">
                    <button type="button" className="btn btn-outline-primary m-auto" onClick={this.submit}>Login</button>
                </div>
            </form>
        )
        else return (<Redirect to="/feed" />)
    }
}

export default Login