import Tuits from "../tuits";
import * as service from "../../services/bookmarks-service";
import {useEffect, useState} from "react";

const MyBookmarks = () => {
    const [bookmarkedTuits, setbookmarkedTuits] = useState([]);
    const findTuitsIBookmarked = () =>
        service.findAllTuitsThatBookmarkedByAUser("me")
            .then((tuits) => setbookmarkedTuits(tuits));
    useEffect(findTuitsIBookmarked, []);

    return(
        <div>
            <h1>My Bookmarks</h1>
            <Tuits tuits={bookmarkedTuits} refreshTuits={findTuitsIBookmarked}/>
        </div>
    );
};
export default MyBookmarks;