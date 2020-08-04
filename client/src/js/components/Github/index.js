import React from 'react';
import { useActions, useValues } from 'kea';
import { logic } from '../../kea/Github/logic';

export const GithubForm = () => {
  const { username } = useValues(logic);
  const { setUsername } = useActions(logic);

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        value={username}
        type="text"
        onChange={e => setUsername(e.target.value)}
      />
    </div>
  );
};

export const GithubData = () => {
  const { username, isLoading, sortedRepositories, error } = useValues(logic);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : sortedRepositories.length > 0 ? (
        <div>
          Found {sortedRepositories.length} repositories for user {username}!
          {sortedRepositories.map(repo => (
            <div key={repo.id}>
              <a href={repo.html_url} target="_blank">
                {repo.full_name}
              </a>
              {' - '}
              {repo.stargazers_count} stars, {repo.forks} forks.
            </div>
          ))}
        </div>
      ) : (
        <div>{error ? `Error: ${error}` : 'No repositories found'}</div>
      )}
    </div>
  );
};
