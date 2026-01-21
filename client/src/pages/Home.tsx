import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Education</h1>
          <ul>
            <li>
              <strong>Georgetown University</strong> - 
              LL.M., International Studies, Distinction and Dean's List
              <br />
              Washington, D.C. • 2021
              <br />
              <a href="https://www.georgetown.edu">Website</a>
            </li>
            <li>
              <strong>FGV</strong> - 
              Postgraduate Specialization in Business and Economics Law
              <br />
              São Paulo, Brazil • 2020
              <br />
              <a href="https://www.fgv.br">Website</a>
            </li>
            <li>
              <strong>Universidade de São Paulo (USP)</strong> - 
              LL.B. (J.D. Equivalent)
              <br />
              São Paulo, Brazil • 2018
              <br />
              <a href="https://www.usp.br">Website</a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;