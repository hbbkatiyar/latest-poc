import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Typography, Zoom } from "@material-ui/core";
import { useStyles } from "./indexStyles";
import { Images } from "../../constants/images";
import { DOWNLOADING_CERTIFICATE } from "../../constants/index";

function DownloadPolicy(props) {
  const {
    classes: { downloadIcon, downloadBox },
    downloadableId,
    handleDownload,
    isDownloding,
    orderId,
    title = "Download Policy",
  } = props;

  return (
    <Box className={downloadBox} mb={2}>
      {isDownloding && downloadableId === orderId ? (
        <Typography variant={"h5"}>
          {DOWNLOADING_CERTIFICATE}
        </Typography>
      ) : (
        <>
          <Zoom in={true} timeout={900}>
            <img
              alt={"Download Policy Document"}
              className={downloadIcon}
              onClick={() => handleDownload(orderId)}
              src={Images.downloadIcon}
              title={"Download Policy Document"}
            />
          </Zoom>
          <Typography variant={"h5"} onClick={() => handleDownload(orderId)}>
            {title}
          </Typography>
        </>
      )}
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(DownloadPolicy);
