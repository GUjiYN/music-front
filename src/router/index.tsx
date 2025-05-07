import {Route, Routes} from "react-router-dom";
import {JSX} from "react";
import {BaseIndex} from "../views/base_index.tsx";
import {AlbumDetail} from "../views/album_detail.tsx";

export function index():JSX.Element {
return (
    <>
        <Routes>
            <Route path='/' element={<BaseIndex/>} />
            <Route path='/album/:id' element={<AlbumDetail/>} />
        </Routes>
    </>
)
}