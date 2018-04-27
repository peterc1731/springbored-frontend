import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { callAPI } from '../utils/helpers'

class Tasks extends Component {

  constructor(props) {
        super(props)
        this.state = {
            tasks: []
        }
        this.getTasks = this.getTasks.bind(this)
  }

  componentDidMount() {
      this.getTasks()
  }

  getTasks() {
        callAPI("get","/tasks/user")
        .then(response => {
            this.setState({ tasks: response })
        }).catch(err => {
            console.log(`Error: ${err.message}`)
        })
    }

  render() {
        let items = []
        this.state.tasks.forEach((task) => {
            items.push(<TasksItem task={task} key={task._id} />)
        })

        if (this.props.loggedIn) return (
            <div className="tasks">
                { items }
            </div>
        )
        else return (
            <Redirect to="/login" />
        )
    }

}

class TasksItem extends Component {
  render() {
        return (
            <div className="card m-3">
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">{ this.props.task.title }</h6>
                    <p className="card-text">{ this.props.task.description }</p>
                    <p className="card-text">{ this.props.task.status }</p>
                    <p className="card-text">{ this.props.task.effort }</p>
                    
                </div>
            </div>
        )
    }
}

export default Tasks