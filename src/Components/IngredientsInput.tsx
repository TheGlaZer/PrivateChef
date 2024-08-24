import React, { useEffect, useState } from 'react';
import InputItemsList from './InputItemsList';
import { getIngredientsAPI } from '../api/ingredient';

interface IngredientsInputProps {
    chosenIngredients: string[];
    setChosenIngredients: (value: string[]) => void;
    label: string
}


export default function IngredientsInput({chosenIngredients, setChosenIngredients, label}: IngredientsInputProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    getIngredientsAPI().then(ingredients => {
      setIngredients(ingredients.map(ingredient => ingredient.name));
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return (
            <InputItemsList
              availableItems={ingredients}
              chosenItems={chosenIngredients}
              setChosenItems={setChosenIngredients}
              label={label}
            />
  );
}
