import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Education</h1>
          <ul>
            <li>Georgetown University Law Center, LL.M. International Studies, Distinction and Dean's List, Washington D.C. (2008)</li>
            <li>Getúlio Vargas Foundation, Postgraduate Specialization in Business and Economics Law, São Paulo, Brazil (2006)</li>
            <li>University of São Paulo Law School, LL.B. (J.D. Equivalent), São Paulo, Brazil (2000)</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;