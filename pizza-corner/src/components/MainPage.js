import React from "react";
import firebase from "./Firebase/firebase";
import { Link } from "react-router-dom";
import defaultPicture from "../testPictures/noReviews.png";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import MuiTableCell from "@material-ui/core/TableCell";

import { withStyles } from "@material-ui/core/styles";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "None",
      restaurantKeyWord: "",
      restaurantData: this.props.restaurantData,
    };
  }

  starAverage = (reviews, name) => {
    if (reviews.length !== 0) {
      let starSum = 0;
      for (let i = 0; i < reviews.length; i++) {
        starSum += reviews[i].stars;
      }
      let starAverage = Math.round((starSum / reviews.length) * 100) / 100;
      firebase
        .database()
        .ref("Restaurants/" + name)
        .update({
          starAverage: starAverage,
        });
      return starAverage;
    }
  };

  handleSortOrder = (event) => {
    let value = event.target.value;
    this.setState({ sortBy: value });
    this.props.sortRestaurants(value);
  };

  handleRestaurantKeyword = (event) => {
    let value = event.target.value;
    this.setState({ restaurantKeyWord: value });
    this.props.filterRestaurants(value);
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const TableCell = withStyles({
      root: {
        borderBottom: "none",
      },
    })(MuiTableCell);

    return (
      <div style={{ paddingTop: "85px" }}>
        <Grid container alignItems="center" justify="center">
          <FormControl>
            <TextField
              onChange={this.handleRestaurantKeyword}
              value={this.state.restaurantKeyWord}
              placeholder="Search by restaurant"
            />
            <Box mt={2} mb={2}>
              <Select value={this.state.sortBy} onChange={this.handleSortOrder}>
                <MenuItem value={"None"}>None</MenuItem>
                <MenuItem value={"Best reviews"}>Best reviews</MenuItem>
                <MenuItem value={"Favorites"}>Favorites</MenuItem>
              </Select>
            </Box>
          </FormControl>
        </Grid>
        {this.props.loading ? (
          <>
            {this.props.restaurantData.map((restaurant) => (
              <Box mb={6} key={restaurant.name}>
                <Link
                  to={{
                    pathname: `/RestaurantPage/${restaurant.name}`,
                    state: {
                      restaurantData: restaurant,
                    },
                  }}
                  style={{ textDecoration: "none" }}
                  key={restaurant.name}
                >
                  <Card>
                    <CardHeader
                      title={restaurant.name}
                      subheader={restaurant.location}
                      action={
                        <h1 style={{ marginRight: "12px" }}>
                          {this.starAverage(
                            restaurant.reviews,
                            restaurant.name
                          )}
                          /5
                        </h1>
                      }
                    />
                    <CardActionArea>
                      <CardMedia
                        image={
                          restaurant.reviews.length !== 0
                            ? restaurant.reviews[0].picture
                            : defaultPicture
                        }
                        title="Pizza mozarella"
                        style={{ height: 0, paddingTop: "56.25%" }}
                      />
                      <CardContent>
                        <TableContainer>
                          <Table aria-label="caption table" size="small">
                            <TableBody>
                              {restaurant.reviews.map((review) => (
                                <TableRow key={review.comment}>
                                  <TableCell component="th" scope="row">
                                    {review.comment}
                                  </TableCell>
                                  <TableCell align="right">
                                    {review.stars}/5
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Box>
            ))}
          </>
        ) : (
          <Box mt={15}>
            <Grid container alignItems="center" justify="center">
              <CircularProgress />
            </Grid>
          </Box>
        )}
      </div>
    );
  }
}

export default MainPage;
