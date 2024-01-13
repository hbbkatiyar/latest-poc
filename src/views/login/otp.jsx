import React, { Component } from "react";
import OtpInput from "react-otp-input";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { renderOTPTimer } from "../../helpers/utils";

const useStyles = (theme) => ({
  inputStyle: {
    width: "40px !important",
    height: "40px",
    margin: "5px",
    fontSize: "18px",
    borderRadius: "5px",
    borderWidth: "1px",
    borderColor: "rgba(0, 0, 0, 0.11)",
    boxShadow: "inset 1px 2px 4px 1px rgba(0, 0, 0, 0.11)",
    backgroundColor: "#ecf0f4",
  },
  customBtn: {
    display: "flex",
    color: "#F28F8F",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("sm")]: {
      justifyContent: "space-between",
      flexDirection: "row-reverse",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "space-between",
      flexDirection: "row-reverse",
    },
  },
  customBtn1: {
    display: "flex",
    justifyContent: "center",
  },
  otpMessage: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "start",
    },
  },
  seconds: {
    padding: "14px 0",
    width: "80px",
    textAlign: "center",
  },
  changeNumberBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  changeNumber: {
    color: theme.palette.secondary.main,
    padding: theme.spacing(0, 0, 0, 2),
  },
  otpInputs: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
});

class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      numInputs: 6,
      separator: "-",
      isDisabled: false,
      hasErrored: false,
      isInputNum: false,
      isDesktop: window.innerWidth > 600,
      time: {},
      seconds: 300,
      disabled: false,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  handleOtpChange = (otp) => {
    this.setState({ otp: otp }, () => {
      this.props.otpCallBack(otp);
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    alert(this.state.otp);
  };

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.setState({
        disabled: true,
      });
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    if (seconds === 0) {
      clearInterval(this.timer);
      this.setState({
        disabled: false,
        seconds: 300,
      });
      this.timer = 0;
    }
  }

  componentWillMount = () => {
    this.startTimer();
  };

  render() {
    const isDesktop = this.state.isDesktop;
    const {
      otp,
      numInputs,
      // separator,
      isDisabled,
      hasErrored,
      isInputNum,
    } = this.state;
    const { classes } = this.props;
    return (
      <Box display="flex" justifyContent="center" pt={1} pb={4}>
        <form onSubmit={this.handleSubmit}>
          {/*<Typography variant={"h5"}>Enter OTP</Typography>*/}
          <Box className={classes.otpInputs}>
            <OtpInput
              inputStyle={classes.inputStyle}
              numInputs={numInputs}
              isDisabled={isDisabled}
              hasErrored={hasErrored}
              errorStyle="error"
              onChange={this.handleOtpChange}
              // separator={<span>{separator}</span>}
              isInputNum={isInputNum}
              shouldAutoFocus
              value={otp}
            />
          </Box>
          <Box
            className={`${
              isDesktop ? classes.customBtn : classes.customBtn1
            } optBtn`}
          >
            <Button
              variant="text"
              // size="large"
              color="secondary"
              onClick={(e) => {
                this.startTimer();
                this.props.resendOtp();
              }}
              disabled={this.state.disabled}
            >
              RESEND OTP
            </Button>
            {this.state.disabled && (
              <Typography variant={"body2"} className={classes.seconds}>
                {renderOTPTimer(this.state.seconds)}
              </Typography>
            )}
            {/* {this.props.changeNumber &&
                        <Box
                            className={classes.changeNumberBox}
                            onClick={(e) => {
                            this.props.onChangeNumberClick(0)
                        }}>
                            <Typography variant={"caption"} className={classes.changeNumber}>
                                <u>CHANGE NUMBER</u>
                            </Typography>
                        </Box> 
                        } */}
          </Box>
        </form>
      </Box>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Otp);
