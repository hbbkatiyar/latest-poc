import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";

const ImageUpload = ({ title, filename, photoChangeHandler }) => {
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      photoChangeHandler(filename, undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    photoChangeHandler(filename, e.target.files[0]);
  };

  const onRemoveFile = () => {
    setSelectedFile(undefined);
    photoChangeHandler(filename, undefined);
    return;
  };

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      style={{ padding: "2vh 2vh 0 0" }}
    >
      {!selectedFile && (
        <Box>
          <Button
            onClick={onButtonClick}
            variant="outlined"
            color="secondary"
            size="large"
            style={{ borderRadius: "2vh" }}
          >
            <AddCircleOutlineIcon /> {title}
          </Button>
          <input
            type="file"
            id="file"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={onSelectFile}
            accept="image/*"
          />
        </Box>
      )}
      {selectedFile && (
        <Box layout="column">
          <Box
            style={{
              border: "2px dotted #c6c6c6",
              // marginLeft: "5vh",
              borderRadius: "2vh",
              position: "relative",
            }}
          >
            <img
              src={preview}
              style={{ width: "15vh", height: "15vh", borderRadius: "2vh" }}
            />
            <Box
              style={{
                position: "absolute",
                right: "-2vh",
                top: "-2vh",
                zIndex: 100,
                cursor: "pointer",
              }}
              onClick={onRemoveFile}
            >
              <CancelIcon />
            </Box>
          </Box>
          {/* <Box m={1}>
            <Typography>{`${title} Photo`}</Typography>
          </Box> */}
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
