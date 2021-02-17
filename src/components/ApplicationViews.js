import React from "react"
import { Route } from "react-router-dom"
import { EventForm } from "./events/EventForm.js"
import { EventList } from "./events/EventList.js"
import { EventProvider } from "./events/EventProvider.js"
import { GameForm } from "./game/GameForm.js"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { Profile } from "./profile/profile.js"
import { ProfileProvider } from "./profile/ProfileProvider.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <Route exact path="/" render={
                    props => <GameList {...props} /> 
                } />
                
            </GameProvider>
            <GameProvider>
                <EventProvider>
                    <Route exact path="/events">
                        <EventList />
                    </Route>
                    <Route path="/events/create">
                        <EventForm />
                    </Route>
                </EventProvider>
            </GameProvider>
            <GameProvider>
                <Route path="/creategames" render={
                    props => <GameForm {...props} />
                } />
                <Route path="/games/:gameId(\d+)/edit" render= {
                    props => <GameForm {...props} />
                } />
            </GameProvider>
            <ProfileProvider>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </ProfileProvider>
        </main>
    </>
}
