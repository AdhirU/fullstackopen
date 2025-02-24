import { Gender, HealthCheckRating } from "./types";
import { z } from "zod";

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const baseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.string().array().optional(),
});

export const healthCheckEntrySchema = baseEntrySchema.extend({
  healthCheckRating: z.nativeEnum(HealthCheckRating),
  type: z.literal("HealthCheck"),
});

export const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  employerName: z.string(),
  sickLeave: z.object({ startDate: z.string(), endDate: z.string() }),
  type: z.literal("OccupationalHealthcare"),
});

export const hospitalEntrySchema = baseEntrySchema.extend({
  discharge: z.object({ date: z.string().date(), criteria: z.string() }),
  type: z.literal("Hospital"),
});

export const newEntrySchema = z.discriminatedUnion("type", [
  healthCheckEntrySchema,
  occupationalHealthcareEntrySchema,
  hospitalEntrySchema,
]);

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
