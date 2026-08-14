import fs from 'fs';
import path from 'path';

const dir = '/home/z/my-project/scripts/fetched/about';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const fullPath = path.join(dir, file);
  const raw = fs.readFileSync(fullPath, 'utf8');
  try {
    const data = JSON.parse(raw);
    console.log('\n========================================');
    console.log(`📄 ABOUT FILE: ${file}`);
    console.log('========================================');
    console.log(`Title: ${data.title || data.data?.title || 'N/A'}`);
    console.log(`URL: ${data.url || data.data?.url || 'N/A'}`);

    const html = data.html || data.data?.html || '';
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();

    console.log(`\n--- TEXT (first 1500 chars) ---`);
    console.log(text.slice(0, 1500));
    console.log(`\n--- Length: ${text.length} chars ---`);
  } catch (e) {
    console.log(`Error parsing ${file}:`, e.message);
  }
}
