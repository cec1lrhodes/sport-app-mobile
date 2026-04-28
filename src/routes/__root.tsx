import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

import BottomNav from '@/components/layout/BottomNav'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <BottomNav />
    </React.Fragment>
  )
}
