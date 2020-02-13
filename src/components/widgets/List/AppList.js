import React from 'react';
import './AppList.scss';
import ListItem from '../ListItem/ListItem';

const AppList = ({ list, headers, inlineAction, onClick, testId }) => {
  const getHeaders = () => {
    return (
      <thead>
        <tr>
          {headers.map(({ key, displayText }) => (
            <th key={key}>{displayText}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const getContent = () => (
    <tbody>
      {list.map((item, index) => (
        <ListItem
          item={item}
          headers={headers}
          inlineAction={inlineAction}
          onClick={onClick}
          key={index}
          testId={testId}
        />
      ))}
    </tbody>
  );

  if (!list || list.length === 0) {
    return (
      <div data-testid="noData" className="noData">
        No data found
      </div>
    );
  }

  return (
    <table className="ui striped padded compact table">
      {getHeaders()}
      {getContent()}
    </table>
  );
};

export default AppList;
