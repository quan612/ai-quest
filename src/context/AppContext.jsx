import React, { useState, useEffect, useCallback } from 'react'

import Enums from '@enums/index'

import { useRouter } from 'next/router'
import axios from 'axios'
import moment from 'moment'

export const PENDING_STATE = 'PENDING_STATE'
export const MINT_STATE = 'MINT_STATE'
export const BURN_STATE = 'BURN_STATE'
export const FORGE_STATE = 'FORGE_STATE'

export const MINT_END = 'April 8 2023 00:00:00 UTC'
export const BURN_END = 'April 10 2023 00:00:00 UTC'
export const FORGE_END = 'April 25 2023 00:00:00 UTC'

export const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [appState, appStateSet] = useState({ name: PENDING_STATE, expired: '12/12/2030' })

  console.log('appState', appState)

  const getAppStates = async () => {
    let appStatesQuery = await axios.get(`${Enums.BASEPATH}/api/user/app-states/query`).then((r) =>
      r.data.map((d) => {
        d.expired = moment.utc(new Date(d.expired).toISOString()).format('MM/DD/yyyy')
        return d
      }),
    )
    console.log(appStatesQuery)

    const today = +new Date()
    let mintEnd, burnEnd, forgeEnd

    // for (const state in appStatesQuery) {
    //   if (state.name === MINT_STATE) {
    //     mintEnd = state.expired
    //   }
    //   if (state.name === BURN_STATE) {
    //     burnEnd = state.expired
    //   }
    //   if (state.name === FORGE_STATE) {
    //     forgeEnd = state.expired
    //   }
    // }

    await Promise.all(
      appStatesQuery.map((state) => {
        if (state.name === MINT_STATE) {
          mintEnd = state.expired
        }
        if (state.name === BURN_STATE) {
          burnEnd = state.expired
        }
        if (state.name === FORGE_STATE) {
          forgeEnd = state.expired
        }
      }),
    )

    const mintTimeLeft = +new Date(mintEnd) - +new Date()
    if (mintTimeLeft > 0) {
      return appStateSet({ name: MINT_STATE, expired: mintEnd })
    }
    const burnTimeLeft = +new Date(burnEnd) - +new Date()
    if (burnTimeLeft > 0) {
      return appStateSet({ name: BURN_STATE, expired: burnEnd })
    }
    const forgeTimeLeft = +new Date(burnEnd) - +new Date()
    return appStateSet({ name: FORGE_STATE, expired: forgeEnd })
  }

  useEffect(() => {
    getAppStates()
  }, [])

  // useEffect(() => {
  //   const mintTimeLeft = +new Date(MINT_END) - +new Date()
  //   if (mintTimeLeft > 0) {
  //     return appStateSet(MINT_STATE)
  //   }
  //   const burnTimeLeft = +new Date(BURN_END) - +new Date()
  //   if (burnTimeLeft > 0) {
  //     return appStateSet(BURN_STATE)
  //   }
  //   return appStateSet(FORGE_STATE)
  // }, [])

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
