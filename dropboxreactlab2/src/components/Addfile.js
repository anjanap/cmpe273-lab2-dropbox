import React, {Component} from 'react';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';
import '../styles/tablecss.css';

class Addfile extends Component {
  state={
    filenew:'',
    folders:[],
    fid:'',
    uploadstatus:'',
    currName:''
  };

  componentWillMount(){
    var x={uid:this.props.data._id},fld=[];
    this.setState({uploadstatus: ''});
    API.listfolder(x)
    .then((data) => {
        if (data) {
          for(var i=0;i<data.length;i++){
          fld = this.state.folders.concat(data[i]);
          this.setState({ folders: fld });
        }
        } else {
            console.log("File not listed");
        }
    });
  }

handleUpload = (event) => {
  const payload=new FormData();
  payload.append('myfile', event.target.files[0]);
  console.log("FILE DETAILS: "+event.target.files[0]);
  payload.append('uid', this.props.data._id);
    API.add(payload)
        .then((output) => {
            if (output === 1) {
              this.setState({uploadstatus: 'File uploaded.'});
                console.log("File uploaded");
            } else {
              this.setState({uploadstatus: 'File not uploaded.'});
                console.log("File not uploaded");
            }
        });
};


handleUpload2 = (fln,fdn) => {
  const payload=new FormData();
  payload.append('myfile', fln);
  payload.append('uid', this.props.data._id);
  payload.append('foldID', fdn);
  console.log("Upload folder ID: ",fdn);
   API.addtofolder(payload)
        .then((output) => {
            if (output === 1) {
              this.setState({uploadstatus: 'File uploaded.'});
                console.log("File uploaded" );
            } else {
              this.setState({uploadstatus: 'File not uploaded.'});
                console.log("File not uploaded");
            }
        });
};

setFolderVal = (na) => {
  this.setState({currName:na});
  console.log("FOLDER NAME: "+ this.state.currName);
};

    render() {
        return (
          <div className="container">
          <font color="red">{this.state.uploadstatus}</font>
          <div className="w3-indigo w3-panel"><h3>Add Files</h3></div>
          <input id="newfile" type="file" name="newfile" onChange={this.handleUpload}/>

          <br/>
          <div className="w3-indigo w3-panel"><h3>Add Files to Folders</h3></div>
          {this.state.folders.map(f => {
          return ( <div key={f.foldername} ref="fold">
          <ul className="w3-ul w3-border">
          <li><b>{f.foldername}</b><input id="newfile" type="file" name="newfile" onChange={(event)=>{this.handleUpload2(event.target.files[0],f._id);}}/>
          </li></ul>
          </div>
                 )
          })
          }
         </div>
        );
    }
}

export default withRouter(Addfile);
