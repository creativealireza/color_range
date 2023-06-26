import { useState } from "react";
import { UploadImage } from "./UploadImage";
import {
    Stack,
    Box,
    LinearProgress
} from '@mui/material';
import { Footer } from "./Footer/Footer";

export const Home = () => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <Stack spacing={2}>
            {loading &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            }
            <UploadImage
                image={{ value: image, setValue: setImage }}
                imagePreview={{ value: imagePreview, setValue: setImagePreview }}
                loading={setLoading} />
            <Footer />
        </Stack >
    );
}