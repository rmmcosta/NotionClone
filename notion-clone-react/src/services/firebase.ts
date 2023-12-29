// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_PUBLIC_FIREBASE_API_KEY,
  authDomain: "notionclone-4a8a5.firebaseapp.com",
  projectId: "notionclone-4a8a5",
  storageBucket: "notionclone-4a8a5.appspot.com",
  messagingSenderId: "669893196474",
  appId: "1:669893196474:web:2e0f6924f254edf5af2083"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFileToFirebase(image_url: string, name: string) {
  console.log("uploading to firebase, image_url:", image_url, "name:", name);
  try {
    const response = await fetch(`${process.env.REACT_APP_FETCH_IMAGE_URL}?url=${encodeURIComponent(image_url)}`);
    console.log("fetched image:", response.statusText);
    const buffer = await response.arrayBuffer();
    const file_name = name.replace(" ", "") + Date.now() + ".jpeg";
    console.log("file_name:", file_name);
    const storageRef = ref(storage, file_name);
    console.log("storageRef:", storageRef);
    const uploadResult = await uploadBytes(storageRef, buffer, {
      contentType: "image/jpeg",
    });
    console.log("uploadResult:", uploadResult);
    const firebase_url = await getDownloadURL(storageRef);
    return firebase_url;
  } catch (error) {
    console.error(error);
  }
}
