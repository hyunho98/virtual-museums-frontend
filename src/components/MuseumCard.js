import React, { useState } from "react"
import { Card, Button } from "semantic-ui-react"
import { Redirect } from "react-router-dom"

function MuseumCard({ id, name, capacity, image_link }) {
    const [editDirect, setEditDirect] = useState(false)
    const [viewDirect, setViewDirect] = useState(false)

    function editHandler() {
        setEditDirect(() => true)
    }

    function viewHandler() {
        setViewDirect(() => true)
    }

    // if (editDirect) return <Redirect to={`/museums/${id}/edit`} />

    return (
        <Card>
            <div>
                <div>
                    <img src={image_link} alt="missing image" />
                </div>
                <div>
                    <h3>{name}</h3>
                    <h4>Capacity: {capacity} Artists</h4>
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

export default MuseumCard