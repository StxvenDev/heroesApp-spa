import { heroes } from "../data/heroes";

export const getHeroesByPublisher = (publisher) => {
  const validPublisher = ['DC Comics','Marvel Comics'];
  if(!validPublisher.includes(publisher)){
    throw new Error('Este publisher no esta en nuestro catalogo');
  }
  return heroes.filter(hero => hero.publisher === publisher);
}
