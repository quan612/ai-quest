import React, { useState, useEffect, useCallback } from 'react'

import Enums from '@enums/index'

import { useRouter } from 'next/router'

export const PENDING_STATE = 'PENDING_STATE'
export const MINT_STATE = 'MINT_STATE'
export const BURN_STATE = 'BURN_STATE'
export const FORGE_STATE = 'FORGE_STATE'

export const MINT_END = 'April 8 2023 00:00:00 UTC'
export const BURN_END = 'April 10 2023 00:00:00 UTC'
export const FORGE_END = 'April 25 2023 00:00:00 UTC'

export const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [appState, appStateSet] = useState(PENDING_STATE)

  useEffect(() => {
    const mintTimeLeft = +new Date(MINT_END) - +new Date()
    if (mintTimeLeft > 0) {
      return appStateSet(MINT_STATE)
    }
    const burnTimeLeft = +new Date(BURN_END) - +new Date()
    if (burnTimeLeft > 0) {
      return appStateSet(BURN_STATE)
    }
    return appStateSet(FORGE_STATE)
  }, [])

  return (
    <AppContext.Provider
      value={{
        appState,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
