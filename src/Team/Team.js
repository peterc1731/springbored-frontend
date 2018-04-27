import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { callAPI } from '../utils/helpers'

class Team extends Component {

  constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            team: {}
        }
        this.getTasks = this.getTasks.bind(this)
  }

  componentDidMount() {
      console.log("component mounted")
      console.log(this.props.match)
    //   this.getTeam()
    //   this.getTasks()
  }
  
  getTeam() {
      callAPI("get","/teams/" + this.props.params.teamId)
      .then(response => {
        this.setState({ team: response })
      }).catch(err => {
        console.log(`Error: ${err.message}`)
      })
  }

  getTasks() {
      console.log(this.props.params.teamId)
        callAPI("get","tasks/team/" + this.props.params.teamId)
        .then(response => {
            this.setState({ tasks: response })
        }).catch(err => {
            console.log(`Error: ${err.message}`)
        })
    }

  render() {
        let pending_items = [],
            ongoing_items = [],
            done_items = []
        this.state.tasks.forEach((task) => {
            if (task.status === "Pending") {
                pending_items.push(<TeamsItem task={task} key={task._id} />)
            } else if (task.status === "Ongoing") {
                ongoing_items.push(<TeamsItem task={task} key={task._id} />)
            } else if (task.status === "Done") {
                done_items.push(<TeamsItem task={task} key={task._id} />)
            }
        })
        
        if (this.props.loggedIn) return (
            <div>
                <div>
                    <h4 className="text-center">{this.state.team.name}</h4>
                </div>
                <div className="tasks d-flex flex-row justify-content-around mt-5"> 
                    <div className="pending-tasks">
                        <h3 className="text-center">Pending</h3>
                        { pending_items }
                    </div>
                    
                    <div className="pending-tasks">
                        <h3 className="text-center">Ongoing</h3>
                        { ongoing_items }
                    </div>
                    
                    <div className="pending-tasks">
                        <h3 className="text-center">Done</h3>
                        { done_items }
                    </div>
                </div>
            </div>
        )
        else return (
            <Redirect to="/login" />
        )
    }

}

class TeamsItem extends Component {
  render() {
        return (
            <div className="card m-3">
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">{ this.props.task.title }</h6>
                    <p className="card-text">{ this.props.task.description }</p>
                    <small className="card-text text-info">{ this.props.task.status }</small>
                    <p className="card-text text-right">{ this.props.task.effort === 0 ? "" : this.props.task.effort }</p>
                    
                </div>
            </div>
        )
    }
}

export default Team