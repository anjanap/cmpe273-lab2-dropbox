import React, {Component} from 'react';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';

class Groups extends Component {

    render() {
        return (
          <div>
          <h3>Create new group</h3>
          <form>
          Group Name: <input type="text" id="newfolder" onChange={(event)=>{
                                   this.setState({newFolder: event.target.value});}}/><br/>
          <button type="button" onClick={() => this.handleNewfolder(this.state)}>Submit</button>
          </form>
          <br/>
          <h3>All groups</h3>
          </div>
        );
    }
}

export default withRouter(Groups);
