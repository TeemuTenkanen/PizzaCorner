import React from "react";
import firebase from "./Firebase/firebase";

import Grid from "@material-ui/core/Grid";

import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

class RequestNewRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      openHours: "",
      submitDisabled: false,
      snackBarOpen: false,
      showErrorMessage: false,
      showNameError: false,
      restaurantData: this.props.restaurantData,
      restaurantRequests: this.props.restaurantRequests,
      restaurantNames: [],
    };
  }

  componentDidMount() {
    let restaurantNames = [];
    for (let restaurant in this.state.restaurantData) {
      restaurantNames.push(this.state.restaurantData[restaurant].name);
    }
    for (let request in this.state.restaurantRequests) {
      restaurantNames.push(this.state.restaurantRequests[request].name);
    }
    this.setState({ restaurantNames });
    console.log(restaurantNames);
  }

  handleChange = (event) => {
    this.setState({ submitDisabled: false });
    let value = event.target.value;
    if (event.target.name === "name") {
      if (this.state.restaurantNames.includes(value)) {
        this.setState({ showNameError: true, submitDisabled: true });
      }
    }
    this.setState({ [event.target.name]: value });
  };

  onSend = (event) => {
    event.preventDefault();
    if (
      this.state.name !== "" &&
      this.state.location !== "" &&
      this.state.openHours !== ""
    ) {
      firebase.database().ref("RestaurantRequests").push({
        name: this.state.name,
        location: this.state.location,
        openHours: this.state.openHours,
      });
      this.setState({ snackBarOpen: true, submitDisabled: true });
    } else {
      this.setState({ showErrorMessage: true });
    }
  };

  handleSnackBarClose = (event) => {
    this.setState({
      snackBarOpen: false,
      showErrorMessage: false,
      showNameError: false,
    });
  };

  render() {
    return (
      <Container style={{ paddingTop: "85px" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.snackBarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackBarClose}
        >
          <MuiAlert onClose={this.handleSnackBarClose} severity="success">
            You created new restaurant
          </MuiAlert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.showErrorMessage}
          autoHideDuration={6000}
          onClose={this.handleSnackBarClose}
        >
          <MuiAlert onClose={this.handleSnackBarClose} severity="error">
            You must fill every input
          </MuiAlert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.showNameError}
          autoHideDuration={6000}
          onClose={this.handleSnackBarClose}
        >
          <MuiAlert onClose={this.handleSnackBarClose} severity="error">
            This restaurant is added already
          </MuiAlert>
        </Snackbar>
        <Grid spacing={3} container justify="center">
          <Grid item align="center">
            <h1>Request new restaurant</h1>
          </Grid>
          <form onSubmit={this.onSend}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={3} align="center">
                Name
              </Grid>
              <Grid item xs={9} align="center">
                <TextField
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  placeholder="Add name"
                />
              </Grid>
            </Grid>
            <Box mt={3}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={3} align="center">
                  <LocationOnIcon style={{ paddingRight: "15px" }} />
                </Grid>
                <Grid item xs={9} align="center">
                  <TextField
                    name="location"
                    onChange={this.handleChange}
                    value={this.state.location}
                    placeholder="Add location"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={3} align="center">
                  <AccessTimeIcon style={{ paddingRight: "15px" }} />
                </Grid>
                <Grid item xs={9} align="center">
                  <TextField
                    name="openHours"
                    onChange={this.handleChange}
                    value={this.state.openHours}
                    placeholder="Add open hours"
                  />
                </Grid>
              </Grid>
            </Box>
            <Grid container alignItems="center">
              <Grid item xs={12} style={{ marginTop: "50px" }} align="center">
                <Button
                  type="submit"
                  value="Submit"
                  variant="contained"
                  color="primary"
                  disabled={this.state.submitDisabled}
                >
                  Request new restaurant
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    );
  }
}

export default RequestNewRestaurant;
