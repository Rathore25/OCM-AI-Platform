import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Header from '../Components/Header';
import Form from '../Components/QueryForm';
import SearchGrid from '../Components/SearchGrid';
import axios from 'axios';


class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 25,
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
        pageMaximum: "25",
        pageNumber: "0"
      },
      withCredentials: true
    }).then(res => {
      console.log("search log");
      const data = res.data.data;
      const results = [];
      console.log(data);
      data.forEach(element => {
        if (results.length < this.state.count) {
          results.push({
            id: element._id,
            content: element._source.content.slice(0,750) + "...",
            title: element._source.title,
            query: element._source.query
          });
        }
      });
      this.setState({searchResults: results});
    }).catch(err => console.log(err));

    // ACTUAL IMPLEMENTATION
    // ACTUAL IMPLEMENTATION

    // BACKUP
  //   axios.post("http://54.196.155.117:5001/api/v1/search/", {
  //     query: "*",
  //     pageMaximum: "25",
  //     pageNumber: "0"
  //     }).then(res => {
  //         const data = res.data.hits.hits;
  //         const results = [];
  //         data.forEach(element => {
  //             if (results.length < this.state.count) {
  //               results.push({
  //                 id: element._id,
  //                 content: element._source.content.slice(0,750) + "...",
  //                 title: element._source.title,
  //                 query: element._source.query
  //               });
  //             }
  //           });
  //       this.setState({searchResults: results});
  // })
  // BACKUP
  }

  handleOnCsvChange = (e) => {
    this.setState({csv: e.target.value});
  }

  handleOnCountChange = (e) => {
    this.setState({count: e.target.value});
  }

  handleOnCountryChange = (e, value) => {
    if (value) {
      this.setState({location: value.label})
    }
  }

  handleOnSubmit = (e) => {
    e.preventDefault();

    axios("http://localhost:8000/api/v1/process/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      data: {
        queries: this.state.csv,
        count: this.state.count,
        location: this.state.location
      },
      withCredentials: true
    }).then(res => {
      console.log("process log:")
      console.log(res);
      if (res.data.status == "Success") {
        axios("http://localhost:8000/api/v1/search", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          data: {
            csv: this.state.csv,
            pageMaximum: this.state.count,
            pageNumber: "0"
          },
          withCredentials: true
        }).then(res => {
          console.log("search log:")
          console.log(res);
          
          const data = res.data;
          const results = [];
          data.forEach(element => {
          if (results.length < this.state.count) {
            results.push({
              id: element._id,
              content: element._source.content.slice(0,750) + "...",
              title: element._source.title,
              query: element._source.query
            });
          }
          });
          this.setState({searchResults: results});
        }).catch(err => console.log(err));
      }
    })

    // axios.post("http://54.196.155.117:5001/api/v1/process/", {
    //     queries: this.state.csv,
    //     count: this.state.count,
    //     location: this.state.location
    // }
    // ).then(res => {
    //     console.log(res);
    //     if (res.data.Status == "Complete") {
    //         const resultsArray = this.state.csv.split(",");
    //         let query = "";
    //         resultsArray.forEach(result => {
    //             query += "(" + result + ")";
    //             query += " or ";
    //         });
    //         query = query.slice(0, -4);
    //         axios.post("http://54.196.155.117:5001/api/v1/search/", {
    //             query,
    //             pageMaximum: this.state.count,
    //             pageNumber: "0"
    //             }).then(res => {
    //               // console.log(res);
    //                 const data = res.data.hits.hits;
    //                 const results = [];
    //                 data.forEach(element => {
    //                     if (results.length < this.state.count) {
    //                       results.push({
    //                         id: element._id,
    //                         content: element._source.content.slice(0,750) + "...",
    //                         title: element._source.title,
    //                         query: element._source.query
    //                       });
    //                     }
    //                   });
    //               this.setState({searchResults: results});
    //         })
    //     }
    // }).catch(err => {
    //     console.error(err);
    // })
}

  render() {
    if (this.state.loggedIn) {
      return (
        <Container maxWidth="lg">
          <Grid container>
            <Header />
          </Grid>
          <Grid container>
            <Form handleOnCsvChange={this.handleOnCsvChange} handleOnCountChange={this.handleOnCountChange} handleOnCountryChange={this.handleOnCountryChange} handleOnSubmit={this.handleOnSubmit}/>
          </Grid>
          <SearchGrid count={this.state.count} searchResults={this.state.searchResults} />
        </Container>
      );
    } else {
      return <h1>You are not logged in, please login to get access!!</h1>
    }
  }
}

export default Homepage;
