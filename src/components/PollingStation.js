import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Spinner from '../assets/spinner.gif'

const PollingStation = () => {
  const [candidate1URL, changeCandidate1Url] = useState(Spinner)
  const [candidate2URL, changeCandidate2Url] = useState(Spinner)
  const [showResults, changeResultsDisplay] = useState(false)
  const [candidate1Vote, changeVote1] = useState('0')
  const [candidate2Vote, changeVote2] = useState('0')

  const sendVoteToBlockchain = async (index) => {
    await window.contract.addVote({
      prompt: localStorage.getItem('prompt'),
      index: index
    })

    await window.contract.recordUser({
      prompt: localStorage.getItem('prompt'),
      user: window.accountId
    })

    changeResultsDisplay(true)
  }

  useEffect(() => {
    const getInfo = async () => {
      // vote count stuff
      let voteCount = await window.contract.getVotes({
        prompt: localStorage.getItem('prompt'),
      })

      changeVote1(voteCount[0])
      changeVote2(voteCount[1])

      // image stuff

      changeCandidate1Url(
        await window.contract.getUrl({
          name: localStorage.getItem('Candidate1'),
        })
      )

      changeCandidate2Url(
        await window.contract.getUrl({
          name: localStorage.getItem('Candidate2'),
        })
      )

      // vote checking stuff

      let didUserVote = await window.contract.didParticipate({
        prompt: localStorage.getItem('prompt'),
        user: window.accountId
      })

      changeResultsDisplay(didUserVote)

    }
    getInfo()
  }, [])

  return (
    <Container>
      <Row>
        <Col className='justify-content-center d-flex'>
          <Container>
            <Row style={{ marginTop: '5vh', backgroundColor: '#c4c4c4' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '3vw',
                }}
              >
                <img
                  style={{
                    height: '35vh',
                    width: '20vw',
                  }}
                  src={candidate1URL}
                ></img>
              </div>
            </Row>
            {showResults ? (
              <Row
                className='justify-content-center d-flex'
                style={{
                  marginTop: '5vh',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '8vw',
                    padding: '10px',
                    backgroundColor: '#c4c4c4',
                  }}
                >
                  {candidate1Vote}
                </div>
              </Row>
            ) : null}
            <Row
              className='justify-content-center d-flex'
              style={{
                marginTop: '5vh',
              }}
            >
              <Button disabled={showResults} onClick={() => sendVoteToBlockchain(0)}>Vote</Button>
            </Row>
          </Container>
        </Col>
        <Col className='justify-content-center d-flex align-items-center'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: '#c4c4c4',
              height: '20vh',
              alignItems: 'center',
              padding: '2vw',
              textAlign: 'center',
            }}
          >
            {localStorage.getItem('prompt')}
          </div>
        </Col>
        <Col className='justify-content-center d-flex'>
          <Container>
            <Row style={{ marginTop: '5vh', backgroundColor: '#c4c4c4' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '3vw',
                }}
              >
                <img
                  style={{
                    height: '35vh',
                    width: '20vw',
                  }}
                  src={candidate2URL}
                ></img>
              </div>
            </Row>
            {showResults ? (
              <Row
                className='justify-content-center d-flex'
                style={{
                  marginTop: '5vh',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '8vw',
                    padding: '10px',
                    backgroundColor: '#c4c4c4',
                  }}
                >
                  {candidate2Vote}
                </div>
              </Row>
            ) : null}
            <Row
              className='justify-content-center d-flex'
              style={{
                marginTop: '5vh',
              }}
            >
              <Button disabled={showResults} onClick={() => sendVoteToBlockchain(1)}>Vote</Button>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default PollingStation
