import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Header from '../Components/Header';
import Form from '../Components/QueryForm';
import SearchGrid from '../Components/SearchGrid';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';


class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 50,
      countForm: "",
      csv: "",
      location: "",
      search: "",
      searchResults: [],
      loggedIn: false
    }
  }

  async componentDidMount() {

    const res = await axios.get("http://localhost:8000/api/v1/users/current-user", {
      withCredentials: true
    });

    if (res.data.user) {
      this.setState({loggedIn: true});
    }

    axios("http://localhost:8000/api/v1/search", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      data: {
        csv: "*",
        pageSize: this.state.count,
        pageNumber: "0"
      },
      withCredentials: true
    }).then(res => {
      const data = res.data.data;
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
      this.setState({count: results.length, searchResults: results});
    }).catch(err => console.log(err));
  }

  sendRequestToUpdate = async (url, relevance) => {
    await axios("http://localhost:8000/api/v1/update", {
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
      console.log(results);
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
    this.setState({search: e.target.value});
  }

  handleOnSearch = (e) => {
    e.preventDefault();
      axios("http://localhost:8000/api/v1/search", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: {
          csv: this.state.search,
          pageSize: 100,
          pageNumber: "0"
        },
        withCredentials: true
      }).then(res => {
        console.log(res);
        const data = res.data.data;
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
        this.setState({searchResults: results, search: ""});
      });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();

    axios("http://localhost:8000/api/v1/process/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      data: {
        queries: this.state.csv,
        count: this.state.countForm,
        location: this.state.location
      },
      withCredentials: true
    }).then(res => {
      if (res.data.status == "Success") {
        axios("http://localhost:8000/api/v1/search", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          data: {
            csv: this.state.csv,
            pageSize: this.state.countForm,
            pageNumber: "0"
          },
          withCredentials: true
        }).then(res => {
          const data = res.data.data;
          const results = [];
          data.forEach(element => {
          if (results.length < this.state.count) {
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
          }
          });
          this.setState({searchResults: results, csv: "", location: "", countForm: "", count: results.length});
        }).catch(err => console.log(err));
      }
    })

}

  render() {
    if (this.state.loggedIn) {
      return (
        <Container maxWidth="lg">
          <Grid container>
            <Header />
          </Grid>
          <Grid container>
            <Form searchResults={this.state.searchResults} handleOnCsvChange={this.handleOnCsvChange} handleOnCountChange={this.handleOnCountChange} handleOnCountryChange={this.handleOnCountryChange} handleOnSubmit={this.handleOnSubmit} csv={this.state.csv} count={this.state.countForm} location={this.state.location}/>
          </Grid>
          <SearchGrid handleOnNo={this.handleOnNo} handleOnYes={this.handleOnYes} count={this.state.count} searchResults={this.state.searchResults} handleOnSearchChange={this.handleOnSearchChange} handleOnSearch={this.handleOnSearch} search={this.state.search}/>
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
