import { MatchScores, MatchOutput } from '../../entities';

export interface MatchRescheduledInterface {
  reschedule: (id: number, startDate: string) => Promise<MatchOutput>;
}
