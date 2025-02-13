import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button, Box } from "@mui/material";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hiddenWhenVisible = { display: visible ? "none" : "" };
  const shownWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <Box
        style={hiddenWhenVisible}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button variant="contained" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </Box>
      <Box
        style={shownWhenVisible}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {props.children}
        <Button sx={{margin: 1}} variant="contained" color="warning" onClick={toggleVisibility}>
          cancel
        </Button>
      </Box>
    </>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
