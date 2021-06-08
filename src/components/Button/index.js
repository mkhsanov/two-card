import React, { memo } from 'react';
import styles from './styles.module.css';

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}

export default memo(Button);
