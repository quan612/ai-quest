import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import UserQuestProvider from '@context/UserQuestContext'
import { getServerSession } from 'next-auth/next'
import { getAuthOptions } from 'pages/api/auth/[...nextauth]'
import QuestBoard from '@components/end-user/quest/QuestBoard'
import { AppContext, MINT_STATE, PENDING_STATE } from '@context/AppContext'
import Loading from '@components/shared/LoadingContainer/Loading'

function QuestPage({ session }) {
  const { appState } = useContext(AppContext)


  return (
    <>
      {appState === PENDING_STATE && (
        <Loading />
      )}
      {appState === MINT_STATE && (
        <UserQuestProvider>
          <QuestBoard />
        </UserQuestProvider>
      )}
    </>
  )
}
QuestPage.requiredLogin = true
export default QuestPage

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, getAuthOptions(context.req))
  return {
    props: {
      session,
    },
  }
}
