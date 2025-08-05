import { nanoid } from "nanoid";

const LOCAL_STORAGE_KEY = "purrfect_user_id";

export const getUserID = () => {
  const userID = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!userID) {
    const newUserID = nanoid();
    localStorage.setItem(LOCAL_STORAGE_KEY, newUserID);

    return newUserID;
  }

  return userID;
};
