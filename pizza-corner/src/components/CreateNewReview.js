import React from "react";
import defaultPicture from "../testPictures/defaultPicture.png";
import firebase from "./Firebase/firebase";

import Grid from "@material-ui/core/Grid";

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

class CreateNewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantData: this.props.location.state.restaurantData,
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
    if (event.target.name === "stars") {
      value = Number(event.target.value);
    } else if (event.target.name === "price" && typeof value == "string") {
      value = parseFloat(event.target.value.replace(",", "."));
    }
    this.setState({ [event.target.name]: value });
  };

  handleImageChange = (event) => {
    let reader = new FileReader();
    let picture = event.target.files[0];

    //Preview purposes set this first
    this.setState({
      previewImageFile: URL.createObjectURL(event.target.files[0]),
    });

    reader.onloadend = () => {
      this.setState({
        imageUrl: reader.result,
      });
    };
    reader.readAsDataURL(picture);
  };

  handleSnackBarClose = (event) => {
    this.setState({ snackBarOpen: false });
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
      this.state.stars !== 0 &&
      this.state.imageUrl !== "null"
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
            You created a review.
          </MuiAlert>
        </Snackbar>
        <Grid spacing={3} container justify="center">
          <Grid item align="center">
            <p style={{ fontSize: "28px" }}>
              Review {this.state.restaurantData.name}
            </p>
          </Grid>
          <form onSubmit={this.onSend}>
            <Grid container spacing={3} alignItems="center" justify="center">
              <Grid item xs={3} align="center">
                <InsertEmoticonIcon></InsertEmoticonIcon>
              </Grid>
              <Grid item xs={6} align="center">
                <Box component="fieldset" borderColor="transparent">
                  <Rating
                    name="stars"
                    value={this.state.stars}
                    onChange={this.handleChange}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="center" justify="center">
              <Grid item xs={3} align="center">
                <EuroSymbolIcon></EuroSymbolIcon>
              </Grid>
              <Grid item xs={6} align="center">
                <TextField
                  name="price"
                  onChange={this.handleChange}
                  value={this.state.price}
                  label="The price of pizza?"
                  type="number"
                />
              </Grid>
            </Grid>
            <Box mt={3}>
              <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={3} align="center">
                  <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
                </Grid>
                <Grid item xs={6} align="center">
                  <TextField
                    name="comment"
                    onChange={this.handleChange}
                    value={this.state.comment}
                    placeholder="Add comment"
                    multiline
                    rows={1}
                    rowsMax={4}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={3} align="center">
                  <PhotoCamera />
                </Grid>
                <Grid item xs={6} align="center">
                  <Button variant="contained" color="primary" component="label">
                    Add picture
                    <input
                      style={{ display: "none" }}
                      accept="image/*"
                      type="file"
                      onChange={this.handleImageChange}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <div>
              {this.state.previewImageFile == null ? (
                <Box mt={5}>
                  <img
                    src={defaultPicture}
                    alt="previewPicture"
                    style={{ width: "100%" }}
                  />
                </Box>
              ) : (
                <Box mt={5}>
                  <img
                    src={this.state.previewImageFile}
                    alt="previewPicture"
                    style={{ width: "100%" }}
                  />
                </Box>
              )}
            </div>
            <Grid container alignItems="center">
              <Grid item xs={12} style={{ marginTop: "15px" }} align="center">
                <Button
                  type="submit"
                  value="Submit"
                  variant="contained"
                  color="primary"
                  disabled={submitDisabled}
                >
                  Send review
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    );
  }
}

export default CreateNewReview;
