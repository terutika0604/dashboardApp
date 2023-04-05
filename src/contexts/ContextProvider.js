import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext()

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
}

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true)
  const [isClicked, setIsClicked] = useState(initialState)
  const [screenSize, setScreenSize] = useState(undefined)
  // テーマカラーを管理
  const [currentColor, setCurrentColor] = useState('#03C9D7')
  // ダークモードライトモードを管理
  const [currentMode, setCurrentMode] = useState('Light')
  // テーマ設定サイドバーの開閉を管理
  const [themeSettings, setThemeSettings] = useState(false)

  // モード変更用
  const setMode = (e) => {
    setCurrentMode(e.target.value)

    localStorage.setItem('themeMode', e.target.value)

    setThemeSettings(false)
  }

  // カラー変更用
  const setColor = (color) => {
    setCurrentColor(color)

    localStorage.setItem('colorMode', color)

    setThemeSettings(false)
  }

  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true })
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    // 他のコンポーネントで以下のstateを使用可能にする
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentMode,
        currentColor,
        themeSettings,
        setThemeSettings,
        setMode,
        setColor,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

// ヘルパー関数を自作しておく　子孫コンポーネントではこの関数をimportするだけでよし
export const useStateContext = () => useContext(StateContext)
