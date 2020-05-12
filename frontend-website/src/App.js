import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Button,
  Typography,
  TextField,
  Container,
  CircularProgress,
} from "@material-ui/core";

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

var URLSafeBase64 = require("urlsafe-base64");

// add links as we add support
const indeedLink =
  "https://ca.indeed.com/jobs?q=software%20developer&l=Toronto%2C%20ON&radius=25&ts=1588911978357&rq=1&rsIdx=0&vjk=53a4df7deb71fecf&advn=209420522549189";
const glassdoorLink = "";
const googlecareersLink = "";
const linkedinLink = "";
const APIgateway = "http://localhost:5000";

function newTab(url) {
  window.open(url, "_blank");
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      loading: false,
    };
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  buttonClickHandler(e) {
    if (this.state.url == "") {
      document.getElementById("error").innerHTML = "Please enter a URL.";
    } else {
      var url = this.state.url;
      console.log(url);
      var encoded_url = encodeURIComponent(url);
      console.log(encoded_url);
      const request = "/keywords/" + encoded_url + "/10";
      console.log("Request: " + APIgateway + request);
      this.setState({ loading: true });
      fetch(APIgateway + request) // APIgateway + request
        .then((res) => {
          this.setState({ loading: false });
          return res.json();
        })
        .then((data) => {
          console.log(data);
          document.getElementById("results").innerHTML = JSON.stringify(data);
        })
        .catch((err) => {
          this.setState({ loading: false });
          console.log(err);
        });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleLinkClick(e) {
    console.log(e.target.innerHTML.trim());
    switch (e.target.innerHTML.trim()) {
      case "Indeed":
        this.setState({ url: indeedLink });
        newTab(indeedLink);
        break;
      case "GlassDoor":
        this.setState({ url: glassdoorLink });
        newTab(glassdoorLink);
        break;
      case "Google Careers":
        this.setState({ url: googlecareersLink });
        newTab(googlecareersLink);
        break;
      case "LinkedIn":
        this.setState({ url: linkedinLink });
        newTab(linkedinLink);
        break;
    }
  }

  render() {
    //const { Button, TextField, Box } = MaterialUI;
    const buttonWidth = "170px";
    return (
      <div>
        <center>
          <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h4">
              {" "}
              Welcome to ResumeWords{" "}
            </Typography>{" "}
            <br />
            <Typography component="h5">
              Paste URL below, click "Submit" and wait for your results. Make
              sure to include those words in your resume or cover letter!
            </Typography>{" "}
            <br />
            <TextField
              id="url"
              label="URL"
              onChange={this.handleChange}
              value={this.state.url}
              required
              fullWidth
            />{" "}
            <br /> <br />
            {/* <Button variant="contained" color="secondary" onClick={this.buttonClickHandler}> Submit </Button> <br /> <br /> */}
            {this.state.loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={this.buttonClickHandler}
              >
                {" "}
                Submit{" "}
              </Button>
            )}{" "}
            <br /> <br />
            <Typography id="error" component="h5" color="error">
              {" "}
            </Typography>
            <div id="results"> </div> <br /> <br />
            <Typography id="examples" component="h1" variant="h5">
              {" "}
              Example Links:{" "}
            </Typography>{" "}
            <br />
            <Button
              id="indeed"
              variant="contained"
              color="primary"
              style={{ minWidth: buttonWidth }}
              onClick={this.handleLinkClick}
              value={indeedLink}
            >
              {" "}
              Indeed{" "}
            </Button>{" "}
            <br /> <br />
            <Button
              id="glassdoor"
              variant="contained"
              color="primary"
              style={{ minWidth: buttonWidth }}
              onClick={this.handleLinkClick}
              disabled
            >
              {" "}
              GlassDoor{" "}
            </Button>{" "}
            <br /> <br />
            <Button
              id="googlecareers"
              variant="contained"
              color="primary"
              style={{ minWidth: buttonWidth }}
              onClick={this.handleLinkClick}
              disabled
            >
              {" "}
              Google Careers{" "}
            </Button>{" "}
            <br /> <br />
            <Button
              id="linkedin"
              variant="contained"
              color="primary"
              style={{ minWidth: buttonWidth }}
              onClick={this.handleLinkClick}
              disabled
            >
              {" "}
              LinkedIn{" "}
            </Button>{" "}
            <br /> <br />
          </Container>
        </center>
      </div>
    );
  }
}
//ReactDOM.render(<ResumeWords />, document.getElementById("ResumeWords"));

export default App;
