import React, {Component} from 'react';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';
import '../styles/tablecss.css';
import 'w3-css/w3.css';
import '../styles/tablecss.css';

class Listall extends Component {

    state={files2:[],files:[],folders:[],bgColor1:'white',bgColor2:'#FFEE5B', newFolder:''}

   componentWillMount(){
      var x={uid:this.props.data._id},joined=[],fld=[];
      console.log(x.uid);
        API.list(x)
            .then((data) => {
                if (data) {
                  for(var i=0;i<data.length;i++){
                  joined = this.state.files.concat(data[i]);
                  this.setState({ files: joined });
                }
                } else {
                    console.log("File not listed");
                }
            });

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

    updateStarred = (i,s) => {
      var x={fid:i,st:s};
      console.log("File: "+x.fid);
        API.starupdate(x)
            .then((output) => {
                if (output === "1") {
                    console.log("Star updated");
                } else {
                    console.log("Star not updated");
                }
            });
    };

    handleDelete = (i,n) => {
      var x={uid:this.props.data._id,fid:i,fname:n};
      console.log("File: "+x.fid);
        API.deletefile(x)
            .then((output) => {
                if (output === "1") {
                    console.log("File deleted");
                } else {
                    console.log("File not deleted");
                }
            });
    };

      render() {
          return (
            <div className="container w3-panel">
    <div className="w3-indigo w3-panel"><h3>All Files</h3></div>
    {this.state.files.map(f => {
      if(f.folderid===0){
           return ( <div  key={Math.random()}>
           <div >
           <ul className="w3-ul w3-border w3-right-blue">
                  <li>
                  <div className="col-sm-11 col-md-11 col-lg-11"><a href={"http://localhost:3001/download/"+(f.filename)} className="links">{(f.filename).substring(14)}</a></div>
                  {f.starred===0 ?
                    (<button className="w3-button w3-tiny w3-white w3-border button3" onClick={()=> this.updateStarred(f._id,f.starred)} >*</button>):
                    (<button className="w3-button w3-tiny w3-yellow w3-border button3" onClick={()=> this.updateStarred(f._id,f.starred)} >*</button>)}
                    &nbsp;&nbsp;<button className="w3-button w3-tiny w3-red w3-border button3" onClick={()=> this.handleDelete(f._id,f.filename)}>x</button>
</li></ul>
                    </div>
                    </div>
                  )}
})
}

<br/>
    <div className="w3-indigo w3-panel"><h3>All Folders</h3></div>
    {this.state.folders.map(f => {
        return ( <div key={f.foldername}><b>{f.foldername}</b>

    {this.state.files.map(f2 => {
      if(f2.folderid===f._id){
        return ( <div key={Math.random()}>
        <div >
        <ul className="w3-ul w3-border">
                <li>
                <div className="col-sm-11 col-md-11 col-lg-11"><a href={"http://localhost:3001/download/"+(f2.filename)} className="links">{(f2.filename).substring(14)}</a></div>
                 {f2.starred===0 ?
                  (<button className="w3-button w3-tiny w3-white w3-border button3" onClick={()=> this.updateStarred(f2._id,f2.starred)}>*</button>):
                  (<button className="w3-button w3-tiny w3-yellow w3-border button3" onClick={()=> this.updateStarred(f2._id,f2.starred)}>*</button>)}
                  &nbsp;&nbsp;<button className="w3-button w3-tiny w3-red w3-border button3" onClick={()=> this.handleDelete(f2._id,f2.filename)}>x</button>
</li></ul>
                  </div>
                  </div>
       )}
})
}
  </div>
       )
})
}
           </div>
          );
      }

}

export default withRouter(Listall);
