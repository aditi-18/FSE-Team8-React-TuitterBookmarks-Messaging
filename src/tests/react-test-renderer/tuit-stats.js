import React from "react";

const TuitStats = ({tuit, dislikeTuit, likeTuit, bookmarkTuit = () => {}}) => {
  
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats && tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats && tuit.stats.retuits}
        </div>
        <div className="col">
          <span onClick={() => likeTuit(tuit)}>
              {
                tuit.stats && tuit.stats.likes > 0 &&
                  <i className="fas fa-thumbs-up me-1" style={{color: 'red'}}></i>
              }
              {
                tuit.stats && tuit.stats.likes <= 0 &&
                  <i className="far fa-thumbs-up me-1"></i>
              }
            {tuit.stats && tuit.stats.likes}
          </span>
        </div>
        <div className="col">
          <span onClick={() => dislikeTuit(tuit)}  data-testid="test-dislikeButton">
                {
                    tuit.stats && tuit.stats.dislikes > 0 &&
                    <i className="fas fa-thumbs-down me-1" style={{color: 'blue'}}></i>
                }
                {
                    tuit.stats && tuit.stats.dislikes  <= 0 &&
                    <i className="far fa-thumbs-down me-1"></i>
                }
            {tuit.stats && tuit.stats.dislikes}
          </span>
        </div>

        <div className="col">
         <span onClick={() => bookmarkTuit(tuit)} data-testid ="test-bookmarkButton">
            {
                tuit.stats && tuit.stats.bookmarks == 1  &&
                <i className="fas fa-bookmark me-1" style={{color: 'blue'}}></i>
            }
            {
                tuit.stats && tuit.stats.bookmarks == 0 &&
                <i className="far fa-bookmark me-1"></i>
            }
         </span>
        </div>

        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;