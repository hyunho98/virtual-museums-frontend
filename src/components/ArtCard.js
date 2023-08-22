import React, { useState } from "react"
import { Card, Button } from "semantic-ui-react"
import { Redirect } from "react-router-dom"

function ArtCard({ id, name, artistName, description, completionDate, imageLink }) {
    const [editDirect, setEditDirect] = useState(false)

    function editHandler() {
        setEditDirect(() => true)
    }

    if (editDirect) return <Redirect to={`/art_pieces/${id}/edit`} />

    return (
        <Card>
            <div>
                <div>
                    <img src={imageLink} alt="missing" />
                </div>
                <div>
                    <h3>{name}</h3>
                    <h4>Description: {description}</h4>
                    <h4>Artist: {artistName}</h4>
                    <h4>ID No. {id}</h4>
                    <h4>Completed on {completionDate}</h4>
                    <Button onClick={editHandler} className="semanticButton" basic>
                        Edit
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default ArtCard