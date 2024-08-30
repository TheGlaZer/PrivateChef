import { Dialog, Card, CardContent, Container } from "@mui/material";
import RecipePage from "./RecipeCard";
import { useState } from "react";
import { Recipe, RecipeRequest } from "../../models";
import RecipeForm from "./RecipeForm";
import { useUser } from "../../Providers/UserProvider";
import { useMessageContext } from '../../contexts/MessageBox';
import { getRecipeAPI } from "../../api/recipe";


export type RecipeRequestForm = {
  preferences?: string;
  hasAllergies: boolean;
  allergies: string[];
  ingredients: string[];
};

function SearchForRecipe() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const [formData, setFormData] = useState<RecipeRequestForm>({ preferences: '', hasAllergies: user?.allergies && user.allergies.length > 0 || false, allergies: user?.allergies || [], ingredients: [] });
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { setErrorMessage } = useMessageContext();

  const handleClose = () => {
    setOpen(false);
  };

  const onRegenarate = async () => {
    await onRecipeRequest(true);
  }

  const onRecipeRequest = async (isRegenerate: boolean = false) => { 
    const { allergies, ingredients } = formData;
    const recipeRequest: RecipeRequest = {
      allergies,
      ingredients,
      isRegenerate,
      lastRecipeName: recipe?.title
    };
    try {
      const recipe = await getRecipeAPI(recipeRequest);
      setRecipe(recipe);
      setOpen(true);
    } catch (err) {
      console.log(err);
      setErrorMessage('Error getting a recipe');
    }
  }

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', py: 4 }}>
      <RecipeForm formData={formData} setFormData={setFormData} handleRecipe={onRecipeRequest} />
      <Dialog open={open} onClose={handleClose} maxWidth="md" scroll="paper">
        <Card sx={{ m: 0, p: 0, overflow: 'auto', maxHeight: '80vh' }}>
          <CardContent sx={{ p: 2 }}>
            <RecipePage recipe={recipe} isNew={true} onRegenerate={onRegenarate} />
          </CardContent>
        </Card>
      </Dialog>
    </Container>
  );
}

export default SearchForRecipe;
