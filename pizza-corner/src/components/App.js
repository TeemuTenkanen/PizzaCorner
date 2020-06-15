import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Grid from "@material-ui/core/Grid";
import { FavoriteBorder, Home } from "@material-ui/icons";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import firebase from "./Firebase/firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      sortBy: "Near you",
      speed: "",
    };
  }

  componentDidMount() {
    const testRef = firebase.database().ref("react");
    testRef.on("value", (snapshot) => {
      let data = snapshot.val();
      console.log(data);
    });
  }

  handleChange = (event) => {
    this.setState({ sortBy: event.target.value });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Grid container spacing={3} alignItems="center" justify="center">
              <Grid item xs align="center">
                <Home></Home>
              </Grid>
              <Grid item xs={6} align="center">
                <h2>PIZZA CORNER</h2>
              </Grid>
              <Grid item xs align="center">
                <FavoriteBorder></FavoriteBorder>
              </Grid>
            </Grid>
            <Grid container alignItems="center" justify="center">
              <FormControl>
                <InputLabel>Sort by:</InputLabel>
                <Select value={this.state.sortBy} onChange={this.handleChange}>
                  <MenuItem value={"Near you"}>Near you</MenuItem>
                  <MenuItem value={"Best reviews"}>Best reviews</MenuItem>
                  <MenuItem value={"Random"}>Random</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Route path="/">
              <MainPage />
            </Route>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
