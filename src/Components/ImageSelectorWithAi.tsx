import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { uploadIngredientImageAPI } from '../api/recipe';
import React, { useEffect, useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Ingredient } from '@/models';
import { RecpieForm } from '@/Pages/Home/RecipeForm';

interface ImageSelectorProps {
    setter: (value: React.SetStateAction<RecpieForm>) => void,
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ setter }: ImageSelectorProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // State to track loading state

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const getIngredients = async () => {
        if (!file) {
            alert("Plz provide image")
            return
        }
        try {
            setLoading(true)
            const data = await uploadIngredientImageAPI(file)
            const generatedIngredients = data.map(ingredient => ingredient.name)
            setter((formData: RecpieForm) => ({
                ...formData,
                ingredients: [...formData.ingredients, ...generatedIngredients]
            }))
            setLoading(false)
        } catch (err: any) {
            console.log(err)
        }
    };

    useEffect(() => {
        if (!file) {
            return
        }
        getIngredients();
    },
        [file])
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Typography sx={{ paddingRight: 2 }}>Use AI to upload your ingerdients...</Typography>
            <Button
                variant="contained"
                component="label"
                sx={{ marginRight: '10px' }}
            >
                <UploadFileIcon />
                <input
                    type="file"
                    accept="image/png"
                    hidden
                    onChange={handleFileChange}
                />
            </Button>
            {loading && <CircularProgress />} {/* Conditionally render spinner */}
        </Box>
    );
};

export default ImageSelector;
