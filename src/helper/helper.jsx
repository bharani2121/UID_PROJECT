import jwt_decode from "jwt-decode";

export const getAuth = () => {
  const token = localStorage.getItem('token');
  return token ? jwt_decode(token) : "Authentication Failed!";
}

export const getLoggedUserRole = () => {
  const user = localStorage.getItem('userRole');
  return user ? user : "No user data found!";
}

export const getLoggedUserProfilePic = () => {
  const user = localStorage.getItem('profilePic');
  return user ? user : "No user data found!";
}

export function timeSince(date) {

  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export const uploadImgToCloudinary = (pics) => {
  if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "trainerfg");
    data.append("cloud_name", "automobile-spare-parts");
    return fetch("https://api.cloudinary.com/v1_1/automobile-spare-parts/image/upload", {
      method: "post",
      body: data,
    });
  } 
};