import React from "react";
import ReactDOM from 'react-dom';
import {data} from './data.js';
import FileBrowser, {Icons} from 'react-keyed-file-browser'


var file_container = document.querySelector(".files");


var server = 'https://my-json-server.typicode.com/slvt1/file-manager-ds/data';



class NestedEditableDemo extends React.Component {
  // state = {
  //   files: [
  //     {
  //       key: 'photos/animals/cat in a hat.png',
  //       size: 1.5 * 1024 * 1024,
  //     },
  //     {
  //       key: 'photos/animals/kitten_ball.png',
  //       size: 545 * 1024,
  //     },
  //     {
  //       key: 'photos/animals/elephants.png',
  //       size: 52 * 1024,
  //     },
  //     {
  //       key: 'photos/funny fall.gif',
  //       size: 13.2 * 1024 * 1024,
  //     },
  //     {
  //       key: 'photos/holiday.jpg',
  //       size: 85 * 1024,
  //     },
  //     {
  //       key: 'documents/letter chunks.doc',
  //       size: 480 * 1024,
  //     },
  //     {
  //       key: 'documents/export.pdf',
  //       size: 4.2 * 1024 * 1024,
  //     },
  //   ],
  // }

  constructor(props){
    super(props);
    // this.state.files = props.dt.files;
    this.state = {
      files : []
    }
  }

  normalize_data(data) {
    console.log(data);
    let st = [];
    for(let i = 0; i < data.length; i++){
      if(data[i]["type"] === "file"){
        st.push({key: data[i]["path"]+data[i]["name"], size: 2})
      }else{
        st.push({key: data[i]["path"]+data[i]["name"] + '/', size: 0})
      }
    }
    return st;
  }

  componentDidMount(){
    fetch(server)
    .then(res => res.json())
    .then((rdata) => {
      this.setState({dt: rdata})
    }).catch(console.log)
  }

  handleCreateFolder = (key) => {
    this.setState(state => {
      state.files = state.files.concat([{
        key: key,
      }])
      return state
    })
  }
  handleCreateFiles = (files, prefix) => {
    this.setState(state => {
      const newFiles = files.map((file) => {
        let newKey = prefix
        if (prefix !== '' && prefix.substring(prefix.length - 1, prefix.length) !== '/') {
          newKey += '/'
        }
        newKey += file.name
        return {
          key: newKey,
          size: file.size,
        }
      })

      const uniqueNewFiles = []
      newFiles.map((newFile) => {
        let exists = false
        state.files.map((existingFile) => {
          if (existingFile.key === newFile.key) {
            exists = true
          }
        })
        if (!exists) {
          uniqueNewFiles.push(newFile)
        }
      })
      state.files = state.files.concat(uniqueNewFiles)
      return state
    })
  }

  handleRenameFolder = (oldKey, newKey) => {
    this.setState(state => {
      const newFiles = []
      state.files.map((file) => {
        if (file.key.substr(0, oldKey.length) === oldKey) {
          newFiles.push({
            ...file,
            key: file.key.replace(oldKey, newKey),
          })
        } else {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      return state
    })
  }
  handleRenameFile = (oldKey, newKey) => {
    this.setState(state => {
      const newFiles = []
      state.files.map((file) => {
        if (file.key === oldKey) {
          newFiles.push({
            ...file,
            key: newKey,
          })
        } else {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      return state
    })
  }
  handleDeleteFolder = (folderKey) => {
    this.setState(state => {
      const newFiles = []
      state.files.map((file) => {
        if (file.key.substr(0, folderKey.length) !== folderKey) {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      return state
    })
  }
  handleDeleteFile = (fileKey) => {
    this.setState(state => {
      const newFiles = []
      state.files.map((file) => {
        if (file.key !== fileKey) {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      return state
    })
  }

  render() {
    return (
      <FileBrowser
        files={this.state.dt}
        icons={Icons.FontAwesome(4)}

        onCreateFolder={this.handleCreateFolder}
        onCreateFiles={this.handleCreateFiles}
        onMoveFolder={this.handleRenameFolder}
        onMoveFile={this.handleRenameFile}
        onRenameFolder={this.handleRenameFolder}
        onRenameFile={this.handleRenameFile}
        onDeleteFolder={this.handleDeleteFolder}
        onDeleteFile={this.handleDeleteFile}
      />
    )
  }
}

ReactDOM.render(
  <NestedEditableDemo />,
  file_container
)

fetch(server)
.then(res=>res.json())
.then((rdata) => {
  console.log('132');
}).catch(console.log);