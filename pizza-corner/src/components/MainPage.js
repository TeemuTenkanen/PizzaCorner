import React from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import pizzaPicture from "../testPictures/pizza1.jpg";
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
    };
  }

  handleChange = (event) => {
    this.setState({ sortBy: event.target.value });
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
      <div style={{ paddingTop: "80px" }}>
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
        {this.props.data === [] ? (
          <div>loading</div>
        ) : (
          <>
            {this.props.data.map((restaurant) => (
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
                        {restaurant.stars}/5
                      </h1>
                    }
                  />
                  <CardActionArea>
                    <CardMedia
                      image={
                        restaurant.reviews[0].picture !== "null"
                          ? restaurant.reviews[0].picture
                          : pizzaPicture
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
            ))}
          </>
        )}
      </div>
    );
  }
}

export default MainPage;
