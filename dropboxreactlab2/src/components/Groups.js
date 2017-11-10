import React, {Component} from 'react';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';
import '../styles/tablecss.css';

class Groups extends Component {

  state={groupstatus:'',newgroup:'',groups:[],newuser:'',addstatus:''}


  componentWillMount(){
    this.setState({groupstatus:'',addstatus:''});
     var x={uid:this.props.data._id},joined=[];
     console.log(x.uid);
           API.listgroups(x)
           .then((data) => {
               if (data) {
                 for(var i=0;i<data.length;i++){
                   console.log("Groups listed");
                 joined = this.state.groups.concat(data[i]);
                 this.setState({ groups: joined });
               }
               } else {
                   console.log("Groups not listed");
               }
           });
   }

  handleNewgroup = (g) => {
    console.log(g.newgroup);
    var x={uid:this.props.data._id, newg:g.newgroup};
      API.creategroup(x)
          .then((output) => {
              if (output === 1) {
                  console.log("Group created");
                  this.setState({groupstatus:'Group created'});
              } else {
                  console.log("Group not created");
                  this.setState({groupstatus:'Group not created'});
              }
          });
  };

  handleNewuser = (u) => {
  };

    render() {
        return (
          <div className="container">
          <div className="w3-indigo w3-panel"><h3>Create New Group</h3></div>
          <form>
          Group Name: <input className="w3-border" type="text" id="newgroup" onChange={(event)=>{
                                   this.setState({newgroup: event.target.value});}}/>&nbsp;
          <button className="button1" type="button" onClick={() => this.handleNewgroup(this.state)}>Submit</button>
          </form>
          <font color="red">{this.state.groupstatus}</font>
          <br/>

          <div className="w3-indigo w3-panel"><h3>All Groups</h3></div>
          {this.state.groups.map(grp => {
              return ( <div key={Math.random()}>
                        <b>{(grp.groupname)}</b>
                        <form>
                        <input className="w3-border" type="text" id="newuser" placeholder="Add user" onChange={(event)=>{
                                                 this.setState({newuser: event.target.value});}}/>&nbsp;
                        <button className="button1" type="button" onClick={() => this.handleNewuser(this.state)}>Add</button>
                        </form><br/>
                        <font color="red">{this.state.addstatus}</font>
                        </div>
             )
      })
      }
          </div>
        );
    }
}

export default withRouter(Groups);
