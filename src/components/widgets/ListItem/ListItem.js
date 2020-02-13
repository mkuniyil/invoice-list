import React from 'react';
import './ListItem.scss';
import ActionButtons from '../ActionButtons/ActionButtons';

const ListItem = ({ item, inlineAction, onClick, key, testId }) => {
  const keys = Object.keys(item);

  return (
    <tr onClick={() => onClick && onClick(item)} key={key} data-testid={testId}>
      {keys.map((key) => (
        <td key={key}>{item[key]}</td>
      ))}
      {!inlineAction && <ActionButtons id={item.id} />}
    </tr>
  );
};

export default ListItem;
