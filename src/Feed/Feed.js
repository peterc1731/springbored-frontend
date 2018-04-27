import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { callAPI } from '../utils/helpers'

class Feed extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
        
        this.getPosts = this.getPosts.bind(this)
    }
    
    componentDidMount() {
        this.getPosts()
    }
    
    getPosts() {
        callAPI("get","/posts")
        .then(response => {
            this.setState({ posts: response })
        }).catch(err => {
            console.log(`Error: ${err.message}`)
        })
    }
    
    
    render() {
        let items = []
        this.state.posts.forEach((post) => {
            items.push(<FeedItem post={post} key={post._id} />)
        })
        
        if (this.props.loggedIn) return (
            <div className="feed">
                <FeedPost getPosts={() => this.getPosts()} />
                { items }
                <button className="feed-show-button">Show More</button>
            </div>
        )
        else return (
            <Redirect to="/login" />
        )
    }
}

class FeedItem extends Component {
    
    render() {
        return (
            <div className="card m-3">
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">{ this.props.post.username }</h6>
                    <p className="card-text">{ this.props.post.content }</p>
                </div>
            </div>
        )
    }
    
}

class FeedPost extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            title: ""
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    
    submit() {
        callAPI("get","/me").then(user => {
            callAPI("post","/posts",{
                content: this.state.content,
                user_id: user._id,
                username: user.username,
                avatar: user.avatar
            }).then(response => {
                if (response.content) {
                    console.log("post successful")
                } else {
                    console.log(response)
                }
            })
        }).then(() => this.props.getPosts())
        .catch(err => {
            console.log(`Error: ${err.message}`)
        })
    }
    
    render() {
        return (
        <div className="feed-post">
            <div className="feed-post-avatar">
                Avatar
            </div>
            <form className="feed-post-form">
                <div className="feed-post-body">
                    <textarea rows="3" cols="30" type="text" name="content" placeholder="Tell us your thoughts..." value={this.state.content} onChange={this.handleChange} />
                </div>
                <button type="button" className="feed-post-button" onClick={this.submit}>Post</button>
            </form>
        </div>
        )
    }
}

export default Feed