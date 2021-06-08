import React, { memo } from 'react';
import styles from './styles.module.css';
import Card from './Card';

function Cards({ data, isWinner, scores }) {
  return (
    <ul className={`${styles.cards} ${isWinner ? styles.winnerCards : null}`}>
      {data.map(({ id, value }) => {
        return (
          <li key={id} className={styles.cardContainer}>
            <Card data={value} scores={scores} />
          </li>
        );
      })}
    </ul>
  );
}

export default memo(Cards);
