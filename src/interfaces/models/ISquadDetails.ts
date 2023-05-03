export default interface ISquadDetails {
    totalSquadHours: number;
    averageSquadHoursPerDay: number;
    members: [
      {
        averageWorkHoursPerDay: number;
        estimatedHours: number;
        id: number;
        name: string;
        reports: [
          {
            createdAt: string;
            description: string;
            employeeId: number;
            id: number;
            spentHours: number;
          }
        ];
        squadId: number;
        totalWorkHours: number;
      }
    ];
  }