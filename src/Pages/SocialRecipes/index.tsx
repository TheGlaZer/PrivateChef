import { Box, Grid, Typography, Button, TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { getRecipes } from "../../api/recipe";
import ThumbUp from '@mui/icons-material/ThumbUp';
import { Recipe } from "@/models";
import RecipeMinimalCard from "./RecipeMinimalCard";

function SocialRecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByLikes, setSortByLikes] = useState(false);

    const theme = useTheme();

    const getAllRecipes = async () => {
        try {
            const data: Recipe[] = await getRecipes();
            setRecipes(data);
            setFilteredRecipes(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllRecipes();
    }, []);

    useEffect(() => {
        filterAndSortRecipes();
    }, [searchTerm, sortByLikes]);

    const filterAndSortRecipes = () => {
        let filtered = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortByLikes) {
            filtered = filtered.sort((a, b) => b.likeCount - a.likeCount);
        }

        setFilteredRecipes(filtered);
    };

    return (
        <Box>
            <Typography variant="h4" align="center" color={theme.palette.primary.main} gutterBottom sx={{ pb: 5 }}>
                Explore Recipes
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <TextField
                    variant="outlined"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: '50%', mr: 2 }}
                />
                <Button
                    variant={sortByLikes ? "contained" : "outlined"}
                    color="primary"
                    onClick={() => setSortByLikes(!sortByLikes)}
                    startIcon={<ThumbUp />}

                >
                    {sortByLikes ? "Showing Most Liked" : "Sort by Most Liked"}
                </Button>
            </Box>
            <Grid container spacing={2}>
                {filteredRecipes.map((recipe) => (
                    <RecipeMinimalCard key={recipe._id} recipe={recipe} />
                ))}
            </Grid>
        </Box>
    );
}

export default SocialRecipesPage;
