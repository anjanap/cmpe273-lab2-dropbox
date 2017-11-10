import React, {Component} from 'react';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';

class Activityreport extends Component {
  state={actv:[]}

    componentWillMount(){
      var x={uid:this.props.data._id};
      console.log(x.uid);
        API.activity(x)
            .then((data) => {
                if (data.length > 0) {
                  for(var z=0;z<data.length;z++)
                  {
                    var newArray = this.state.actv.slice();
                    if((data[z].status).includes("File uploaded") || (data[z].status).includes("File deleted"))
                      newArray.push((data[z].status).substring(14));
                    else
                      newArray.push(data[z].status);
                    this.setState({actv:newArray})
                  }
                } else {
                    console.log("File not listed");
                }
            });
    }

      render() {
          return (
            <div className="container">
            <div className="w3-indigo w3-panel"><h3>Activity Report</h3></div>
            {this.state.actv.map(act => {
          return ( <div key={Math.random()}>
                   <ul className="w3-ul w3-border">
                   <li>{act}</li>
                   </ul>
                   </div>
                   )
        })
       }
              </div>
          );
      }
}

export default withRouter(Activityreport);
