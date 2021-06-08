import { useContext } from 'react';
import { GameContext } from '../../contexts/useGameContext';

const useHandsController = () => {
  const { gameState } = useContext(GameContext);
  const { winner, handsData, scores } = gameState;

  const { id: winnerId } = winner || {};

  return {
    winnerId,
    handsData,
    scores,
  };
};

export default useHandsController;
