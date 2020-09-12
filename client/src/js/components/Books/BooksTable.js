import React from 'react';
import { useValues, useActions } from 'kea';
import { logic } from '../../kea/Books/logic';

const BooksTable = () => {
  const { isLoading, sortedBooks } = useValues(logic);
  const { editBook, removeBook } = useActions(logic);

  return isLoading ? (
    <div>Loading...</div>
  ) : !sortedBooks.length ? (
    <div>Books not available!!!!</div>
  ) : (
    <table>
      <BooksHead />
      <BooksData books={sortedBooks} onRemove={removeBook} onEdit={editBook} />
    </table>
  );
};

export default BooksTable;

const BooksHead = () => (
  <thead className="thead-light">
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Author</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
);

const BooksData = ({ books, onEdit, onRemove }) => (
  <tbody>
    {books.map((book, i) => (
      <tr key={book._id}>
        <td>{book._id}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>
          <button type="button" onClick={() => onEdit(book._id)}>
            Edit
          </button>
        </td>
        <td>
          <button type="button" onClick={() => onRemove(book._id)}>
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
);
