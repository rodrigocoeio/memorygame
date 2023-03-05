export const loadCardsSet = function (category: any, cardsNumber: number) {
  const cardsSet = [];
  let count = 0;
  const cards: any[] = [];
  cardsNumber = (cardsNumber - 1) / 2;

  for (const i in category.cards) {
    cards.push(category.cards[i]);
  }

  cards.sort(function () {
    return 0.5 - Math.random();
  });

  if (cards) {
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
        card.id = id;
        count++;
        cardsSet.push({ ...card });
      }
    }
  }

  return cardsSet.sort(function () {
    return 0.5 - Math.random();
  });
};

export default loadCardsSet;
