import { FixturesScores, FixturesOutput } from '../../entities';

export interface FixturesRescheduledInterface {
  reschedule: (id: string, startDate: string) => Promise<FixturesOutput>;
}
