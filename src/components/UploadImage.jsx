import { useState } from 'react';
import axios from 'axios';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
    Button,
    Stack,
    Avatar,
    FormControl,
    FormHelperText,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ImagePreview } from './ImagePreview';

export const UploadImage = ({ image, imagePreview, loading }) => {
    const [finalImage, setFinalImage] = useState();

    const convertBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function uploadImageToServer() {
        axios.post('http://127.0.0.1:5000/color_range', {
            image,
        })
            .then(function (response) {
                response?.data && loading(false)
                setFinalImage(response?.data)
            })
            .catch(function (error) {
            });
    }

    const handleProfileImage = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        image?.setValue(base64);
        imagePreview?.setValue(URL.createObjectURL(event.target.files[0]));
    }

    return (
        <FormControl variant="standard"
            sx={{
                display: "flex",
                alignItems: "center",
            }}>

            <Stack display={"flex"} >
                <Button
                    variant="outlined"
                    component="label"
                    sx={{
                        color: "black",
                        margin: "0 auto",
                        marginTop: "3rem",
                        border: "1px solid black",

                        '&:hover': {
                            borderColor: 'black',
                            background: "rgb(0 0 0 / 10%)"
                        }
                    }}
                    aria-describedby="profilePictureInfo"
                >
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <PhotoCamera sx={{ marginRight: "0.4rem", color: "gray" }} />
                        {imagePreview?.value ? "Change Photo" : "Upload Photo"}
                        {imagePreview?.value && <Avatar alt="image" src={imagePreview?.value} sx={{ border: "1px solid grey" }} />}
                    </Stack>
                    <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleProfileImage}
                    />
                </Button>
                {!imagePreview?.value &&
                    <FormHelperText id="profilePictureInfo" sx={{ textAlign: "center" }}>
                        Upload your image
                    </FormHelperText>}

                <LoadingButton
                    loading={false}
                    loadingPosition="start"
                    startIcon={<ArrowUpwardIcon />}
                    variant="outlined"
                    sx={{
                        marginTop: "1rem",
                        minWidth: "11rem"
                    }}
                    onClick={() => {
                        uploadImageToServer()
                        loading(true)
                    }}
                >
                    Upload Image
                </LoadingButton>
            </Stack>

            {finalImage &&
                <Stack
                    display={"flex"}
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{
                        marginTop: "5rem",
                        border: "1px solid black",
                        width: "90%",
                        padding: "0.2rem",
                        borderRadius: "3px",
                        boxShadow: "5px 5px 15px 0px rgba(0,0,0,0.5)"
                    }}>
                    <ImagePreview imageUrl={finalImage} />
                </Stack>
            }
        </FormControl>
    );
}