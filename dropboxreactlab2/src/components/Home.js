import React, {Component} from 'react';
import { Route, Link,Switch } from 'react-router-dom';
import Listall from './Listall';
import Addfile from './Addfile';
import Starred from './Starred';
import Activityreport from './Activityreport';
import Createfolder from './Createfolder';
import Groups from './Groups';


class Home extends Component {
//<Link to='/listall'>List All</Link></div>
    render() {console.log("PROP VALUES----"+this.props.un);
        return (
          <div calssName="w3-container w3-panel">
          <br/>

          <div className="row">
          <div className="col-sm-1 col-md-1 col-lg-1"></div>
          <div className="col-sm-2 col-md-2 col-lg-2"><h6>Welcome {this.props.un.firstname}</h6></div>
          <div> <Link to='/'></Link></div>
          <div className="col-sm-1 col-md-1 col-lg-1"><Link to='/listall' className="links">List All</Link></div>
          <div className="col-sm-1 col-md-1 col-lg-1"><Link to='/addfile' className="links">Upload File</Link></div>
          <div className="col-sm-1 col-md-1 col-lg-1"><Link to='/createfolder' className="links">Create Folder</Link></div>
          <div className="col-sm-1 col-md-1 col-lg-1">  <Link to='/starred' className="links">Starred File</Link></div>
          <div className="col-sm-1 col-md-1 col-lg-1"><Link to='/activityrep' className="links">Activity Report</Link></div>
          <div className="col-sm-1 col-md-1 col-lg-1"><Link to='/groups' className="links">Groups</Link></div>
          <div className="col-sm-1 col-md-1 col-lg-1"><button className="w3-btn w3-white w3-border w3-border-blue w3-round" onClick={() => this.props.handleLogout()}>Logout</button></div>
          </div>

          <Switch>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/listall" component={() => <Listall data={this.props.un}/>}/>
          <Route exact path="/addfile" component={() => <Addfile data={this.props.un}/>}/>
          <Route exact path="/createfolder" component={() => <Createfolder data={this.props.un}/>}/>
          <Route exact path="/starred" component={() => <Starred data={this.props.un}/>}/>
          <Route exact path="/activityrep" component={() => <Activityreport data={this.props.un}/>}/>
          <Route exact path="/groups" component={() => <Groups data={this.props.un}/>}/>
          </Switch>

         </div>
        );
    }
}

export default Home;
