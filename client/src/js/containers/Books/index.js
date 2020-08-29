import React, { Component } from 'react';
import { BooksForm, BooksTable } from 'components/Books';

export default class Books extends Component {
  render() {
    return (
      <div className="books">
        <h1>Simple Book Store</h1>
        <h3>Enter New Book</h3>
        <BooksForm />
        <h3>Listed books</h3>
        <BooksTable />
      </div>
    );
  }
}
