import { ReactNode } from 'react'
import { Nav } from './Nav'

type LayoutProps = { children: ReactNode }

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>{children}</main>
    </>
  )
}
