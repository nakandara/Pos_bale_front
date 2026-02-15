import { usePWA } from '../hooks/usePWA'

const InstallPrompt = () => {
  const { canInstall, promptInstall } = usePWA()

  if (!canInstall) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-2xl p-4 text-white">
        <div className="flex items-start gap-3">
          <span className="text-3xl">📱</span>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">Install POS App</h3>
            <p className="text-sm text-blue-100 mb-3">
              Install this app on your device for quick access and offline use!
            </p>
            <div className="flex gap-2">
              <button
                onClick={promptInstall}
                className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors"
              >
                Install Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstallPrompt
