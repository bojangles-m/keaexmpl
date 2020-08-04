import React, { Component } from 'react';
import { GithubForm, GithubData } from '../../components/Github';

export default class Github extends Component {
  render() {
    return (
      <div>
        <h1>Search for a github user</h1>
        <GithubForm />
        <GithubData />
      </div>
    );
  }
}
