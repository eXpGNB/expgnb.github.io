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
            { text: 'Stage 0: Setup', link: '/roadmap/stages/stage-0' },
            { text: 'Stage 1: RF Simulator', link: '/roadmap/stages/stage-1' },
            { text: 'Stage 2: Connecting the USRP', link: '/roadmap/stages/stage-2' },
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
      ],
      '/resources/': [
        {
          text: 'Resources',
          items: [
            { text: 'Overview', link: '/resources' },
            { text: 'OpenAirInterface (OAI)', link: '/resources#🔧-openairinterface-oai-resources' },
            { text: 'USRP and RF Setup', link: '/resources#📡-usrp-and-rf-setup' },
            { text: 'Concepts & Background', link: '/resources#🧠-concepts-background-reading' },
            { text: 'Testing Tools', link: '/resources#🧪-useful-testing-tools' },
            { text: 'Sample Repos & Demos', link: '/resources#📎-additional-sample-repos-demos' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
