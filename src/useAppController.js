import { useGameContext } from './contexts/useGameContext';

export const useAppController = () => {
  const gameContextData = useGameContext();

  const { gameState } = gameContextData;
  const { winner, handsNumber } = gameState;
  const { id } = winner || {};
  return {
    gameContextData,
    handsNumber,
    winnerId: id,
  };
};
