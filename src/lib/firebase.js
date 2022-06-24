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

export const getAllDataInCollection = async () => {
    const testData = (await firebase.firestore().collection("todos").get()).docs.map(e => {
        const { text, done } = e.data()
        return {
            key: e.id,
            text, done
        }
    })
    return testData
}

export const addNewDataInCollection = async (data) => {
    await firebase.firestore().collection("todos").add(data)
}

export const updateItemFirebase = async (data) => {
    await firebase.firestore().collection("todos").doc(data.key).update(data)
}

export const deleteAllItemsFirebase = async (listIds) => {
    await Promise.all(listIds.map(async e => {
        await firebase.firestore().collection("todos").doc(e).delete()
    }))
}