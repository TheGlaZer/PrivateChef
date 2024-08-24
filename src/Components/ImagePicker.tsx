import React, { useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import { PhotoSizeSelectActual } from '@mui/icons-material';

interface ImagePickerProps {
    height?: string;
    width?: string;
    name: string;
    defaultValue?: string | null;
    onChange: (file: FileList) => void; // Add an onChange prop to handle file changes
}

const ImagePicker: React.FC<ImagePickerProps> = ({ width = '100px', height = '100px', name, defaultValue = null, onChange }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(defaultValue);

    const handleFileInputClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
        const file = files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const image = reader.result as string;
            setSelectedImage(image);
            onChange(files); // Call the onChange prop to update the parent form state
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {selectedImage || defaultValue ? (
                <img onClick={handleFileInputClick} src={selectedImage || defaultValue!} alt="Selected" style={{ width, height }} />
            ) : (
                <IconButton sx={{ height, width }} color="primary" aria-label="upload picture" component="span" onClick={handleFileInputClick}>
                    <PhotoSizeSelectActual />
                </IconButton>
            )}
        </>
    );
};

export default ImagePicker;
