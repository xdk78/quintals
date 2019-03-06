const {
  FuseBox,
  WebIndexPlugin,
  QuantumPlugin,
  EnvPlugin,
  CopyPlugin,
  JSONPlugin,
  StyledComponentsPlugin,
  CSSResourcePlugin,
  CSSPlugin
} = require('fuse-box')
const { spawn } = require('child_process')

const production = process.env.NODE_ENV === 'development' ? false : true

const getConfig = (target, name) => {
  return {
    homeDir: 'src/',
    cache: !production,
    target,
    output: `build/$name.js`,
    tsConfig: './tsconfig.json',
    useTypescriptCompiler: true,
    emitHMRDependencies: true,
    plugins: [
      EnvPlugin({ NODE_ENV: production ? 'production' : 'development' }),
      production &&
        QuantumPlugin({
          bakeApiIntoBundle: name,
          treeshake: true,
          removeExportsInterop: false
        })
    ],
    log: {
      showBundledFiles: false,
      clearTerminalOnBundle: true
    }
  }
}

const getRendererConfig = (target, name) => {
  const cfg = Object.assign({}, getConfig(target, name), {
    sourceMaps: !production
  })

  return cfg
}

const getWebIndexPlugin = name => {
  return WebIndexPlugin({
    template: `public/${name}.html`,
    path: production ? '.' : '/',
    target: `${name}.html`,
    bundles: [name]
  })
}

const getCopyPlugin = () => {
  return CopyPlugin({
    files: ['*.woff2', '*.jpg', '*.png', '*.svg', '*.ttf'],
    dest: 'assets',
    resolve: production ? './assets' : '/assets'
  })
}

const main = () => {
  const fuse = FuseBox.init(getConfig('server', 'main'))

  const app = fuse.bundle('main').instructions(`> [main/index.ts]`)

  if (!production) {
    app.watch()
  }

  fuse.run()
}

const renderer = (name, port) => {
  const cfg = getRendererConfig('electron', name)

  cfg.plugins.push(getWebIndexPlugin(name))
  cfg.plugins.push(JSONPlugin())
  cfg.plugins.push(getCopyPlugin())
  cfg.plugins.push(StyledComponentsPlugin())
  cfg.plugins.push(CSSResourcePlugin({ inline: true }))
  cfg.plugins.push(CSSPlugin())

  const fuse = FuseBox.init(cfg)

  if (!production) {
    fuse.dev({ httpServer: true, port, socketURI: `ws://localhost:${port}` })
  }

  const app = fuse.bundle(name).instructions(`> [renderer/${name}/index.tsx]`)

  if (!production) {
    app.hmr({ port, socketURI: `ws://localhost:${port}` }).watch()

    if (name === 'app') {
      return fuse.run().then(() => {
        spawn('npm', ['start'], {
          shell: true,
          stdio: 'inherit'
        })
      })
    }
  }

  fuse.run()
}

renderer('app', 4444)
main()
