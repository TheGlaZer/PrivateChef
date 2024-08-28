import { Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { getRecipes, getRecipesOfUser } from "../../api/recipe"
import { Recipe } from "@/models";
import RecipeCardDisplay from "./RecipeCardDisplay";

function SocialRecipesPage() {

    const [recipes, setRecipes] = useState<Recipe[]>([])

    const theme = useTheme()
    const getAllRecipes = async () => {
        try {
            const data: Recipe[] = await getRecipes()
            console.log({ data })
            setRecipes(data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getAllRecipes();
    }, [])

    return (
        <>
            <Box sx={{ pt: 10, pb: 10 }}>
                <Typography variant="h2" align="center" color={theme.palette.primary.main} gutterBottom sx={{ pb: 5 }}>
                    Discover Users' Recipes
                </Typography>
                {recipes.map(recipe => {
                    return (
                        <Box sx={{ pb: 1 }}>
                            <RecipeCardDisplay recipe={recipe}></RecipeCardDisplay>
                        </Box>
                    )
                })}
            </Box>
        </>
    );
}

export default SocialRecipesPage;