import axios from "axios";
const BASE_URL = "http://localhost:4000";

//const BASE_URL = "https://cs5500-ass4.herokuapp.com"
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
  withCredentials: true
});

export const findAllUsersThatBookmarkedTuit = (tid) =>
        api.get(`${TUITS_API}/${tid}/bookmarks`)
            .then(response => response.data);

export const findAllTuitsThatBookmarkedByAUser = (userId) =>
    api.get(`${USERS_API}/${userId}/bookmarks`)
        .then(response => response.data);


export const userBookmarksTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/bookmarks/${tid}`)
        .then(response => response.data);

export const userUnbookmarksTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/unbookmarks/${tid}`)
        .then(response => response.data);

export const userTogglesTuitBookmarks = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/bookmarks/${tid}`)
        .then(response => response.data);