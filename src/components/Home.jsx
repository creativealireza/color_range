import { useState } from "react";
import { UploadImage } from "./UploadImage";
// import { Link } from 'react-router-dom';
import {
    Stack
} from '@mui/material';


export const Home = () => {

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    return (
        <Stack spacing={2}>
            <UploadImage
                image={{ value: image, setValue: setImage }}
                imagePreview={{ value: imagePreview, setValue: setImagePreview }} />
        </Stack >
    );
}