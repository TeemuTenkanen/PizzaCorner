import React from "react";
import { Link } from "react-router-dom";
import defaultPicture from "../testPictures/defaultPicture.png";

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
      sortBy: "Near you",
      restaurantKeyWord: "",
    };
  }

  starAverage = (reviews) => {
    let starSum = 0;
    for (let i = 0; i < reviews.length; i++) {
      starSum += reviews[i].stars;
    }
    let starAverage = Math.round((starSum / reviews.length) * 100) / 100;
    return starAverage;
  };

  handleSortOrder = (event) => {
    this.setState({ sortBy: event.target.value });
  };

  handleRestaurantKeyword = (event) => {
    let value = event.target.value;
    this.setState({ restaurantKeyWord: value });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(this.props.data);
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
              <Select value={this.state.sortBy} onChange={this.handleChange}>
                <MenuItem value={"Near you"}>Near you</MenuItem>
                <MenuItem value={"Best reviews"}>Best reviews</MenuItem>
                <MenuItem value={"Random"}>Random</MenuItem>
              </Select>
            </Box>
          </FormControl>
        </Grid>
        {this.props.loading ? (
          <>
            {this.props.data.map((restaurant) => (
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
                          {this.starAverage(restaurant.reviews)}/5
                        </h1>
                      }
                    />
                    <CardActionArea>
                      <CardMedia
                        image={
                          restaurant.reviews[0].picture !== "null"
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
