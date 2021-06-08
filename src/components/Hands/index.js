import React, { memo } from 'react';
import styles from './styles.module.css';
import useHandsController from './useHandsController';
import Cards from '../Cards';

function Hands() {
  const data = useHandsController();
  const { handsData, winnerId, scores } = data;

  return (
    <ul className={styles.hands}>
      {handsData.map(({ id, value }, index) => {
        const isWinner = winnerId === id;
        const currentHandDuplications = scores[index];
        return (
          <li key={id}>
            <Cards isWinner={isWinner} data={value} scores={currentHandDuplications} />
          </li>
        );
      })}
    </ul>
  );
}

export default memo(Hands);
