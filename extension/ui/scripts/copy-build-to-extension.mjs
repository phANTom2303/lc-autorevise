// Copies the built index.html + assets into the extension root replacing sidepanel.* assets.
import { copyFile, rm, mkdir, readdir, cp } from 'fs/promises';
import { resolve } from 'path';

const uiRoot = resolve(process.cwd());
const distDir = resolve(uiRoot, 'dist');
const extensionDir = resolve(uiRoot, '..');
const targetHtml = resolve(extensionDir, 'sidepanel.html');
const assetDirName = 'sidepanel_assets';
const targetAssetsDir = resolve(extensionDir, assetDirName);

async function run() {
  await rm(targetAssetsDir, { recursive: true, force: true }).catch(()=>{});
  await mkdir(targetAssetsDir, { recursive: true });

  // Copy index.html -> sidepanel.html but adjust asset paths
  const indexHtmlPath = resolve(distDir, 'index.html');
  let html = await (await import('fs/promises')).readFile(indexHtmlPath, 'utf8');

  // Replace /assets/... with sidepanel_assets/... (relative paths)
  html = html.replace(/src="\/assets\//g, 'src="' + assetDirName + '/');
  html = html.replace(/href="\/assets\//g, 'href="' + assetDirName + '/');

  // Write transformed html
  await (await import('fs/promises')).writeFile(targetHtml, html, 'utf8');

  // Copy assets folder contents
  const assetsSource = resolve(distDir, 'assets');
  await cp(assetsSource, targetAssetsDir, { recursive: true });

  console.log('Copied React build into extension sidepanel.');
}

run().catch(e => { console.error(e); process.exit(1); });
