import CategoryType from "../types/Category";
import CardType from "../types/Card";

export const loadCardsSet = function (
  category: CategoryType,
  cardsNumber: number
): CardType[] {
  const cardsSet: CardType[] = [];
  const cards = [...category.cards];
  cardsNumber = (cardsNumber - 1) / 2;

  cards.sort(function () {
    return 0.5 - Math.random();
  });

  let count = 0;
  let id = 0;
  for (var i in cards) {
    if (count < cardsNumber) {
      const card = cards[i];
      id++;
      cardsSet.push({ ...card, id });
      id++;
      cardsSet.push({ ...card, id });
      count++;
    } else if (count == cardsNumber) {
      const card = cards[i];
      id++;
      count++;
      cardsSet.push({ ...card, id });
    }
  }

  return cardsSet.sort(function () {
    return 0.5 - Math.random();
  });
};

export default loadCardsSet;
