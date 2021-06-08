import { useCallback, useMemo, useState } from 'react';

const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS = ['heart', 'diamond', 'spade', 'club'];
const NUMBER_OF_WINNERS = 1;

const useCards = (cardsPerHandNumber, handsNumber) => {
  const buildDeck = useCallback((values, suits) => {
    const cards = [];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++) {
        const value = values[j];
        const suit = suits[i];
        cards.push({ id: value + suit, value, suit });
      }
    }
    return cards;
  }, []);

  const [deck, setDeck] = useState(buildDeck(VALUES, SUITS));

  const refreshCards = useCallback(() => {
    setDeck(buildDeck(VALUES, SUITS));
  }, [buildDeck]);

  const getDeckGenerator = useCallback((deck) => {
    function* cardGenerator() {
      while (deck.length > 0) {
        const random = Math.floor(Math.random() * deck.length);
        yield deck.splice(random, 1)[0];
      }
      return deck[0];
    }
    return cardGenerator();
  }, []);

  const getCardsPerHand = useCallback((number, generator) => {
    const result = [];
    for (let i = 0; i < number; i++) {
      const value = generator.next();
      if (value.done) break;
      result.push({ id: i, value });
    }
    return result;
  }, []);

  const getNonUniqueCards = useCallback((cards) => {
    const map = new Map();
    cards.forEach((card) => {
      const key = card.value.value.value;
      return map.set(key, (map.get(key) || 0) + 1);
    });
    return cards.filter((card) => {
      const key = card.value.value.value;
      return map.get(key) > 1;
    });
  }, []);

  const getPairScores = useCallback((cards) => {
    return cards.reduce((acc, card) => {
      const {
        value: {
          value: { value },
        },
      } = card;
      if (!acc[value]) {
        acc[value] = 0;
      }
      acc[value] = acc[value] + VALUES.indexOf(value);
      return acc;
    }, {});
  }, []);

  const dealtCards = useMemo(() => {
    const generator = getDeckGenerator(deck);
    const result = [];
    for (let i = 0; i < handsNumber; i++) {
      result.push({ id: i, value: getCardsPerHand(cardsPerHandNumber, generator) });
    }
    return result;
  }, [getDeckGenerator, getCardsPerHand, deck, cardsPerHandNumber, handsNumber]);

  const scores = useMemo(() => {
    return dealtCards.map(({ id, value }) => {
      const nonUniqueCards = getNonUniqueCards(value);
      const pairs = getPairScores(nonUniqueCards);
      return {
        id,
        pairs,
      };
    });
  }, [getNonUniqueCards, getPairScores, dealtCards]);

  const getPairMaxValue = useCallback((current) => {
    return Object.entries(current.pairs).reduce(
      (acc, [key, amount]) => {
        if (amount > acc.amount) {
          acc.amount = amount;
          acc.value = key;
        }
        return acc;
      },
      {
        amount: 0,
        value: null,
      }
    );
  }, []);

  const winnerData = useMemo(() => {
    const noWinner = {
      id: null,
      value: null,
      amount: 0,
    };

    const maxValueHand = scores.reduce(
      (prev, current) => {
        const pairMaxValue = getPairMaxValue(current);
        const { amount: maxAmount } = pairMaxValue;
        const { amount: prevAmount } = prev;
        if (maxAmount > prevAmount) {
          prev = {
            ...current,
            ...pairMaxValue,
          };
        }
        return prev;
      },
      { ...noWinner }
    );

    const numberOfEqualMaxValues = scores.reduce((acc, score) => {
      const pairObject = score.pairs[maxValueHand.value];
      if (maxValueHand.value && pairObject) {
        acc++;
      }
      return acc;
    }, 0);

    if (numberOfEqualMaxValues > NUMBER_OF_WINNERS) {
      return noWinner;
    }
    return maxValueHand;
  }, [scores, getPairMaxValue]);

  return {
    dealtCards,
    scores,
    winnerData,
    refreshCards,
  };
};

export default useCards;
