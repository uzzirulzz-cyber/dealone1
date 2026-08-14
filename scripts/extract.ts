import fs from 'fs';
import path from 'path';

const dir = '/home/z/my-project/scripts/fetched';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const fullPath = path.join(dir, file);
  const raw = fs.readFileSync(fullPath, 'utf8');
  try {
    const data = JSON.parse(raw);
    console.log('\n========================================');
    console.log(`📄 FILE: ${file}`);
    console.log('========================================');
    console.log(`Title: ${data.title || data.data?.title || 'N/A'}`);
    console.log(`URL: ${data.url || data.data?.url || 'N/A'}`);
    console.log(`Published: ${data.publishedTime || data.data?.publishedTime || 'N/A'}`);

    // Get text/html content
    const html = data.html || data.data?.html || '';
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();

    console.log(`\n--- TEXT CONTENT (first 2000 chars) ---`);
    console.log(text.slice(0, 2000));
    console.log(`\n--- Length: ${text.length} chars ---`);
  } catch (e) {
    console.log(`Error parsing ${file}:`, e.message);
    console.log('Raw content (first 500 chars):', raw.slice(0, 500));
  }
}
