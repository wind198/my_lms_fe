/**
 *  ENV variables
 */
export const APP_MODE = import.meta.env.MODE
export const IS_DEV = import.meta.env.MODE === 'development'
export const API_URL = import.meta.env.VITE_WEBAPI_URL

export const educationBackgroundOptions = ['highschool', 'under_graduate', 'graduate'] as const
export const userTypeOptions = ['admin', 'student', 'teacher', 'staff'] as const

export type IEducationBackground = (typeof educationBackgroundOptions)[number]
export type IUserType = (typeof userTypeOptions)[number]
