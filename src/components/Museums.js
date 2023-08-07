import "../App.css"
import React, { useState, useEffect } from "react"
import { Card, Container } from "semantic-ui-react"
import MuseumCard from './MuseumCard.js'

function Museums() {
    useEffect (() => {
        fetch('http://localhost:9292/museums')
        .then((response) => response.json())
        .then((data) => setMuseums(data))
    }, [])

    const [museums, setMuseums] = useState()
}

export default Museums