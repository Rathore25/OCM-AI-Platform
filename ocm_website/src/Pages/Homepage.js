import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Header from '../Components/Header';
import Form from '../Components/QueryForm';
import SearchGrid from '../Components/SearchGrid';
import MyMenu from "../Components/Menu";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 100,
      countForm: "",
      csv: "",
      location: "",
      search: "",
      searchField: "*",
      searchResults: [],
      loggedIn: false,
      process: false
    }
  }

  async componentDidMount() {

    const res = await axios.get("http://" + process.env.REACT_APP_USER_API_IP + "/api/v1/users/current-user", {
      withCredentials: true
    });

    if (res.data.user) {
      this.setState({loggedIn: true});
    }
	
    await axios("http://" + process.env.REACT_APP_USER_API_IP + "/api/v1/search", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      data: {
        csv: "*",
        pageSize: 10,
        pageNumber: "0"
      },
      withCredentials: true
    }).then(res => {
      const data = res.data.data;
      const total = res.data.total;
      const results = [];
      data.forEach(element => {
        // if (results.length < this.state.count) {
          const marked = (element._source.relevance !== -1) ? true : false;
          let selection;
          if (element._source.relevance === 1) selection = "Marked Yes";
          if (element._source.relevance === 0) selection = "Marked No";
          if (element._source.relevance !== 1 && element._source.relevance !== 0) selection = "None";
          results.push({
            id: element._id,
            content: element._source.content.slice(0,750) + "...",
            title: element._source.title,
            query: element._source.query,
            relevance: element._source.relevance,
            marked,
            selection
          });
        //}
      });
      this.setState({count: total, searchResults: results});
    }).catch(err => console.log(err));
  }

  handleOnPageChange = async (e, val) => {
    await axios("http://" + process.env.REACT_APP_USER_API_IP + "/api/v1/search", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      data: {
        csv: this.state.searchField,
        pageSize: 10,
        pageNumber: val - 1
      },
      withCredentials: true
    }).then(res => {
      const data = res.data.data;
      const total = res.data.total;
      const results = [];
      data.forEach(element => {
          const marked = (element._source.relevance !== -1) ? true : false;
          let selection;
          if (element._source.relevance === 1) selection = "Marked Yes";
          if (element._source.relevance === 0) selection = "Marked No";
          if (element._source.relevance !== 1 && element._source.relevance !== 0) selection = "None";
          results.push({
            id: element._id,
            content: element._source.content.slice(0,750) + "...",
            title: element._source.title,
            query: element._source.query,
            relevance: element._source.relevance,
            marked,
            selection
          });
      });
      console.log();
      this.setState({count: total, searchResults: results});
    }).catch(err => console.log(err));
}


  sendRequestToUpdate = async (url, relevance) => {
    await axios("http://" + process.env.REACT_APP_USER_API_IP + "/api/v1/update", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      data: {
        url,
        relevance
      },
      withCredentials: true
    })
    .then(res => {
      let results = [...this.state.searchResults];
      results.forEach(el => {
        if (el.id === url) {
          console.log(el);
          console.log("here");
          const marked = true;
          let selection;
          if (relevance === 1) selection = "Marked Yes";
          if (relevance === 0) selection = "Marked No";
          el.marked = marked;
          el.selection = selection
        }
      })
      this.setState({searchResults: results});
      });
    }
  
  handleOnYes = async (e, url) => {
  console.log(url, "yes");
  await this.sendRequestToUpdate(url, 1);
}

 handleOnNo = async (e, url) => {
  console.log(url, "no");
  await this.sendRequestToUpdate(url, 0);
}

  handleOnCsvChange = (e) => {
    this.setState({csv: e.target.value});
  }

  handleOnCountChange = (e) => {
    this.setState({countForm: e.target.value});
  }

  handleOnCountryChange = (e, value) => {
    if (value) {
      this.setState({location: value.label})
    }
  }

  handleOnSearchChange = (e) => {
    this.setState({search: e.target.value, searchField: (e.target.value.trim() !== "") ? e.target.value : "*"});
  }

  handleLogout = async () => {
    console.log("button")
    await axios.get("http://" + process.env.REACT_APP_USER_API_IP + "/api/v1/auth/logout", {
      withCredentials: true
    });
    this.setState({loggedIn: false});
  }

  handleOnSearch = async (e) => {
    e.preventDefault();
      await axios("http://" + process.env.REACT_APP_USER_API_IP + "/api/v1/search", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: {
          csv: this.state.searchField,
          pageSize: 10,
          pageNumber: "0"
        },
        withCredentials: true
      }).then(res => {
        console.log(res);
        const data = res.data.data;
        const total = res.data.total;
        const results = [];
        data.forEach(element => {
          const marked = (element._source.relevance !== -1) ? true : false;
          let selection;
          if (element._source.relevance === 1) selection = "Marked Yes";
          if (element._source.relevance === 0) selection = "Marked No";
          if (element._source.relevance !== 1 && element._source.relevance !== 0) selection = "None";
          results.push({
            id: element._id,
            content: element._source.content.slice(0,750) + "...",
            title: element._source.title,
            query: element._source.query,
            relevance: element._source.relevance,
            marked,
            selection
          });
        });
        this.setState({count: total, searchResults: results, search: ""});
      });
  }

  handleOnProcess = (e, bool) => {
    this.setState({process: bool});
  }

  handleOnSubmit = async (e) => {
    e.preventDefault();

    await axios("http://" + process.env.REACT_APP_USER_API_IP + "/api/v1/process/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      data: {
        queries: this.state.csv,
        count: this.state.countForm,
        location: this.state.location
      },
      withCredentials: true
    }).then(async res => {
      await axios("http://" + process.env.REACT_APP_USER_API_IP + "/api/v1/search", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      data: {
        csv: "*",
        pageSize: 10,
        pageNumber: "0"
      },
      withCredentials: true
    }).then(res => {
      const data = res.data.data;
      const total = res.data.total;
      const results = [];
      data.forEach(element => {
        // if (results.length < this.state.count) {
          const marked = (element._source.relevance !== -1) ? true : false;
          let selection;
          if (element._source.relevance === 1) selection = "Marked Yes";
          if (element._source.relevance === 0) selection = "Marked No";
          if (element._source.relevance !== 1 && element._source.relevance !== 0) selection = "None";
          results.push({
            id: element._id,
            content: element._source.content.slice(0,750) + "...",
            title: element._source.title,
            query: element._source.query,
            relevance: element._source.relevance,
            marked,
            selection
          });
        //}
      });
      this.setState({csv: "", location: "", countForm: "", searchField: "*", count: total, process: false, searchResults: results})
    }).catch(err => console.log(err));
    })
}

  render() {
    if (this.state.loggedIn) {
      return (
        <Container maxWidth="lg">
          <Grid container>
            <Header />
          </Grid>
          {/* <Button onClick={this.handleLogout} style={{position: "relative", right: "-90%", top: "30px"}} variant="outlined" color="secondary">Logout</Button> */}
          <MyMenu handleLogout={this.handleLogout} />
          <Grid container>
            <Form searchResults={this.state.searchResults} handleOnProcess={this.handleOnProcess} handleOnCsvChange={this.handleOnCsvChange} handleOnCountChange={this.handleOnCountChange} handleOnCountryChange={this.handleOnCountryChange} handleOnSubmit={this.handleOnSubmit} csv={this.state.csv} count={this.state.countForm} location={this.state.location} process={this.state.process}/>
          </Grid>
          <SearchGrid handleOnPageChange={this.handleOnPageChange} handleOnNo={this.handleOnNo} handleOnYes={this.handleOnYes} count={this.state.count} searchResults={this.state.searchResults} handleOnSearchChange={this.handleOnSearchChange} handleOnSearch={this.handleOnSearch} search={this.state.search} searchField={this.state.searchField}/>
        </Container>
      );
    } else {
      return (
        <div>
        <h1>You are not logged in, please login to get access!!</h1>
        <Link  to="/login">Login</Link>
      </div>
      )
    }
  }
}

export default Homepage;
