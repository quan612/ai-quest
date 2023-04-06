const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false,
})

const config = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack: (config) => {
    config.experiments = config.experiments || {}
    config.experiments.topLevelAwait = true
    return config
  },
  swcMinify: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
}

module.exports = withBundleAnalyzer(config)
