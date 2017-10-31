import React, {Component} from 'react';
import * as API from '../api/API';
import {withRouter} from 'react-router-dom';
import '../styles/tablecss.css';

class Listall extends Component {

    state={files2:[],files:[],folders:[],bgColor1:'white',bgColor2:'yellow', newFolder:''}

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
    /*  if(s===0){
      this.setState({ bgColor1: 'yellow' });
    }
      else {
        this.setState({ bgColor2: 'white' });
      }*/
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


      render() {
          return (
            <div>
            <br/>

    <h3>All Files</h3>
    {this.state.files.map(f => {
      if(f.folderid===0){
           return ( <div className="container" key={Math.random()}>
           <div className="form-group row">
                  <div className="col-sm-2 col-md-2 col-lg-2">  <a href={"http://localhost:3001/download/"+(f.filename)}>{(f.filename).substring(14)}</a></div>
                  <div className="col-sm-5 col-md-5 col-lg-5">  {f.starred===0 ? (<button className="button2" onClick={()=> this.updateStarred(f._id,f.starred)} style={{backgroundColor:this.state.bgColor1}}>*</button>):
                    (<button className="button2" onClick={()=> this.updateStarred(f._id,f.starred)} style={{backgroundColor:this.state.bgColor2}}>*</button>)}</div>
</div>
                    </div>
                  )}
})
}


    <h3>All Folders</h3>
    {this.state.folders.map(f => {
        return ( <div key={f.foldername}><b>{f.foldername}</b>

    {this.state.files.map(f2 => {
      if(f2.folderid===f._id){
        return ( <div className="container" key={Math.random()}>
        <div className="form-group row">
                  <div className="col-sm-2 col-md-2 col-lg-2"><a href={"http://localhost:3001/download/"+(f2.filename)}>{(f2.filename).substring(14)}</a></div>
                  <div className="col-sm-5 col-md-5 col-lg-5"> {f2.starred===0 ? (<button className="button2" onClick={()=> this.updateStarred(f2._id,f2.starred)} style={{backgroundColor:this.state.bgColor1}}>*</button>):
                  (<button className="button2" onClick={()=> this.updateStarred(f2._id,f2.starred)} style={{backgroundColor:this.state.bgColor2}}>*</button>)}</div>
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
