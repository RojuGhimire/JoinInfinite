import { storage } from "./firebaseconfig";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export function generateUniqueId() {
  const timestamp = new Date().getTime().toString(36);
  const randomChars = Math.random().toString(36).substring(2, 10);
  const uniqueId = timestamp + randomChars;

  return uniqueId.substring(0, 8);
}

export const handleFireBaseUpload = (imageAsFile, uniqueId) => {
    return new Promise((resolve, reject) => {
      if (!imageAsFile) {
        console.error(`Not an image. The image file is of type: ${typeof imageAsFile}`);
        reject("Not an image");
        return;
      }
  
      const storageRef = ref(storage, `/images/${uniqueId}`);
      
      // Upload the file
      uploadBytes(storageRef, imageAsFile)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
          
          // Get the download URL
          return getDownloadURL(storageRef);
        })
        .then((url) => {
          console.log("Download URL:", url);
          resolve(url);
        })
        .catch((error) => {
          console.error("Error uploading or getting download URL:", error);
          reject(error);
        });
    });
  };
  
  export const deleteFirebaseImage = (uniqueId) => {
    return new Promise((resolve, reject) => {
      const imageRef = ref(storage, `/images/${uniqueId}`);
  
      // Delete the file
      deleteObject(imageRef)
        .then(() => {
          console.log(`Image with ID ${uniqueId} deleted successfully`);
          resolve();
        })
        .catch((error) => {
          console.error(`Error deleting image with ID ${uniqueId}:`, error);
          reject(error);
        });
    });
  };
