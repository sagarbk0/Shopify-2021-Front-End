import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const Movie = (props) => (
  <Container className="mb-2" fluid>
    <Row h="10">      
      <Col sm="2">
      {props.Image !== "N/A" ? 
      <Image fluid src={props.Image} alt="Movie poster"></Image> : ""}
      </Col>
      <Col sm="6">{props.Title}</Col>
      <Col sm="2">{props.Year}</Col>
      <Col sm="2">{props.Function === "search" ? (
        <Button id={props.Id} onClick={props.Add}>
          Nominate
        </Button> ) : (
        <Button variant="warning" id={props.Id} onClick={props.Remove}>
          Remove
        </Button>
      )}
      </Col>
    </Row>
  </Container>
);

export default Movie;
