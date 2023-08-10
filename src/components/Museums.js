import "../App.css"
import React, { useState } from "react"
import { Card, Container, Button } from "semantic-ui-react"
import { Redirect } from 'react-router-dom'
import MuseumCard from './MuseumCard.js'

function Museums({ museums }) {
    const [redirect, setRedirect] = useState(false)
    const museumList = museums.map((museum) => 
        <MuseumCard
            key={museum.id}
            id={museum.id} 
            name={museum.name}
            capacity={museum.capacity}
            image_link={museum.image_link}
        />
    )

    function clickHandler() {
        setRedirect(true)
    }

    if (redirect) return <Redirect to='/museums/create' />

    return (
        <div>
            <Button onClick={clickHandler}> 
                Create New Museum
            </Button>
            <Container className="tileContainer">
                <Card.Group itemsPerRow={4}>
                    {museumList}
                </Card.Group>
            </Container>
        </div>
    )
}

export default Museums