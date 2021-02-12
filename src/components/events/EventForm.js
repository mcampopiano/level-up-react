import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider"
import { EventContext } from "./EventProvider"

export const EventForm = () => {
    const history = useHistory()
    const [currentEvent, setEvent] = useState({})
    const {games, getGames} = useContext(GameContext)
    const {createEvent} = useContext(EventContext)

    useEffect(() => {
        getGames()
    }, [])

    const changeEventState = event => {
        const newEventState = Object.assign({}, currentEvent)
        newEventState[event.target.name] = event.target.value
        setEvent(newEventState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                    value={currentEvent.gameId}
                    onChange={changeEventState}>
                        <option value="0">Select a game</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="eventTime">When: </label>
                <div></div>
                <input type="date" name="eventTime" onChange={changeEventState} />
            </fieldset>
            <fieldset>
                <label htmlFor="location">Where: </label>
                <div></div>
                <input type="text" name="location" onChange={changeEventState} />
            </fieldset>

            <button type="submit"
                onClick={event => {
                    event.preventDefault()
                    createEvent({
                        eventTime: currentEvent.eventTime,
                        location: currentEvent.location,
                        gameId: parseInt(currentEvent.gameId)
                    })
                    .then(() => history.push("/events"))
                }}>Create Event</button>
        </form>
    )
}