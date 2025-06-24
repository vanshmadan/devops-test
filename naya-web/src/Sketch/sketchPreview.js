import React from 'react';
import {
    Card, Button, Row, Col
} from 'reactstrap';
import { editAPICall } from '../api';
class SketchPreview extends React.Component {

    state = {
        _id : '',
        userId: [],
        base64: '',
        name: '',
        redirect : false,
    }

    componentDidMount() {
        this.setState({ userId: this.props.userId, base64: this.props.base64, name: this.props.name, _id : this.props._id })
    }

    handleEdit = () => {
        const data = {
            'sketchId' : this.state._id
        }
        //console.log("handle edit", data)
        editAPICall(data)
        .then((data) => {
            //console.log("after edit", data.sketch);
            this.setState({redirect : true})
        })

    }
    render() {
        const { _id,  base64, name } = this.state;
       
        return (
            <Card key = {_id}>
                <Row >
                    <Col sm={{size : 3, offset : 1}}> <img src={base64} style={{ width: '100%', marginTop : "20px" }} alt = "img"></img></Col>
                    <Col sm="6" >
                        <div style = {{fontSize : '25px', marginTop : '2%', paddingLeft : '4%'}}>
                        {name}
                        </div>
                        <br></br>
                        <Button
                                className="login-button"
                                style={{
                                    backgroundColor: '#403368',
                                    color: '#fff',
                                    margin : 15+'px',
                                    marginTop: "2%",
                                    height : '50px',
                                    fontSize : '18px',
                                    width : '50%',
                                    // borderRadius : '25px'
                                }}
                                onClick={()=>{window.location.href=`/edit/${_id}`}}
                            >Edit</Button>
                    </Col>
                </Row>
            </Card>

        )
    }

}

export default SketchPreview;