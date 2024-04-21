import React, { useState } from 'react';
import { TextField, Checkbox, Button, FormControlLabel, FormGroup } from '@mui/material';
import { getRecipeAPI } from '../../api/recipe';
import { Recipe, RecipeRequest } from '../../models/index';
import InputItemsList from '../../Components/InputItemsList';

export type RecpieForm = {
    preferences?: string;
    hasAllergies: boolean;
    allergies: string[];
    ingredients: string[];
};

const RecipeForm: React.FC = () => {
    const [formData, setFormData] = useState<RecpieForm>({ preferences: '', hasAllergies: false, allergies: [], ingredients: [] });

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
        const { allergies, ingredients } = formData
        const recipe: RecipeRequest = {
            allergies,
            ingredients
        }
        try {
            const res = await getRecipeAPI(recipe)
            console.log(" RESPONSE : ", res)
        } catch (err) { console.log(err) }
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

export default RecipeForm;
