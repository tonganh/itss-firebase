import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDE0ZRKjIjWUn9JfCcT-WGjOYJEgFpINXM",
    authDomain: "itss-training-firebase.firebaseapp.com",
    projectId: "itss-training-firebase",
    storageBucket: "itss-training-firebase.appspot.com",
    messagingSenderId: "355192140055",
    appId: "1:355192140055:web:a860f5dbec305f68e9c752"
};

const app = firebase.initializeApp(firebaseConfig)

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
            nameDisplay: user.displayName,
            id: uid
        }
    } else {
        return {
            ...dataUserAfterSigned, id: uid
        }
    }
}

export const updateUserInformation = async (user, img) => {
    try {
        const userDoc = await db.collection("users").doc(user.id).get();
        if (userDoc.exists) {
            await db.collection("users").doc(user.id).update({ ...userDoc.data(), image: img });
        }
    } catch (err) {
        console.log("🚀 ~ file: firebase.js ~ line 66 ~ updateUserInformation ~ err", err)
    }
}

export const uploadImage = async (image, userAfterLogin) => {
    console.log("🚀 ~ file: firebase.js ~ line 75 ~ uploadImage ~ userAfterLogin", userAfterLogin)
    // Create a root reference
    const storage = getStorage(app);
    // Create a reference to 'mountains.jpg'
    const mountainsRef = ref(storage, `images/${image.name}`);
    await uploadBytesResumable(mountainsRef, image)
    const imageUrl = await getDownloadURL(mountainsRef)
    return imageUrl
};