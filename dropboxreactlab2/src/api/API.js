const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

//signup
export const signup = (payload) =>
    fetch(`${api}/signup/signup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res => {
        return res.output;
    })
        .catch(error => {
            console.log("This is signup error");
            return error;
        });

//sign in
        export const checklogin = (payload) =>
            fetch(`${api}/login`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(res=>res.json())
            .then(res => {
                return res.output;
            })
                .catch(error => {
                    console.log("This is login error");
                    return error;
                });

//logout
export const logout = () =>
    fetch(`${api}/logout`, {
      method: 'POST',
      headers: {
          ...headers,
          'Content-Type': 'application/json'
      },
            }).then(res => {
                return res.status;
            }).catch(error => {
                    console.log("This is error");
                    return error;
                });
//add file
export const add = (payload) =>
            fetch(`${api}/addfile`, {
                method: 'POST',
                body: payload
            }).then(res=>res.json())
            .then(res => {
                return res.output;
            })
                .catch(error => {
                    console.log("This is file upload error");
                    return error;
                });
//create folder
export const createfolder = (payload) =>
      fetch(`${api}/createfolder`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res=>res.json())
      .then(res => {
        return res.output;
      })
      .catch(error => {
        console.log("This is new folder error");
          return error;
        });

//list all files
export const list = (payload) =>
              fetch(`${api}/list`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(res=>res.json())
            .then(res => {
              return res.output;
            })
            .catch(error => {
              console.log("This is list error");
              return error;
            });

export const folderContent = (payload) =>
              fetch(`${api}/listall/folderContent`, {
                method: 'POST',
                headers: {
                  ...headers,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
              }).then(res=>res.json())
              .then(res => {
                return res.data;
               })
               .catch(error => {
                 console.log("This is list error");
                 return error;
                 });

//list all folders
export const listfolder = (payload) =>
              fetch(`${api}/listfolder`, {
                method: 'POST',
                headers: {
                  ...headers,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
              }).then(res=>res.json())
              .then(res => {
                return res.output;
              })
              .catch(error => {
                console.log("This is list error");
                return error;
              });

//list starred folders
export const starred = (payload) =>
              fetch(`${api}/starred`, {
                method: 'POST',
                headers: {
                  ...headers,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
              }).then(res=>res.json())
              .then(res => {
                return res.output;
              })
              .catch(error => {
                console.log("This is starred error");
                return error;
              });

//update star
export const starupdate = (payload) =>
              fetch(`${api}/updatestar`, {
                method: 'POST',
                headers: {
                  ...headers,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
              }).then(res=>res.json())
              .then(res => {
                return res.output;
              })
              .catch(error => {
                console.log("This is update star error");
                return error;
              });

//display activity report
export const activity = (payload) =>
fetch(`${api}/activityrep`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
}).then(res=>res.json())
.then(res => {
    return res.output;
  })
  .catch(error => {
    console.log("This is Activity Report error");
    return error;
  });

//add files to folder
  export const addtofolder = (payload) =>
              fetch(`${api}/folderfile`, {
                  method: 'POST',
                  body: payload
              }).then(res=>res.json())
              .then(res => {
                  return res.output;
              })
                  .catch(error => {
                      console.log("This is file upload error");
                      return error;
                  });
