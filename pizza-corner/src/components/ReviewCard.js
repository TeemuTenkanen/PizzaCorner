import React from "react";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import MuiTableCell from "@material-ui/core/TableCell";

import { withStyles } from "@material-ui/core/styles";

class ReviewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: this.props.review,
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
      <Card>
        <CardActionArea>
          <CardMedia
            image={this.state.review.picture}
            title="Pizza mozarella"
            style={{ height: 0, paddingTop: "56.25%" }}
          />
          <CardContent>
            <p>{this.state.review.timestamp}</p>
            <TableContainer>
              <Table aria-label="caption table" size="small">
                <TableBody>
                  <TableRow key={this.state.review.comment}>
                    <TableCell component="th" scope="row">
                      {this.state.review.comment}
                    </TableCell>
                    <TableCell align="right">
                      {this.state.review.stars}/5
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default ReviewCard;
