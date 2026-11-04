import { Router, Request, Response } from 'express';
import https from 'https';

const router = Router();

// In-memory cache for audio streams (LRU-like cap at 1000 items)
const audioCache = new Map<string, { buffer: Buffer; contentType: string }>();
const MAX_CACHE_SIZE = 1000;

function createSineWavBuffer(freq = 440, durationSec = 0.35, sampleRate = 22050): Buffer {
  const numSamples = Math.floor(sampleRate * durationSec);
  const dataSize = numSamples * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env = Math.sin((Math.PI * i) / numSamples);
    const val = Math.floor(Math.sin(2 * Math.PI * freq * t) * env * 28000);
    buffer.writeInt16LE(val, 44 + i * 2);
  }
  return buffer;
}

/**
 * GET /api/tts
 * Query params:
 *   text: text to synthesize (e.g. "Hola mundo")
 *   lang: language code (e.g. "es", "fr", "ja")
 */
router.get('/', async (req: Request, res: Response) => {
  const rawText = String(req.query.text || '').trim();
  let lang = String(req.query.lang || 'es').toLowerCase().trim().replace(/(-en|-es)$/, '');
  if (lang === 'fa') lang = 'ur'; // Perso-Arabic phonetic audio fallback

  if (!rawText) {
    res.status(400).json({ error: 'Text query parameter is required' });
    return;
  }

  // Sanitize text length
  const text = rawText.slice(0, 300);
  const cacheKey = `${lang}:${text}`;

  // Serve from cache if available
  const cached = audioCache.get(cacheKey);
  if (cached) {
    res.setHeader('Content-Type', cached.contentType);
    res.setHeader('Content-Length', cached.buffer.length);
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(cached.buffer);
    return;
  }

  const encoded = encodeURIComponent(text);
  const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=${lang}&client=tw-ob`;

  try {
    const fetchStream = (): Promise<{ buffer: Buffer; contentType: string }> => {
      return new Promise((resolve, reject) => {
        const request = https.get(
          googleTtsUrl,
          {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              Referer: 'https://translate.google.com/',
            },
            timeout: 6000,
          },
          (googleRes) => {
            if (googleRes.statusCode !== 200) {
              return reject(new Error(`Google TTS status ${googleRes.statusCode}`));
            }

            const chunks: Buffer[] = [];
            googleRes.on('data', (chunk) => chunks.push(chunk));
            googleRes.on('end', () => {
              const fullBuffer = Buffer.concat(chunks);
              const contentType = googleRes.headers['content-type'] || 'audio/mpeg';
              resolve({ buffer: fullBuffer, contentType });
            });
            googleRes.on('error', (err) => reject(err));
          }
        );

        request.on('timeout', () => {
          request.destroy();
          reject(new Error('TTS request timed out'));
        });
        request.on('error', (err) => reject(err));
      });
    };

    const { buffer, contentType } = await fetchStream();

    // Cache entry
    if (audioCache.size >= MAX_CACHE_SIZE) {
      const firstKey = audioCache.keys().next().value;
      if (firstKey) audioCache.delete(firstKey);
    }
    audioCache.set(cacheKey, { buffer, contentType });

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(buffer);
  } catch (err: any) {
    console.warn(`[TTS] Streaming failed for "${text}" (${lang}), delivering fallback chime:`, err?.message);
    const fallbackWav = createSineWavBuffer(520, 0.4);
    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Length', fallbackWav.length);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(fallbackWav);
  }
});

export default router;
