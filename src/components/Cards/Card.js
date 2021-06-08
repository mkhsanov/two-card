import React, { memo } from 'react';
import useCardController from './useCardController';
import styles from './styles.module.css';

function Card(props) {
  const { color, url } = useCardController(props);
  return <img alt="Card" src={url} className={`${styles.card} ${styles[`color${color}`]}`} />;
}

export default memo(Card);
