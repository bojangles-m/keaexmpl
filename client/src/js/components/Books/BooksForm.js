import React from 'react';
import { useValues, useActions } from 'kea';
import { logic } from '../../kea/Books/logic';

const BooksForm = () => {
  const { id, error, title, author } = useValues(logic);
  const {
    updateBook,
    setBookTitle,
    setBookAuthor,
    saveBook,
    clearForm,
  } = useActions(logic);

  return (
    <form
      name="BooksForm"
      onSubmit={e => {
        e.preventDefault();
        id ? updateBook(id) : saveBook();
      }}>
      <div className="row">
        <div className="group col">
          <label className="form-label">Title: </label>
          <input
            name="title"
            placeholder="Enter Title"
            type="text"
            className="form-control"
            value={title}
            onChange={e => setBookTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="group col">
          <label className="form-label">Author: </label>
          <input
            name="author"
            placeholder="Enter Author"
            type="text"
            className="form-control"
            value={author}
            onChange={e => setBookAuthor(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => clearForm()}>
          Clear
        </button>
      </div>
      <div>{error}</div>
    </form>
  );
};

export default BooksForm;
