import { kea } from 'kea';
import request from '../../lib/request';

export const logic = kea({
  actions: {
    setBookId: id => ({ id }),
    setBookTitle: title => ({ title }),
    setBookAuthor: author => ({ author }),
    clearForm: true,

    loadBooks: true,
    setBooks: books => ({ books }),

    saveBook: true,
    editBook: i => ({ i }),
    updateBook: id => ({ id }),
    removeBook: i => ({ i }),

    setFetchError: error => ({ error }),
  },

  reducers: {
    books: [
      [],
      {
        setBooks: (_, { books }) => books,
      },
    ],
    id: [
      '',
      {
        setBookId: (_, { id }) => id,
        clearForm: _ => '',
      },
    ],
    title: [
      '',
      {
        setBookTitle: (_, { title }) => title,
        clearForm: _ => '',
      },
    ],
    author: [
      '',
      {
        setBookAuthor: (_, { author }) => author,
        clearForm: _ => '',
      },
    ],
    isLoading: [
      false,
      {
        loadBooks: () => true,
        setBooks: () => false,
      },
    ],
    error: [
      null,
      {
        saveBook: () => null,
        setFetchError: (_, { error }) => error,
      },
    ],
  },

  selectors: {
    sortedBooks: [
      selectors => [selectors.books],
      books => [...books].sort((a, b) => b.title - a.title),
    ],
  },

  listeners: ({ actions, values }) => ({
    saveBook: async () => {
      if (!values.title || !values.author) {
        actions.setFetchError('Both fields are required!');
        return;
      }

      const data = { title: values.title, author: values.author };

      try {
        await request.post('/books', data);

        actions.clearForm();
        actions.loadBooks();
      } catch (error) {
        actions.setFetchError(error.message);
      }
    },

    updateBook: async ({ id }) => {
      const data = { title: values.title, author: values.author };

      try {
        await request.patch(`/books/${id}`, data);

        actions.clearForm();
        actions.loadBooks();
      } catch (error) {
        actions.setFetchError(error.message);
      }
    },

    loadBooks: async () => {
      try {
        const res = await request.get('/books');

        actions.setBooks(res.data.data);
      } catch (error) {
        actions.setFetchError(error.message);
      }
    },

    editBook: ({ i }) => {
      const { _id, title, author } = values.books[i];
      actions.setBookTitle(title);
      actions.setBookAuthor(author);
      actions.setBookId(_id);
    },

    removeBook: async ({ i }) => {
      const books = [...values.books];

      try {
        await request.del(`/books/${books[i]._id}`);

        actions.loadBooks();
      } catch (error) {
        actions.setFetchError(error.message);
      }
    },
  }),

  events: ({ actions }) => ({
    afterMount: () => {
      actions.loadBooks();
    },
  }),
});
