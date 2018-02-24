// @flow
import fs from 'fs';
import path from 'path';
import debug from 'debug';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';

import config, { env, isEnv } from '../config';
import { promisify } from '../lib/promises';

const dbg = debug('email');

type SendOptionsType = {
  from: string;
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
  const moduleDir = path.dirname((module: any).path);
  const relativePath = path.join(moduleDir, '..', '..', 'templates', 'email', name);
  const source = await promisify(fs.readFile, [path.normalize(relativePath)]);
  const template = Handlebars.compile(source);
  return template(context);
}

export async function readEmailTemplate(name: string, context: any): Promise<{ text: string, html: string }> {
  return {
    html: await readTemplateIfExists(`${name}.html.hbs`, context),
    text: await readTemplateIfExists(`${name}.text.hbs`, context),
  };
}

export async function send(options: SendOptionsType): Promise<Object> {
  const mailgun = nodemailer.createTransport(config.nodemailer);
  const { from, to, cc, bcc, subject, template, attachments, vars } = options;
  const { html, text } = await readEmailTemplate(template, vars);
  const tag = isEnv('production') ? options.tag : `${env}.${options.tag || template}`;
  const headers = { 'X-Mailgun-Tag': tag, 'X-Mailgun-Dkim': 'yes' };
  dbg('sending email to ', to, 'bcc', bcc, 'text', text);
  if (isEnv('production')) {
    const info = await mailgun.sendMail({
      from, cc, to, bcc, subject, text, html, headers, attachments });
    dbg('email sent ', info);
    return info;
  }
  dbg('email', html || text);
  return {};
}
