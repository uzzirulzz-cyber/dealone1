import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function verifySchema() {
  try {
    const tables = await db.$queryRaw<{ table_name: string }[]>`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;
    console.log('📋 Tables in Neon database:');
    for (const t of tables) {
      console.log(`  - ${t.table_name}`);
    }

    console.log('\n📊 Row counts:');
    const tableNames = tables.map((t) => t.table_name);
    for (const name of tableNames) {
      const count = await db.$queryRawUnsafe<{ count: bigint }[]>(
        `SELECT COUNT(*)::bigint as count FROM "${name}";`,
      );
      console.log(`  ${name}: ${count[0].count} rows`);
    }
  } catch (err) {
    console.error('❌ Verification failed:', err);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

verifySchema();
