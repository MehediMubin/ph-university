import { TSchedule } from "./offeredCourse.interface";

const hasTimeConflict = (
   facultySchedules: TSchedule[],
   newSchedule: TSchedule,
) => {
   const { startTime, endTime } = newSchedule;

   for (const schedule of facultySchedules) {
      const existingStartTime = new Date(schedule.startTime);
      const existingEndTime = new Date(schedule.endTime);

      const newStartTime = new Date(startTime);
      const newEndTime = new Date(endTime);

      if (
         (newStartTime >= existingStartTime &&
            newStartTime <= existingEndTime) ||
         (newEndTime >= existingStartTime && newEndTime <= existingEndTime)
      ) {
         return true;
      }
   }
   return false;
};

export default hasTimeConflict;
