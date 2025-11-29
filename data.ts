
import { TEST_DATA as STANDARD_TEST_DATA } from './data_tests';
import { AGENTIC_TEST_DATA } from './data_agentic';

// Merge standard and agentic tests into one master list
export const TEST_DATA = [...STANDARD_TEST_DATA, ...AGENTIC_TEST_DATA];

export * from './data_llm';
export * from './data_ml';
export { OWASP_AGENTIC_THREATS_DATA } from './data_agentic'; 
// We export TEST_DATA above, so we don't re-export from data_tests
