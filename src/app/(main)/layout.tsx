import { Toaster } from '@/components/ui/toaster'
import ModalProvider from '@/providers/modal-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
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
            <ModalProvider>{children}</ModalProvider>
            <Toaster/>
        </ThemeProvider>
    </ClerkProvider>
  )
}

export default layout