import { useState } from 'react'
import {Button, Container, Card, Form} from 'react-bootstrap'
import { useAuth } from '../context/authContext'
import { URLS } from '../utils/urls'

type AuthProps = {
    param: string
}

export function Auth() {
    const { checkPassword } = useAuth()
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordMatches, setPasswordMatches] = useState(true)

    return(
        <Container fluid className="d-flex align-items-center justify-content-center"
                   style={{
                    backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img7.webp)',
                    height: "100%",
                    width: "100%",
                    position: "absolute"
                   }}>
            <div className='mask gradient-custom-3'></div>
            <Card className="m-5" style={{width: '600px', height: '600px'}}>
                <Card.Body className="px-5">
                    <h2 className="text-center mb-5">Create an account</h2>
                    <Form>
                        <Form.Group className="mb-4" controlId="Name">
                            <Form.Control type="text" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Your Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
                            <Form.Control type="password" placeholder="Confirm Password" required value={confirmPassword} 
                            onChange={(e) => {
                                setConfirmPassword(e.target.value); 
                                setPasswordMatches(checkPassword(password, confirmPassword));
                                }}/>
                        </Form.Group>
                        <div className='d-flex flex-row justify-content-center mb-4'>
                            <Form.Check className="mb-4" label="I agree all statements in Terms of service"/>
                        </div>
                    </Form>
                    <Button className="mb-4 w-100 gradient-custom-4">Register</Button>
                    <h5 className="text-center">Have already an account?</h5>
                    <p className="text-center">
                        <a href={URLS.login} className="link-secondary">
                            Login here 
                        </a>
                    </p>
                </Card.Body>
            </Card>
        </Container>
    )
}