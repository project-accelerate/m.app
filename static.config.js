import React from 'react'

export default {
  entry: require.resolve('./src/frontend/main'),

  getSiteData: () => ({
    title: 'React Static',
  }),

  getRoutes: () => [
    {
      path: '/events/explore',
      component: 'src/frontend/pages/EventFeed/EventFeedPage',
    },
    {
      is404: true,
      component: 'src/frontend/pages/404',
    },
  ],

  Document: class CustomHtml extends React.Component {
    render () {
      const {
        Html, Head, Body,
      } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>{'html,body,#root{height:100%}'}</style>
          </Head>
          <Body>
            <div id="root" />
          </Body>
        </Html>
      )
    }
  },

  webpack: (config, { defaultLoaders }) => {
    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push('.ts', '.tsx')

    // We replace the existing JS rule with one, that allows us to use
    // both TypeScript and JavaScript interchangeably
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: defaultLoaders.jsLoader.exclude, // as std jsLoader exclude
            use: [
              {
                loader: 'babel-loader',
              },
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true,
                  configFile: require.resolve('./tsconfig.frontend.json'),
                },
              },
            ],
          },
          {
            test: /\.graphql$/,
            use: 'graphql-tag/loader',
          },
          defaultLoaders.cssLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ]
    return config
  },
}
