import type React from "react"

export interface Course{
key:React.Key
  id:number,
  title: string,
  description: string,
  price: number,
  duration: string,
  lessons_in_a_week: number,
  lesson_duration: string
}