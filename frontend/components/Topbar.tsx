import React, { useEffect, useState } from 'react'
import { useAuth } from '../lib/auth'
import { User, LogOut, Sun, Moon, Menu } from 'lucide-react'
import axios from '../lib/axios'
import Image from 'next/image'

interface CompanyProfile {
  name: string
  logo?: string
  tagline?: string
}

export default function Topbar() {
  const { user, logout } = useAuth()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null)

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    }

    // Load company profile
    loadCompanyProfile()
  }, [])

  const loadCompanyProfile = async () => {
    try {
      const response = await axios.get('/settings/company-profile')
      setCompanyProfile(response.data)
    } catch (error) {
      console.error('Error loading company profile:', error)
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <header className="flex items-center justify-between border-b bg-white dark:bg-gray-800 dark:border-gray-700 p-3 md:p-4 transition-colors">
      {/* Mobile menu button */}
      <button 
        className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={() => {
          const sidebar = document.querySelector('aside');
          if (sidebar) {
            sidebar.classList.toggle('-translate-x-full');
          }
        }}
      >
        <Menu size={20} className="text-gray-600 dark:text-gray-300" />
      </button>

      <div className="flex items-center gap-2 sm:gap-3">
        {companyProfile?.logo && (
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
            <Image
              src={`http://localhost:3001${companyProfile.logo}`}
              alt={companyProfile.name || 'Company Logo'}
              fill
              className="object-contain p-1"
            />
          </div>
        )}
        <div className="hidden sm:block">
          <div className="text-xs sm:text-sm font-semibold dark:text-white">
            {companyProfile?.name || user?.companyId || 'Demo Company'}
          </div>
          {companyProfile?.tagline && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {companyProfile.tagline}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon size={18} className="text-gray-600 dark:text-gray-300" />
          ) : (
            <Sun size={18} className="text-gray-300" />
          )}
        </button>
        <div className="hidden md:flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          <User size={14} className="sm:w-4 sm:h-4" />
          <span className="hidden lg:inline">{user?.email || 'Invité'}</span>
        </div>
        <button onClick={() => logout()} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
          <LogOut size={14} className="sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Se déconnecter</span>
        </button>
      </div>
    </header>
  )
}
