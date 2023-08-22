import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

function ArtistCreate({ onCreateArtPiece }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [artistId, setArtistId] = useState(0)
    const [completionDate, setCompletionDate] = useState(new Date().toISOString().slice(0, 10))
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

        fetch(`http://localhost:9292/art_pieces`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchBody)
        })
            .then((response) => response.json())
            .then((data) => {
                onCreateArtPiece(data)
                setRedirect(true)
            })
    }

    if (redirect) return <Redirect exact to={`/artists/${artistId}`} />

    return (
        <div>
            <div>
                <h2>Creating New Artist</h2>
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
                        minimum={0}
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
            </div>
        </div>
    )
}

export default ArtistCreate