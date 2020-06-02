/*global chrome*/

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
    Container,
    CircularProgress,
    List,
    ListItem,
    ListItemText
} from "@material-ui/core";
import { Alert } from '@material-ui/lab';

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
            loading: true,
            results: {},
            error: ""
        };
    }

    async componentDidMount() {
        // get current URL
        chrome.tabs.query(
            { active: true, lastFocusedWindow: true },
            async (tabs) => {
                var url = tabs[0].url;
                var encoded_url = encodeURIComponent(url);
                const request = "/keywords/" + encoded_url + "/10";
                const response = await fetch(APIgateway + request)
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
                        this.setState({ loading: false, error: "Error while retrieving results" });
                        console.log(err);
                    });

            }
        );
    }

    render() {
        var toRender;
        if (this.state.error != "") {
            toRender = (<Error error={this.state.error}></Error>);
        } else {
            toRender = this.state.loading ? (<CircularProgress color="secondary" />) : (<Results results={this.state.results}></Results>);
        }
        return (
            <div style={{
                height: '700px',
                width: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {toRender}
            </div>
        );
    }
}

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container component="main" maxWidth="xs" fixed>
                <div id="results">
                    <List dense={true}>
                        {Object.keys(this.props.results).map(
                            (key, i) => (
                                <ListItem
                                    button
                                    key={key}
                                    onClick={(event) => {
                                        newTab("https://www.thesaurus.com/browse/" + key);
                                    }}
                                >
                                    <ListItemText
                                        primary={key.capitalize()}
                                        secondary={"Score: " + Object.values(this.props.results)[i]}
                                    />
                                </ListItem>
                            )
                        )}
                    </List>
                </div>
            </Container>
        );
    }
}

class Error extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Alert severity="error">
                {this.props.error}
            </Alert>
        );
    }
}

export default App;
