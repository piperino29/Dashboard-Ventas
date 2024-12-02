import { Col, Container, Row } from "reactstrap";

const Tabla = (props) => {
  const { use, setUser } = props;

  return (
    <>
      <Container>
        <Row>
          <Col xs="4" className="bg-primary">
            {props.props}
          </Col>
          <Col xs="4" className="bg-warning">
            columna 2
          </Col>
          <Col xs="4" className="bg-danger">
            columna 3
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Tabla;
