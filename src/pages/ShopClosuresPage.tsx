import { useState, useEffect } from 'react'
import { api } from '../services/api'

interface ShopClosure {
  _id: string
  date: string
  reason: string
  description?: string
  isFullDay: boolean
  closedHours: number
  createdAt: string
}

const ShopClosuresPage = () => {
  const [closures, setClosures] = useState<ShopClosure[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    reason: 'Leave',
    description: '',
    isFullDay: true,
    closedHours: 0
  })

  const reasons = ['Leave', 'Holiday', 'Sick Leave', 'Emergency', 'Maintenance', 'Other']

  useEffect(() => {
    fetchClosures()
  }, [])

  const fetchClosures = async () => {
    try {
      setLoading(true)
      const data = await api.fetchShopClosures()
      setClosures(data)
      setError('')
    } catch (err: any) {
      setError(err.message || 'Failed to load shop closures')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await api.updateShopClosure(editingId, formData)
      } else {
        await api.createShopClosure(formData)
      }
      await fetchClosures()
      resetForm()
    } catch (err: any) {
      setError(err.message || 'Failed to save shop closure')
    }
  }

  const handleEdit = (closure: ShopClosure) => {
    setEditingId(closure._id)
    setFormData({
      date: new Date(closure.date).toISOString().split('T')[0],
      reason: closure.reason,
      description: closure.description || '',
      isFullDay: closure.isFullDay,
      closedHours: closure.closedHours
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this closure record?')) return
    
    try {
      await api.deleteShopClosure(id)
      await fetchClosures()
    } catch (err: any) {
      setError(err.message || 'Failed to delete shop closure')
    }
  }

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      reason: 'Leave',
      description: '',
      isFullDay: true,
      closedHours: 0
    })
    setEditingId(null)
    setShowForm(false)
  }

  const getReasonIcon = (reason: string) => {
    const icons: Record<string, string> = {
      'Leave': '🏖️',
      'Holiday': '🎉',
      'Sick Leave': '🤒',
      'Emergency': '🚨',
      'Maintenance': '🔧',
      'Other': '📝'
    }
    return icons[reason] || '📝'
  }

  const getReasonColor = (reason: string) => {
    const colors: Record<string, string> = {
      'Leave': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Holiday': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Sick Leave': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'Emergency': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'Maintenance': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'Other': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
    return colors[reason] || colors['Other']
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shop Closures</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Track leaves, holidays, and shop closure dates
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {showForm ? '✕ Cancel' : '+ Add Closure'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editingId ? 'Edit Closure' : 'Add New Closure'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reason *
                </label>
                <select
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
                  required
                >
                  {reasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
                rows={2}
                maxLength={200}
                placeholder="Optional notes..."
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isFullDay"
                checked={formData.isFullDay}
                onChange={(e) => setFormData({ ...formData, isFullDay: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="isFullDay" className="text-sm text-gray-700 dark:text-gray-300">
                Full day closure
              </label>
            </div>

            {!formData.isFullDay && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Closed Hours
                </label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={formData.closedHours}
                  onChange={(e) => setFormData({ ...formData, closedHours: parseFloat(e.target.value) })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {editingId ? 'Update' : 'Add'} Closure
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Closures List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Closure Records</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        ) : closures.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <p className="text-gray-600 dark:text-gray-400">No closure records yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Add your first closure record to track shop holidays and leaves
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {closures.map((closure) => (
                  <tr key={closure._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(closure.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getReasonColor(closure.reason)}`}>
                        <span>{getReasonIcon(closure.reason)}</span>
                        {closure.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                        {closure.description || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {closure.isFullDay ? 'Full Day' : `${closure.closedHours}h`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(closure)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(closure._id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopClosuresPage

