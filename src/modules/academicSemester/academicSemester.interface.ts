export type TMonth =
   | "january"
   | "february"
   | "march"
   | "april"
   | "may"
   | "june"
   | "july"
   | "august"
   | "september"
   | "october"
   | "november"
   | "december";

export type TAcademicSemester = {
   name: "Autumn" | "Summer" | "Fall";
   year: Date;
   code: "01" | "02" | "03";
   startMonth: TMonth;
   endMonth: TMonth;
};
