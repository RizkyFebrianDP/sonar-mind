16:23:13.944 Running build in Washington, D.C., USA (East) – iad1
16:23:13.945 Build machine configuration: 2 cores, 8 GB
16:23:14.067 Cloning github.com/RizkyFebrianDP/sonar-mind (Branch: main, Commit: 2f419ab)
16:23:14.068 Previous build caches not available.
16:23:14.591 Cloning completed: 523.000ms
16:23:14.923 Running "vercel build"
16:23:14.942 Vercel CLI 58.1.0
16:23:15.176 Installing dependencies...
16:23:18.112 npm warn deprecated rollup-plugin-terser@7.0.2: This package has been deprecated and is no longer maintained. Please use @rollup/plugin-terser
16:23:18.144 npm warn deprecated rimraf@2.7.1: Rimraf versions prior to v4 are no longer supported
16:23:18.244 npm warn deprecated sourcemap-codec@1.4.8: Please use @jridgewell/sourcemap-codec instead
16:23:18.697 npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
16:23:18.827 npm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
16:23:19.025 npm warn deprecated workbox-cacheable-response@6.6.0: workbox-background-sync@6.6.0
16:23:19.591 npm warn deprecated workbox-google-analytics@6.6.0: It is not compatible with newer versions of GA starting with v4, as long as you are using GAv3 it should be ok, but the package is not longer being maintained
16:23:31.865 
16:23:31.865 added 740 packages in 17s
16:23:31.866 
16:23:31.868 189 packages are looking for funding
16:23:31.868   run `npm fund` for details
16:23:31.916 Detected Next.js version: 16.3.0
16:23:31.927 Running "npm run build"
16:23:32.324 
16:23:32.324 > dashboard-assasment@0.1.0 build
16:23:32.324 > next build --webpack
16:23:32.325 
16:23:32.709 ▲ Next.js 16.3.0 (webpack)
16:23:33.394   Applying modifyConfig from Vercel
16:23:33.409 ✓ Running next.config.ts took 701ms
16:23:33.495 Attention: Next.js now collects completely anonymous telemetry regarding usage.
16:23:33.495 This information is used to shape Next.js' roadmap and prioritize features.
16:23:33.495 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
16:23:33.495 https://nextjs.org/telemetry
16:23:33.495 
16:23:33.511 
16:23:33.521 ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
16:23:33.522 
16:23:33.522   To migrate automatically, run:
16:23:33.522   npx @next/codemod@canary middleware-to-proxy .
16:23:33.522 
16:23:33.522   Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
16:23:33.547   Creating an optimized production build ...
16:23:33.911 > [PWA] Compile server
16:23:33.912 > [PWA] Compile server
16:23:33.913 > [PWA] Compile client (static)
16:23:33.913 > [PWA] Auto register service worker with: /vercel/path0/node_modules/next-pwa/register.js
16:23:33.914 > [PWA] Service worker: /vercel/path0/public/sw.js
16:23:33.914 > [PWA]   url: /sw.js
16:23:33.914 > [PWA]   scope: /
16:23:45.585 <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (107kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
16:23:45.591 <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (258kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
16:23:53.947 ⚠ Compiled with warnings in 20.0s
16:23:53.948 
16:23:53.948 ./node_modules/next/dist/esm/server/app-render/dynamic-rendering.js
16:23:53.948 A Node.js API is used (process.cwd at line: 1044) which is not supported in the Edge Runtime.
16:23:53.948 Learn more: https://nextjs.org/docs/api-reference/edge-runtime
16:23:53.948 
16:23:53.948 Import trace for requested module:
16:23:53.948 ./node_modules/next/dist/esm/server/app-render/dynamic-rendering.js
16:23:53.948 ./node_modules/next/dist/esm/server/request/connection.js
16:23:53.948 ./node_modules/next/dist/esm/server/web/exports/index.js
16:23:53.948 ./node_modules/next/dist/esm/api/server.js
16:23:53.948 
16:23:53.949 ./node_modules/next/dist/esm/server/app-render/dynamic-rendering.js
16:23:53.949 A Node.js API is used (process.cwd at line: 1044) which is not supported in the Edge Runtime.
16:23:53.949 Learn more: https://nextjs.org/docs/api-reference/edge-runtime
16:23:53.949 
16:23:53.949 Import trace for requested module:
16:23:53.951 ./node_modules/next/dist/esm/server/app-render/dynamic-rendering.js
16:23:53.951 ./node_modules/next/dist/esm/server/request/connection.js
16:23:53.951 ./node_modules/next/dist/esm/server/web/exports/index.js
16:23:53.952 ./node_modules/next/dist/esm/api/server.js
16:23:53.952 
16:23:53.954   Running TypeScript ...
16:23:59.876   Finished TypeScript in 5.9s ...
16:23:59.882   Collecting page data using 1 worker ...