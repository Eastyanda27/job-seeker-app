// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/applications`
  | `/company/applicants`
  | `/company/jobs`
  | `/company/jobs/:id/applicants`
  | `/company/login`
  | `/company/register`
  | `/dashboard`
  | `/jobs`
  | `/jobs/:id`
  | `/login`
  | `/profile`
  | `/register`
  | `/settings`

export type Params = {
  '/company/jobs/:id/applicants': { id: string }
  '/jobs/:id': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
