export const ImagePreview = ({imageUrl}) => {
    return(
    <>
        <h4>Color Range:</h4>
        <img src={`data:image/jpeg;base64,${imageUrl}`} alt="preview" width="100%" height="100rem !important"/>
    </>
    )
}