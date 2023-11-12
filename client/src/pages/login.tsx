import { observer } from "mobx-react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { ReactComponent as LoginImage } from "../assets/images/svg/login.svg";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useAppContext } from "../context";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { containerClasses } from "@mui/material";
import theme from "../theme";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        JSON PLAYGROUND
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LoginPage = observer(() => {
  const { store } = useAppContext();
  const navigate = useNavigate();

  const [error, setError] = useState<boolean>(false);
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
    };

    const name = target.name.value;
    if (!name) {
      setError(true);
      return;
    }
    store.user.setUser(name);
    navigate("/files", {
      relative: "path",
    });
  };
  return (
    <>
      <StyledContainer>
        <Box className="contentLogin">
          <Typography className="titleLogin">Sign in</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <center>
              <LoginImage />
              <label htmlFor="input" className="userName">
                <p>Username</p>
                <input type="text" id="name" />
              </label>
              {error && <p className="error">Can't be empty </p>}
            </center>

            <center>
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </StyledButton>
            </center>
          </Box>
        </Box>
      </StyledContainer>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
});

export default LoginPage;

const StyledButton = styled(Button)`
  width: 120px;
  height: 35px;
  margin: 10px;
  background: ${theme.palette.grey[400]};
  border: 3px outset;
  box-shadow: 2px 2px 3px black;
  font-size: 15px;
`;

const StyledContainer = styled(Container)`
  &.${containerClasses.root} {
    padding: 2px;
  }
  .error {
    color: ${theme.palette.error.dark};
  }
  width: 300px;
  min-height: 300px;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  background: ${theme.palette.grey[400]};
  border-top: 2px solid ${theme.palette.text.primary};
  border-left: 2px solid ${theme.palette.text.primary};
  border-right: 2px solid ${theme.palette.grey[100]};
  border-bottom: 2px solid ${theme.palette.grey[100]};
  box-shadow: 2px 2px 4px ${theme.palette.grey[100]};

  .contentLogin {
    width: 100%;
    height: 100%;
    color: ${theme.palette.text.primary};
  }
  .titleLogin {
    width: 100%;
    height: 25px;
    padding: 10px;
    background: linear-gradient(90deg, #020880, #0f7ac6);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }
  .userName {
    color: black;
    font-weight: bold;
    input {
      width: 210px;
      height: 25px;
    }
    p {
      padding: 0;
      margin: 0;
    }
  }
`;
