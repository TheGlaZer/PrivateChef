import { List, ListItem, ListSubheader } from '@mui/material'
import React from 'react'

type UserProductsContainerProps = {
    data: string[],
    title: string
}

export default function ListDataContainer({ data, title }: UserProductsContainerProps) {



    return data.length === 0 ? <></> : (
        <List subheader={<ListSubheader>{title}</ListSubheader>}
            sx={{
                mt: 2,
                width: '300px',
                maxHeight: 250, // Sets the maximum height
                overflow: 'auto', // Enables scrolling
                borderWidth: 1,
                border: "1px solid gray", // This should be 'solid', 'dotted', 'dashed', etc.
                borderRadius: 2
            }}
        >
            {data.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
            ))}
        </List>
    )
}
