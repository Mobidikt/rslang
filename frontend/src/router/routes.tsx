import React, { lazy } from 'react'
import { PartialRouteObject } from 'react-router'
import { Navigate } from 'react-router-dom'

import DefaultLayout from '../layouts/DefaultLayout'
import Main from '../pages/Main/Main'

const routes: PartialRouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/rslang',
        element: <Main />,
      },
      {
        path: '/',
        element: <Navigate to="/rslang" />,
      },
    ],
  },
]

export default routes
