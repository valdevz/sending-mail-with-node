const nodemailer = require("nodemailer"),
      puppeteer = require("puppeteer"),
      { htmlTemplate } = require("../Template/HtmlTemplate");

let emailConfig = {
  host: 'smtp.gmail.com', // SMTP provider in my case is Gmail
  port: 587, // the port that your SMTP provider ask for
  secure: false,
  auth: {
    user: 'your-user-mail',
    pass: 'the-password-of-your-mail',
  },
}

let email = 'destinatary@mail.com'; //email destination
let sender = 'your-email'; // email where the mail's gonna be sent

class MailController {
  static async sampleMail(){
    let message = {
      from: sender, 
      to: email,
      subject: 'Sending Mail from node.',
      text: 'Body of the mail.',
      envelope: {
          from: `Valdevz <${sender}>`,
          to: `${email}, <${email}>`
      }
    }
    this.mailSender(message);
  }

  static async htmlMail(){
    let message = {
      from: sender, 
      to: email,
      subject: 'Sending HTML Mail from node.',
      html: htmlTemplate(),
      envelope: {
          from: `Valdevz <${sender}>`,
          to: `${email}, <${email}>`
      }
    }
    this.mailSender(message);
  }

  static async attachedFileMail(){
    let message = {
      from: sender, 
      to: email,
      subject: 'Sending Mail with attached file from node.',
      attachments: [
        {
            path: __dirname + '/../temp/file.pdf',
            filename: 'file.pdf', 
            contentType: 'contentType'
        }],
      envelope: {
          from: `Valdevz <${sender}>`,
          to: `${email}, <${email}>`
      }
    }
    this.mailSender(message);
  }

static async htmlToPdfMail(){
  try {
    const browser = await puppeteer.launch({
      headless: true
    })
    const page = await browser.newPage()
    const template = htmlTemplate();
    await page.setContent(template, {waitUntil: 'domcontentloaded'})
    await page.pdf({
      path: __dirname + '/../temp/file2.pdf',
      printBackground: true,
      format: 'A4',
    })
    await browser.close()
    let message = {
      from: sender, 
      to: email,
      subject: 'Converting HTML code to PDF file.',
      attachments: [
        {
            path: __dirname + '/../temp/file2.pdf',
            filename: 'file2.pdf', 
            contentType: 'contentType'
        }],
      envelope: {
          from: `Valdevz <${sender}>`,
          to: `${email}, <${email}>`
      }
    }
    this.mailSender(message);
  } catch (error) {
    throw error;
  }
}

  static async mailSender(data){
    let transporter = nodemailer.createTransport(emailConfig);
      transporter.verify((error) => error ? error: '');
      transporter.sendMail(data);
  }

}

module.exports = MailController;