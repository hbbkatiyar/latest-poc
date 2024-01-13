import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "../summaryStyles";
import { NOT_AVAILABLE_TEXT } from "../../../constants";

function DownloadField(props) {
  const {
    classes: { cursorPointer, gutterTop, question, wordBreak },
    label = "",
    value = "",
    url = "",
    clickHandler = {},
    type = "image",
  } = props;

  return (
    <Box className={gutterTop} justifyContent={"left"} textAlign="left">
      <Typography variant={"body2"} gutterBottom className={question}>
        {label}
      </Typography>
      {url ? (
        <Box display="inline-flex" onClick={() => clickHandler(url)}>
          {type === "pdf" && 1 === 2 && (
            <>
              <Typography className={cursorPointer} display="inline">
                <CloudDownloadIcon color={"secondary"} fontSize="large" />
              </Typography>
              <Typography className={cursorPointer} style={{ padding: "10px" }}>
                {value && value}
              </Typography>
            </>
          )}

          <Box
            style={{
              border: "2px dotted #c6c6c6",
              borderRadius: "2vh",
              position: "relative",
            }}
          >
            {type === "image" && (
              <img
                src={url}
                style={{ width: "15vh", height: "15vh", borderRadius: "2vh" }}
              />
            )}
            {type === "pdf" && (
              <iframe
                src={url}
                style={{ width: "15vh", height: "15vh", borderRadius: "2vh" }}
                frameborder="0"
              ></iframe>
            )}
            <Box
              style={{
                position: "absolute",
                left: "6vh",
                bottom: 0,
                zIndex: 100,
                cursor: "pointer",
              }}
            >
              <CloudDownloadIcon color={"secondary"} fontSize="large" />
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography variant={"body2"} className={wordBreak}>
          {NOT_AVAILABLE_TEXT}
        </Typography>
      )}
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(DownloadField);
