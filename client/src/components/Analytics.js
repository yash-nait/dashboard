import React, { useEffect, useState } from 'react'
import {Card, Col, Row} from 'react-bootstrap'
import { Bar, Line} from 'react-chartjs-2'
import {Chart as Chartjs} from 'chart.js/auto'

export default function Listing(props) {
  const [data, setData] = useState(props.data)
  const [empNames, setEmpNames] = useState([])
  const [empYoe, setEmpYoe] = useState([])
  const [empSalary, setEmpSalary] = useState([]) 

  useEffect(()=>{
    setData(() =>([...props.data]))
    
    const names = props.data.map(item => {
      return item.name
    })
    setEmpNames(() => ([...names]))

    const yoe = props.data.map(item => {
      return item.yoe
    })
    setEmpYoe(() => ([...yoe]))

    const salary = props.data.map(item => {
      return item.salary
    })
    setEmpSalary(() => ([...salary]))

  }, [props.data])



  return (
    <div className='mb-2'>
        <div className="d-flex justify-content-center m-2">
            <h1>Analytics</h1>
        </div>
        <div className="d-flex justify-content-center m-2">
            <h3>Total Employees: {data.length}</h3>
        </div>
        <div>
          <Row>
            <Col>
              <Bar
                data = {{
                  labels: empNames,
                  datasets: [
                    {
                      label: 'Salary',
                      data: empSalary
                    }
                  ]
                }}
              />
              <div className='d-flex justify-content-center my-2'>
                <h3>Average Salary: {empSalary.length === 0 ? 0 : ((empSalary.reduce((res, item)=>(res+item),0))/empSalary.length).toFixed(2)}</h3>
              </div>
            </Col>
            <Col>
              <Line
                data = {{
                  labels: empNames,
                  datasets: [
                    {
                      label: 'YOE',
                      data: empYoe
                    }
                  ]
                }}
              />
              <div className='d-flex justify-content-center my-2'>
                <h3>Average YOE: {empYoe.length === 0 ? 0 : ((empYoe.reduce((res, item)=>(res+item),0))/empYoe.length).toFixed(2)}</h3>
              </div>
            </Col>
          </Row>
        </div>
    </div>
  )
}
