import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import MainPage from "./MainPage";
import RestaurantPage from "./RestaurantPage";
import CreateNewReview from "./CreateNewReview";
import AddNewRestaurant from "./AddNewRestaurant";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { FavoriteBorder, Home } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import Drawer from "@material-ui/core/Drawer";

import firebase from "./Firebase/firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      drawerOpen: false,
      loading: false,
    };
  }

  toggleDrawer = (event) => {
    console.log("TESTI");
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  componentDidMount() {
    const testRef = firebase.database().ref("Restaurants");
    testRef.on("value", (snapshot) => {
      let dbData = snapshot.val();
      let newState = [];
      for (let restaurant in dbData) {
        let reviews = [];
        for (let review in dbData[restaurant].reviews) {
          reviews.push({
            comment: dbData[restaurant].reviews[review].comment,
            price: dbData[restaurant].reviews[review].price,
            stars: dbData[restaurant].reviews[review].stars,
            picture: dbData[restaurant].reviews[review].picture,
            timestamp: dbData[restaurant].reviews[review].timestamp,
          });
        }
        reviews.sort(function (a, b) {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        newState.push({
          name: dbData[restaurant].name,
          location: dbData[restaurant].location,
          openHours: dbData[restaurant].openHours,
          reviews: reviews,
        });
      }
      this.setState({ data: newState, loading: true });
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Grid
              style={{
                position: "fixed",
                top: 0,
                zIndex: 100,
                background: "white",
              }}
              container
              spacing={3}
              alignItems="center"
              justify="center"
            >
              <Grid item xs align="center">
                <Link to="/" style={{ color: "black" }}>
                  <Home style={{ top: "3px", position: "relative" }}></Home>
                </Link>
              </Grid>
              <Grid item xs={6} align="center">
                <h2>PIZZA CORNER</h2>
              </Grid>
              <Grid item xs align="center" onClick={this.toggleDrawer}>
                <MenuIcon
                  style={{ top: "3px", position: "relative" }}
                ></MenuIcon>
              </Grid>
            </Grid>
            <Drawer
              anchor={"right"}
              open={this.state.drawerOpen}
              onClose={this.toggleDrawer}
            >
              <Box width={200} ml={2} mt={2}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item align="left">
                    <FavoriteBorder />
                  </Grid>
                  <Grid item align="left">
                    <p>Favorites</p>
                  </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="center">
                  <Grid item align="left">
                    <Link
                      to="/AddNewRestaurant"
                      style={{ color: "black", textDecoration: "none" }}
                      onClick={this.toggleDrawer}
                    >
                      <AddIcon />
                    </Link>
                  </Grid>
                  <Grid item align="left">
                    <Link
                      to="/AddNewRestaurant"
                      style={{ color: "black", textDecoration: "none" }}
                      onClick={this.toggleDrawer}
                    >
                      <p>Add restaurant</p>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Drawer>

            <Route
              path="/"
              exact
              strict
              render={(props) => (
                <MainPage data={this.state.data} loading={this.state.loading} />
              )}
            ></Route>
            <Route
              path="/RestaurantPage/:restaurantName"
              exact
              strict
              render={(props) => <RestaurantPage {...props} />}
            ></Route>
            <Route
              path="/CreateNewReview"
              exact
              strict
              render={(props) => <CreateNewReview {...props} />}
            ></Route>
            <Route
              path="/AddNewRestaurant"
              exact
              strict
              render={(props) => <AddNewRestaurant {...props} />}
            ></Route>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
