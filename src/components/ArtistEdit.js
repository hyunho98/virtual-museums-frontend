import React, { useState, useEffect } from "react"
import { useParams, Redirect } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

function ArtistEdit({ artists, setArtists }) {
    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:9292/artists/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
            setName(data.name)
            setStyle(data.style)
            setMuseumId(data.museum_id)
            setImageLink(data.image_link)
        })
    }, [])

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

        fetch(`http://localhost:9292/artists/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchBody)
        })
            .then((response) => response.json())
            .then((data) => {
                setArtists(artists.map((a) => (a.id === data.id) ? data : a))
                setRedirect(true)
            }) 
    }

    function deleteHandler(e) {
        fetch(`http://localhost:9292/artists/${params.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(() => {
                setArtists(artists.filter((a) => (a.id == params.id) ? false : true))
                setRedirect(true)
            })
    }

    if (redirect) return <Redirect to={`/museums/${museumId}`} />

    return (
        <div>
            <div>
                <h2>Editing Artist</h2>
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
                        onChange={(e) => setStyle(e.target.value)}
                        placeholder="style"
                        value={style}
                    />
                    <Form.Input
                        onChange={(e) => setMuseumId(e.target.value)}
                        type="number"
                        placeholder="museum id"
                        value={museumId}
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

export default ArtistEdit