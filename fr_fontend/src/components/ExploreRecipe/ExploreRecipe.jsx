import React, { useState, useEffect } from 'react';
import './ExploreRecipe.css';

const ExploreRecipe = ({ category, setCategory }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=c');
        const data = await response.json();
        setRecipes(data.meals); 
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const showRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  return (
    <div>
      <div className='explore-recipe' id='explore-recipe'>
        <h1>Explore Recipe</h1>
        <p className='explore-recipe-text'>
          "Explore and delight in cooking joyfully with our carefully curated collection of flavorful and inspiring recipes for everyone."
        </p>
        <div className='explore-recipe-list'>
          {recipes.map((recipe, index) => {
            return (
              <div onClick={() => showRecipeDetails(recipe)} key={index} className='explore-recipe-list-item'>
                <img className={category === recipe.strMeal ? "active" : ""} src={recipe.strMealThumb} alt='' />
                <p>{recipe.strMeal}</p>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      {selectedRecipe && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closeRecipeDetails}>×</span>
            <h2>{selectedRecipe.strMeal}</h2>
            <img src={selectedRecipe.strMealThumb} alt='' />
            <p className='float-end'> Ingredients:
            <ul className='float-end mt-5'>
            {Object.entries(selectedRecipe)
                .filter(([key, value]) => key.includes('strIngredient') && value)
                .map(([key, value]) => <li key={key}>{value}</li>)}
            </ul>
            </p>
            <div style={{ marginBottom: '20px' }} />
            <p> Recipe Details:</p>
            {selectedRecipe.strInstructions}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreRecipe;
