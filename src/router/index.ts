import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/auth/login/Login.vue'
import NotFound from '@/components/app/NotFound.vue'
import Forbiden from '@/components/app/Forbiden.vue'
import UnexpectedError from '@/components/app/UnexpectedError.vue'
import AuthenticationGuard from '@/components/app/AuthenticationGuard.vue'
import AppWrapper from '../components/app/AppWrapper.vue'
import type { ISearchParam } from '../stores/useSearchParamStore'
import ManagementLayout from '../layouts/home/ManagementLayout.vue'
import ListStudents from '../views/management/student/ListStudents.vue'
import CreateStudent from '../views/management/student/CreateStudent.vue'
import ListTeacher from '../views/management/teacher/ListTeachers.vue'
import ListAdmins from '../views/management/admin/ListAdmins.vue'
import CreateAdmin from '../views/management/admin/CreateAdmin.vue'
import ListTeachers from '../views/management/teacher/ListTeachers.vue'
import CreateTeacher from '../views/management/teacher/CreateTeacher.vue'

export const LOGIN_ROUTE = 'login'
export const NOT_FOUND_ROUTE = 'not-found'
export const FORBIDEN_ROUTE = 'forbiden'
export const UNEXPECTED_ERROR_ROUTE = 'unexpected-error'
export const DASHBOARD_ROUTE = 'dashboard'
export const STUDENT_MANAGEMENT_ROUTE = 'management__student'
export const STUDENT_LIST_ROUTE = 'management__list-student'
export const STUDENT_CREATE_ROUTE = 'management__create-student'
export const TEACHER_MANAGEMENT_ROUTE = 'management__teacher'
export const TEACHER_LIST_ROUTE = 'management__list-teacher'
export const TEACHER_CREATE_ROUTE = 'management__create-teacher'

export const ADMIN_MANAGEMENT_ROUTE = 'management__admin'
export const ADMIN_LIST_ROUTE = 'management__list-admin'
export const ADMIN_CREATE_ROUTE = 'management__create-admin'

const ManagementSeachParams: ISearchParam[] = ['page', 'pageSize', 'sort', 'type']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppWrapper,
      children: [
        /**----------------------------------- PUBLIC ROUTES -----------------------------------*/
        {
          path: '/login',
          name: LOGIN_ROUTE,
          component: Login
        },
        {
          path: '/404',
          name: NOT_FOUND_ROUTE,
          component: NotFound
        },
        {
          path: '/403',
          name: FORBIDEN_ROUTE,
          component: Forbiden
        },
        {
          path: '/500',
          name: UNEXPECTED_ERROR_ROUTE,
          component: UnexpectedError
        },
        /**----------------------------------- GUARDED ROUTES -----------------------------------*/
        {
          path: '/',
          component: AuthenticationGuard,
          redirect: { name: DASHBOARD_ROUTE },
          children: [
            {
              path: '/dashboard',
              name: DASHBOARD_ROUTE,
              component: Home,
              meta: {
                title: 'Dashboard'
              }
            },
            {
              path: 'management',
              component: ManagementLayout,
              redirect: { name: STUDENT_MANAGEMENT_ROUTE },
              children: [
                {
                  path: 'students',
                  name: STUDENT_MANAGEMENT_ROUTE,
                  redirect: { name: STUDENT_LIST_ROUTE },
                  meta: {
                    searchParams: ManagementSeachParams,
                    title: 'Student management'
                  },
                  children: [
                    {
                      path: '',
                      name: STUDENT_LIST_ROUTE,
                      component: ListStudents,
                      meta: {
                        searchParams: ManagementSeachParams,
                        title: 'List students'
                      }
                    },
                    {
                      path: 'create',
                      name: STUDENT_CREATE_ROUTE,
                      component: CreateStudent,
                      meta: {
                        searchParams: ManagementSeachParams,
                        title: 'Create students'
                      }
                    }
                  ]
                },
                {
                  path: 'teachers',
                  name: TEACHER_MANAGEMENT_ROUTE,
                  redirect: { name: TEACHER_LIST_ROUTE },
                  meta: {
                    searchParams: ManagementSeachParams,
                    title: 'Teacher management'
                  },
                  children: [
                    {
                      path: '',
                      name: TEACHER_LIST_ROUTE,
                      component: ListTeachers,
                      meta: {
                        searchParams: ManagementSeachParams,
                        title: 'Teacher management'
                      }
                    },
                    {
                      path: 'create',
                      name: TEACHER_CREATE_ROUTE,
                      component: CreateTeacher,
                      meta: {
                        searchParams: ManagementSeachParams,
                        title: 'Teacher management'
                      }
                    }
                  ]
                },
                {
                  path: 'students',
                  name: ADMIN_MANAGEMENT_ROUTE,
                  redirect: { name: ADMIN_LIST_ROUTE },
                  meta: {
                    searchParams: ManagementSeachParams,
                    title: 'Admin management'
                  },
                  children: [
                    {
                      path: '',
                      name: ADMIN_LIST_ROUTE,
                      component: ListAdmins,
                      meta: {
                        searchParams: ManagementSeachParams,
                        title: 'Admin management'
                      }
                    },
                    {
                      path: 'create',
                      name: ADMIN_CREATE_ROUTE,
                      component: CreateAdmin,
                      meta: {
                        searchParams: ManagementSeachParams,
                        title: 'Admin management'
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

export default router
