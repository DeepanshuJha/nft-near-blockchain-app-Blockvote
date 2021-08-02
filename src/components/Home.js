import React, { useState, useEffect } from 'react'
import { Table, Container, Button } from 'react-bootstrap'

const Home = ({ changeCandidates }) => {
  
  const [promptList, setPromptList] = useState([])

  useEffect(() => {
    const getCurrentPromptArray = async () => {
      let tempPromptArray = await window.contract.getAllPrompt()
      setPromptList(tempPromptArray)
    }
    getCurrentPromptArray()
    console.log(promptList)
  }, [])

  return (
    <Container>
      <Table style={{ margin: '5vh' }} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>List of Polls</th>
            <th>Go to Poll</th>
          </tr>
        </thead>
        <tbody>
          {promptList.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{el}</td>
                <td>
                  <Button onClick={() => changeCandidates(el)}>Go to Poll</Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}

export default Home
