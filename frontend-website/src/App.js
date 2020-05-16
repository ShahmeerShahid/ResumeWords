import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Button,
  Typography,
  TextField,
  Container,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { AnimatedList } from "react-animated-list";

var URLSafeBase64 = require("urlsafe-base64");

// add links as we add support
const indeedLink =
  "https://ca.indeed.com/viewjob?jk=8b4d91c8af8bb0e0&tk=1e8e4ut16584q800&from=serp&vjs=3&advn=3565145538192372&adid=254279523&sjdu=i6xVERweJM_pVUvgf-MzuSNjPrzy7_LNnt0n8OvPVhl69iaJUOxN_OOj2lFqvl9K";
const glassdoorLink = "";
const googlecareersLink = "";
const linkedinLink = "";
const APIgateway = "https://gateway-service-fvwxmbq4sq-ue.a.run.app";

function newTab(url) {
  window.open(url, "_blank");
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      loading: false,
      results: {},
    };
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  buttonClickHandler(e) {
    if (this.state.url == "") {
      document.getElementById("error").innerHTML = "Please enter a URL.";
    } else {
      this.setState({ results: {} });
      var url = this.state.url;
      var encoded_url = encodeURIComponent(url);
      const request = "/keywords/" + encoded_url + "/10";
      this.setState({ loading: true });
      fetch(APIgateway + request) // APIgateway + request
        .then((res) => {
          this.setState({ loading: false });
          return res.json();
        })
        .then((data) => {
          console.log(data);
          // document.getElementById("results").innerHTML = JSON.stringify(data);
          this.setState({ results: data });
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
            <div id="results">
              {this.state.results != {} ? (
                <List dense={true}>
                  {Object.keys(this.state.results).map((key, i) => (
                    <ListItem
                      button
                      key={key}
                      onClick={(event) => {
                        newTab("https://www.thesaurus.com/browse/" + key);
                      }}
                    >
                      <ListItemText
                        primary={key.capitalize()}
                        secondary={
                          "Score: " + Object.values(this.state.results)[i]
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : null}
            </div>{" "}
            <br /> <br />
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
