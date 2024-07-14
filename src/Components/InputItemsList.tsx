import { RecpieForm } from '@/Pages/Recipe/RecipeForm';
import { Autocomplete, AutocompleteGetTagProps, Chip, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineSharp";

type InputItemsListProps = {
  availableItems: string[],
  chosenItems: string[],
  setter: (value: React.SetStateAction<RecpieForm>) => void,
  prop: "allergies" | "ingredients",
  label: string
}

export default function InputItemsList({ availableItems, chosenItems, setter, prop, label }: InputItemsListProps) {

  const valHtml = chosenItems.map((option: string, index: number) => {
    // This is to handle new options added by the user (allowed by freeSolo prop).
    const label = option;
    return (
      <Chip
        key={label}
        label={label}
        deleteIcon={<RemoveIcon />}
        onDelete={() => {
          setter((formData: RecpieForm) => ({
            ...formData,
            [prop]: chosenItems.filter(entry => entry !== option),
          }))
        }}
      />
    );
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 500 }}>
        <Autocomplete
          multiple
          id="tags-standard"
          freeSolo
          filterSelectedOptions
          options={availableItems}
          onChange={(e, newValue) => setter((formData: RecpieForm) => ({
            ...formData,
            [prop]: [...newValue],
          }))}
          getOptionLabel={(option: string) => option}
          renderTags={(value: string[], getTagProps: AutocompleteGetTagProps) => null}
          value={chosenItems}
          renderInput={params => (
            <TextField
              {...params}
              variant="standard"
              placeholder={label}
              margin="normal"
              fullWidth
            />
          )}
        />
        <div className="selectedTags">{valHtml}</div>
      </div>
    </div>
  )
}