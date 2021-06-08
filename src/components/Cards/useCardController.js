import { useMemo } from 'react';

const useCardController = ({
  data: {
    value: { suit, value: rank },
  },
  scores,
}) => {
  const colors = useMemo(() => {
    return Object.keys(scores.pairs).reduce((colors, pair, index) => {
      if (!colors[pair]) {
        colors[pair] = index;
      }
      return colors;
    }, {});
  }, [scores]);

  const url = useMemo(() => {
    return `http://h3h.net/images/cards/${suit}_${rank}.svg`;
  }, [suit, rank]);
  const color = colors[rank];

  return {
    url,
    rank,
    color,
  };
};

export default useCardController;
