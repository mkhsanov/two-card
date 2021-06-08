import React, { memo } from 'react';
import styles from './styles.module.css';

function Title({ left, right }) {
  return (
    <h1 className={styles.title}>
      {left}
      {right}
    </h1>
  );
}

export default memo(Title);
