import React, {Component} from 'react';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';

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
          <div>
          <h3>Starred Files</h3>
          {this.state.sfiles.map(f => {
        return ( <div key={Math.random()}>
                <a href={"http://localhost:3001/download/"+(f)}>{f.substring(14)}</a> 
                 </div>
                 )
      })
     }
     </div>
        );
    }
}

export default withRouter(Starred);
