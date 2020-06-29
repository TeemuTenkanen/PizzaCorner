import React from "react";
import defaultPicture from "../testPictures/defaultPicture.png";
import firebase from "./Firebase/firebase";

import Grid from "@material-ui/core/Grid";

import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

class AddNewRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: 0,
      price: 0,
      comment: "",
      imageUrl: "null",
      previewImageFile: null,
      snackBarOpen: false,
    };
  }

  handleChange = (event) => {
    let value = event.target.value;
    this.setState({ [event.target.name]: value });
  };

  onSend = (event) => {
    event.preventDefault();
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    firebase
      .database()
      .ref("Restaurants/" + this.state.restaurantData.name + "/reviews")
      .push({
        comment: this.state.comment,
        price: this.state.price,
        stars: this.state.stars,
        picture: this.state.imageUrl,
        timestamp: date + " " + time,
      });
    this.setState({ snackBarOpen: true });
  };

  render() {
    const submitDisabled =
      this.state.price !== 0 &&
      this.state.comment !== "" &&
      this.state.stars !== 0
        ? false
        : true;

    return (
      <Container style={{ paddingTop: "85px" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.snackBarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackBarClose}
        >
          <MuiAlert onClose={this.handleSnackBarClose} severity="success">
            This is a success message!
          </MuiAlert>
        </Snackbar>
        <Grid spacing={3} container justify="center">
          <Grid item align="center">
            <h1>Add new restaurant</h1>
          </Grid>
          <form onSubmit={this.onSend}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={3} align="center">
                Name
              </Grid>
              <Grid item xs={9} align="center">
                <TextField
                  name="name"
                  onChange={this.openHours}
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
                  disabled={submitDisabled}
                >
                  Create new restaurant
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    );
  }
}

export default AddNewRestaurant;
