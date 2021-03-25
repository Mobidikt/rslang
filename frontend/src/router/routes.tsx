import React, { lazy } from 'react'
import { PartialRouteObject } from 'react-router'
import { Navigate } from 'react-router-dom'

import DefaultLayout from '../layouts/DefaultLayout'
import MainPage from '../pages/Main/Main'
import GamesPage from '../pages/Games/Games'
import StatisticsPage from '../pages/Statistics/Statistics'
import SettingsPage from '../pages/Settings/Settings'
import DictionaryPage from '../pages/Dictionary/Dictionary'

import WordPage from '../pages/Word/Word'
import TutorialPage from '../pages/Tutorial/Tutorial'
import WordsPage from '../pages/Words/Words'

import SprintGamePage from '../pages/SprintGamePage/SprintGamePage'
import SavannaGamePage from '../pages/SavannaGamePage/SavannaGamePage'
import OurGamePage from '../pages/OurGamePage/OurGamePage'
import CallGamePage from '../pages/CallGamePage/CallGamePage'

const routes: PartialRouteObject[] = [
  {
    path: '/welcome',
    element: <MainPage />,
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/games',
        element: <GamesPage />,
      },
      {
        path: '/games/sprint',
        element: <SprintGamePage />,
      },
      {
        path: '/games/savannah',
        element: <SavannaGamePage />,
      },
      {
        path: '/games/our-game',
        element: <OurGamePage />,
      },
      {
        path: '/games/call',
        element: <CallGamePage />,
      },
      {
        path: '/dictionary',
        element: <DictionaryPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
      {
        path: '/statistics',
        element: <StatisticsPage />,
      },
      {
        path: '/tutorial',
        element: <TutorialPage />,
      },
      {
        path: '/tutorial/:groupId',
        element: <WordsPage />,
      },
      {
        path: '/tutorial/:groupId/:id',
        element: <WordPage />,
      },
      {
        path: '/',
        element: <Navigate to="/welcome" />,
      },
    ],
  },
]

export default routes
