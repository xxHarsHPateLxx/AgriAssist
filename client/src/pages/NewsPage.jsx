import React from 'react'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import News from '../components/News'

const NewsPage = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 lg:ml-0">
        <TopBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="p-6">
          <News />
        </main>
      </div>
    </div>
  )
}

export default NewsPage
