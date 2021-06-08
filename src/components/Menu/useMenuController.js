import { useContext, useMemo } from 'react';
import { GameContext } from '../../contexts/useGameContext';

const BUTTON_LABELS = {
  PLAY_GAME: {
    id: 0,
    label: 'Play Game',
  },
  ADD_HAND: {
    id: 1,
    label: 'Add Hand',
  },
  REMOVE_HAND: {
    id: 2,
    label: 'Remove Hand',
  },
};

export const useMenuController = () => {
  const { gameActions } = useContext(GameContext);
  const { dealCards, removePlayer, addPlayer } = gameActions;

  const menuData = useMemo(
    () => [
      {
        id: BUTTON_LABELS.PLAY_GAME.id,
        value: {
          label: BUTTON_LABELS.PLAY_GAME.label,
          onClickHandler: dealCards,
        },
      },
      {
        id: BUTTON_LABELS.ADD_HAND.id,
        value: {
          label: BUTTON_LABELS.ADD_HAND.label,
          onClickHandler: addPlayer,
        },
      },
      {
        id: BUTTON_LABELS.REMOVE_HAND.id,
        value: {
          label: BUTTON_LABELS.REMOVE_HAND.label,
          onClickHandler: removePlayer,
        },
      },
    ],
    [dealCards, addPlayer, removePlayer]
  );

  return {
    menuData,
  };
};
