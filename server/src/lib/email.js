// @flow
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import debug from 'debug';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';

import config, { env, isEnv } from '../config';

export const SITE_ADDRESS = 'info@co-lab.io';

const dbg = debug('email');

type SendOptionsType = {
  from: ?string;
  to: string;
  cc: ?string;
  bcc: ?string;
  tag: ?string;
  subject: string;
  attachments: any;
  template: string;
  vars: mixed;
};

export async function readTemplateIfExists(name: string, context: any): Promise<string> {
  const moduleDir = path.dirname((module: any).filename);
  const filePath = path.join(moduleDir, '..', '..', 'templates', 'email', name);
  const source = await promisify(fs.readFile)(filePath);
  const template = Handlebars.compile(source.toString());
  return template(context);
}

export async function readEmailTemplate(name: string, context: any): Promise<{ text: string, html: string }> {
  return {
    html: await readTemplateIfExists(`${name}.html.hbs`, context),
    text: await readTemplateIfExists(`${name}.text.hbs`, context),
  };
}

export async function send(options: SendOptionsType): Promise<Object> {
  const { from, to, cc, bcc, subject, template, attachments, vars } = options;
  const { html, text } = await readEmailTemplate(template, vars);
  const tag = isEnv('production') ? options.tag : `${env}.${options.tag || template}`;
  const headers = { 'X-Mailgun-Tag': tag, 'X-Mailgun-Dkim': 'yes' };
  const mailgun = nodemailer.createTransport(config.nodemailer);
  dbg('sending email to ', to, 'bcc', bcc, 'text', text);
  const emailOptions = {
    from: from || SITE_ADDRESS,
    cc,
    to,
    bcc,
    subject,
    text,
    html,
    headers,
    attachments,
  };
  if (isEnv('production') || process.env.SEND_EMAIL) {
    try {
      const info = await mailgun.sendMail(emailOptions);
      dbg('email sent ', info);
      return info;
    } catch (error) {
      dbg('error sending email ', error);
    }
  }
  dbg('email', text || html);
  return {};
}
