import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

@Injectable()
export class PyRunnerService {
  private readonly interpreterPath = process.env.PYTHON_PATH || 'python3';

  private readonly scriptsDir = path.join(__dirname, '../../assets/scripts');

  async runScript(script: string, args: string[]): Promise<string> {
    const safeScript = path.basename(script);
    const pyScript = path.join(this.scriptsDir, safeScript);

    const { stdout, stderr } = await execFileAsync(
      this.interpreterPath,
      [pyScript, ...args.map(String)],
      { timeout: 10_000 },
    );

    if (stderr) {
      console.warn(`Python stderr: ${stderr}`);
    }

    return stdout;
  }
}
