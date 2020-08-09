import React, { Component } from 'react';
class Child extends Component {
  handle() {
    var a = 1
    a()
  }
  render() { 
    if (1) {
      throw new Error('a is not defined')
    }
    return <p onClick={ this.handle }>Hello World</p>
  }
}
 
export default Child;