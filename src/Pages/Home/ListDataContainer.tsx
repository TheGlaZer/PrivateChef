import { Card, List, ListItem, ListSubheader } from '@mui/material'
import React from 'react'
import CloseOutlined from '@mui/icons-material/CloseOutlined'
import { RecpieForm } from './RecipeForm'

type ListDataContainerProps = {
    data: string[],
    title: string,
    setter: (value: React.SetStateAction<RecpieForm>) => void,
    prop: "allergies" | "ingredients",
}

export default function ListDataContainer({ data, title, setter, prop }: ListDataContainerProps) {

    const handleDeleteItem = (listItem: string) => {
        setter(formData => {
            const items = formData[prop].filter(item => item !== listItem)
            return {
                ...formData,
                [prop]: items
            }
        })
    }

    return data.length === 0 ? <></> : (
        <List subheader={<ListSubheader>{title}</ListSubheader>}
            sx={{
                mt: 2,
                width: '300px',
                maxHeight: 250, // Sets the maximum height
                overflow: 'auto', // Enables scrolling
                borderWidth: 1,
                border: "1px solid gray", // This should be 'solid', 'dotted', 'dashed', etc.
                borderRadius: 2,
                padding: 2,

            }}
        >
            {data.map((item, index) => (
                <Card style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: 10, marginTop: 5 }}>
                    <ListItem key={index}>{item}</ListItem>
                    <CloseOutlined style={{ width: 20, height: 20 }} onClick={() => handleDeleteItem(item)} />
                </Card >
            ))}
        </List>
    )
}
