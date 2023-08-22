import React, { useState, useEffect } from "react"
import { Card, Container, Button } from "semantic-ui-react"
import { Redirect, useParams } from 'react-router-dom'
import ArtistCard from './ArtistCard'

function MuseumView() {
    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:9292/museums/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setMuseum(data)
                setArtists(data.artists)
            })
    }, [])

    const [museum, setMuseum] = useState()
    const [artists, setArtists] = useState([])
    const [redirect, setRedirect] = useState(false)
    const artistList = artists.map((artist) => 
        <ArtistCard
            key={artist.id}
            id={artist.id} 
            name={artist.name}
            style={artist.style}
            museumName={museum.name}
            imageLink={artist.image_link}
        />
    )

    function clickHandler() {
        setRedirect(true)
    }

    if (redirect) return <Redirect to={`/artists/create`} />

    return (
        <div>
            <Button onClick={clickHandler}> 
                Create New Artist
            </Button>
            <Container className="tileContainer">
                <Card.Group itemsPerRow={4}>
                    {artistList}
                </Card.Group>
            </Container>
        </div>
    )
}

export default MuseumView