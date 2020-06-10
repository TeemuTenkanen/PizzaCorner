import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import pizzaPicture from "../testPictures/pizza1.jpg";
import CardActionArea from "@material-ui/core/CardActionArea";

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <CardActionArea>
            <CardMedia
              image={pizzaPicture}
              title="Pizza mozarella"
              style={{ height: 0, paddingTop: "56.25%" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Test pizza
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Mozarella pizza was delicious.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

export default MainPage;
