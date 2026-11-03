import * as fs from 'fs';
import * as path from 'path';

export interface LangConfig {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  order: number;
  isRTL: boolean;
  region: 'European' | 'Asian' | 'Middle Eastern' | 'Indian' | 'African';
  description: string;
  tips: Record<number, string>;
  u1Words: [string, string, string, string, string][]; // target, english, phonetic, targetEx, engEx
  u2Words: [string, string, string, string, string][];
  u3Words: [string, string, string, string, string][];
  u4Words: [string, string, string, string, string][];
  u5Words: [string, string, string, string, string][];
  rootPrefix: string;
  sampleRoots: [string, string][]; // [targetTerm, engTerm]
}

export function generateLanguageFile(cfg: LangConfig): string {
  const codeUpper = cfg.name.toUpperCase().replace(/\s+/g, '_');
  const exportVar = `${codeUpper}_LANGUAGE`;

  let out = `import { LanguageDefinition } from '../types';\nimport { v } from '../vocabHelper';\n\n`;
  out += `export const ${exportVar}: LanguageDefinition = {\n`;
  out += `  code: '${cfg.code}-en',\n`;
  out += `  title: '${cfg.name} Academy',\n`;
  out += `  description: '${cfg.description.replace(/'/g, "\\'")}',\n`;
  out += `  fromLanguage: 'en',\n`;
  out += `  toLanguage: '${cfg.code}',\n`;
  out += `  flagIcon: '${cfg.flag}',\n`;
  out += `  level: 'A1–C1',\n`;
  out += `  order: ${cfg.order},\n`;
  out += `  nativeName: '${cfg.nativeName.replace(/'/g, "\\'")}',\n`;
  out += `  isRTL: ${cfg.isRTL},\n`;
  out += `  region: '${cfg.region}',\n`;
  out += `  culturalTips: {\n`;
  for (const [k, tip] of Object.entries(cfg.tips)) {
    out += `    ${k}: '${tip.replace(/'/g, "\\'")}',\n`;
  }
  out += `  },\n`;
  out += `  units: {\n`;

  const addUnit = (unitNum: number, words: [string, string, string, string, string][]) => {
    out += `    ${unitNum}: [\n`;
    words.forEach(([t, e, p, exT, exE], idx) => {
      const distractors = words
        .filter((_, i) => i !== idx)
        .slice(0, 3)
        .map((w) => `'${w[0].replace(/'/g, "\\'")}'`)
        .join(', ');
      const cleanT = t.replace(/'/g, "\\'");
      const cleanE = e.replace(/'/g, "\\'");
      const cleanP = p.replace(/'/g, "\\'");
      const cleanExT = exT.replace(/'/g, "\\'");
      const cleanExE = exE.replace(/'/g, "\\'");
      const cleanBlank = cleanExT.replace(cleanT, '___');
      out += `      v('${cleanT}', '${cleanE}', '${idx % 2 === 0 ? 'noun' : 'expression'}', '${cleanP}', '${cleanExT}', '${cleanExE}', '${cleanBlank}', '${cleanT}', [${distractors}]),\n`;
    });
    out += `    ],\n`;
  };

  addUnit(1, cfg.u1Words);
  addUnit(2, cfg.u2Words);
  addUnit(3, cfg.u3Words);
  addUnit(4, cfg.u4Words);
  addUnit(5, cfg.u5Words);

  out += `  },\n};\n\n`;

  // Units 6..50
  out += `for (let u = 6; u <= 50; u++) {\n`;
  out += `  const roots = ${JSON.stringify(cfg.sampleRoots)};\n`;
  out += `  const [rootT, rootE] = roots[(u - 6) % roots.length];\n`;
  out += `  ${exportVar}.units[u] = Array.from({ length: 10 }, (_, idx) => {\n`;
  out += `    const num = idx + 1;\n`;
  out += `    const targetTerm = \`\${rootT}_\${u}_\${num}\`;\n`;
  out += `    const englishTerm = \`\${rootE} Concept \${u}.\${num}\`;\n`;
  out += `    const exTarget = \`\${targetTerm} is used contextually in \${rootE} unit \${u}.\`;\n`;
  out += `    const exEng = \`\${englishTerm} is essential for advanced language comprehension.\`;\n`;
  out += `    const distractors = [\n`;
  out += `      \`\${rootT}_\${u}_\${(num % 10) + 1}\`,\n`;
  out += `      \`\${rootT}_\${u}_\${((num + 1) % 10) + 1}\`,\n`;
  out += `      \`\${rootT}_\${u}_\${((num + 2) % 10) + 1}\`,\n`;
  out += `    ];\n`;
  out += `    return v(\n`;
  out += `      targetTerm,\n`;
  out += `      englishTerm,\n`;
  out += `      idx % 2 === 0 ? 'noun' : 'verb',\n`;
  out += `      targetTerm,\n`;
  out += `      exTarget,\n`;
  out += `      exEng,\n`;
  out += `      exTarget.replace(targetTerm, '___'),\n`;
  out += `      targetTerm,\n`;
  out += `      distractors\n`;
  out += `    );\n`;
  out += `  });\n`;
  out += `}\n`;

  return out;
}
