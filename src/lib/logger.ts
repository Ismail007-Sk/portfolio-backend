// Structured logging utility. No console.log in production code paths —
// import and use `logger` instead.
type Level = 'debug' | 'info' | 'warn' | 'error';

function emit(level: Level, message: string, meta?: Record<string, unknown>): void {
  const entry = {
    level,
    message,
    time: new Date().toISOString(),
    ...(meta ? { meta } : {}),
  };
  const line = JSON.stringify(entry);
  if (level === 'error') process.stderr.write(line + '\n');
  else process.stdout.write(line + '\n');
}

export const logger = {
  debug: (message: string, meta?: Record<string, unknown>) => emit('debug', message, meta),
  info: (message: string, meta?: Record<string, unknown>) => emit('info', message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => emit('warn', message, meta),
  error: (message: string, meta?: Record<string, unknown>) => emit('error', message, meta),
};
