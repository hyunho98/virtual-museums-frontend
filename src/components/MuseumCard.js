import React, { useState } from "react"
import { Card, Button } from "semantic-ui-react"
import { Redirect } from "react-router-dom"

function MuseumCard(museum) {
    const [redirect, setRedirect] = useState(false)

    function editHandler() {
        setRedirect(() => true)
    }

    if (redirect) return <Redirect to={`/museums/${museum.id}/edit`} />

    return (
        <Card>
            <div>
                <div>
                    <img src={museum.image_link} alt="missing image" />
                </div>
                <div>
                    <h3>{museum.name}</h3>
                    <h4>Capacity: {museum.artists.length} out of {museum.capacity}</h4>
                    <Button onClick={editHandler}>
                        Edit
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default MuseumCard