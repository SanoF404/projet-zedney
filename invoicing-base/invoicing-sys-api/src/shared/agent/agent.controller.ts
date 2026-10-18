import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { OllamaService, OllamaChatMessage } from './ollama.service';
import { Public } from '../auth/utils/public-strategy';

class ChatDto {
  messages: OllamaChatMessage[];
  model?: string;
  temperature?: number;
  think?: boolean;
}

@Controller('agent')
export class AgentController {
  constructor(private ollamaService: OllamaService) {}

  /**
   * Simple single-prompt generation.
   */
  @Public()
  @Get('generate')
  async generate(@Query('prompt') prompt: string) {
    const response = await this.ollamaService.generate(prompt);
    return { response };
  }

  /**
   * Multi-turn chat (non-streaming).
   */
  @Public()
  @Post('chat')
  async chat(@Body() dto: ChatDto) {
    const message = await this.ollamaService.chat(dto.messages, {
      model: dto.model,
      temperature: dto.temperature,
      think: false,
    });
    return { message };
  }

  /**
   * Streaming chat via Server-Sent Events (SSE).
   * Tokens are streamed as `data: { "token": "..." }` events.
   */
  @Public()
  @Post('chat/stream')
  async streamChat(@Body() dto: ChatDto, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    try {
      for await (const token of this.ollamaService.streamChat(dto.messages, {
        model: dto.model,
        temperature: dto.temperature,
        think: false,
      })) {
        res.write(`data: ${JSON.stringify({ token })}\n\n`);
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      res.write(
        `data: ${JSON.stringify({ error: errorMessage, done: true })}\n\n`,
      );
    } finally {
      res.end();
    }
  }

  /**
   * Health check — is Ollama reachable?
   */
  @Public()
  @Get('health')
  async health() {
    const available = await this.ollamaService.isAvailable();
    return { available };
  }

  /**
   * List available models on the Ollama server.
   */
  @Public()
  @Get('models')
  async models() {
    const models = await this.ollamaService.listModels();
    return { models };
  }
}
