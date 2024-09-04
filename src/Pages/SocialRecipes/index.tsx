import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { getRecipes, getRecipesOfUser } from "../../api/recipe"
import { Recipe } from "@/models";
import RecipeMinimalCard from "./RecipeMinimalCard";

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
            <Box>
                <Typography variant="h4" align="center" color={theme.palette.primary.main} gutterBottom sx={{ pb: 5 }}>
                    Explore Recipes
                </Typography>
                <Grid container spacing={2}>
                {recipes.map(recipe => {
                    return (
                            <RecipeMinimalCard recipe={recipe}></RecipeMinimalCard>
                    )
                })}
                </Grid>
            </Box>
    );
}

export default SocialRecipesPage;