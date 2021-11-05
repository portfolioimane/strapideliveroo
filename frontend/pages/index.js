/* /pages/index.js */

import RestaurantList from "../components/RestaurantList";
import React, {useState} from "react";

import {
  Alert,
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row
} from "reactstrap";

function Home() {
    const [query, updateQuery]=useState("");
    return (
      <div className="container-fluid">
        <Row>
          <Col>
            <div className="search">
              <InputGroup>
                <InputGroupAddon addonType="append"> Search </InputGroupAddon>
                <Input onChange={e => updateQuery(e.target.value.toLocaleLowerCase())} />
              </InputGroup>
            </div>
            <RestaurantList search={query} />
          </Col>
        </Row>
        <style jsx>
          {`
            .search {
              margin: 20px;
              width: 500px;
            }
          `}
        </style>
      </div>
    );
}

export default Home;
