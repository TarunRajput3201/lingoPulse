import * as fs from 'fs';
import * as path from 'path';
import { generateLanguageFile, LangConfig } from './buildAllNewLanguageDefinitions';
import { BATCH_1 } from './languages/batch1';
import { BATCH_2 } from './languages/batch2';
import { BATCH_3 } from './languages/batch3';
import { BATCH_4 } from './languages/batch4';

const ALL_NEW: LangConfig[] = [...BATCH_1, ...BATCH_2, ...BATCH_3, ...BATCH_4];

console.log(`Writing ${ALL_NEW.length} new language definition files to backend/src/services/curriculum/languages/ ...`);

const outDir = path.resolve(__dirname, '../backend/src/services/curriculum/languages');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const fileMap: Record<string, string> = {
  ar: 'arabic.ts',
  ru: 'russian.ts',
  nl: 'dutch.ts',
  tr: 'turkish.ts',
  sv: 'swedish.ts',
  no: 'norwegian.ts',
  da: 'danish.ts',
  pl: 'polish.ts',
  el: 'greek.ts',
  he: 'hebrew.ts',
  th: 'thai.ts',
  vi: 'vietnamese.ts',
  id: 'indonesian.ts',
  ms: 'malay.ts',
  tl: 'tagalog.ts',
  bn: 'bengali.ts',
  ur: 'urdu.ts',
  pa: 'punjabi.ts',
  ta: 'tamil.ts',
  te: 'telugu.ts',
  mr: 'marathi.ts',
  gu: 'gujarati.ts',
  uk: 'ukrainian.ts',
  fa: 'persian.ts',
  sw: 'swahili.ts',
  ro: 'romanian.ts',
  cs: 'czech.ts',
  hu: 'hungarian.ts',
};

for (const cfg of ALL_NEW) {
  const fileName = fileMap[cfg.code];
  if (!fileName) {
    throw new Error(`Missing fileName mapping for language ${cfg.code}`);
  }
  const filePath = path.join(outDir, fileName);
  const content = generateLanguageFile(cfg);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✓ Written ${cfg.flag} ${cfg.name} (${cfg.code}) -> ${fileName}`);
}

console.log('✅ Successfully generated all 28 new language definitions!');
