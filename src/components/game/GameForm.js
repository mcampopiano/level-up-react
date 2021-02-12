import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "./GameProvider"

export const GameForm = () => {
    const history = useHistory()
    const {createGame, getGameTypes, gameTypes} = useContext(GameContext)

    const [currentGame, setCurrentGame] = useState({
        title: "",
        gameTypeId: 0,
        number_of_players: 1,
        description: ""
    })

    useEffect(() => {
        getGameTypes()
    }, [])

    const changeGameState = event => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control" 
                    value={currentGame.title} 
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select name="gameTypeId" className="gameTypeId" onChange={changeGameState}>
                        <option key="0" value="0">Choose a game type</option>
                        {
                            gameTypes.map(gt => {
                                return <option key={gt.id} value={gt.id}>{gt.label}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of players: </label>
                    <input type="number" min="1" name="number_of_players" required autoFocus className="form-control" 
                    value={currentGame.number_of_players} 
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Descriptions</label>
                    <textarea id="description" type="text" name="description"value={currentGame.description} onChange={changeGameState}></textarea>
                </div>
            </fieldset>

            <button type="submit"
            onClick={event => {
                event.preventDefault()
                const game = {
                    title: currentGame.title,
                    description: currentGame.description,
                    gameTypeId: parseInt(currentGame.gameTypeId),
                    number_of_players: parseInt(currentGame.number_of_players)
                }

                createGame(game)
                    .then(() => history.push("/"))
            }}
            className="btn btn-primary">Create</button>
        </form>
    )
}