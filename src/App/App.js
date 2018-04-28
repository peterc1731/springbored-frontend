import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Header from '../Header/Header'
import MiniHeader from '../Header/MiniHeader'
import Profile from '../Profile/Profile'
import Settings from '../Settings/Settings'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Tasks from '../Tasks/Tasks'
import Team from '../Team/Team'
import './App.css'

class App extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false
        }
    }
    
    logIn() {
        this.setState({ loggedIn: true })
    }
    
    logOut() {
        this.setState(this.setState({loggedIn: false}))
    }
    
    componentDidMount() {
        if (localStorage.getItem("token")) this.setState({loggedIn: true})
    }
    
    render() {
        if (this.state.loggedIn){
            return (
                <BrowserRouter>
                    <div className="app d-flex justify-content-between">
                        <Header loggedIn={this.state.loggedIn} logOut={() => this.logOut()} />
                        <div className="w-100">
                            <MiniHeader loggedIn={this.state.loggedIn} logOut={() => this.logOut()} />
                            <div className="container">
                                
                                <Route path="/profile/me" component={() => (<Profile loggedIn={this.state.loggedIn} />)} />
                                <Route path="/settings" component={() => (<Settings loggedIn={this.state.loggedIn} />)} />
                                <Route path="/login" component={() => (<Login loggedIn={this.state.loggedIn} logIn={() => this.logIn()} />)} />
                                <Route path="/register" component={Register} />
                                <Route path="/tasks" component={() => (<Tasks loggedIn={this.state.loggedIn} />)} />
                                <Route path="/teams/:teamId" component={(props) => (<Team loggedIn={this.state.loggedIn} otherProps={props}/>)} />
                                <Route exact path="/" component={Home} />
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            )
        } else {
            return (
                <BrowserRouter>
                    <div className="app">
                        <Header loggedIn={this.state.loggedIn} logOut={() => this.logOut()} />
                        <div className="container">
                            <Route path="/profile/me" component={() => (<Profile loggedIn={this.state.loggedIn} />)} />
                            <Route path="/settings" component={() => (<Settings loggedIn={this.state.loggedIn} />)} />
                            <Route path="/login" component={() => (<Login loggedIn={this.state.loggedIn} logIn={() => this.logIn()} />)} />
                            <Route path="/register" component={Register} />
                            <Route path="/tasks" component={() => (<Tasks loggedIn={this.state.loggedIn} />)} />
                            <Route path="/team/:teamId" component={() => (<Team loggedIn={this.state.loggedIn} />)} />
                            <Route exact path="/" component={Home} />
                        </div>
                    </div>
                </BrowserRouter>
            )
        }
    }
}

export default App
