import React from "react";
import { Link } from "react-router-dom";
import pizzaPicture from "../testPictures/pizza1.jpg";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import MuiTableCell from "@material-ui/core/TableCell";

import Grid from "@material-ui/core/Grid";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import CreateIcon from "@material-ui/icons/Create";
import { FavoriteBorder } from "@material-ui/icons";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import { withStyles } from "@material-ui/core/styles";

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
    let priceAverage = priceSum / reviews.length;
    let starAverage = starSum / reviews.length;
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
    const TableCell = withStyles({
      root: {
        borderBottom: "none",
      },
    })(MuiTableCell);

    return (
      <div style={{ paddingTop: "80px" }}>
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
              <InsertEmoticonIcon></InsertEmoticonIcon>
            </Grid>
            <Grid item xs={6} align="left">
              <p>{this.state.reviewAverage}/5</p>
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="center">
            <Grid item align="left">
              <AccessTimeIcon></AccessTimeIcon>
            </Grid>
            <Grid item xs={6} align="left">
              <p>{this.state.restaurantData.openHours}</p>
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="center">
            <Grid item align="left">
              <LocationOnIcon></LocationOnIcon>
            </Grid>
            <Grid item xs={6} align="left">
              <p>{this.state.restaurantData.location}</p>
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="center">
            <Grid item align="left">
              <EuroSymbolIcon></EuroSymbolIcon>
            </Grid>
            <Grid item xs={6} align="left">
              <p>{this.state.priceAverage}e</p>
            </Grid>
          </Grid>

          <Box mt={6}>
            <h2>Comments and reviews</h2>
          </Box>
          <TableContainer>
            <Table aria-label="caption table" size="small">
              <TableBody>
                {this.state.restaurantData.reviews.map((review) => (
                  <TableRow key={review.comment}>
                    <TableCell component="th" scope="row">
                      {review.comment}
                    </TableCell>
                    <TableCell align="right">{review.stars}/5</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={3}>
            <Grid container spacing={3} alignItems="center">
              <Grid item align="left">
                <CreateIcon></CreateIcon>
              </Grid>
              <Grid item xs={6} align="left">
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
          </Box>
        </Container>
      </div>
    );
  }
}

export default RestaurantPage;
