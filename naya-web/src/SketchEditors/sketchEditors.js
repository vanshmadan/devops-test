import React from 'react';
import {Row, Col
} from 'reactstrap';
class SketchEditors extends React.Component {

    state = {
        color : '',
        username : ''
     }

     componentDidMount(){
         this.setState({color : this.props.color, name : this.props.name})
         //console.log("cdm color, name", this.props.color, " ", this.props.name);
     }
    render(){
        //console.log("in sketch editors")
        const {color} = this.state;
        //console.log("in sketch editors", color)
        return(
            <Row>
                <>{console.log("Color", color)}</>
                <Col md = "3" style = {{backgroundColor : color}}></Col>
                <Col md = "7">{this.state.name}  </Col>
                <br></br>
            </Row>
        )
    }

}

export default SketchEditors;