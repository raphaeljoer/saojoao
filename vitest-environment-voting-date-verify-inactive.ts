import { Environment } from 'vitest';

export default <Environment>{
  name: 'voting-date-verify-active',
  setup() {
    process.env.VOTING_DATE_VERIFY_ACTIVE = 'false';
    return {
      teardown() {
        delete process.env.VOTING_DATE_VERIFY_ACTIVE;
      }
    };
  }
};
