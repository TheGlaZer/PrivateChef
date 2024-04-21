import ListDataContainer from './../Pages/Home/ListDataContainer';
import { RecpieForm } from '@/Pages/Home/RecipeForm';
import { IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';

type InputItemsListProps = {
    data: string[],
    setter: (value: React.SetStateAction<RecpieForm>) => void,
    prop: "allergies" | "ingredients",
    label: string
}

export default function InputItemsList({ data, setter, prop, label }: InputItemsListProps) {

    const [textItem, setTextItem] = useState('');

    const handleAddItem = () => {
        if (!textItem) return
        setter((formData: RecpieForm) => ({
            ...formData,
            [prop]: [...formData[prop], textItem],
        }));
        setTextItem('');
    }

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <TextField
                    style={{ width: 400 }}
                    label={label}
                    variant="outlined"
                    value={textItem}
                    onChange={(e) => setTextItem(e.target.value)}
                    margin="normal"
                />
                <IconButton aria-label="delete" onClick={handleAddItem} color='primary' >
                    <AddIcon />
                </IconButton>
            </div>
            <ListDataContainer prop={prop} data={data} title={prop} setter={setter} />

        </>
    )
}
