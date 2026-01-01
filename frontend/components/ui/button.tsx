import React from 'react'

export default function Button({ children, className = '', ...props }: any) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-md bg-slate-900 text-white px-3 py-1.5 text-sm hover:bg-slate-800 disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
