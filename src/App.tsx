import React from 'react';
import IngredientsSelectionContainer from './containers/ingredientsSelection';
import MealsPreview from './containers/mealsPreview';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// TODO:
// 1. Establish initial request onload for ingredients
// 2. Create input which allows user to log included ingredients into an array
// 3. Make a fetch against the meal API for each ingredient
// 4. Make subsequent requests for each meal against their ID and prepend to an array in state
// 5. Only show meals which include all the ingredients selected w/ photo
// 5. Display more filters i.e time, quantity, meal type
// 6. Based on those inputs filter through the selection of meals presented

// BUGS:
// - Clear input field onClick of ingredient
// - Format ingredients passed as param so lowercase and underscore for spaces

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IngredientsSelectionContainer />} />
        <Route path="/meals" element={<MealsPreview/>}/>
      </Routes>
    </Router>
  );
}

export default App;
