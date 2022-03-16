import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {collection, getFirestore, FieldValue} from 'firebase/firestore'

const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
})

const db = getFirestore()
export const database = {
    folders: collection(db, 'folders'),
    files: collection(db, 'files'),
    formatDoc: (doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        }
    }
}
export const auth = getAuth()
export default app