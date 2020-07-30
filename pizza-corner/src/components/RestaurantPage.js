import React from "react";
import { Link } from "react-router-dom";
import defaultPicture from "../testPictures/noReviews.png";
import ReviewCard from "./ReviewCard";

import Grid from "@material-ui/core/Grid";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import CreateIcon from "@material-ui/icons/Create";
import { FavoriteBorder } from "@material-ui/icons";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

class RestaurantPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantData: this.props.location.state.restaurantData,
      priceAverage: 0,
      reviewAverage: "",
      favoriteButtonColor: "black",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let reviews = this.state.restaurantData.reviews;
    let priceSum = 0;
    let starSum = 0;
    for (let i = 0; i < reviews.length; i++) {
      priceSum += reviews[i].price;
      starSum += reviews[i].stars;
    }
    let priceAverage = Math.round((priceSum / reviews.length) * 100) / 100;
    priceAverage = priceAverage + "e";
    let starAverage = Math.round((starSum / reviews.length) * 100) / 100;
    let reviewAverage = "";
    console.log(starAverage);
    if (starAverage < 1) {
      reviewAverage = "Poor " + starAverage + "/5";
    }
    if (1 < starAverage < 2) {
      reviewAverage = "Okey " + starAverage + "/5";
    }
    if (2 < starAverage < 3) {
      reviewAverage = "Good " + starAverage + "/5";
    }
    if (3 < starAverage < 4) {
      reviewAverage = "Great " + starAverage + "/5";
    }
    if (4 < starAverage < 5) {
      reviewAverage = "Excellent " + starAverage + "/5";
    }
    if (isNaN(starAverage)) {
      reviewAverage = "No reviews";
      priceAverage = "No reviews";
    }
    let favoriteListString = localStorage.getItem("favoriteList");
    let favoriteButtonColor = "black";
    if (favoriteListString.includes(this.state.restaurantData.name)) {
      favoriteButtonColor = "deeppink";
    }
    this.setState({
      priceAverage,
      reviewAverage,
      favoriteButtonColor,
    });
  }

  handleFavoriteButtonClick = () => {
    let favoriteListString = localStorage.getItem("favoriteList");
    let favoriteList = favoriteListString.split(",");
    if (this.state.favoriteButtonColor === "black") {
      this.setState({ favoriteButtonColor: "deeppink" });
      favoriteList.push(this.state.restaurantData.name);
    } else {
      this.setState({ favoriteButtonColor: "black" });
      let index = favoriteList.indexOf(this.state.restaurantData.name);
      if (index !== -1) {
        favoriteList.splice(index, 1);
      }
    }
    localStorage.setItem("favoriteList", favoriteList.toString());
  };

  render() {
    return (
      <div style={{ paddingTop: "85px" }}>
        <img
          src={
            this.state.restaurantData.reviews.length !== 0
              ? this.state.restaurantData.reviews[0].picture
              : defaultPicture
          }
          title={this.state.restaurantData + " picture"}
          style={{ width: "100%" }}
          alt={this.state.restaurantData + " picture"}
        />
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item align="left">
              <p style={{ fontSize: "28px" }}>
                {this.state.restaurantData.name}
              </p>
            </Grid>
            <Grid item xs align="right">
              <FavoriteBorder
                style={{
                  fontSize: 60,
                  fill: this.state.favoriteButtonColor,
                }}
                onClick={this.handleFavoriteButtonClick}
              ></FavoriteBorder>
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="center">
            <Grid item align="left">
              <InsertEmoticonIcon />
            </Grid>
            <Grid item xs={6} align="left">
              <p>{this.state.reviewAverage}</p>
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="center">
            <Grid item align="left">
              <AccessTimeIcon />
            </Grid>
            <Grid item xs={6} align="left">
              <p>{this.state.restaurantData.openHours}</p>
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="center">
            <Grid item align="left">
              <LocationOnIcon />
            </Grid>
            <Grid item xs={6} align="left">
              <p>{this.state.restaurantData.location}</p>
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="center">
            <Grid item align="left">
              <EuroSymbolIcon />
            </Grid>
            <Grid item xs={6} align="left">
              <p>{this.state.priceAverage}</p>
            </Grid>
          </Grid>

          <Box mt={6}>
            <p style={{ fontSize: "28px" }}>Comments and reviews</p>
          </Box>
          <Box mb={10}>
            {this.state.restaurantData.reviews.map((review) => (
              <Box mt={6} key={review.comment}>
                <ReviewCard review={review}></ReviewCard>
              </Box>
            ))}
          </Box>

          <Grid
            style={{
              position: "fixed",
              bottom: 0,
              zIndex: 100,
              background: "white",
              width: "100%",
              paddingBottom: "20px",
            }}
            container
            spacing={3}
            justify="center"
          >
            <Grid item align="center">
              <CreateIcon></CreateIcon>
            </Grid>
            <Grid align="center">
              <Link
                to={{
                  pathname: "/CreateNewReview",
                  state: {
                    restaurantData: this.state.restaurantData,
                  },
                }}
                style={{ color: "black", textDecoration: "none" }}
              >
                <p>Add a review...</p>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default RestaurantPage;
