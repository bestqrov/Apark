"use client"

import { useState, useEffect } from 'react'
import FormSection from '../../components/FormSection'
import axios from '../../lib/axios'
import PageHeader from '../../components/PageHeader'

const CollapsibleSection = ({ title, icon, color, isOpen, onToggle, children }: any) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 text-left transition-all ${
          isOpen 
            ? `bg-gradient-to-r from-${color}-50 to-${color}-100 border-b border-${color}-200` 
            : 'bg-white hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <span className="font-semibold text-gray-800">{title}</span>
        </div>
        <span className={`transform transition-transform text-xl ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="p-6 bg-white">
          {children}
        </div>
      )}
    </div>
  )
}

export default function SettingsPage() {
  const [openSection, setOpenSection] = useState<string | null>('profile')
  const [theme, setTheme] = useState('dark')
  const [backupFrequency, setBackupFrequency] = useState('daily')
  const [backupStorage, setBackupStorage] = useState('local')
  const [message, setMessage] = useState('')
  
  // Company Profile
  const [companyLogo, setCompanyLogo] = useState<File | null>(null)
  const [companyName, setCompanyName] = useState('ArwaPark')
  const [companyTagline, setCompanyTagline] = useState('Solution de gestion de transport')
  const [companyPhone, setCompanyPhone] = useState('')
  const [companyWebsite, setCompanyWebsite] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [companyCountry, setCompanyCountry] = useState('Maroc')
  const [companyEmail, setCompanyEmail] = useState('')
  const [companyIF, setCompanyIF] = useState('')
  const [companyCNSS, setCompanyCNSS] = useState('')
  const [companyICE, setCompanyICE] = useState('')
  const [companyCompteBancaire, setCompanyCompteBancaire] = useState('')

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData()
      if (companyLogo) {
        formData.append('logo', companyLogo)
      }
      formData.append('name', companyName)
      formData.append('tagline', companyTagline)
      formData.append('phone', companyPhone)
      formData.append('email', companyEmail)
      formData.append('website', companyWebsite)
      formData.append('address', companyAddress)
      formData.append('country', companyCountry)
      formData.append('if', companyIF)
      formData.append('cnss', companyCNSS)
      formData.append('ice', companyICE)
      formData.append('compteBancaire', companyCompteBancaire)

      const response = await axios.put('/settings/company-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setMessage('✅ Profil société enregistré avec succès')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error saving profile:', error)
      setMessage('❌ Erreur lors de l\'enregistrement')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/settings/company-profile')
        if (response.data?.data) {
          const profile = response.data.data
          setCompanyName(profile.name || 'ArwaPark')
          setCompanyTagline(profile.tagline || 'Solution de gestion de transport')
          setCompanyPhone(profile.phone || '')
          setCompanyEmail(profile.email || '')
          setCompanyWebsite(profile.website || '')
          setCompanyAddress(profile.address || '')
          setCompanyCountry(profile.country || 'Maroc')
          setCompanyIF(profile.if || '')
          setCompanyCNSS(profile.cnss || '')
          setCompanyICE(profile.ice || '')
          setCompanyCompteBancaire(profile.compteBancaire || '')
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }
    fetchProfile()
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <PageHeader 
        title="⚙️ Paramètres" 
        gradientFrom="indigo-600" 
        gradientTo="indigo-700"
      />

      <div className="bg-white rounded-b-lg shadow-lg p-6 space-y-4">

        <CollapsibleSection 
          title="Profil Société" 
          icon="🏢" 
          color="blue"
          isOpen={openSection === 'profile'}
          onToggle={() => toggleSection('profile')}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left side - Form */}
            <div className="lg:col-span-2 space-y-4">
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo de la société <span className="text-blue-600">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {companyLogo ? (
                      <img src={URL.createObjectURL(companyLogo)} alt="Logo" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span>LOGO</span>
                    )}
                  </div>
                  <label className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium cursor-pointer transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                    <span>📷</span>
                    Changer le logo
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setCompanyLogo(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de la société <span className="text-blue-600">*</span>
                  </label>
                  <input 
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Nom de la société"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slogan</label>
                  <input 
                    type="text"
                    value={companyTagline}
                    onChange={(e) => setCompanyTagline(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Slogan de la société"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input 
                    type="tel"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+212 6 XX XX XX XX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="contact@arwapark.ma"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site web</label>
                <input 
                  type="url"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="https://www.arwapark.ma"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse <span className="text-blue-600">*</span>
                </label>
                <textarea 
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Adresse complète de la société"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pays <span className="text-blue-600">*</span>
                </label>
                <select 
                  value={companyCountry}
                  onChange={(e) => setCompanyCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="Maroc">🇲🇦 Maroc</option>
                  <option value="France">🇫🇷 France</option>
                  <option value="Algérie">🇩🇿 Algérie</option>
                  <option value="Tunisie">🇹🇳 Tunisie</option>
                  <option value="Autre">🌍 Autre</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span>📋</span> Informations Fiscales
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IF (Identifiant Fiscal)
                    </label>
                    <input 
                      type="text"
                      value={companyIF}
                      onChange={(e) => setCompanyIF(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="XXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CNSS
                    </label>
                    <input 
                      type="text"
                      value={companyCNSS}
                      onChange={(e) => setCompanyCNSS(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="XXXXXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ICE
                    </label>
                    <input 
                      type="text"
                      value={companyICE}
                      onChange={(e) => setCompanyICE(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="XXXXXXXXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Compte Bancaire
                    </label>
                    <input 
                      type="text"
                      value={companyCompteBancaire}
                      onChange={(e) => setCompanyCompteBancaire(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="RIB"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200 shadow-lg">
                  <div className="flex items-center justify-center mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold rounded-full shadow-md">
                      Aperçu du profil
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                      {companyLogo ? (
                        <img src={URL.createObjectURL(companyLogo)} alt="Logo" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span>LOGO</span>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{companyName || 'Nom de la société'}</h3>
                      <p className="text-sm text-gray-600 italic">{companyTagline || 'Slogan'}</p>
                    </div>

                    <div className="w-full space-y-2 text-sm pt-2">
                      {companyPhone && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <span>📞</span>
                          <span>{companyPhone}</span>
                        </div>
                      )}
                      {companyEmail && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <span>📧</span>
                          <span className="text-xs break-all">{companyEmail}</span>
                        </div>
                      )}
                      {companyWebsite && (
                        <div className="flex items-center gap-2 text-blue-600">
                          <span>🌐</span>
                          <span className="text-xs break-all">{companyWebsite}</span>
                        </div>
                      )}
                      {companyAddress && (
                        <div className="flex items-start gap-2 text-gray-700">
                          <span className="mt-0.5">📍</span>
                          <span className="text-xs text-left">{companyAddress}</span>
                        </div>
                      )}
                      {companyCountry && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <span>🌍</span>
                          <span className="text-xs">{companyCountry}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <button 
                    onClick={handleSaveProfile}
                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    💾 Enregistrer le profil
                  </button>
                  {message && (
                    <div className="mt-2 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm text-center">
                      {message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection 
          title="Apparence" 
          icon="🎨" 
          color="green"
          isOpen={openSection === 'appearance'}
          onToggle={() => toggleSection('appearance')}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thème de l'interface</label>
            <div className="flex gap-3">
              <button 
                onClick={() => setTheme('dark')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🌙 Sombre
              </button>
              <button 
                onClick={() => setTheme('light')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  theme === 'light' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ☀️ Clair
              </button>
              <button 
                onClick={() => setTheme('system')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  theme === 'system' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💻 Système
              </button>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection 
          title="Sauvegardes" 
          icon="💾" 
          color="green"
          isOpen={openSection === 'backup'}
          onToggle={() => toggleSection('backup')}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Planification et restauration des sauvegardes</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fréquence</label>
                <select 
                  value={backupFrequency} 
                  onChange={(e) => setBackupFrequency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="daily">📅 Quotidien</option>
                  <option value="weekly">📆 Hebdomadaire</option>
                  <option value="monthly">🗓️ Mensuel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stockage</label>
                <select 
                  value={backupStorage} 
                  onChange={(e) => setBackupStorage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="local">💻 Local</option>
                  <option value="s3">☁️ Amazon S3</option>
                  <option value="gcloud">🌐 Google Cloud</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setMessage('Sauvegarde créée avec succès')}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
              >
                💾 Sauvegarder maintenant
              </button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all">
                🔄 Restaurer
              </button>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection 
          title="Sécurité" 
          icon="🔒" 
          color="purple"
          isOpen={openSection === 'security'}
          onToggle={() => toggleSection('security')}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Paramètres de sécurité et contrôle d'accès</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-purple-200 rounded-lg bg-purple-50/50">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <span>🔐</span>
                    Authentification à deux facteurs
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Activer la 2FA pour tous les comptes administrateurs</div>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg">
                  Configurer
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-purple-200 rounded-lg bg-purple-50/50">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <span>🔑</span>
                    Politiques de mot de passe
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Exiger longueur minimale, complexité et rotation</div>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg">
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection 
          title="Mises à jour" 
          icon="🔄" 
          color="orange"
          isOpen={openSection === 'updates'}
          onToggle={() => toggleSection('updates')}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Gérer les mises à jour de l'application</p>
            <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-800">Version actuelle: 1.0.0</div>
                  <div className="text-xs text-gray-600 mt-1">Dernière vérification: Aujourd'hui</div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">✓ À jour</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg">
                🔍 Vérifier les mises à jour
              </button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all">
                📥 Appliquer maintenant
              </button>
            </div>
          </div>
        </CollapsibleSection>

        {message && (
          <div className="p-4 rounded-lg bg-green-50 text-green-700 border border-green-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">✅</span>
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
