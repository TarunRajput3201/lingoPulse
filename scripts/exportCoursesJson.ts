import { ALL_COURSES } from '../mobile/src/data/courses';
import * as fs from 'fs';
import * as path from 'path';

const outPath = path.resolve(__dirname, '../backend/src/seed/coursesData.json');
fs.writeFileSync(outPath, JSON.stringify(ALL_COURSES, null, 2), 'utf-8');
console.log('Successfully written coursesData.json! Size:', fs.statSync(outPath).size, 'bytes');
