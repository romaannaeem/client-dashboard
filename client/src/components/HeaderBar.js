import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link, Redirect } from 'react-router-dom';
import { Menu, Layout } from 'antd';

const { Header } = Layout;

class HeaderBar extends Component {
  renderContent = () => {
    switch (this.props.auth) {
      case null:
        return;
      case '':
        return <Redirect to="/login" />;
      default:
        return (
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <span>
                My Projects
                <Link to="/" />
              </span>
            </Menu.Item>
            <Menu.Item key="2">
              <span>
                Closed Projects
                <Link to="/closed" />
              </span>
            </Menu.Item>
            <Menu.Item key="3">
              <span>
                Make a Request
                <Link to="/new/project" />
              </span>
            </Menu.Item>
            <Menu.Item key="4">
              <span>
                Usage Guide
                <Link to="/help" />
              </span>
            </Menu.Item>
            <Menu.Item key="5" onClick={() => this.props.logoutUser()}>
              Log Out
            </Menu.Item>
          </Menu>
        );
    }
  };

  render() {
    return (
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        {this.renderContent()}
      </Header>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps, actions)(HeaderBar);
