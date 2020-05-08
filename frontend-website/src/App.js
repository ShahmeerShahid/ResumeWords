import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Box, TextField } from '@material-ui/core';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

var URLSafeBase64 = require('urlsafe-base64');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    }
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  buttonClickHandler(e) {
    if (this.state.url == "") {
      document.getElementById("results").innerHTML = "Please enter a URL.";
    } else {
      var url = this.state.url;
      console.log(url);
      var encoded_url = URLSafeBase64.encode(new Buffer(url));
      console.log(encoded_url);
      const APIgateway = 'localhost:5000';
      const request = '/keywords/' + encoded_url + '/10';
      console.log(request);
      fetch(APIgateway + request) // APIgateway + request
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    //const { Button, TextField, Box } = MaterialUI;
    return (
      <div>
        <center>
          <Box id="title" component="span" display="block"> Welcome to ResumeWords </Box> <br />
          <Box id="instructions" component="span" display="block">
            Paste URL below, click "Submit" and wait for your results.
                  </Box> <br />
          <TextField id="url" label="URL" onChange={this.handleChange} required /> <br />
          <Button color="primary" onClick={this.buttonClickHandler}> Submit </Button> <br />
          <Box id="results" component="span" display="block" label="Results"> </Box>
        </center>
      </div>
    );
  }
}
//ReactDOM.render(<ResumeWords />, document.getElementById("ResumeWords"));

export default App;
