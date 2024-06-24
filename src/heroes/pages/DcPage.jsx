import React from 'react'
import { HeroList } from '../components';

export const DcPage = () => {
  return (
    <>
      <h1>Dc Heroes</h1>
      <HeroList publisher={"DC Comics"} />
    </>
  );
}
