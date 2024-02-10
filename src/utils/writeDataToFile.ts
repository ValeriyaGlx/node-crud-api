import { PathLike } from 'fs';
import { writeFile } from 'fs/promises';
import { UsersDataType } from '../types';
import { Stream } from 'stream';

export const writeDataToFile = (filename: PathLike, content: UsersDataType) =>
  writeFile(filename, content as unknown as Stream);
