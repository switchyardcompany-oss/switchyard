import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '6dzdb4x6',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: true,
  },
})
