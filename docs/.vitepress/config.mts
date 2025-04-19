import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "eXpgNb",
  description: "A documentation on how to set up a working gNodeB using openairinterface5g",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Resources', link: '/resources' },
      { text: 'Roadmap', link: '/roadmap' },
    ],

    sidebar: {

      '/roadmap/': [
        {
          text: 'Roadmap',
          items: [
            { text: 'Stage 0: Setup', link: '/roadmap/stage-0' },
            { text: 'Stage 1: RF Simulator', link: '/roadmap/stage-1' },
            { text: 'Stage 2: Connecting the USRP', link: '/roadmap/stage-2' },
          ]
        }
      ],
      '/setup/': [
        {
          text: 'Setup',
          items: [
            { text: 'OpenAirInterface5g', link: '/setup/oai' },
            { text: 'UHD Device Drivers', link: '/setup/uhd' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
