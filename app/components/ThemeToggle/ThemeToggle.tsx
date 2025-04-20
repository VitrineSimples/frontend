"use client"

import { useEffect, useState } from 'react'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { motion } from 'framer-motion'

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkMode)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newState = !prev
      if (newState) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
      return newState
    })
  }

  return (
    <motion.button
      onClick={toggleTheme}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="rounded-full bg-white text-black flex p-1 gap-4 cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isDarkMode ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <IconMoon size={20} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isDarkMode ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <IconSun size={20} />
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle