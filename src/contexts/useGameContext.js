import { createContext, useReducer, useCallback, useEffect } from 'react';
import { DEFAULT_CARDS_NUMBER, MAX_HANDS_NUMBER, MIN_HANDS_NUMBER } from '../constants';
import useCards from '../hooks/useCards';

export const GameContext = createContext();

export const useGameContext = () => {
  const INITIAL_STATE = {
    handsNumber: MIN_HANDS_NUMBER,
    cardsPerHandNumber: DEFAULT_CARDS_NUMBER,
    handsData: [],
    scores: null,
    winner: null,
  };

  const ACTIONS = {
    SET_HANDS_NUMBER: 'SET_HANDS_NUMBER',
    SET_WINNER: 'SET_WINNER',
    SET_SCORES: 'SET_SCORES',
    DEAL_CARDS: 'DEAL_CARDS',
  };

  function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTIONS.SET_HANDS_NUMBER:
        return { ...state, handsNumber: payload, handsData: [] };
      case ACTIONS.DEAL_CARDS:
        return { ...state, handsData: payload };
      case ACTIONS.SET_WINNER:
        return { ...state, winner: payload };
      case ACTIONS.SET_SCORES:
        return { ...state, scores: payload };
      default:
        throw new Error();
    }
  }

  const [gameState, dispatch] = useReducer(reducer, INITIAL_STATE);

  const { handsNumber, cardsPerHandNumber } = gameState;
  const { dealtCards, scores, winnerData, refreshCards } = useCards(cardsPerHandNumber, handsNumber);

  const dealCards = useCallback(refreshCards, [refreshCards]);

  const addPlayer = useCallback(() => {
    const newAmount = handsNumber + 1;
    if (newAmount > MAX_HANDS_NUMBER) return;
    dispatch({ type: ACTIONS.SET_HANDS_NUMBER, payload: newAmount });
    refreshCards();
  }, [handsNumber, refreshCards]);

  const removePlayer = useCallback(() => {
    const newAmount = handsNumber - 1;
    if (newAmount < MIN_HANDS_NUMBER) return;
    dispatch({ type: ACTIONS.SET_HANDS_NUMBER, payload: newAmount });
    refreshCards();
  }, [handsNumber, refreshCards]);

  useEffect(() => {
    dispatch({ type: ACTIONS.DEAL_CARDS, payload: dealtCards });
  }, [dealtCards]);

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_SCORES, payload: scores });
  }, [scores]);

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_WINNER, payload: winnerData });
  }, [winnerData]);

  return {
    gameState,
    gameActions: {
      dealCards,
      removePlayer,
      addPlayer,
    },
  };
};
