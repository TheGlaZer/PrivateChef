import React, { useState } from 'react';
import { TextField, Checkbox, Button, FormControlLabel, FormGroup, List, ListItem, ListSubheader } from '@mui/material';

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
        <form onSubmit={handleSubmit} style={{ width: '50%' }}>
            <FormGroup>
                <TextField
                    label="Preferences"
                    variant="outlined"
                    name="preferences"
                    value={formData.preferences}
                    onChange={handleInputChange}
                    margin="normal"
                />
                <FormControlLabel
                    control={<Checkbox checked={formData.hasAllergies} onChange={handleCheckboxChange} />}
                    label="Allergic to any food?"
                />
                {formData.hasAllergies && (
                    <TextField
                        label="Allergies"
                        variant="outlined"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleInputChange}
                        placeholder="Describe your allergies"
                        margin="normal"
                    />
                )}
                <TextField
                    label="Products"
                    variant="outlined"
                    value={productInput}
                    onChange={(e) => setProductInput(e.target.value)}
                    margin="normal"
                />
                <Button variant="contained" onClick={handleAddProduct} sx={{ mt: 1 }}>Add Product</Button>
                <List subheader={<ListSubheader>Products</ListSubheader>} sx={{ mt: 2, width: '300px', bgcolor: 'background.paper' }}>
                    {formData.products.map((product, index) => (
                        <ListItem key={index}>{product}</ListItem>
                    ))}
                </List>
            </FormGroup>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>Submit</Button>
        </form>
    );
};

export default RecipeForm;
