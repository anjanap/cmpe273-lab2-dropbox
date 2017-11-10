import React, {Component} from 'react';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';
import '../styles/tablecss.css';

class Starred extends Component {

  state={sfiles:[]}

  componentWillMount(){
    var x={uid:this.props.data._id};
    console.log("Starred uid:*** "+x.uid);
      API.starred(x)
          .then((data) => {
              if (data.length > 0) {
                for(var z=0;z<data.length;z++)
                {
                  var newArray = this.state.sfiles.slice();
                  newArray.push((data[z].filename));
                  this.setState({sfiles:newArray})
                }
              } else {
                  console.log("File not listed");
              }
          });
  }

    render() {
        return (
          <div className="container">
          <div className="w3-indigo w3-panel"><h3>Starred Files</h3></div>
          {this.state.sfiles.map(f => {
        return ( <div key={Math.random()}>
        <ul className="w3-ul w3-border">
              <li>  <a href={"http://localhost:3001/download/"+(f)} className="links">{f.substring(14)}</a>
                </li></ul>
                 </div>
                 )
      })
     }
     </div>
        );
    }
}

export default withRouter(Starred);
