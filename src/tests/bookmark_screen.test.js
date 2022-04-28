/**
 * @file Implement unit tests for my bookmarks screen.
 */
 import React from 'react'
 import {act, create} from "react-test-renderer"
 import Bookmarks from "../components/bookmarks";
 import {render, screen} from "@testing-library/react";
 import {HashRouter} from "react-router-dom";
 import Tuits from "./react-test-renderer/tuits";
 
 const MOCKED_TUITS =
     [{tuit: "alice's tuit", postBy: "123", _id: "1231", stats: {bookmarks:11}},
         {tuit: "bob's tuit", postBy: "153", _id: "1253", stats: {bookmarks:121}}];
 
 
 console.error = () => {
 };
 test('renders bookmark screen', async () => {
     // eslint-disable-next-line testing-library/no-unnecessary-act
     await act(async () => render(
         <HashRouter>
             <Bookmarks/>
         </HashRouter>
     ));
 
     const bookmarksTab = screen.getByText(/My Bookmarks/i);
     expect(bookmarksTab).toBeInTheDocument();
 })
 
 test('fetches a list of tuits on the screen', () => {
     let tuitsRender
     act(() => {
         tuitsRender = create(
             <Tuits
                 tuits={MOCKED_TUITS}/>
         )
     })
     const root = tuitsRender.root
     //eslint-disable-next-line testing-library/await-async-query
     const ttrScreenTuits = root.findAllByProps({
         className: 'ttr-tuit'
     })
     expect(ttrScreenTuits.length).toBe(MOCKED_TUITS.length)
     ttrScreenTuits.forEach((ttrTuit, ndx) => {
       // eslint-disable-next-line testing-library/no-node-access
         expect(ttrTuit.props.children).toBe(MOCKED_TUITS[ndx].tuit)
     })
 })
//  
 test('renders bookmarked tuit under my bookmark screen', async () => {
     let tuitsRender
     act(() => {
         tuitsRender = create(
             <Bookmarks Tuits={MOCKED_TUITS}/>
         )
     })
 
     const root = tuitsRender.root
    //eslint-disable-next-line testing-library/await-async-query
     const ttrScTuits = root.findAllByProps({
         className: 'tuit-content'
     })
     ttrScTuits.forEach((ttrTuit, ndx) => {
        //eslint-disable-next-line testing-library/no-node-access
         expect(ttrTuit.props.children[0]).toBe(MOCKED_TUITS[ndx].tuit)
     })
 })
//  