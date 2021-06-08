import React, { memo } from 'react';
import Button from '../Button';

function MenuItem({ value: { label, onClickHandler } }) {
  return (
    <li>
      <Button onClick={onClickHandler}>{label}</Button>
    </li>
  );
}

export default memo(MenuItem);
