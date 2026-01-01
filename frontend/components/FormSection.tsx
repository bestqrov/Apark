import React from 'react'

interface FormSectionProps {
  title: string
  icon: string
  color: string
  children: React.ReactNode
}

export default function FormSection({ title, icon, color, children }: FormSectionProps) {
  const borderColorClass = {
    blue: 'border-blue-300',
    green: 'border-green-300',
    purple: 'border-purple-300',
    orange: 'border-orange-300',
    pink: 'border-pink-300'
  }[color] || 'border-blue-300'

  const bgColorClass = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    purple: 'bg-purple-50',
    orange: 'bg-orange-50',
    pink: 'bg-pink-50'
  }[color] || 'bg-blue-50'

  return (
    <div className={`p-2 rounded border-l-3 ${borderColorClass} ${bgColorClass} mb-2`}>
      <h3 className="text-sm font-semibold mb-1 flex items-center gap-2 text-slate-700">
        <span className="text-base">{icon}</span>
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  )
}