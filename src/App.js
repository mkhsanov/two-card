import React from 'react';
import Hands from './components/Hands';
import Menu from './components/Menu';
import { useAppController } from './useAppController';
import { GameContext } from './contexts/useGameContext';

import styles from './App.module.css';
import Title from './components/Title';

function App() {
  const { gameContextData, handsNumber, winnerId } = useAppController();

  return (
    <GameContext.Provider value={gameContextData}>
      <Title
        left={<span>Number of Hands: {handsNumber}</span>}
        right={<span>{typeof winnerId === 'number' ? `Winner: Player #${winnerId}` : `No Winner`}</span>}
      />
      <main className={styles.hands}>
        <Hands />
      </main>
      <footer className={styles.controls}>
        <Menu />
      </footer>
    </GameContext.Provider>
  );
}

export default App;
