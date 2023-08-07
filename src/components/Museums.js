import "../App.css"
import React, { useState, useEffect } from "react"
import { Card, Container } from "semantic-ui-react"
import MuseumCard from './MuseumCard.js'

function Museums() {
    useEffect (() => {
        fetch(`http://localhost:9292/museums`)
            .then((response) => response.json())
            .then((data) => {
                setMuseums(data)
            })
    }, [])

    const [museums, setMuseums] = useState([])
    const museumList = museums.map((museum) => 
        <MuseumCard
            key={museum.id}
            id={museum.id} 
            name={museum.name}
            capacity={museum.capacity}
            image_link={museum.image_link}
        />
    )

    return (
        <Container className="tileContainer">
            <Card.Group itemsPerRow={4}>
                {museumList}
            </Card.Group>
        </Container>
    )
}

export default Museums