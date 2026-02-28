import nodemailer from 'nodemailer';

const email = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass,
  },
});

const mailOptions = {
  from: email,
  to: 'amanchaudhary.web@gmail.com',
};

const CONTACT_MESSAGE_FIELDS = {
  name: 'Name',
  email: 'Email',
  subject: 'Subject',
  phone: 'Phone',
  message: 'Message',
};

function generateEmailContent(data) {
  const entries = Object.entries(CONTACT_MESSAGE_FIELDS).filter(
    ([key]) => data[key] != null && String(data[key]).trim() !== ''
  );
  const stringData = entries
    .reduce((str, [key, label]) => (str += `${label}: \n${data[key]}\n\n`), '');
  const htmlData = entries
    .reduce(
      (str, [key, label]) =>
        (str += `<h3 class="form-heading" align="left">${label}</h3><p class="form-answer" align="left">${String(data[key]).replace(/</g, '&lt;')}</p>`),
      ''
    );

  return {
    text: stringData,
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><style type="text/css">.form-container{margin-bottom:24px;padding:20px;border:1px dashed #ccc}.form-heading{color:#2a2a2a;font-family:Helvetica,Arial,sans-serif;font-weight:400;font-size:18px;margin:0 0 8px}.form-answer{color:#2a2a2a;font-family:Helvetica,Arial,sans-serif;font-weight:300;font-size:16px;margin:0 0 24px}</style></head><body style="margin:0;padding:0;background:#fff"><div style="padding:20px"><h2>New Contact Message</h2><div class="form-container">${htmlData}</div></div></body></html>`,
  };
}

export async function POST(request) {
  if (!email || !pass) {
    return Response.json(
      { message: 'Email configuration missing. Set EMAIL and EMAIL_PASS in .env.' },
      { status: 500 }
    );
  }

  try {
    const data = await request.json();
    if (!data || typeof data !== 'object') {
      return Response.json(
        { message: 'Bad request. Send JSON with name, email, subject, message.' },
        { status: 400 }
      );
    }

    const name = data.name?.toString?.()?.trim();
    const emailVal = data.email?.toString?.()?.trim();
    const subject = data.subject?.toString?.()?.trim();
    const message = data.message?.toString?.()?.trim();

    if (!name || !emailVal || !subject || !message) {
      return Response.json(
        { message: 'Please fill in all required fields: name, email, subject, message.' },
        { status: 400 }
      );
    }

    await transporter.sendMail({
      ...mailOptions,
      subject,
      ...generateEmailContent(data),
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Contact API error:', err);
    return Response.json(
      { message: err?.message || 'Failed to send message.' },
      { status: 500 }
    );
  }
}
