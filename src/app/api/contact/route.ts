import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3).optional(),
  message: z.string().min(5),
  type: z.enum(['contact', 'volunteer']).optional(),
  phone: z.string().optional(),
  profession: z.string().optional(),
  motivation: z.string().optional(),
});

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count++;
  return true;
}

function buildContactHtml(data: z.infer<typeof schema>): string {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f8f6f0;border-radius:12px">
      <div style="background:#0a1628;padding:20px 24px;border-radius:8px;margin-bottom:24px">
        <h2 style="color:#c9a84c;margin:0;font-size:20px">KİM Vakfı — New Contact Message</h2>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:10px 0;color:#666;width:120px;vertical-align:top">Name</td><td style="padding:10px 0;font-weight:600;color:#1a1a1a">${escHtml(data.name)}</td></tr>
        <tr><td style="padding:10px 0;color:#666;vertical-align:top">Email</td><td style="padding:10px 0"><a href="mailto:${escHtml(data.email)}" style="color:#c9a84c">${escHtml(data.email)}</a></td></tr>
        ${data.subject ? `<tr><td style="padding:10px 0;color:#666;vertical-align:top">Subject</td><td style="padding:10px 0;color:#1a1a1a">${escHtml(data.subject)}</td></tr>` : ''}
        <tr><td style="padding:10px 0;color:#666;vertical-align:top">Message</td><td style="padding:10px 0;color:#1a1a1a;white-space:pre-wrap">${escHtml(data.message)}</td></tr>
      </table>
    </div>
  `;
}

function buildVolunteerHtml(data: z.infer<typeof schema>): string {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f8f6f0;border-radius:12px">
      <div style="background:#0a1628;padding:20px 24px;border-radius:8px;margin-bottom:24px">
        <h2 style="color:#c9a84c;margin:0;font-size:20px">KİM Vakfı — New Volunteer Application</h2>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:10px 0;color:#666;width:130px;vertical-align:top">Name</td><td style="padding:10px 0;font-weight:600;color:#1a1a1a">${escHtml(data.name)}</td></tr>
        <tr><td style="padding:10px 0;color:#666;vertical-align:top">Email</td><td style="padding:10px 0"><a href="mailto:${escHtml(data.email)}" style="color:#c9a84c">${escHtml(data.email)}</a></td></tr>
        ${data.phone ? `<tr><td style="padding:10px 0;color:#666;vertical-align:top">Phone</td><td style="padding:10px 0;color:#1a1a1a">${escHtml(data.phone)}</td></tr>` : ''}
        ${data.profession ? `<tr><td style="padding:10px 0;color:#666;vertical-align:top">Profession</td><td style="padding:10px 0;color:#1a1a1a">${escHtml(data.profession)}</td></tr>` : ''}
        ${data.motivation ? `<tr><td style="padding:10px 0;color:#666;vertical-align:top">Motivation</td><td style="padding:10px 0;color:#1a1a1a;white-space:pre-wrap">${escHtml(data.motivation)}</td></tr>` : ''}
      </table>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const data = schema.parse(body);

    const TO = process.env.CONTACT_EMAIL ?? 'info@crossculturalcenter.org';
    const FROM = process.env.FROM_EMAIL ?? 'noreply@crossculturalcenter.org';
    const isVolunteer = data.type === 'volunteer';

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: FROM,
        to: TO,
        replyTo: data.email,
        subject: isVolunteer
          ? `Volunteer Application — ${data.name}`
          : `Contact: ${data.subject ?? 'Message from website'}`,
        html: isVolunteer ? buildVolunteerHtml(data) : buildContactHtml(data),
      });
    } else {
      // No API key configured — log submission so it is not silently lost
      console.warn('[contact] RESEND_API_KEY not set. Submission received but not emailed:', data);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', details: error.issues }, { status: 400 });
    }
    console.error('[contact] Failed to process submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
