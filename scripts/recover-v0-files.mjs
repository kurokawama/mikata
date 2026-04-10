#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const V0_KEY = process.env.V0_API_KEY;
if (!V0_KEY) { console.error('V0_API_KEY required'); process.exit(1); }

const projectDir = process.argv[2];
const screens = [
  { name: 'articledetail', chatId: 'fkdRUffD4Mk', stitchScreenId: '6738ca97e2d548618c7a7151ac9f3e93' },
  { name: 'subscribepage', chatId: 'utounVFv94N', stitchScreenId: '3d15380fbe1842c0ad7c824dbad34101' },
  { name: 'perspectivespage', chatId: 'etKMKc41WJF', stitchScreenId: '35695e93b3434073a4aeccd96faeb4c1' },
  { name: 'admindashboard', chatId: 'oA7xlvhXtXG', stitchScreenId: 'edf1380e4ea34c5b82db97f23a3985e1' },
];

async function fetchChat(chatId) {
  const res = await fetch(`https://api.v0.dev/v1/chats/${chatId}`, {
    headers: { 'Authorization': `Bearer ${V0_KEY}` }
  });
  return res.json();
}

for (const screen of screens) {
  console.log(`\n=== ${screen.name} (${screen.chatId}) ===`);
  const data = await fetchChat(screen.chatId);
  const v = data.latestVersion || data;
  const files = v.files || [];

  const outDir = join(projectDir, 'components', 'generated', screen.name);
  mkdirSync(outDir, { recursive: true });

  for (const f of files) {
    if (f.name && f.content) {
      const fp = join(outDir, f.name);
      mkdirSync(dirname(fp), { recursive: true });
      writeFileSync(fp, f.content, 'utf8');
      console.log(`  📄 ${f.name}`);
    }
  }

  const meta = {
    screenName: screen.name,
    stitchProjectId: '3332940441353920537',
    stitchScreenId: screen.stitchScreenId,
    v0ChatId: screen.chatId,
    v0WebUrl: data.webUrl || '',
    v0DemoUrl: v.demoUrl || '',
    v0ScreenshotUrl: v.screenshotUrl || '',
    generatedAt: new Date().toISOString(),
    filesCount: files.length,
    source: 'recovered-from-round1'
  };
  writeFileSync(join(outDir, '_metadata.json'), JSON.stringify(meta, null, 2), 'utf8');
  console.log(`  total: ${files.length} files`);
}

console.log('\n✅ 全画面回収完了');
