import React from 'react';
import { Button, Input, Container, Row, Col} from 'reactstrap';
import { SketchField, Tools } from 'react-sketch';
import Dropzone from 'react-dropzone';
import { editAPICall, updateSketchAPICall } from '../api';
import SketchEditors from '../SketchEditors/sketchEditors';
import io from 'socket.io-client'

class Edit extends React.Component {
    timeout;
    root = this;
    socket = io.connect("https://nayatest3.herokuapp.com/");

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
        text: ''

    }

    constructor(props) {
        super(props);
        //console.log("mita")
    }

    componentDidMount() {

        this.getUserColor();
        const data = {
            'sketchId': this.props.match.params.sketchId
        }
        //console.log("handle edit", data)
        editAPICall(data)
            .then((res) => {
                //console.log("after edit userId", res.sketch);
                this.setState({ users: res.sketch.userId, name: res.sketch.name });
                //console.log("after setState userId", this.state.users[0]);
                this._sketch.setBackgroundFromDataUrl(res.sketch.base64);
            })
        this.socket.on('canvas-data', (data) => {
            //console.log("hello")
            // this.socket.emit('canvas-data', data, ()=>{
            //     //console.log("emitting")
            // });
            this._sketch.setBackgroundFromDataUrl(data);   //maybe imp
        });



    }

    handleSketchName = (e) => {
        this.setState({ name: e.target.value });
        //console.log("SketchName", e.target.value);
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
        // this._sketch.undo();
        this.setState({
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo(),
        });
        this.root.timeout = setTimeout((data) => {
            //console.log("in TImeout")
            this._sketch.undo();
            var base64URL = this._sketch.toDataURL();
            this.root.socket.emit('canvas-data', base64URL);

        }, 200)
    };
    _selectTool = event => {
        this.setState({
            tool: event.target.value
        });
        //console.log(this.state.tool);
    };

    _redo = () => {
        // this._sketch.redo();
        this.setState({
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo(),
        });

        this.root.timeout = setTimeout((data) => {
            //console.log("in TImeout")
            this._sketch.redo();
            var base64URL = this._sketch.toDataURL();
            this.root.socket.emit('canvas-data', base64URL);

        }, 200)
    };

    _addText = () => {
        this.root.timeout = setTimeout((data) => {
            //console.log("in TImeout")
            this._sketch.addText(this.state.text);
            var base64URL = this._sketch.toDataURL();
            this.root.socket.emit('canvas-data', base64URL);

        }, 200)};

    _onSketchChange = () => {
        let prev = this.state.canUndo;
        let now = this._sketch.canUndo();
        if (prev !== now) {
            this.setState({ canUndo: now });
        }
        //console.log("Sketch changed")
        // this.socket.emit("canvas-data", this._sketch.toDataURL())

        this.root.timeout = setTimeout((data) => {
            var base64URL = this._sketch.toDataURL();
            this.root.socket.emit('canvas-data', base64URL);
        }, 200)

    };

    _clear = () => {
        // this._sketch.clear();
        this._sketch.setBackgroundFromDataUrl('');
        this.setState({
            controlledValue: null,
            backgroundColor: 'transparent',
            fillWithBackgroundColor: false,
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo(),
        });

        this.root.timeout = setTimeout((data) => {
            //console.log("in TImeout")
            this._sketch.clear();
            var base64URL = this._sketch.toDataURL();
            this.root.socket.emit('canvas-data', base64URL);

        }, 200)
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

    _save = () => {
        this.setState({ saveImg: this._sketch.toDataURL() }, () => {
            const storage = JSON.parse(sessionStorage.getItem("token"));
            const data = {
                'base64': this.state.saveImg,
                'name': this.state.name,
                "sketchId": this.props.match.params.sketchId,
                "userId": storage._id

            }
            updateSketchAPICall(data)
                .then(async (res) => {
                    //console.log("edit res from metadataAPI", res);

                    const userData = {
                        sketchId: res._id,
                        userId: storage._id
                    }
                    //console.log("userData:", userData);
                    window.location.href=`/explore`
                })
               
        });
        
    }
    render() {
        const users = this.state.users;
        //console.log("before render", this.state.users[0]);
        //console.log("before render 2", this.state.users);
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
                            <Input placeholder={this.state.name} value={this.state.name} style={{ width: "85%", marginLeft: "15px" }} onChange={this.handleSketchName}></Input>
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
                                            <p>Drag 'n' drop some files here, or click to select files</p>
                                        </div>

                                    </section>
                                )}
                            </Dropzone>
                        </Row>
                        <Input
                            label='Text'
                            onChange={(e) => this.setState({ text: e.target.value })}
                            value={this.state.text}
                            style={{ marginTop: "10px" }} />
                        <button
                            color="primary"
                            onClick={this._addText}
                            style={{ marginTop: "10px" }}> Add Text
                    </button>

                        <Row>
                            <Col> {
                                users.map((user, index) => (
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

export default Edit;