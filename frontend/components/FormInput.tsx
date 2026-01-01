import React from 'react'
import Input from './ui/input'

export default function FormInput({ label, error, icon, ...props }: any) {
  return (
    <label className="block mb-1">
      <div className="text-xs text-slate-600 mb-1 flex items-center gap-2">
        {icon && <span className="text-sm">{icon}</span>}
        {label}
      </div>
      <Input {...props} />
      {error ? <div className="text-xs text-red-600 mt-1">{error}</div> : null}
    </label>
  )
}
