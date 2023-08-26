import React, { useState, useEffect } from "react"
import { useParams, Redirect } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

function MuseumEdit({ museums, setMuseums }) {
    useEffect(() => {
        fetch(`http://localhost:9292/museums/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
            setName(data.name)
            setCapacity(data.capacity)
            setImageLink(data.image_link)
        })
    }, [])

    const params = useParams()
    const [name, setName] = useState("")
    const [capacity, setCapacity] = useState(0)
    const [imageLink, setImageLink] = useState("")
    const [redirect, setRedirect] = useState(false)

    function submitHandler(e) {
        e.preventDefault()

        const fetchBody = {
            "name": name,
            "capacity": capacity,
            "image_link": imageLink
        }

        fetch(`http://localhost:9292/museums/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchBody)
        })
            .then((response) => response.json())
            .then((data) => {
                setMuseums(museums.map((m) => (m.id === data.id) ? data : m))
                setRedirect(true)
            }) 
    }

    function deleteHandler(e) {
        fetch(`http://localhost:9292/museums/${params.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(() => {
                setMuseums(museums.filter((m) => (m.id == params.id) ? false : true))
                setRedirect(true)
            })
    }

    if (redirect) return <Redirect to="/" />

    return (
        <div>
            <div>
                <h2>Editing Museum</h2>
                <h3>{name}</h3>
            </div>
            <div>
                <Form onSubmit={submitHandler}>
                    <Form.Input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <Form.Input
                        onChange={(e) => setCapacity(e.target.value)}
                        type="number"
                        placeholder="capacity"
                        min={0}
                        value={capacity}
                    />
                    <Form.Input
                        onChange={(e) => setImageLink(e.target.value)}
                        value={imageLink}
                    />
                    <Form.Button>Submit</Form.Button>
                </Form>
                <Button 
                    onClick={deleteHandler} 
                    color="red" 
                    style={{margin: "20px"}}>
                    Delete Museum
                </Button>
            </div>
        </div>
    )
}

export default MuseumEdit