import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

function MuseumCreate({ onCreateMuseum }) {
    const [name, setName] = useState()
    const [capacity, setCapacity] = useState()
    const [imageLink, setImageLink] = useState()
    const [redirect, setRedirect] = useState(false)

    function submitHandler(e) {
        e.preventDefault()

        const fetchBody = {
            "name": name,
            "capacity": capacity,
            "image_link": imageLink
        }

        fetch(`http://localhost:9292/museums`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchBody)
        })
            .then((response) => response.json())
            .then((data) => {
                onCreateMuseum(data)
                setRedirect(true)
            })
    }

    if (redirect) return <Redirect to='/' />

    return (
        <div>
            <div>
                <h2>Creating New Museum</h2>
            </div>
            <div>
                <Form onSubmit={submitHandler}>
                    <Form.Input
                        onChange={(e) => setName(e.target.value)}
                        placeholder="name"
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
                        placeholder="image link"
                        value={imageLink}
                    />
                    <Form.Button>Submit</Form.Button>
                </Form>
            </div>
        </div>
    )
}

export default MuseumCreate