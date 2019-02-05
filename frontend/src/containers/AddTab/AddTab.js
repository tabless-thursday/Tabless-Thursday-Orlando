import React, { Component } from 'react'

import AddTabForm from '../../components/AddTab/AddTabForm/AddTabForm';

import './AddTab.scss';


export class AddTab extends Component {
  render() {
    return (
      <div className="AddTabContainer">
        <h1>Add A New Tab! 🥳</h1>
        <AddTabForm />
      </div>
    )
  }
}

export default AddTab
