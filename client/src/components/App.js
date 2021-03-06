import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../App.css';
import 'ant-design-pro/dist/ant-design-pro.css';

import HeaderBar from './HeaderBar';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import Projects from './Projects';
import ClosedProjects from './ClosedProjects';
import ProjectDetails from './ProjectDetails';
import NewProjectForm from './NewProjectForm';
import ConfirmationScreen from './ConfirmationScreen';
import HelpScreen from './HelpScreen';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser(); // fetchUser declared in actions
  }

  render() {
    return (
      <HashRouter>
        <Layout>
          <HeaderBar />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/signup" component={SignupScreen} />
          <Route exact path="/" component={Projects} />
          <Route exact path="/closed" component={ClosedProjects} />
          <Route exact path="/project/:id" component={ProjectDetails} />
          <Route exact path="/new/project" component={NewProjectForm} />
          <Route exact path="/confirmation" component={ConfirmationScreen} />
          <Route exact path="/help" component={HelpScreen} />
        </Layout>
      </HashRouter>
    );
  }
}

export default connect(null, actions)(App);
