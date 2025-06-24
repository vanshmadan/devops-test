import React from 'react';
import { Button, Input, Container, Row, Col } from 'reactstrap';
import { SketchField, Tools } from 'react-sketch';
import Dropzone from 'react-dropzone';
import { metadataAPICall } from '../api';
import SketchEditors from '../SketchEditors/sketchEditors';
// import UndoIcon from '@material-ui/icons/Undo';

class Sketch extends React.Component {


    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };


    }

    componentDidMount() {
        this.getUserColor();
    }
    state = {
        tool: Tools.Pencil,
        lineColor: '',
        lineWidth: '',
        fillColor: '',
        backgroundColor: '',
        canUndo: false,
        canRedo: false,
        drawings: [],
        blobURL: '',
        name: '',
        saveImg: '',
        users: [],
        imageUrl: '',
        text: ''
    }

    getUserColor = () => {
        const storage = JSON.parse(sessionStorage.getItem("token"))
        //console.log("getUserColor", storage.color);
        this.setState({ color: storage.color });
    }
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    _undo = () => {
        this._sketch.undo();
        this.setState({
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo(),
        });
    };
    _selectTool = event => {
        this.setState({
            tool: event.target.value
        });
        //console.log(this.state.tool);
    };

    _redo = () => {
        this._sketch.redo();
        this.setState({
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo(),
        });
    };

    _onSketchChange = () => {
        let prev = this.state.canUndo;
        let now = this._sketch.canUndo();
        if (prev !== now) {
            this.setState({ canUndo: now });
        }
    };

    _clear = () => {
        this._sketch.clear();
        this._sketch.setBackgroundFromDataUrl('');
        this.setState({
            controlledValue: null,
            backgroundColor: 'transparent',
            fillWithBackgroundColor: false,
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo(),
        });
    };

    _onBackgroundImageDrop = (accepted /*, rejected*/) => {
        if (accepted && accepted.length > 0) {
            let reader = new FileReader();
            reader.addEventListener(
                'load',
                () =>
                    this._sketch.addImg(reader.result),
                false,
            );
            reader.readAsDataURL(accepted[0]);
        }
    };

    _addText = () => {
        this._sketch.addText(this.state.text);

    };

handleSketchName = (e) => {
    this.setState({ name: e.target.value });
    //console.log("SketchName", e.target.value);
}
_save = () => {
    this.setState({ saveImg: this._sketch.toDataURL() }, () => {
        const data = {
            'base64': this.state.saveImg,
            'name': this.state.name,
            "userId": JSON.parse(sessionStorage.getItem("token"))._id
        }

        metadataAPICall(data)
            .then(res => {
                //console.log("res from metadata", res);
                const userData = {
                    sketchId: res._id,
                    userId: JSON.parse(sessionStorage.getItem("token"))._id
                }
                //console.log("userData:", userData);
                window.location.href=`/explore`
            })
    });
};

render() {
    const users = this.state.users;
    return (
        <Container style={{ marginRight: '0px', marginLeft: '10%' }}>

            <h3><center>Collaboration Board</center></h3>


            <Row style={{ marginTop: '15px' }}>
                <Col sm={{ size: 10, }}>
                    <SketchField
                        // tool={Tools.Rectangle}
                        lineColor={this.state.color}
                        lineWidth={3}
                        ref={c => (this._sketch = c)}
                        onChange={this._onSketchChange}

                        style={{ boxShadow: '4px 4px 4px 5px grey' }}
                        tool={this.state.tool} />
                </Col>
                <Col sm={{ size: 2 }}>
                    <Row>
                        <Input placeholder="Sketch Name" onChange={this.handleSketchName}></Input>
                    </Row>
                    <Row style={{ marginTop: '20px' }}>
                        <Col>
                            <Button outline color="secondary"
                                disabled={!this.state.canUndo}
                                onClick={this._undo} style={{ margin: 'auto' }}
                            >Undo</Button>
                        </Col>
                        <Col>
                            <Button outline color="secondary"
                                disabled={!this.state.canRedo}
                                onClick={this._redo}
                            >Redo</Button>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '20px' }}>

                        <Col >
                            <Button outline color="secondary"
                                onClick={this._clear}
                            >Clear</Button>
                        </Col>

                        <Col>
                            <Button outline color="secondary"
                                onClick={this._save}>Save</Button>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '20px', marginLeft: '2%' }}>
                        <select onChange={this._selectTool.bind(this)} value={this.state.value} style={{ width: '90%' }}>
                            <option value={Tools.Pencil} key="Pencil">Pencil</option>
                            <option value={Tools.Line} key="Line">Line</option>
                            <option value={Tools.Rectangle} key="Rectangle">Rectangle</option>
                            <option value={Tools.Circle} key="Circle">Circle</option>
                            <option value={Tools.Select} key="Select">Select</option>
                        </select>
                    </Row>

                    <Row style={{ marginTop: '20px', marginLeft: '1%', background: '#e6ede8' }}>
                        <Dropzone onDrop={this._onBackgroundImageDrop} style={{ borderStyle: 'solid', backgroundColor: '#eee', boxShadow: '4px 4px 4px 5px grey' }}>
                            {({ getRootProps, getInputProps }) => (
                                <section className="container">
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop or click to upload images</p>
                                    </div>

                                </section>
                            )}
                        </Dropzone>
                    </Row>
                    <Input
                        label='Text'
                        onChange={(e) => this.setState({ text: e.target.value })}
                        value={this.state.text} 
                        style = {{marginTop : "10px"}}/>
                    <button
                        color="primary"
                        onClick={this._addText}
                        style = {{marginTop : "10px"}}> Add Text
                    </button>
                    <Row>
                        <Col>                            {
                            users != null && users.map((user, index) => (
                                <Row style={{ marginTop: "20px", marginLeft: '20px' }} key = {index}>
                                    <SketchEditors key={user._id} name={user.username} color={user.color} ></SketchEditors>
                                </Row>
                            ))
                        }
                        </Col>

                    </Row>
                </Col>
            </Row>



        </Container >

    )
}
}

export default Sketch;
