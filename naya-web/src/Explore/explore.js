import React from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import { exploreAPICall } from '../api';
import SketchPreview from '../Sketch/sketchPreview'

class Explore extends React.Component {

  state = {
    sketches: [],
    error: ''
  }

  componentDidMount() {
    exploreAPICall()
      .then(data => {
        if (data.error) this.setState({ error: data.error })
        else {
          this.setState({ sketches: data.allSketches })
        }
      })
  }


  render() {
    //console.log(this.state.sketches.length);
    const { sketches } = this.state;
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Button
                className="login-button"
                style={{
                  backgroundColor: '#fff',
                  color: '#403368',
                  marginTop: "1%",
                  fontSize: '15px',
                  marginLeft: '98%'
                }}
                onClick={() => {
                  sessionStorage.clear();
                  window.location.href = `/`
                }}>Logout</Button></Col>
          </Row>
          <Row style={{ fontSize: '35px' }}>
            <Button
              className="login-button"
              style={{
                backgroundColor: '#403368',
                color: '#fff',
                margin: '15px',
                marginTop: "5%",
                height: '50px',
                fontSize: '25px',
                width: '50%',
                borderRadius: '25px',
                marginLeft: '25%'
              }}
              onClick={() => { window.location.href = `/sketch` }}>
              Create a New Sketch</Button></Row>
          <div style={{ fontSize: '35px' }}><center>Or</center></div>
          <div style={{ fontSize: '35px' }}><center>Work on an Existing Sketch</center></div>

          <Row>
            {sketches.map((sketch, index) => (
              <Col sm="4" key={index} style={{ marginTop: "20px" }}>
                <SketchPreview
                  key={sketch._id} base64={sketch.base64} name={sketch.name} userId={sketch.userId} _id={sketch._id} style={{ width: '60%', paddingTop: '5%', background: "#123456" }} />
              </Col>

            )
            )}



          </Row>
        </Container>
      </div>
    )
  }
}
export default Explore;