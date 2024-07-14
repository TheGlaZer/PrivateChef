import { Card, Dialog } from "@mui/material";
import RecipePage from "./RecipePage";
import { useState } from "react";
import { Recipe } from "@/models";
import RecipeForm from "./RecipeForm";

function SearchForRecipe() {
    const [open, setOpen] = useState(false)
    const [recipe, setRecipe] = useState<Recipe | null>(null)
  
    const handleClose = () => {
      setOpen(false)
    }

    return (
      <div style={{ display: "flex", width: 1200, minHeight: "100vh", gap: 30 }}>
      <RecipeForm setOpen={setOpen} setRecipe={setRecipe} ></RecipeForm>
      <Dialog open={open} onClose={handleClose}>
        <Card>
          <RecipePage recipe={recipe} />
        </Card>
      </Dialog>
    </div>
    )
}

export default SearchForRecipe;