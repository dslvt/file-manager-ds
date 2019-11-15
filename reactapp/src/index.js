import React from "react";
import ReactDOM from 'react-dom';
import {data} from './data.js';

var file_container = document.querySelector(".files");
var current_folder = "";
// function Table(props){

// }
function getRootDir(){
  let rootDir = data[0]["path"];
  for (let i = 0; i < data.length; i++){
    if (rootDir.length < data[i]["path"]){
      rootDir = data[i]["path"];
    }
  }
  return rootDir;
}

function openFile(){

}

function loadNewPage(){
  React.unmountComponentAtNode(document.getElementById('cont'));
  // ReactDOM.render(
  //   <Table path={current_folder} />,
  //   file_container
  // );
}

class Cell extends React.Component {
  constructor(props){
    super(props);
    this.state = {type: props.st["type"], name: props.st["name"], path: props.st["path"]};
    this.handle = props.handle;
  }

  handleClick = (newPath) => {
    if(this.state.type == "file"){
      openFile();
    }else{
      current_folder += this.state.name + "/";
      this.handle(current_folder);
      console.log(current_folder);
    }
  }

  render(){
    let image;
    if (this.state.type === "file"){
      image = <img src="img/file.svg"/>
    }else{
      image = <img src="img/folder.svg"/>
    }

    return(
      <button onClick={this.handleClick.bind(this, this.state.path)}>
        {image}
        <p>{this.state.name}</p>
      </button>
    );
  }
}

class Table extends React.Component {
  constructor(props){
    super(props);
    var handleToUpdate = this.handleToUpdate.bind(this);
    this.state = {path: props.path};
    this.revData = [];
    for (let i = 0; i < data.length; i++){
      if(data[i]["path"] == this.state.path){
        this.revData.push(data[i]);
        
      }
    }
  }

  handleToUpdate(){
    this.setState({path: current_folder})
    console.log(this.state);
    for (let i = 0; i < data.length; i++){
      if(data[i]["path"] == this.state.path){
        this.revData.push(data[i]);
        
      }
    }
  }

  createTable = () => {
    let table = [];

    let rowCount = parseInt(data.length/6);
    let lastRow = data.length - rowCount*6;
    // let revData = []
    // for (let i = 0; i < data.length; i++){
    //   if(data[i]["path"] == this.state.path){
    //     revData.push(data[i]);
    //     console.log(table)
    //   }
    // }

    for (let i = 0; i < rowCount; i++){
      let childer = [];
      for (let j = 0; j < 6; j++){
        let handleToUpdate = this.handleToUpdate;
        childer.push(<div class="col-sm-2"><Cell st={this.revData[i*6+j]} handle={handleToUpdate.bind(this)}/></div>);
      }
      table.push(<div class="row">{childer}</div>);
      
    }
    if (lastRow > 0){
      let childer = [];
      for(let i = 0; i < lastRow; i++){
        let handleToUpdate = this.handleToUpdate;
        childer.push(<div class="col-sm-2"><Cell st={this.revData[rowCount*6+i]} handle={handleToUpdate.bind(this)}/></div>);
      }
      table.push(<div class="row">{childer}</div>);
    }

    return table;
  }
  
  render(){
    return(
      <div class="container" id='cont'>
        {this.createTable()}
      </div>
    );
  }
}

if (current_folder == ""){
  current_folder = getRootDir();
}
loadNewPage();