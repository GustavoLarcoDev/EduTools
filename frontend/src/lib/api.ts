/**
 * API facade. In API mode every call goes to the Django REST backend (http-api.ts);
 * with NEXT_PUBLIC_DEMO=true the same functions are served from bundled sample
 * data (demo-api.ts) and no network requests are made.
 */
import * as http from './http-api'
import * as demo from './demo-api'
import { IS_DEMO } from './config'

const impl: Omit<typeof http, 'api'> = IS_DEMO ? demo : http

export const {
  register,
  login,
  loginWithGoogle,
  verifyToken,
  getCareers,
  getCareer,
  createCareer,
  updateCareer,
  deleteCareer,
  getTools,
  getTool,
  createTool,
  updateTool,
  deleteTool,
  getTutorials,
  getTutorial,
  createTutorial,
  updateTutorial,
  deleteTutorial,
  createCheckoutSession,
} = impl

export const { loginAsDemo, resetDemoData } = demo

/** Best-effort human readable message from an axios / demo error. */
export function errorMessage(error: unknown, fallback = 'Algo salió mal. Inténtalo de nuevo.') {
  const e = error as { response?: { data?: { error?: string; detail?: string } }; message?: string }
  return e?.response?.data?.error || e?.response?.data?.detail || fallback
}
