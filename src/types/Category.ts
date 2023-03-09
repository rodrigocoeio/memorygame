type Card = {
  name: string;
  category: string;
  image: string;
  audio: string;
};

type Category = {
  name: string;
  cards: Card[];
};

export default Category;
