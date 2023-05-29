import { Environment } from 'vitest';

export default <Environment>{
  name: 'voting-date-verify-active',
  setup() {
    process.env.NEXT_PUBLIC_VOTING_DATE_VERIFY_ACTIVE = 'false';
    return {
      teardown() {
        delete process.env.NEXT_PUBLIC_VOTING_DATE_VERIFY_ACTIVE;
      }
    };
  }
};
