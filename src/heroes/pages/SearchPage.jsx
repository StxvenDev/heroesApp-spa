import React from 'react'
import { useForm } from '../../hooks/useForm';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { getHeroesByName } from '../helpers/getHeroesByName';
import { HeroCard } from '../components/HeroCard';

const searchHeroForm = {
  searchText : ''
}

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {q = ''} = queryString.parse(location.search);
  const heroes = getHeroesByName(q);
  const {onInputChange, onResetForm, searchText} = useForm(searchHeroForm);
  const showSearch = (q.length === 0);
  const showError = (q.length > 0 && heroes.length === 0);
  const onSearchSubmit = (event) => {
    event.preventDefault();
    if(searchText.trim() <= 1) return;
    navigate(`?q=${searchText.toLowerCase()}`)
    onResetForm();
  }
  return (
    <>
      <h1>SearchPage</h1>
      <hr />
      <div className="row">
        <div className='col-5'>
          <h4>Searching</h4>
          <hr />
          <form aria-label='form' onSubmit={onSearchSubmit}>
            <input 
              type="text" 
              name="searchText" 
              className='form-control'
              autoComplete='off' 
              placeholder='search a hero'
              value={searchText}
              onChange={onInputChange}
            />
            <button className='btn btn-outline-primary mt-2'>
              Search
            </button>
          </form>
        </div>
        <div className='col-7'>
          <h4>Result</h4>
          <hr />
            <div className='alert alert-primary' style={{display : showSearch ? '' : 'none'}}>
              Search a hero
            </div>
            <div className='alert alert-danger' aria-label='noFound' style={{display : showError ? '' : 'none'}}>
              Parece que no tenemos a <b>{q}</b> en nuestra lista 
            </div>
          {
            heroes.map( hero => (
              <HeroCard key={hero.id} {...hero} />
            ))
          }
        </div>
      </div>
    </>
  );
}
