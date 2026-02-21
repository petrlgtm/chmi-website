import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '730sqy7i',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'k7zs4rf9pwb8ta8uy8ayww3g',
  }
})
