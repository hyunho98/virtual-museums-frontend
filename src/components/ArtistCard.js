import React, { useState } from "react"
import { Card, Button } from "semantic-ui-react"
import { Redirect } from "react-router-dom"

function ArtistCard({ id, name, style, museumName, imageLink }) {
    const [editDirect, setEditDirect] = useState(false)
    const [viewDirect, setViewDirect] = useState(false)

    function editHandler() {
        setEditDirect(() => true)
    }

    function viewHandler() {
        setViewDirect(() => true)
    }

    if (editDirect) return <Redirect to={`/artists/${id}/edit`} />

    if (viewDirect) return <Redirect to={`/artists/${id}`} />

    return (
        <Card>
            <div>
                <div>
                    <img src={imageLink} alt="missing image" />
                </div>
                <div>
                    <h3>{name}</h3>
                    <h4>Style: {style}</h4>
                    <h4>Current Museum: {museumName}</h4>
                    <Button onClick={editHandler} className="semanticButton" basic>
                        Edit
                    </Button>
                    <Button onClick={viewHandler} className="semanticButton" basic>
                        View
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default ArtistCard