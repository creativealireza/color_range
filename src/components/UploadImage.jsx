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
import SaveIcon from '@mui/icons-material/Save';

export const UploadImage = ({ image, imagePreview }) => {
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
        axios.post('http://erfan.bestestofthebest.site/color_range', {
            image,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
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
                    {imagePreview?.value && <Avatar alt="image" src={imagePreview?.value} sx={{border: "1px solid grey"}}/>}
                </Stack>
                <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleProfileImage}
                />
            </Button>
            {!imagePreview?.value && <FormHelperText id="profilePictureInfo">
                Upload your image
            </FormHelperText>}

            <LoadingButton
                loading={false}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                sx={{
                    marginTop: "1rem",
                    minWidth: "11rem"
                }}
                onClick={() => uploadImageToServer()}
            >
                Save
            </LoadingButton>
        </FormControl>
    );
}