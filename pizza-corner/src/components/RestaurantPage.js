import React from "react";
import { Link } from "react-router-dom";
import pizzaPicture from "../testPictures/pizza1.jpg";
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
    console.log(this.state.restaurantData);
    let reviews = this.state.restaurantData.reviews;
    let priceSum = 0;
    let starSum = 0;
    for (let i = 0; i < reviews.length; i++) {
      console.log(reviews[i].price);

      priceSum += reviews[i].price;
      starSum += reviews[i].stars;
    }
    let priceAverage = Math.round((priceSum / reviews.length) * 100) / 100;
    let starAverage = Math.round((starSum / reviews.length) * 100) / 100;
    let reviewAverage = "";
    if (starAverage < 1) {
      reviewAverage = "Poor ";
    }
    if (1 < starAverage < 2) {
      reviewAverage = "Okey ";
    }
    if (2 < starAverage < 3) {
      reviewAverage = "Good ";
    }
    if (3 < starAverage < 4) {
      reviewAverage = "Great ";
    }
    if (4 < starAverage < 5) {
      reviewAverage = "Excellent ";
    }
    this.setState({
      priceAverage: priceAverage,
      reviewAverage: reviewAverage + starAverage,
    });
  }

  handleFavoriteButtonClick = () => {
    //TODO: implement add to favorite list functionality
    if (this.state.favoriteButtonColor === "black") {
      this.setState({ favoriteButtonColor: "deeppink" });
    } else {
      this.setState({ favoriteButtonColor: "black" });
    }
  };

  render() {
    return (
      <div style={{ paddingTop: "85px" }}>
        <img
          src={
            this.state.restaurantData.reviews[0].picture !== "null"
              ? this.state.restaurantData.reviews[0].picture
              : pizzaPicture
          }
          title="Pizza mozarella"
          style={{ width: "100%" }}
          alt="pizzaPicture"
        />
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item align="left">
              <h1>{this.state.restaurantData.name}</h1>
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
              <p>{this.state.reviewAverage}/5</p>
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
              <p>{this.state.priceAverage}e</p>
            </Grid>
          </Grid>

          <Box mt={6}>
            <h2>Comments and reviews</h2>
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
