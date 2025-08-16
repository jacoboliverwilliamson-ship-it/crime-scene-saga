export interface Suspect {
  name: string;
  age: number;
  occupation: string;
  alibi: string;
  motive: string;
  evidence: string;
  appearance: string;
  personality: string;
  background: string;
  defenseStatement: string;
  consequences?: string;
}

export interface Evidence {
  item: string;
  description: string;
  significance: string;
}

export interface CrimeScenario {
  id: string;
  crime: string;
  story: string;
  location: string;
  timeOfCrime: string;
  evidence: Evidence[];
  suspects: Suspect[];
  guiltyParty: number;
  solution: string;
}