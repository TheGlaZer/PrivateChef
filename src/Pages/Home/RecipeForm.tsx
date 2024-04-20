import React, { useState } from 'react';
import { TextField, Checkbox, Button, FormControlLabel, FormGroup, List, ListItem, ListSubheader, IconButton } from '@mui/material';
import UserProductsContainer from './UserProductsContainer';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type FormData = {
    preferences: string;
    hasAllergies: boolean;
    allergies: string;
    products: string[];
};

const RecipeForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ preferences: '', hasAllergies: false, allergies: '', products: [] });
    const [productInput, setProductInput] = useState('');

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
    };

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
                            <TextField
                                style={{ width: 400 }}
                                label="Allergies"
                                variant="outlined"
                                name="allergies"
                                value={formData.allergies}
                                onChange={handleInputChange}
                                placeholder="Describe your allergies"
                                margin="normal"
                                rows={1}
                                multiline
                            />
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
                        <UserProductsContainer data={formData.products} title='Products' />
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
