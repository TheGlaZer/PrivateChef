import { Dialog, Card, CardContent, Container } from "@mui/material";
import RecipePage from "./RecipePage";
import { useState } from "react";
import { Recipe } from "@/models";
import RecipeForm from "./RecipeForm";

function SearchForRecipe() {
  const [open, setOpen] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', py: 4 }}>
      <RecipeForm setOpen={setOpen} setRecipe={setRecipe} />
      <Dialog open={open} onClose={handleClose} maxWidth="md" scroll="paper">
        <Card sx={{ m: 0, p: 0, overflow: 'auto', maxHeight: '80vh' }}>
          <CardContent sx={{ p: 2 }}>
            <RecipePage recipe={recipe} />
          </CardContent>
        </Card>
      </Dialog>
    </Container>
  );
}

export default SearchForRecipe;
