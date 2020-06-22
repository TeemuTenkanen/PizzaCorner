import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import MainPage from "./MainPage";
import RestaurantPage from "./RestaurantPage";
import CreateNewReview from "./CreateNewReview";

import Grid from "@material-ui/core/Grid";
import { FavoriteBorder, Home } from "@material-ui/icons";

import firebase from "./Firebase/firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

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
          });
        }
        newState.push({
          name: dbData[restaurant].name,
          location: dbData[restaurant].location,
          stars: dbData[restaurant].stars,
          openHours: dbData[restaurant].openHours,
          reviews: reviews,
        });
      }
      this.setState({ data: newState });
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
              <Grid item xs align="center">
                <FavoriteBorder
                  style={{ top: "3px", position: "relative" }}
                ></FavoriteBorder>
              </Grid>
            </Grid>

            <Route
              path="/"
              exact
              strict
              render={(props) => <MainPage data={this.state.data} />}
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
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
