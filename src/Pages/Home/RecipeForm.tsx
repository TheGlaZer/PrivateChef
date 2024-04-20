import React, { useState } from 'react';
import { TextField, Checkbox, Button, FormControlLabel, FormGroup, List, ListItem, ListSubheader, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getRecipeAPI } from '../../api/recipe';
import { Recipe } from '@/models';
import ListDataContainer from './ListDataContainer';

type FormData = {
    preferences?: string;
    hasAllergies: boolean;
    allergies: string[];
    products: string[];
};

const RecipeForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ preferences: '', hasAllergies: false, allergies: [], products: [] });
    const [productInput, setProductInput] = useState('');
    const [alergyInput, setAlergyInput] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            hasAllergies: e.target.checked,
        });
    };

    const handleAddProduct = () => {
        if (productInput) {
            setFormData({
                ...formData,
                products: [...formData.products, productInput],
            });
            setProductInput('');
        }
    };

    const handleAddAlergy = () => {
        if (alergyInput) {
            setFormData({
                ...formData,
                allergies: [...formData.allergies, alergyInput],
            });
            setAlergyInput('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleRecipe();
    };

    const handleRecipe = async () => {
        const { allergies, products } = formData
        const recipe: Recipe = {
            allergies,
            products
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
                        {formData.hasAllergies && (
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <TextField
                                        style={{ width: 400 }}
                                        label="Add Alergy.."
                                        variant="outlined"
                                        value={alergyInput}
                                        onChange={(e) => setAlergyInput(e.target.value)}
                                        margin="normal"
                                    />
                                    <IconButton aria-label="delete" onClick={handleAddAlergy} color='primary' >
                                        <AddIcon />
                                    </IconButton>
                                </div>
                                <ListDataContainer data={formData.allergies} title='Alergies' />
                            </div>
                        )}
                    </div>

                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

                            <TextField
                                style={{ width: 400 }}
                                label="Add Product.."
                                variant="outlined"
                                value={productInput}
                                onChange={(e) => setProductInput(e.target.value)}
                                margin="normal"
                            />
                            <IconButton aria-label="delete" onClick={handleAddProduct} color='primary' >
                                <AddIcon />
                            </IconButton>
                        </div>
                        <ListDataContainer data={formData.products} title='Products' />
                    </div>
                </div>
            </FormGroup>
            <div style={{ display: "flex", justifyContent: "end", padding: 20 }}>
                <Button type="submit" variant="contained" color="primary" size='medium'>Submit</Button>
            </div>
        </form>
    );
};

export default RecipeForm;
