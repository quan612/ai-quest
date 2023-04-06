import React, { useContext } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { getServerSession } from 'next-auth/next'
import { getAuthOptions } from 'pages/api/auth/[...nextauth]'
import { AppContext, MINT_STATE, BURN_STATE, PENDING_STATE, FORGE_STATE } from '@context/AppContext'
import Loading from '@components/shared/LoadingContainer/Loading'


const MintBoardComponent = dynamic(() =>
  import('@components/end-user/mint/MintBoard'),
)
const BurnBoardComponent = dynamic(() =>
  import('@components/end-user/burn/BurnBoard'),
)
const ForgeBoardComponent = dynamic(() =>
  import('@components/end-user/forge/ForgeBoard'),
)
function Home({ session }) {
  const { appState } = useContext(AppContext)

  return (
    <>
      {appState === PENDING_STATE && (
        <Loading />
      )}
      {appState === MINT_STATE && (
        <MintBoardComponent />
      )}
      {appState === BURN_STATE && (
        <BurnBoardComponent />
      )}
      {appState === FORGE_STATE && (
        <ForgeBoardComponent />
      )}
    </>
  )
}
Home.requiredLogin = true
export default Home

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, getAuthOptions(context.req))
  return {
    props: {
      session,
    },
  }
}
