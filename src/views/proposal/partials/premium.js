import React, { useContext } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import LendingContext from "../../../context/index";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "../summaryStyles";
import { GST_PERCENTAGE } from "../../../constants/index";

function ProductBuyPremiumBreakup(props) {
  const {
    state: { orderDetails = null },
  } = useContext(LendingContext);
  const {
    classes: { hr100, premiumBreakDownBox, premiumBreakDownHeader, textLeft },
    gst_percentange = GST_PERCENTAGE,
  } = props;

  return (
    <Box className={premiumBreakDownBox}>
      <Box>
        <>
          <Box className={premiumBreakDownHeader}>
            <Box>
              <Typography variant={"subtitle2"} className={textLeft}>
                Premium
              </Typography>
            </Box>
            <Box>
              <Typography variant={"subtitle2"}>
                ₹
                {Number(orderDetails?.premium_excluding_gst).toLocaleString(
                  "en"
                )}
              </Typography>
            </Box>
          </Box>
          <hr className={hr100} />
        </>

        <Box className={premiumBreakDownHeader}>
          <Box>
            <Typography variant={"subtitle2"} className={textLeft}>
              GST ({gst_percentange}%)
            </Typography>
          </Box>
          <Box>
            <Typography variant={"subtitle2"}>
              ₹{Number(orderDetails?.premium_gst).toLocaleString("en")}
            </Typography>
          </Box>
        </Box>
        <hr className={hr100} />
      </Box>

      <Box className={premiumBreakDownHeader}>
        <Box>
          <Typography variant={"subtitle2"}>
            <b>Total Premium</b>
          </Typography>
        </Box>
        <Box className={""}>
          <Typography variant={"subtitle2"}>
            <b>₹{Number(orderDetails?.premium_total).toLocaleString("en")}</b>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(
  ProductBuyPremiumBreakup
);
