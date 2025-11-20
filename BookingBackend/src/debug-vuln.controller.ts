// for DAST testing purposes ONLY.
// DO NOT USE IN PRODUCTION.

import { Controller, Get, Query, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('debug')
export class DebugVulnController {
  constructor(
    @Inject(DataSource) private readonly dataSource: DataSource,
  ) {}

  @Get('sqli')
  async vulnerableSQLInjection(@Query('q') q: string) {
    const query = `SELECT * FROM users WHERE username = '${q}'`;

    const result = await this.dataSource.query(query);
    return {
      message: 'This endpoint is intentionally vulnerable for testing',
      executed_query: query,
      result,
    };
  }
}
