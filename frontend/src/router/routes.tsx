import React, { lazy } from 'react'
import { PartialRouteObject } from 'react-router'
import { Navigate } from 'react-router-dom'

import DefaultLayout from '../layouts/DefaultLayout'
import MainPage from '../pages/Main/Main'
import GamesPage from '../pages/Games/Games'
import StatisticsPage from '../pages/Statistics/Statistics'
import SettingsPage from '../pages/Settings/Settings'
import DictionaryPage from '../pages/Dictionary/Dictionary'
import TutorialPage from '../pages/Tutorial/Tutorial'
import WordPage from '../pages/Word/Word'

const routes: PartialRouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/rslang',
        element: <MainPage />,
      },
      {
        path: '/rslang/games',
        element: <GamesPage />,
      },
      {
        path: '/rslang/dictionary',
        element: <DictionaryPage />,
      },
      {
        path: '/rslang/settings',
        element: <SettingsPage />,
      },
      {
        path: '/rslang/statistics',
        element: <StatisticsPage />,
      },
      {
        path: '/rslang/tutorial',
        element: <TutorialPage />,
      },
      {
        path: '/rslang/tutorial/:id',
        element: <WordPage />,
      },
      {
        path: '/',
        element: <Navigate to="/rslang" />,
      },
    ],
  },
]

export default routes
