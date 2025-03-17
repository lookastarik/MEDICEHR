"use client"

const heartRateData = [
  { time: "08:00", value: 72 },
  { time: "09:00", value: 74 },
  { time: "10:00", value: 78 },
  { time: "11:00", value: 82 },
  { time: "12:00", value: 79 },
  { time: "13:00", value: 76 },
  { time: "14:00", value: 75 },
  { time: "15:00", value: 77 },
  { time: "16:00", value: 80 },
]

const bloodPressureData = [
  { time: "08:00", systolic: 120, diastolic: 80 },
  { time: "09:00", systolic: 122, diastolic: 82 },
  { time: "10:00", systolic: 125, diastolic: 83 },
  { time: "11:00", systolic: 130, diastolic: 85 },
  { time: "12:00", systolic: 128, diastolic: 84 },
  { time: "13:00", systolic: 126, diastolic: 83 },
  { time: "14:00", systolic: 125, diastolic: 82 },
  { time: "15:00", systolic: 127, diastolic: 83 },
  { time: "16:00", systolic: 129, diastolic: 84 },
]

const oxygenData = [
  { time: "08:00", value: 98 },
  { time: "09:00", value: 97 },
  { time: "10:00", value: 98 },
  { time: "11:00", value: 96 },
  { time: "12:00", value: 97 },
  { time: "13:00", value: 98 },
  { time: "14:00", value: 97 },
  { time: "15:00", value: 96 },
  { time: "16:00", value: 97 },
]

const glucoseData = [
  { time: "08:00", value: 110 },
  { time: "09:00", value: 130 },
  { time: "10:00", value: 145 },
  { time: "11:00", value: 160 },
  { time: "12:00", value: 180 },
  { time: "13:00", value: 195 },
  { time: "14:00", value: 210 },
  { time: "15:00", value: 200 },
  { time: "16:00", value: 190 },
]

import VitalSigns from "@/components/vital-signs/vital-signs-web"

export default VitalSigns

