import { Recipe } from '@/models'
import React from 'react'

type RecipePageProps = {
    recipe: Recipe | null
}
export default function RecipePage({ recipe }: RecipePageProps) {

    if (!recipe) return <h1>Error Fetching Recipe</h1>

    const { products, instructions, title } = recipe
    return (
        <div style={{ padding: 20 }}>
            <h1 style={{}}>{title}</h1>
            <div>
                <h3>Products</h3>
                <ul>
                    {products.map(product => <li>{product.product} {product.amount}</li>)}
                </ul>
            </div>
            <div>
                <h3>Instructions</h3>
                <ul>
                    {instructions.map(instruction => <li>{instruction}</li>)}
                </ul>
            </div>
        </div>
    )
}
