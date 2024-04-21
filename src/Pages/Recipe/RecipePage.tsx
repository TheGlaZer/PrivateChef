import { Recipe } from '@/models'
import React from 'react'

type RecipePageProps = {
    recipe: Recipe
}
export default function RecipePage({ recipe }: RecipePageProps) {

    const { ingredients, instructions, title } = recipe
    return (
        <div style={{ padding: 20 }}>
            <h1>{title}</h1>
            <div>
                <ul>
                    {ingredients.map(ingredient => <li>{ingredient}</li>)}
                </ul>
            </div>
            <div>
                <p>{instructions}</p>
            </div>
        </div>
    )
}
