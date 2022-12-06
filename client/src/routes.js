import React from "react"
import {Routes, Route, Navigate} from 'react-router-dom'
import {AdminCreateScanword} from './pages/AdminCreateScanword'
import {AuthPage} from "./pages/AuthPage"
import { ParamsScanwordPage } from "./pages/ParamsScanwordPage"
import {AdminUpdateScanword} from './pages/AdminUpdateScanword'
import { GalleryPage } from "./pages/GalleryPage"
import { AudioPage } from "./pages/AudioPage"
import { InstructionPage } from "./pages/InstructionPage"
import { DictionaryPage } from "./pages/DictionaryPage"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/admin-create-scanword" element={<AdminCreateScanword/>} />
                <Route path="/gallery" element={<GalleryPage/>} />
                <Route path="/params-creating-scanword" element={<ParamsScanwordPage/>}/>
                <Route path="/admin-update-scanword" element={<AdminUpdateScanword/>}/>
                <Route path="/audio" element={<AudioPage/>}/>
                <Route path="/instruction" element={<InstructionPage/>}/>
                <Route path="/dictionary" element={<DictionaryPage/>}/>
                <Route path="/" element={<Navigate to="/params-creating-scanword"/>}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<AuthPage/>}/>
            <Route path="/instruction" element={<InstructionPage/>}/>
            <Route path="*" element={<Navigate to="/"/>}/> 
        </Routes>
    )
}