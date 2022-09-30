import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { requestDrinkInProgress } from '../helpers/Services/apiRequest';

function DrinkInProgress() {
  const { id } = useParams();
  const [localResp, setLocalResp] = useState([]);
  const title = 'Recipe in Progress';

  const {
    detailResponse,
    setDetailResponse,
    setPageState,
  } = useContext(RecipesContext);

  useEffect(() => {
    Promise.resolve(detailResponse)
      .then((res) => {
        if (res === null) {
          console.log(res);
        } else {
          setLocalResp(res);
        }
      });
  }, [detailResponse]);

  useEffect(() => {
    setPageState(title);
    setDetailResponse(requestDrinkInProgress(id));
  }, []);

  return (
    <section>
      <div>
        <h1>{title}</h1>
      </div>
      {localResp !== '' ? localResp
        .map((resp, index) => (
          <div key={ index }>
            <img
              data-testid="recipe-photo"
              src={ resp.strDrinkThumb }
              alt={ resp.strDrink }
            />
            <h2 data-testid="recipe-title">{resp.strDrink}</h2>
            <p data-testid="instructions">{resp.strInstructions}</p>
            <button data-testid="share-btn" type="button">
              Share
            </button>
            <button data-testid="favorite-btn" type="button">
              Favorite
            </button>
            <h3 data-testid="recipe-category">{resp.strCategory}</h3>
            <p data-testid="instructions">{resp.strInstructions}</p>
            <button data-testid="finish-recipe-btn" type="button">
              Finish Recipe
            </button>
          </div>)) : ''}
    </section>
  );
}

export default DrinkInProgress;
