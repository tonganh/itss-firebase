import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDE0ZRKjIjWUn9JfCcT-WGjOYJEgFpINXM",
    authDomain: "itss-training-firebase.firebaseapp.com",
    projectId: "itss-training-firebase",
    storageBucket: "itss-training-firebase.appspot.com",
    messagingSenderId: "355192140055",
    appId: "1:355192140055:web:a860f5dbec305f68e9c752"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export const getAllDataInCollection = async () => {
    const testData = (await db.collection("todos").get()).docs.map(e => {
        const { text, done } = e.data()
        return {
            key: e.id,
            text, done
        }
    })
    return testData
}

export const addNewDataInCollection = async (data, collectionName = "todos") => {
    await db.collection(collectionName).add(data)
}

export const updateItemFirebase = async (data, collectioName = "todos") => {
    await db.collection(collectioName).doc(data.key).update(data)
}

export const deleteAllItemsFirebase = async (listIds) => {
    await Promise.all(listIds.map(async e => {
        await db.collection("todos").doc(e).delete()
    }))
}

export const saveUserInformation = async (user) => {
    const { uid } = user
    const dataUserAfterSigned = (await db.collection("users").doc(uid).get()).data()
    // ! case user have not in database, so we need save this user to database
    if (!dataUserAfterSigned) {
        await db.collection("users").doc(uid).set({
            nameDisplay: user.displayName
        })
        return {
            nameDisplay: user.displayName
        }
    } else {
        return dataUserAfterSigned
    }
}