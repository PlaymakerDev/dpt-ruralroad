export default {
  development: {
    hostBackend: process.env.NEXT_PUBLIC_HOST_BACKEND || 'http://localhost:8001',
    hostBackendServerSide: process.env.HOST_BACKEND || 'http://localhost:8001',
    host: process.env.NEXT_PUBLIC_HOST || 'http://localhost:8001',
    lifeTimeToken: 10,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    ckAuthKey: "DRR_WTS",
    title_web: "DRR WTS",
    description_web: "DRR WTS description",
    og_image: process.env.NEXT_PUBLIC_HOST + "/images/logo.png",
    token_secret: process.env.TOKEN_SECRET,
    version:"0.6.0"
  },
  production: {
    hostBackend: process.env.NEXT_PUBLIC_HOST_BACKEND,
    hostBackendServerSide: process.env.HOST_BACKEND,
    host: process.env.NEXT_PUBLIC_HOST,
    lifeTimeToken: 10,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    ckAuthKey: "DRR_WTS",
    title_web: "DRR WTS",
    description_web: "DRR WTS description",
    og_image: process.env.NEXT_PUBLIC_HOST + "/images/logo.png",
    token_secret: process.env.TOKEN_SECRET,
    version:"0.6.0"
  },
  test: {
    hostBackend: process.env.NEXT_PUBLIC_HOST_BACKEND || 'http://localhost:8001',
    hostBackendServerSide: process.env.HOST_BACKEND || 'http://localhost:8001',
    host: process.env.NEXT_PUBLIC_HOST || 'http://localhost:8001',
    lifeTimeToken: 55,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    ckAuthKey: "DRR_WTS",
    title_web: "DRR WTS",
    description_web: "DRR WTS description",
    og_image: process.env.NEXT_PUBLIC_HOST + "/images/logo.png",
    token_secret: process.env.TOKEN_SECRET,
    version:"0.6.0"
  }
}[process.env.NODE_ENV || 'development']
