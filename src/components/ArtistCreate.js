import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

function ArtistCreate({ onCreateArtist }) {
    const [name, setName] = useState("")
    const [style, setStyle] = useState("")
    const [museumId, setMuseumId] = useState(0)
    const [imageLink, setImageLink] = useState("")
    const [redirect, setRedirect] = useState(false)

    function submitHandler(e) {
        e.preventDefault()

        const fetchBody = {
            "name": name,
            "style": style,
            "museum_id": museumId,
            "image_link": imageLink
        }

        fetch(`http://localhost:9292/artists`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchBody)
        })
            .then((response) => response.json())
            .then((data) => {
                onCreateArtist(data)
                setRedirect(true)
            })
    }

    if (redirect) return <Redirect exact to={`/museums/${museumId}`} />

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
                        onChange={(e) => setStyle(e.target.value)}
                        placeholder="style"
                        value={style}
                    />
                    <Form.Input
                        onChange={(e) => setMuseumId(e.target.value)}
                        type="number"
                        placeholder="museum id"
                        minimum={0}
                        value={museumId}
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