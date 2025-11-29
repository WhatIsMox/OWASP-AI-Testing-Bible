
export enum Pillar {
  APP = "AI Application",
  MODEL = "AI Model",
  INFRA = "AI Infrastructure",
  DATA = "AI Data"
}

export interface TestPayload {
  name: string;
  description: string;
  code?: string;
}

export interface ExternalResource {
  title: string;
  url: string;
}

export interface SuggestedTool {
  name: string;
  description: string;
  url: string;
}

export interface MitigationStrategy {
  type: 'Remediation' | 'Mitigation';
  content: string;
}

export interface TestItem {
  id: string;
  title: string;
  pillar: Pillar;
  summary: string;
  objectives: string[];
  payloads: TestPayload[];
  expectedOutput?: string[];
  suggestedTools?: SuggestedTool[];
  mitigationStrategies: MitigationStrategy[];
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  externalResources?: ExternalResource[];
  owaspTop10Ref?: string;
  owaspMlTop10Ref?: string;
  owaspAgenticRef?: string;
}

export interface OwaspTop10Entry {
  id: string;
  title: string;
  description: string;
  commonRisks: string[];
  preventionStrategies: string[];
  attackScenarios: { title: string; description: string }[];
  references: ExternalResource[];
}

export interface Stat {
  label: string;
  value: string | number;
  icon: any;
  color: string;
}
