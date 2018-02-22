// @flow
import fullConfig from './config.json';

export const env = process.env.NODE_ENV || 'development';
export const isEnv = (e: string) => e === env;
export default fullConfig[env];
