import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

// 페이지 컴포넌트 import (Lazy Loading)
const HomePage = () => import('@/views/HomePage.vue')
const LoginPage = () => import('@/views/LoginPage.vue')
const SecurityAuditPage = () => import('@/views/SecurityAuditPage.vue')
const SecurityAuditResultsPage = () => import('@/views/SecurityAuditResultsPage.vue')
const SecurityAuditSolutionsPage = () => import('@/views/SecurityAuditSolutionsPage.vue')
const SecurityAuditContactPage = () => import('@/views/SecurityAuditContactPage.vue')
const AutoRunPolicyPage = () => import('@/views/AutoRunPolicyPage.vue')

// Layout 컴포넌트
const SecurityAuditLayout = () => import('@/layouts/SecurityAuditLayout.vue')

// 보호된 경로 목록
const PROTECTED_ROUTES = ['/security-audit', '/website-allow', '/mail', '/usb-request']

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: '상시보안감사 시스템',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      title: '로그인',
      requiresGuest: true, // 로그인한 사용자는 접근 불가
    },
  },
  {
    path: '/security-audit',
    component: SecurityAuditLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'SecurityAudit',
        component: SecurityAuditPage,
        meta: {
          title: '상시보안감사',
        },
      },
      {
        path: 'results',
        name: 'SecurityAuditResults',
        component: SecurityAuditResultsPage,
        meta: {
          title: '검사결과',
        },
      },
      {
        path: 'solutions',
        name: 'SecurityAuditSolutions',
        component: SecurityAuditSolutionsPage,
        meta: {
          title: '조치방법',
        },
      },
      {
        path: 'solutions/auto-run',
        name: 'AutoRunPolicy',
        component: AutoRunPolicyPage,
        meta: {
          title: '이동매체 자동실행 제한 확인',
        },
      },
      {
        path: 'contact',
        name: 'SecurityAuditContact',
        component: SecurityAuditContactPage,
        meta: {
          title: '문의하세요',
        },
      },
    ],
  },
  {
    path: '/website-allow',
    name: 'WebsiteAllow',
    component: () => import('@/views/WebsiteAllowPage.vue'),
    meta: {
      requiresAuth: true,
      title: '웹사이트 허용 신청',
    },
  },
  {
    path: '/mail',
    name: 'Mail',
    component: () => import('@/views/MailPage.vue'),
    meta: {
      requiresAuth: true,
      title: '대용량 메일 작성',
    },
  },
  {
    path: '/usb-request',
    name: 'UsbRequest',
    component: () => import('@/views/UsbRequestPage.vue'),
    meta: {
      requiresAuth: true,
      title: 'USB 반출 신청',
    },
  },
  // 404 에러 페이지
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: {
      title: '페이지를 찾을 수 없습니다',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 저장된 스크롤 위치가 있으면 그 위치로, 없으면 최상단으로
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// 네비게이션 가드
router.beforeEach(async (to, from, next) => {
  const { user, loading } = useAuth()

  // 인증 상태 로딩 중이면 대기
  if (loading.value) {
    // 로딩이 완료될 때까지 잠시 대기
    await new Promise((resolve) => {
      const unwatch = watch(loading, (newLoading) => {
        if (!newLoading) {
          unwatch()
          resolve()
        }
      })
    })
  }

  // 페이지 제목 설정
  if (to.meta.title) {
    document.title = `${to.meta.title} - 나이스디앤비`
  }

  // 인증이 필요한 페이지
  if (to.meta.requiresAuth) {
    if (!user.value) {
      // 로그인하지 않은 경우 로그인 페이지로 리디렉션
      next({
        name: 'Login',
        query: { redirect: to.fullPath },
      })
      return
    }
  }

  // 게스트만 접근 가능한 페이지 (로그인 페이지 등)
  if (to.meta.requiresGuest) {
    if (user.value) {
      // 이미 로그인한 경우 홈으로 리디렉션
      next({ name: 'Home' })
      return
    }
  }

  next()
})

// 라우터 에러 핸들링
router.onError((error) => {
  console.error('Router error:', error)
})

export default router
