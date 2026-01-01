import React from 'react'
import { useAuth } from '../lib/auth'
import { User, LogOut } from 'lucide-react'

export default function Topbar() {
  const { user, logout } = useAuth()

  return (
    <header className="flex items-center justify-between border-b bg-white p-4">
      <div className="text-sm font-medium">{user?.companyId || 'Demo Company'}</div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600"><User size={16} />{user?.email || 'Invité'}</div>
        <button onClick={() => logout()} className="flex items-center gap-2 text-sm text-red-600"><LogOut size={16} />Se déconnecter</button>
      </div>
    </header>
  )
}
