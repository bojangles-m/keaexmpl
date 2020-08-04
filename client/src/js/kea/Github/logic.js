import { kea } from 'kea';
import axios from 'axios';

export const logic = kea({
  actions: {
    setUsername: username => ({ username }),
    setRepositories: repositories => ({ repositories }),
    setFetchError: error => ({ error }),
  },

  reducers: {
    username: [
      'keajs',
      {
        setUsername: (_, payload) => payload.username,
      },
    ],
    repositories: [
      [],
      {
        setUsername: () => [],
        setRepositories: (_, { repositories }) => repositories,
      },
    ],
    isLoading: [
      false,
      {
        setUsername: () => true,
        setRepositories: () => false,
        setFetchError: () => false,
      },
    ],
    error: [
      null,
      {
        setUsername: () => null,
        setFetchError: (_, { error }) => error,
      },
    ],
  },

  listeners: ({ actions }) => ({
    setUsername: async ({ username }, breakpoint) => {
      await breakpoint(400); // 👈 debounce for 400ms

      const url = `${__ENV__.API_GITHUB_URL}/users/${username}/repos`;

      // 👈 handle network errors
      let response;
      try {
        response = await axios.get(url);
      } catch (error) {
        // actions.setFetchError(error.message);
        actions.setFetchError('Not found');
        return;
      }

      // break if action was dispatched again while we were fetching
      breakpoint(); // 👈

      const json = await response.data;

      if (response.status === 200) {
        actions.setRepositories(json);
      } else {
        actions.setFetchError(json.message);
      }
    },
  }),

  events: ({ actions, values }) => ({
    afterMount: () => {
      actions.setUsername(values.username);
    },
  }),

  selectors: {
    sortedRepositories: [
      selectors => [selectors.repositories],
      repositories => {
        return [...repositories].sort(
          (a, b) => b.stargazers_count - a.stargazers_count,
        );
      },
    ],
  },
});
