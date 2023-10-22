import React from 'react';
import IngredientsSelectionContainer from './containers/ingredientsSelection';
import MealsPreview from './containers/mealsPreview';
import Header from './containers/header';
import RecipeInspection from './containers/recipeInspection';
import { HashRouter as Router, Route, Routes } from "react-router-dom";

// TODO:
// 1. Establish initial request onload for ingredients
// 2. Create input which allows user to log included ingredients into an array
// 3. Make a fetch against the meal API for each ingredient
// 4. Make subsequent requests for each meal against their ID and prepend to an array in state
// 5. Only show meals which include all the ingredients selected w/ photo
// 6. Strict mode described below

// TODO UPDATED:
// - add backbutton
// - filter recipes once collection made based on ingredients chosen
// - error handling on meals preview page
// - global styling, reduce repetition
// - cleanup code, make it shorter
// - introduce strict mode where if the user only wants to search recipes with selected ingredients then
// filter out any recipes without included ingredients, else show all recipes with at least one ingredient

// - add home and share button
// - include in header

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<IngredientsSelectionContainer />} />
          <Route path="/meals" element={<MealsPreview/>}/>
          <Route path="/recipe/:id" element={<RecipeInspection/>}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
