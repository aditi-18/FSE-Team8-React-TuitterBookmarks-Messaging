/**
 * @file Implement unit tests for bookmark button.
 */
 import TuitStats from "../components/tuits/tuit-stats";
 import { act } from 'react-dom/test-utils';
 import {screen, render, waitFor} from "@testing-library/react";
 import {HashRouter} from "react-router-dom";

 const BASE_URL = "http://localhost:4000";

 const USERS_API = `${BASE_URL}/api/users`;
 const TUITS_API = `${BASE_URL}/api/tuits`;
 console.error = () => {};

 const MOCKED_USER = {username: "alice", _id: "10"};

 const MOCKED_TUIT =
     {tuit: "alice's tuit", postBy: "10", _id: "1231", stats: {bookmarks:1}};

 let bookmarkTuitMock = jest.fn();

 test('tuit stats renders bookmark button', async() => {
     // eslint-disable-next-line testing-library/no-unnecessary-act
     await act( async () => render(
         <HashRouter>
             <TuitStats tuit={MOCKED_TUIT} bookmarkTuit={bookmarkTuitMock} />
         </HashRouter>
     ));

     const bookmarkButton = screen.getByTestId('test-bookmarkButton');
     expect(bookmarkButton).toBeInTheDocument();

 })

