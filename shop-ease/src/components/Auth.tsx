import { useState, useEffect } from "react";
import { Button, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { URLS } from "../utils/urls";

type AuthProps = {
  isLoginPage: boolean;
};

export function Auth({ isLoginPage }: AuthProps) {
  const { checkPassword, register, login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [passwordMatches, setPasswordMatches] = useState(true);

  useEffect(() => {
    setPasswordMatches(checkPassword(password, confirmPassword));
  }, [password, confirmPassword]);

  if (isLoginPage) {
    return (
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{
          backgroundImage:
            "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img7.webp)",
          height: "100%",
          width: "100%",
          position: "absolute",
          objectFit: "fill",
          top: "0px",
        }}
      >
        <div className="mask gradient-custom-3"></div>
        <Card style={{ width: "500px", height: "500px" }}>
          <Card.Body className="px-5">
            <h2 className="text-center mb-5">Sign in</h2>
            <Form noValidate>
              <Form.Group
                className="mb-4"
                controlId="formBasicEmail"
                style={{ paddingTop: "20px" }}
              >
                <Form.Control
                  type="text"
                  placeholder="Your Email"
                  isValid={email !== ""}
                  isInvalid={email === ""}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  isValid={password !== ""}
                  isInvalid={password === ""}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Form>
            <div
              className="d-flex justify-content-center"
              style={{ paddingTop: "30px" }}
            >
              <Button
                className="mb-4 w-50 gradient-custom-4"
                disabled={!email || !password}
                onClick={() => login(email, password)}
              >
                Login
              </Button>
            </div>
            <h5 className="text-center" style={{ paddingTop: "40px" }}>
              Don't have an account?
            </h5>
            <p className="text-center">
              <a href={URLS.register} className="link-secondary">
                Register here
              </a>
            </p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img7.webp)",
        height: "100%",
        width: "100%",
        position: "absolute",
        objectFit: "fill",
        top: "0px",
      }}
    >
      <div className="mask gradient-custom-3"></div>
      <Card className="m-5" style={{ width: "600px", height: "600px" }}>
        <Card.Body className="px-5">
          <h2 className="text-center mb-5">Create an account</h2>
          <Form noValidate>
            <Form.Group className="mb-4" controlId="Name">
              <Form.Control
                type="text"
                placeholder="Your Name"
                isValid={name !== ""}
                isInvalid={name === ""}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Your Email"
                isValid={email !== ""}
                isInvalid={email === ""}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                isValid={passwordMatches && password !== ""}
                isInvalid={!passwordMatches || password === ""}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                isValid={passwordMatches && confirmPassword !== ""}
                isInvalid={!passwordMatches || confirmPassword === ""}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Form.Group>
            <div className="d-flex flex-row justify-content-center mb-4">
              <Form.Check
                className="mb-4"
                label="I agree all statements in Terms of service"
                isValid={termsAgreed}
                isInvalid={!termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
              />
            </div>
          </Form>
          <Button
            type="submit"
            className="mb-4 w-100 gradient-custom-4"
            disabled={
              !name ||
              !email ||
              !password ||
              !confirmPassword ||
              !passwordMatches ||
              !termsAgreed
            }
            onClick={() => register(name, email, password, confirmPassword)}
          >
            Register
          </Button>
          {!passwordMatches && (
            <div
              className="d-flex flex-row justify-content-center"
              style={{ color: "red" }}
            >
              Password doesn't match!
            </div>
          )}
          <h5 className="text-center" style={{ paddingTop: "10px" }}>
            Have already an account?
          </h5>
          <p className="text-center">
            <a href={URLS.login} className="link-secondary">
              Login here
            </a>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
