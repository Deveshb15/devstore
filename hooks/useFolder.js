import React, { useReducer, useEffect } from 'react'

import { database } from '../config/firebase'
import { doc, getDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'

const  ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER: 'update-folder',
    SET_CHILD_FOLDERS: 'set-child-folders',
}

const ROOT_FOLDER = { name : 'Root', id: null, path: []}

function reducer(state, { type, payload}) {
    switch(type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFolders: [],
                childFiles: []
            }
        
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder,
            }

        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders: payload.childFolders,
            }
        
        default:
            return state
    }
}

export default function useFolder(folderId=null, folder=null) {

    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    })
    const { user } = useAuth()

    useEffect(() => {
        dispatch({ type: ACTIONS.SELECT_FOLDER, payload: {
            folderId,
            folder
        } })
    }, [folder, folderId])

    useEffect(() => {
        if(folderId==null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER, 
                payload: { folder: ROOT_FOLDER}
            })
        }

        
        const docRef = doc(database.folders, folderId)
        getDoc(docRef).then(doc => {
            // console.log(database.formatDoc(doc))
            dispatch({
                type: ACTIONS.UPDATE_FOLDER, 
                payload: { folder: database.formatDoc(doc)}
            })
        }).catch(() => {
            dispatch({
                type: ACTIONS.UPDATE_FOLDER, 
                payload: { folder: ROOT_FOLDER}
            })
        })

    }, [folderId])


    useEffect(() => {
        const ref = query(
            database.folders,
            where("parentId", "==", folderId),
            where("userId", "==", user.uid),
        //  orderBy("createdAt")
        )

        const unsubscribe = onSnapshot(ref, snapshot => {
            dispatch({
                type: ACTIONS.SET_CHILD_FOLDERS,
                payload: { childFolders: snapshot.docs.map(doc => database.formatDoc(doc)) }
            })
        })

        return () => {
            unsubscribe()
        }
      }, [folderId, user])

    return state
}
