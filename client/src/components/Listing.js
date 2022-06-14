import React, { useEffect, useState } from 'react'
import {Accordion, Row, Col, Card, ListGroup, ListGroupItem, Form, Button} from 'react-bootstrap'

export default function Listing(props) {
  const [data, setData] = useState(props.data)

  useEffect(()=>{
    setData(() =>([...props.data]))
  }, [props.data])

  const [filter, setFilter] = useState({
    minYoe: 0,
    maxYoe: 100,
    minSalary: 0,
    maxSalary: 100000000
  })

  const handleChange = (e) => {
    const{name, value} = e.target

    setFilter((prev) => ({
        ...prev,
        [name]: value,
    }))
  }

  const handleFilter = () => {
    let filteredData = props.data.filter((item) => {
        return (filter.minYoe <= item.yoe && item.yoe <= filter.maxYoe)
    })

    filteredData = filteredData.filter((item) => {
        return (filter.minSalary <= item.salary && item.salary <= filter.maxSalary)
    })

    setData(() => ([...filteredData]))
  }

  const handleClear = () => {
    setFilter(() => ({
        minYoe: 0,
        maxYoe: 100,
        minSalary: 0,
        maxSalary: 100000000
    }))

    setData(() => ([...props.data]))
  }

  const sortAlph = () => {
    let sortedData = [...data]
    sortedData.sort((item1, item2) => {
        let x = item1.name.toLowerCase();
        let y = item2.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    })

    setData(() => ([...sortedData]))
  }

  const sortAge = () => {
    let sortedData = [...data]
    sortedData.sort((item1, item2) => (item1.age-item2.age))

    setData(() => ([...sortedData]))
  }

  const sortSalary = () => {
    let sortedData = [...data]
    sortedData.sort((item1, item2) => (item1.salary-item2.salary))

    setData(() => ([...sortedData]))
  }

  const sortYoe = () => {
    let sortedData = [...data]
    sortedData.sort((item1, item2) => (item1.yoe-item2.yoe))

    setData(() => ([...sortedData]))
  }

  return (
    <div className='mb-2'>
        <Accordion className="mb-2" defaultActiveKey="0">
            <Accordion.Item>
                <Accordion.Header>Filters</Accordion.Header>
                    <Accordion.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>YOE</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Control type="text" name='minYoe' value={filter.minYoe} onChange={handleChange}/>
                                    <Form.Text className="text-muted">
                                        minimum YOE
                                    </Form.Text>
                                </Col>
                                <Col>
                                    <Form.Control type="text" name='maxYoe' value={filter.maxYoe} onChange={handleChange}/>
                                    <Form.Text className="text-muted">
                                        maximum YOE
                                    </Form.Text>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Salary</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Control type="text" name='minSalary' value={filter.minSalary} onChange={handleChange}/>
                                    <Form.Text className="text-muted">
                                        minimum Salary
                                    </Form.Text>
                                </Col>
                                <Col>
                                    <Form.Control type="text" name='maxSalary' value={filter.maxSalary} onChange={handleChange}/>
                                    <Form.Text className="text-muted">
                                        maximum Salary
                                    </Form.Text>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Button className="me-2" onClick={handleFilter}>
                            Apply
                        </Button>
                        <Button onClick={handleClear}>
                            Clear
                        </Button>
                    </Form>
                    <h6 className="my-3">Sort <span className="text-muted">(on the basis of)</span></h6>
                    <Button className='me-2' onClick={sortAlph}>A-Z</Button>
                    <Button className='me-2' onClick={sortAge}>Age</Button>
                    <Button className='me-2' onClick={sortYoe}>YOE</Button>
                    <Button className='me-2' onClick={sortSalary}>Salary</Button>
                    </Accordion.Body>
            </Accordion.Item>
        </Accordion>

        <div className="d-flex justify-content-center m-2">
            <h1>Employees</h1>
        </div>

        <Row xs={1} md={2} lg={3} className="g-4">
            {data.map((item, idx) => (
                <Col key={item._id}>
                <Card>
                    <Card.Header as="h4">{item.name[0].toUpperCase() + item.name.slice(1)}</Card.Header>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>AGE : {item.age}</ListGroupItem>
                        <ListGroupItem>SALARY : {item.salary}</ListGroupItem>
                        <ListGroupItem>YOE: {item.yoe}</ListGroupItem>
                        <ListGroupItem>SKILLS: {item.skills.join(', ').toUpperCase()}</ListGroupItem>
                    </ListGroup>
                </Card>
                </Col>
            ))}
        </Row>
    </div>
  )
}
