import { Button, Tabs, Tab, Accordion, Form, Row, Col } from 'react-bootstrap'
import React, {useState, useEffect} from 'react'
import { useAuth } from '../context/AuthProvider'
import {useNavigate} from 'react-router-dom'

import Analytics from './Analytics'
import Listing from './Listing'

import api from '../api'

export default function Dashboard() {
  const {currentUser, logout} = useAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [user, setUser] = useState({
    name: "",
    age: "",
    salary: "",
    yoe: "",
    skills: []
  })

  const [skill, setSkill] = useState([])

  useEffect(() => {
    getData()
  }, [])
  
  const getData = async() => {
    await api.getAllUsers().then(res => {
      setData(() => ([...res.data.data]))
    })
  }

  const handleLogout = async() => {
    setError('')

    try{
      await logout()
      navigate('/login')
    }
    catch(err){
      setError(err)
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target

    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddSkill = () => {
    setUser(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }))

    setSkill(() => '')
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    await api.insertUser(user).then(() => {
      setUser(() => ({
        name: "",
        age: "",
        salary: "",
        yoe: "",
        skills: []
      }))
    })
    
    getData()
  }

  return (
    <div className='h-100 w-100'>
      <div className='d-flex align-items-center bg-success p-3 rounded-3'>
        {error && <p>{error}</p>}
        <h6 className="me-auto fw-bold fs-3" style={{color: 'white'}}>Welcome {currentUser.email}</h6>
        <Button variant='secondary' className='rounded-2 fw-bold border' onClick={handleLogout}>Log Out</Button>
      </div>
      <div>
        <Accordion className="my-2" defaultActiveKey="0">
          <Accordion.Item>
            <Accordion.Header><h3 className='fw-bolder' style={{color: 'rgb(1, 143, 11)'}}>➕ Add an employee</h3></Accordion.Header>
              <Accordion.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" name='name' value={user.name} onChange={handleChange}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Age</Form.Label>
                      <Form.Control type="text" name='age' value={user.age} onChange={handleChange}/>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Salary</Form.Label>
                      <Form.Control type="text" name='salary' value={user.salary} onChange={handleChange}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>YOE</Form.Label>
                      <Form.Control type="text" name='yoe' value={user.yoe} onChange={handleChange}/>
                    </Form.Group>
                  </Col>
                </Row>
              
                <Form.Group className="mb-3">
                  <Row>
                    <Form.Label>Skills</Form.Label>
                    <Col>
                      <Form.Control type="text" name='skill' value={skill} onChange={e => {setSkill(() => e.target.value)}}/>
                    </Col>
                    <Col>
                      <Button className="me-2" onClick={handleAddSkill}>
                        Add
                      </Button>
                    </Col>
                  </Row>            
                  <Form.Text className="mt-2">{user.skills.join(', ').toUpperCase()}</Form.Text>
                </Form.Group>

                <Button variant='success' className='w-100' type='submit'>Create</Button>
                
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className='p-2 border rounded-2'>
        <Tabs defaultActiveKey="DashBoard" className="mb-3 border rounded-2">
          
          <Tab eventKey="DashBoard" title="DashBoard">
            <Analytics data={data}/>
          </Tab>

          <Tab eventKey="Listing" title="Listing">
            <Listing data={data}/>
          </Tab>

        </Tabs>
      </div>
    </div>
  )
}
