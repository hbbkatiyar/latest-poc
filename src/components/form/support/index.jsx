import React, { useState } from "react";
import { useStyles } from "./style";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";
import { Button, Typography, Grid, CircularProgress } from "@material-ui/core";
import { Formik, Form } from "formik";
import { initialValues } from "./initialValues";
import TextField from "../../formUIFields/TextFields";
import SelectField from "../../formUIFields/Select";
import validation from "./validation";
import { supportSubjects } from "../../../defaultValues/index";

function SupportForm({ classes, onSubmit, loading }) {
  return (
    <Formik
      initialValues={{ ...initialValues() }}
      onSubmit={onSubmit}
      validationSchema={validation()}
    >
      {(props) => {
        return (
          <Form>
            <Box className={classes.col12}>
              <TextField
                name="name"
                type={"text"}
                variant="standard"
                placeholder="Your Name"
                isLabel={false}
                fullWidth
                wrapper={(component) => {
                  return <Box className={classes.gutterSpace}>{component}</Box>;
                }}
              />
              <TextField
                name="email"
                type={"text"}
                variant="standard"
                placeholder="Email"
                isLabel={false}
                fullWidth
                wrapper={(component) => {
                  return <Box className={classes.gutterSpace}>{component}</Box>;
                }}
              />
            </Box>
            <Box className={classes.col12}>
              <TextField
                name="mobile"
                type={"text"}
                variant="standard"
                placeholder="Mobile"
                isLabel={false}
                fullWidth
                wrapper={(component) => {
                  return <Box className={classes.gutterSpace}>{component}</Box>;
                }}
              />

              <SelectField
                name="type_of_query"
                type={"text"}
                options={supportSubjects}
                variant="standard"
                placeholder="Type Of Query"
                isLabel={false}
                fullWidth
                wrapper={(component) => {
                  return <Box className={classes.gutterSpace}>{component}</Box>;
                }}
              />
            </Box>
            <Box className="col-12">
              <TextField
                name="message"
                type={"text"}
                variant="standard"
                placeholder="Your Message..."
                isLabel={false}
                fullWidth
                wrapper={(component) => {
                  return <Box className={classes.gutterSpace}>{component}</Box>;
                }}
              />
            </Box>
            <Button
              type="submit"
              disabled={loading}
              className={classes.submitBtn}
            >
              {loading ? (
                <CircularProgress color="primary" size={30} />
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default withStyles(useStyles)(SupportForm);
