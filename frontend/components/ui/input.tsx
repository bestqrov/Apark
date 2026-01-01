import React from 'react'

export default function Input({ className = '', ...props }: any) {
  return (
    <input
      className={`w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 ${className}`}
      {...props}
    />
  )
}
