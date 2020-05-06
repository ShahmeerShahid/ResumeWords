class ResumeWords extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        url : ""
    }
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
}

buttonClickHandler(e){
    if (this.state.url == ""){
        document.getElementById("results").innerHTML = "Please enter a URL.";
    } else {
        const url = this.state.url;
        const encoded_url = URLSafeBase64.encode(url);
        const APIgateway = 'localhost:5000';
        const request = '/keywords/' + encoded_url + '/10'
        console.log(url)
        fetch(APIgateway + request)
            .then((res) => {
                return res.text;
            })
            .then((data) => {
                console.log(data);
                
            })
    }
}

handleChange(e){
    this.setState({[e.target.id] : e.target.value});
}

render(){
    const {Button, TextField, Box} = MaterialUI;
    return (
        <div>
            <center>
                <Box id="instructions" component="span" display="block">
                    Paste URL below, click "Submit" and wait for your results.
                </Box> <br/>
                <TextField id="url" label="URL" onChange={this.handleChange} required /> <br/>
                <Button color="primary" onClick={this.buttonClickHandler}> Submit </Button> <br/>
                <Box id="results" component="span" display="block" label="Results"> </Box>
            </center>
        </div>
    );
}
}
ReactDOM.render(<ResumeWords />, document.getElementById("ResumeWords"));