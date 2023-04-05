import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { Navbar, Header, Footer, Sidebar, ThemeSettings } from './components'
import { License } from './License'

import {
  Ecommerce,
  Orders,
  Calendar,
  Kanban,
  Editor,
  ColorPicker,
  Employees,
  Customers,
} from './pages'
import './App.css'

import { useStateContext } from './contexts/ContextProvider'

const App = () => {

  // syncfusionライセンス認証関数
  License()
  
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext()
  // const activeMenu = true

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {/* セッティングマーク */}
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Setting" position="Top">
              <button
                className="text-3xl p-3 hover:drop-shadow-xl 
                hover:bg-light-gray 
                text-white"
                style={{ background: currentColor, borderRadius: '50%' }}
                onClick={() => setThemeSettings(true)}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {/* サイドバー */}
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}

          {/* ナビゲーションバー */}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen  w-full ${
              activeMenu ? 'md:ml-72' : 'flex-2'
            }`}
          >
            <div className="flex md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            {/* ページリンク */}
            <div>
              {/* テーマ設定用サイドバー */}
              {themeSettings && <ThemeSettings />}

              <Routes>
                {/* ダッシュボード */}
                <Route path="/" element={<Ecommerce />} />
                <Route path="/ecommerce" element={<Ecommerce />} />

                {/* 個別ページ */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />

                {/* Apps */}
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* charts */}
                {/* <Route path="/line" element={<Line />} /> */}
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
