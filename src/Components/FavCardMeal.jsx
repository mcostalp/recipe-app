import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavCardMeal({ item, index }) {
  const history = useHistory();
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);
  const [favorites, setFavorites] = useLocalStorage('favoriteRecipes', []);
  const [mount, setMount] = useState(false);

  const clipCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/meals/${item.id}`);
    setCopiedLink(true);
  };

  const onClick = () => {
    history.push(`/meals/${item.id}`);
  };

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.id === item.id));
    setMount(true);
  }, [mount, favorites, item.id, isFavorite]);

  const onFavoriteCheck = () => {
    const newArr = favorites.filter((fav) => fav.id !== item.id);
    setFavorites(newArr);
    setIsFavorite(false);
    setMount(false);
  };

  return (
    <div>
      <Link to={ `/drinks/${item.id}` }>
        <img
          src={ item.image }
          alt={ item.name }
          className="recipeIMG"
          data-testid={ `${index}-horizontal-image` }
          height="150px"
        />
      </Link>
      <h4
        className="recipeName"
        data-testid={ `${index}-horizontal-name` }
        onClick={ onClick }
        onKeyDown={ onClick }
        role="presentation"
      >
        { item.name }
      </h4>
      <h5
        data-testid={ `${index}-horizontal-top-text` }
      >

        { `${item.nationality} - ${item.category}` }
      </h5>
      <p data-testid={ `${index}-horizontal-done-date` }>
        {item.doneDate }
      </p>
      <ul>
        {item.tags !== undefined && tags.slice(0, 2).map((tag, ind) => (
          <li key={ ind } data-testid={ `${index}-${tag}-horizontal-tag` }>
            { tag }
          </li>
        ))}
      </ul>
      <input
        type="image"
        alt="shareIcon"
        className="shareIcon"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ clipCopy }
      />
      { copiedLink && <p>Link copied!</p> }
      <input
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
        data-testid={ `${index}-horizontal-favorite-btn` }
        type="image"
        onClick={ onFavoriteCheck }
      />
    </div>
  );
}

FavCardMeal.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape().isRequired,
};
