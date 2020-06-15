import React from "react";
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
  constructor() {
    super();
    this.state = {
      speed: "",
    };
  }

  render() {
    const TableCell = withStyles({
      root: {
        borderBottom: "none",
      },
    })(MuiTableCell);

    return (
      <div>
        <h1>{this.state.speed}</h1>
        <Card>
          <CardHeader
            title="Toms pizzeria"
            subheader="100m"
            action={<h1 style={{ marginRight: "12px" }}>4/5</h1>}
          />
          <CardActionArea>
            <CardMedia
              image={pizzaPicture}
              title="Pizza mozarella"
              style={{ height: 0, paddingTop: "56.25%" }}
            />
            <CardContent>
              <TableContainer>
                <Table aria-label="caption table" size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Mozarella pizza was delicious.
                      </TableCell>
                      <TableCell align="right">3/5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Mozarella pizza was delicious too.
                      </TableCell>
                      <TableCell align="right">4/5</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

export default MainPage;
