export const redisConnectionCounterProps = {
  host: process.env.SM_REDIS_COUNTER_HOST || '',
  token: process.env.SM_REDIS_COUNTER_TOKEN || ''
};

export const redisConnectionAuditLogProps = {
  host: process.env.SM_REDIS_AUDIT_LOG_HOST || '',
  token: process.env.SM_REDIS_AUDIT_LOG_TOKEN || ''
};

export const redisConnectionCounterTestProps = {
  host: process.env.SM_REDIS_COUNTER_TEST_HOST || '',
  token: process.env.SM_REDIS_COUNTER_TEST_TOKEN || ''
};

export const redisConnectionAuditLogTestProps = {
  host: process.env.SM_REDIS_AUDIT_LOG_TEST_HOST || '',
  token: process.env.SM_REDIS_AUDIT_LOG_TEST_TOKEN || ''
};
