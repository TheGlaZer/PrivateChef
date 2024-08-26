import { Recipe } from "@/models";
import { useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeMinimalCard from "./RecipeMinimalCard";

type RecipeCardDisplayProps = {
    recipe: Recipe;
};

function RecipeCardDisplay({ recipe }: RecipeCardDisplayProps) {

    const [isExpanded, setIsExpanded] = useState(false)

    return isExpanded ? <RecipeCard recipe={recipe} setIsExpanded={setIsExpanded} /> :
        <RecipeMinimalCard recipe={recipe} setIsExpanded={setIsExpanded} />;
}

export default RecipeCardDisplay;