const GEMINI_ENDPOINT =
  process.env.GEMINI_ENDPOINT ??
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function generateBlog(language: 'fa' | 'en') {
  const prompt =
    language === 'fa'
      ? 'تولید یک مقاله تحلیلی فارسی درباره‌ی تکنولوژی یا رشد فردی. متن باید شامل عنوان در خط اول، خلاصه یک جمله‌ای در خط دوم و متن کامل در خطوط بعدی باشد.'
      : 'Write an English analytical blog post about AI or personal growth. Return the title on the first line, a one sentence summary on the second line and the remaining markdown content afterwards.';

  const res = await fetch(GEMINI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GOOGLE_API_KEY}`
    },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API error: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}
