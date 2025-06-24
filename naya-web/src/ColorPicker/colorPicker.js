import React from 'react'
import { ChromePicker } from 'react-color'

class ButtonColorPicker extends React.Component {
    constructor() {
        super();
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.state = {
          data: ''
        };
    }
  state = {
    displayColorPicker: false,
    background: '#fff'
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    this.props.handleColorfromParent(color.hex);
  };

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
      left: '400px',
      top : '-0px'
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    return (
      <div>
        <button style = {{height : '50px', borderRadius : '25px', border : 'grey 3px', width : '100%', margin : '15px', background : this.state.background, boxShadow: '2px 2px 5px grey', fontSize : '25px', color : "grey"}}
        onClick={ this.handleClick }>Your Favourite Color?</button>
        { this.state.displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handleClose }/>
          <ChromePicker 
          color={ this.state.background }
          onChangeComplete={ this.handleChangeComplete }
          />
        </div> : null }
      </div>
    )
  }
}

export default ButtonColorPicker;