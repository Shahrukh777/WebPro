import Navigation from '@/components/site/navigation'
import { ThemeProvider } from '@/providers/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
    appearance={{baseTheme: dark}}
    >
      <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      >
        <main className="h-full">
          <Navigation />
          {children}
        </main>
      </ThemeProvider>
    </ClerkProvider>
  )
}

export default layout