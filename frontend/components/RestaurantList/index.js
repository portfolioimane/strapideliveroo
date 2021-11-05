import React from 'react';
import { render } from 'react-dom';
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardImg,
  CardSubtitle
} from "reactstrap";
import { CardText, CardTitle, Col, Row } from "reactstrap";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const QUERY = gql`
  {
     restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

function RestaurantList(props){
     const { loading, error, data } = useQuery(QUERY);
     if (error) return "Error loading restaurants";
     if (loading) return <h1>Fetching</h1>;
     if (data.restaurants && data.restaurants.length) {
    //searchQuery
    const searchQuery = data.restaurants.filter(query =>
      query.name.toLowerCase().includes(props.search)
    );
    if (searchQuery.length != 0) {
      return (
        <Row>
            {searchQuery.map(res => (
              <Col xs="6" sm="4" key={res.id}>
              <Card
                style={{ width: "100%", margin: "0 10px" }}
                className="h-100"
                key={res.id}
              >
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`http://localhost:1337${res.image[0].url}`}
                />
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Link
                    as={`/restaurants/${res.id}`}
                    href={`/restaurants?id=${res.id}`}
                  >
                    <a className="btn btn-primary">View</a>
                  </Link>
                </div>
              </Card>
              </Col>
            ))}

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
          </Row>
      );
    } else {
      return <h1>No Restaurants Found</h1>;
    }
  }
  return <h1>Add Restaurants</h1>;
}

export default RestaurantList


