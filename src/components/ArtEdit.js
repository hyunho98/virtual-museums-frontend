import React, { useState, useEffect } from "react"
import { useParams, Redirect } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

function ArtEdit({ artPieces, setArtPieces }) {
    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:9292/art_pieces/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
            setName(data.name)
            setDescription(data.description)
            setArtistId(data.artist_id)
            setCompletionDate(data.completion_date)
            setImageLink(data.image_link)
        })
    }, [])

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [artistId, setArtistId] = useState(0)
    const [completionDate, setCompletionDate] = useState(Date.now)
    const [imageLink, setImageLink] = useState("")
    const [redirect, setRedirect] = useState(false)

    function submitHandler(e) {
        e.preventDefault()

        const fetchBody = {
            "name": name,
            "description": description,
            "artist_id": artistId,
            "completion_date": completionDate,
            "image_link": imageLink
        }

        fetch(`http://localhost:9292/art_pieces/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchBody)
        })
            .then((response) => response.json())
            .then((data) => {
                setArtPieces(artPieces.map((a) => (a.id === data.id) ? data : a))
                setRedirect(true)
            }) 
    }

    function deleteHandler(e) {
        fetch(`http://localhost:9292/art_pieces/${params.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(() => {
                setArtPieces(artPieces.filter((a) => (a.id == params.id) ? false : true))
                setRedirect(true)
            })
    }

    if (redirect) return <Redirect to={`/artists/${artistId}`} />

    return (
        <div>
            <div>
                <h2>Editing Art Piece</h2>
                <h3>{name}</h3>
            </div>
            <div>
                <Form onSubmit={submitHandler}>
                    <Form.Input
                        onChange={(e) => setName(e.target.value)}
                        placeholder="name"
                        value={name}
                    />
                    <Form.Input
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="description"
                        value={description}
                    />
                    <Form.Input
                        onChange={(e) => setArtistId(e.target.value)}
                        type="number"
                        placeholder="artist id"
                        value={artistId}
                    />
                    <Form.Input
                        onChange={(e) => setCompletionDate(e.target.value)}
                        type="date"
                        max={new Date().toISOString().slice(0, 10)}
                        value={completionDate}
                    />
                    <Form.Input
                        onChange={(e) => setImageLink(e.target.value)}
                        placeholder="image link"
                        value={imageLink}
                    />
                    <Form.Button>Submit</Form.Button>
                </Form>
                <Button 
                    onClick={deleteHandler} 
                    color="red" 
                    style={{margin: "20px"}}>
                    Delete Artist
                </Button>
            </div>
        </div>
    )
}

export default ArtEdit