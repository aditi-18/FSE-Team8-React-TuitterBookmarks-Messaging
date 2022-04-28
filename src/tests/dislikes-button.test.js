/* eslint-disable testing-library/no-unnecessary-act */
import TuitStats from "../components/tuits/tuit-stats";
import { act } from 'react-dom/test-utils';
import {screen, render, fireEvent} from "@testing-library/react";
import {HashRouter} from "react-router-dom";

const BASE_URL = "https://cs5500-ass4.herokuapp.com";
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const mockAxios = jest.genMockFromModule('axios')
mockAxios.create = jest.fn(() => mockAxios)
mockAxios.get.mockImplementation(() =>
    Promise.resolve({ data: false }));

const MOCKED_USER = {username: "alice", _id: "123"};

const MOCKED_TUIT =
    {tuit: "alice's tuit", postBy: "123", _id: "1231", stats: {likes: 42, dislikes: 12}};

const likeTuitMock = jest.fn();
const dislikeTuitMock = jest.fn();

test('tuit stats renders dislike button', async() => {
    
    await act( async () => render(
        <HashRouter>
            <TuitStats tuit={MOCKED_TUIT} likeTuit={likeTuitMock} dislikeTuit={dislikeTuitMock}/>
        </HashRouter>
    ));

    const dislikeButton = screen.getByTestId('test-dislikeButton');
    expect(dislikeButton).toBeInTheDocument();
})

test('click dislike button will trigger dislikeTuitMock function', async() => {
    
    await act( async () => render(
        <HashRouter>
            <TuitStats tuit={MOCKED_TUIT} likeTuit={likeTuitMock} dislikeTuit={dislikeTuitMock}/>
        </HashRouter>
    ));

    const dislikeButton = screen.getByTestId('test-dislikeButton');
    fireEvent.click(dislikeButton);
    expect(dislikeTuitMock).toHaveBeenCalledTimes(1);
})

test('tuit stats renders dislike stats', async() => {
    
    await act( async () => render(
        <HashRouter>
            <TuitStats tuit={MOCKED_TUIT} likeTuit={likeTuitMock} dislikeTuit={dislikeTuitMock}/>
        </HashRouter>
    ));

    const dislikeStat = screen.getByText(/12/i);
    expect(dislikeStat).toBeInTheDocument();
})

