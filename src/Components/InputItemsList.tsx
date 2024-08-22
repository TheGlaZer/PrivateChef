import { Autocomplete, AutocompleteGetTagProps, Chip, TextField } from '@mui/material';
import React, { useState, useMemo } from 'react';
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineSharp";

type InputItemsListProps = {
  availableItems: string[];
  chosenItems: string[];
  setChosenItems: (value: React.SetStateAction<any>) => void;
  label: string;
};

export default function InputItemsList({ availableItems, chosenItems, setChosenItems, label }: InputItemsListProps) {
  const [inputValue, setInputValue] = useState('');
  const maxItemsToShow = 50;

  // Ensure availableItems contains unique items
  const uniqueAvailableItems = Array.from(new Set(availableItems));

  // Dynamically filter and limit the uniqueAvailableItems based on user input
  const filteredItems = useMemo(() => {
    if (inputValue === '') {
      return []; // Collapse the list when input is cleared
    }

    const filtered = uniqueAvailableItems.filter(item =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );

    return filtered.slice(0, maxItemsToShow);
  }, [uniqueAvailableItems, inputValue]); // Recalculate when uniqueAvailableItems or inputValue changes

  const valHtml = chosenItems.map((option: string) => {
    const label = option;
    return (
      <Chip
        key={label}
        label={label}
        deleteIcon={<RemoveIcon />}
        onDelete={() => {
          setChosenItems(chosenItems.filter(entry => entry !== option));
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
          options={filteredItems} // Use filtered and unique items here
          onChange={(e, newValue) => setChosenItems(newValue.map((item: string) => item.trim()))}
          inputValue={inputValue}
          onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
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
  );
}
