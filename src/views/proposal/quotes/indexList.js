import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AmountRangeSection from "./amountRange";
import AmountSection from "./amount";
import ButtonSection from "./button";
import EmiSection from "./emi";
import FetchingQuoteSection from "./fetching";
import HeaderSection from "./header";
import TenureSection from "./tenure";
import { Box, Grid } from "@material-ui/core";
import { useStyles } from "./indexStyles";
import { isSelecteQuoteButtonDisabled } from "../../../helpers/proposal";

function QuotesList(props) {
  const {
    classes: { quote, quoteBGLight, quoteBGDark },
    amountChangeHandler,
    form,
    index,
    item,
    refreshClickHandler,
    selectQuoteClickHandler,
    tenureChangeHandler,
  } = props;

  const getClassName = (index) =>
    `${quote} ${(index + 1) % 2 === 0 ? quoteBGDark : quoteBGLight}`;

  return (
    <>
      <Grid item xs={12} sm={4} key={item.reference_code}>
        <Box className={getClassName(index)} direction="column">
          <HeaderSection
            index={index}
            item={item}
            onClickHandler={refreshClickHandler}
          />

          {item.visible ? (
            <>
              <AmountRangeSection item={item} />

              <AmountSection
                handleChange={amountChangeHandler}
                index={index}
                item={item}
              />

              <TenureSection
                index={index}
                item={item}
                onChangeHandler={tenureChangeHandler}
              />

              <EmiSection item={item} />

              <ButtonSection
                disabled={isSelecteQuoteButtonDisabled(item)}
                form={form}
                item={item}
                onClickHandler={selectQuoteClickHandler}
              />
            </>
          ) : (
            <FetchingQuoteSection />
          )}
        </Box>
      </Grid>
    </>
  );
}

export default withStyles(useStyles, { withTheme: true })(QuotesList);
