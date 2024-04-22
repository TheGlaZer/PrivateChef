import React, { useState } from 'react';
import { TextField, Checkbox, Button, FormControlLabel, FormGroup } from '@mui/material';
import { getRecipeAPI } from '../../api/recipe';
import { Recipe, RecipeRequest } from '../../models/index';
import InputItemsList from '../../Components/InputItemsList';
import { useMessageContext } from '../../contexts/MessageBox';

export type RecpieForm = {
    preferences?: string;
    hasAllergies: boolean;
    allergies: string[];
    ingredients: string[];
};

type RecipeFormProps = {
    setRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// const RecipeForm: React.FC = ({ setRecipe }: RecipeFormProps) => {
export default function RecipeForm({ setRecipe, setOpen }: RecipeFormProps) {

    const [formData, setFormData] = useState<RecpieForm>({ preferences: '', hasAllergies: false, allergies: [], ingredients: [] });

    const { setErrorMessage } = useMessageContext()
    setErrorMessage('Error getting a recipe')

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            hasAllergies: e.target.checked,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleRecipe();
    };

    const handleRecipe = async () => {
        debugger;
        const { allergies, ingredients } = formData
        const recipeRequest: RecipeRequest = {
            allergies,
            ingredients
        }
        try {
            const recipe = await getRecipeAPI(recipeRequest)
            setRecipe(recipe)
            setOpen(true)
        } catch (err) {
            console.log(err)
            setErrorMessage('Error getting a recipe')
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{}}>
            <FormGroup >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h1>Make Your Own Recipe</h1>
                    <div>
                        <FormControlLabel
                            control={<Checkbox checked={formData.hasAllergies} onChange={handleCheckboxChange} />}
                            label="Allergic to any food?"
                        />
                        {formData.hasAllergies &&
                            <InputItemsList data={formData.allergies} prop='allergies' setter={setFormData} label='Add Alergy..' ></InputItemsList>}
                    </div>
                    <InputItemsList data={formData.ingredients} prop='ingredients' setter={setFormData} label='Add Ingredient..' ></InputItemsList>
                </div>
            </FormGroup>
            <div style={{ display: "flex", justifyContent: "end", padding: 20 }}>
                <Button type="submit" variant="contained" color="primary" size='medium'>Submit</Button>
            </div>
        </form>
    );
};
