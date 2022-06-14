import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const emailRef = useRef()
  const passRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { login } = useAuth() 
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        setError(() => (''))
        setLoading(() => (true))
        await login(emailRef.current.value, passRef.current.value)
        navigate("/")  
    }
    catch(err){
        setError(() => ('Error! '+ err.message.substring(10,err.message.length)))
    }

    setLoading(() => (false));
  }

  return (
        <div className="w-100" style={{maxWidth: '400px'}}>
            <Card>
                <Card.Body>
                    <h3 className='text-center mb-4'>Log In</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="emal" ref={emailRef}></Form.Control>
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passRef}></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} type='submit' className="w-100 mt-2">Login In</Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <h6 className='text-center'>Dont have an account? <Link to="/signup">Sign Up</Link> </h6>
                </Card.Footer>
            </Card>
        </div>
    )
}
