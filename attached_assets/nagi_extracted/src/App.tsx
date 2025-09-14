'use client'

import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { WorksSection } from './components/WorksSection'
import { AboutSection } from './components/AboutSection'
import { Footer } from './components/Footer'
import { WorkDetail } from './components/WorkDetail'
import { AdminLogin } from './components/AdminLogin'
import { AdminDashboard } from './components/AdminDashboard'
import { works as initialWorks, Work } from './data/works'

const STORAGE_KEY = 'nagi_portfolio_works'

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'work' | 'about' | 'admin-login' | 'admin'>('home')
  const [selectedWork, setSelectedWork] = useState<Work | null>(null)
  const [works, setWorks] = useState<Work[]>([])
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  // 初期化時にlocalStorageからデータを読み込み
  useEffect(() => {
    try {
      const savedWorks = localStorage.getItem(STORAGE_KEY)
      if (savedWorks) {
        const parsedWorks = JSON.parse(savedWorks)
        setWorks(parsedWorks)
      } else {
        // 初回はデフォルトデータを使用
        setWorks(initialWorks)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialWorks))
      }
    } catch (error) {
      console.error('Failed to load works from localStorage:', error)
      setWorks(initialWorks)
    }
  }, [])

  const handleWorkClick = (work: Work) => {
    setSelectedWork(work)
    setCurrentView('work')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedWork(null)
  }

  const handleAboutClick = () => {
    setCurrentView('about')
  }

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setCurrentView('admin')
    } else {
      setCurrentView('admin-login')
    }
  }

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true)
    setCurrentView('admin')
  }

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false)
    setCurrentView('home')
  }

  const handleWorksUpdate = (updatedWorks: Work[]) => {
    setWorks(updatedWorks)
    // localStorageに保存
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWorks))
    } catch (error) {
      console.error('Failed to save works to localStorage:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {currentView === 'admin-login' && (
        <AdminLogin onLogin={handleAdminLogin} />
      )}
      
      {currentView === 'admin' && (
        <AdminDashboard
          works={works}
          onWorksUpdate={handleWorksUpdate}
          onLogout={handleAdminLogout}
          onBackToSite={handleBackToHome}
        />
      )}
      
      {!['admin-login', 'admin'].includes(currentView) && (
        <>
          <Header 
            onHomeClick={handleBackToHome}
            onAboutClick={handleAboutClick}
            onAdminClick={handleAdminClick}
            currentView={currentView}
          />
          
          {currentView === 'home' && (
            <>
              <Hero />
              <WorksSection works={works} onWorkClick={handleWorkClick} />
            </>
          )}
          
          {currentView === 'work' && selectedWork && (
            <WorkDetail work={selectedWork} onBack={handleBackToHome} />
          )}
          
          {currentView === 'about' && (
            <AboutSection onBack={handleBackToHome} />
          )}
          
          <Footer />
        </>
      )}
    </div>
  )
}