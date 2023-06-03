export const redisConnectionAuditLogProps = {
  host: process.env.SM_REDIS_AUDIT_LOG_HOST || '',
  token: process.env.SM_REDIS_AUDIT_LOG_TOKEN || ''
};
