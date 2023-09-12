import React, { useEffect, useState } from 'react'
import { SignedInStack, SignedOutStack } from './navigation'
import { app, auth, db } from './firebase'
import { onAuthStateChanged } from "firebase/auth";

const AuthNavigation = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const userHandler = user => user ? setCurrentUser(user) : setCurrentUser(null)

    useEffect(() => onAuthStateChanged(auth, user => userHandler(user)), [])

    return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>
}

export default AuthNavigation