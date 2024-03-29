import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import MainPage from "./MainPage";
import RestaurantPage from "./RestaurantPage";
import CreateNewReview from "./CreateNewReview";
import RequestNewRestaurant from "./RequestNewRestaurant";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Home } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import Drawer from "@material-ui/core/Drawer";

import firebase from "./Firebase/firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurantData: [],
      originalRestaurantData: [],
      restaurantRequests: [],
      drawerOpen: false,
      loading: false,
    };
  }

  toggleDrawer = (event) => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  filterRestaurants = (value) => {
    let newList = [];
    if (value !== "") {
      newList = this.state.originalRestaurantData.filter((restaurant) => {
        const nameLc = restaurant.name.toLowerCase();
        const filterLc = value.toLowerCase();
        return nameLc.includes(filterLc);
      });
    } else {
      newList = this.state.originalRestaurantData;
    }
    this.setState({ restaurantData: newList });
  };

  sortRestaurants = (value) => {
    let newList = [];
    if (value !== "All") {
      if (value === "Favorites") {
        let favoriteListString = localStorage.getItem("favoriteList");
        newList = this.state.originalRestaurantData.filter((restaurant) => {
          const nameLc = restaurant.name.toLowerCase();
          const filterLc = favoriteListString.toLowerCase();
          return filterLc.includes(nameLc);
        });
      }
      if (value === "Best reviews") {
        newList = this.state.originalRestaurantData.sort((x, y) =>
          x.starAverage < y.starAverage ? 1 : -1
        );
        console.log(newList);
      }
    } else {
      newList = this.state.originalRestaurantData;
    }
    this.setState({ restaurantData: newList });
  };

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (snapshot) => {
      let dbData = snapshot.val();
      let restaurantData = [];
      for (let restaurant in dbData.Restaurants) {
        let reviews = [];
        for (let review in dbData.Restaurants[restaurant].reviews) {
          reviews.push({
            comment: dbData.Restaurants[restaurant].reviews[review].comment,
            price: dbData.Restaurants[restaurant].reviews[review].price,
            stars: dbData.Restaurants[restaurant].reviews[review].stars,
            picture: dbData.Restaurants[restaurant].reviews[review].picture,
            timestamp: dbData.Restaurants[restaurant].reviews[review].timestamp,
          });
        }
        reviews.sort(function (a, b) {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        restaurantData.push({
          name: dbData.Restaurants[restaurant].name,
          location: dbData.Restaurants[restaurant].location,
          openHours: dbData.Restaurants[restaurant].openHours,
          reviews: reviews,
          starAverage: dbData.Restaurants[restaurant].starAverage,
        });
      }
      let restaurantRequests = [];
      for (let request in dbData.RestaurantRequests) {
        restaurantRequests.push({
          name: dbData.RestaurantRequests[request].name,
          location: dbData.RestaurantRequests[request].location,
          openHours: dbData.RestaurantRequests[request].openHours,
        });
      }
      this.setState({
        originalRestaurantData: restaurantData,
        restaurantData,
        restaurantRequests,
        loading: true,
      });
    });
    let favoriteList = localStorage.getItem("favoriteList");
    if (favoriteList === null) {
      localStorage.setItem("favoriteList", "");
    }
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
                    <Link
                      to="/RequestNewRestaurant"
                      style={{ color: "black", textDecoration: "none" }}
                      onClick={this.toggleDrawer}
                    >
                      <AddIcon />
                    </Link>
                  </Grid>
                  <Grid item align="left">
                    <Link
                      to="/RequestNewRestaurant"
                      style={{ color: "black", textDecoration: "none" }}
                      onClick={this.toggleDrawer}
                    >
                      <p>Request restaurant</p>
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
                <MainPage
                  restaurantData={this.state.restaurantData}
                  loading={this.state.loading}
                  filterRestaurants={this.filterRestaurants}
                  sortRestaurants={this.sortRestaurants}
                />
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
              path="/RequestNewRestaurant"
              exact
              strict
              render={(props) => (
                <RequestNewRestaurant
                  restaurantData={this.state.restaurantData}
                  restaurantRequests={this.state.restaurantRequests}
                  {...props}
                />
              )}
            ></Route>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
