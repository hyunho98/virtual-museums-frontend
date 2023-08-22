import React, { useState, useEffect } from "react"
import { Card, Container, Button } from "semantic-ui-react"
import { Redirect, useParams } from 'react-router-dom'
import ArtCard from './ArtCard'

function ArtistView() {
    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:9292/artists/${params.id}`)
            .then((response) => response.json())
            .then((data) => setArtist(data))
        fetch(`http://localhost:9292/artists/${params.id}/by_date`)
            .then((response) => response.json())
            .then((data) => setArtPieces(data))
    }, [])

    const [artist, setArtist] = useState()
    const [artPieces, setArtPieces] = useState([])
    const [redirect, setRedirect] = useState(false)
    const artPieceList = artPieces.map((artPiece) => 
        <ArtCard
            key={artPiece.id}
            id={artPiece.id}
            name={artPiece.name}
            artistName={artist.name}
            description={artPiece.description}
            completionDate={artPiece.completion_date}
            imageLink={artPiece.image_link}
        />
    )

    function clickHandler() {
        setRedirect(true)
    }

    if (redirect) return <Redirect to={`/art_pieces/create`} />

    return (
        <div>
            <Button onClick={clickHandler}> 
                Create New Art Piece
            </Button>
            <Container className="tileContainer">
                <Card.Group itemsPerRow={4}>
                    {artPieceList}
                </Card.Group>
            </Container>
        </div>
    )
}

export default ArtistView