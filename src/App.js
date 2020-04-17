import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Routes from './Routes';

class App extends Component {

  constructor() {
    super();

    this.state = {
      isAuthenticated: false,
      hasError: false,
      createSuccess: false,
    }

  }

  // componentDidMount() {
  //   if(localStorage.getItem('user')) {
  //     this.setState.isAuthenticated = true;
  //   }
  // }

  render() {
    let childProps = {
      isAuthenticated: this.props.user.isAuthenticated
    }
    if(localStorage.getItem('user')){
      childProps = {isAuthenticated: true}
    }  
    return (
      <div className="white font" style={{ height: '100%'}}>
         <Routes childProps={childProps}/>
      </div>
    )  
  }  
}  

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(App))
