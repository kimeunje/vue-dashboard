<template>
  <div>
    <h1 class="page-title">보안 감사 결과</h1>

    <!-- 로딩 중이거나 에러 발생 시 표시할 컴포넌트 -->
    <div v-if="loading" class="loading-container" style="padding: 20px; text-align: center">
      <p>데이터를 로딩 중입니다...</p>
    </div>

    <div v-else-if="error" class="error-container" style="padding: 20px">
      <div style="padding: 20px; color: #f44336; background-color: #ffebee; border-radius: 4px">
        <p>{{ error }}</p>
        <button
          @click="reloadPage"
          style="
            padding: 8px 16px;
            margin-top: 10px;
            background-color: #f44336;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          다시 시도
        </button>
      </div>
    </div>

    <div v-else-if="!user" class="not-logged-info" style="padding: 20px; text-align: center">
      <p>이 페이지에 접근하려면 로그인이 필요합니다.</p>
    </div>

    <template v-else>
      <!-- 요약 통계 카드 -->
      <div class="section">
        <h2 class="section-title">요약 통계</h2>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 10px;
          "
        >
          <StatsCard
            title="총 점검 항목"
            :value="stats.totalChecks"
            :subtitle="`최근 업데이트: ${formatDate(stats.lastCheckedAt)}`"
          />

          <StatsCard
            title="통과"
            :value="stats.passedChecks"
            :subtitle="`통과율: ${
              stats.totalChecks > 0 ? Math.round((stats.passedChecks / stats.totalChecks) * 100) : 0
            }%`"
            valueColor="color-green"
          />

          <StatsCard
            title="실패"
            :value="stats.failedChecks"
            :subtitle="`실패율: ${
              stats.totalChecks > 0 ? Math.round((stats.failedChecks / stats.totalChecks) * 100) : 0
            }%`"
            valueColor="color-red"
          />

          <StatsCard
            title="보안 점수"
            :value="stats.score"
            subtitle="총점: 100"
            valueColor="color-blue"
          />
        </div>
      </div>

      <!-- 일별 통계 시각화 -->
      <div class="section">
        <h2 class="section-title">일별 검사 결과</h2>
        <div v-if="dailyStats.length > 0">
          <div style="height: 300px; margin-top: 10px">
            <!-- Vue에서는 recharts 대신 다른 차트 라이브러리 사용 필요 -->
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                background-color: #f8f9fa;
                border-radius: 4px;
              "
            >
              <p>차트 컴포넌트 구현 필요 (Vue Chart.js 등 사용)</p>
            </div>
          </div>

          <div style="margin-top: 20px; overflow-x: auto">
            <table style="width: 100%; border-collapse: collapse">
              <thead>
                <tr style="background-color: #f5f5f5">
                  <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd">
                    날짜
                  </th>
                  <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd">
                    통과
                  </th>
                  <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd">
                    실패
                  </th>
                  <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd">
                    통과율
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(day, index) in dailyStats"
                  :key="index"
                  :style="{
                    backgroundColor: index % 2 === 0 ? 'white' : '#f9f9f9',
                  }"
                >
                  <td style="padding: 10px; border-bottom: 1px solid #ddd">
                    {{ day.date }}
                  </td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #4caf50">
                    {{ day.passed }}
                  </td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #f44336">
                    {{ day.failed }}
                  </td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd">{{ day.passRate }}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else style="padding: 20px; text-align: center; color: #666">
          <p>일별 검사 결과 데이터가 없습니다.</p>
        </div>
      </div>

      <!-- 항목별 상세 결과 테이블 -->
      <div class="section">
        <h2 class="section-title">항목별 검사 결과</h2>
        <div v-if="itemStats.length > 0" style="overflow-x: auto; margin-top: 10px">
          <table style="width: 100%; border-collapse: collapse">
            <thead>
              <tr style="background-color: #f5f5f5">
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd">ID</th>
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd">
                  항목명
                </th>
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd">
                  카테고리
                </th>
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd">통과</th>
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd">실패</th>
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd">
                  통과율
                </th>
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd">상세</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in itemStats" :key="item.id" style="background-color: white">
                <td style="padding: 10px; border-bottom: 1px solid #ddd">
                  {{ item.id }}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: 500">
                  {{ item.name }}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #666">
                  {{ item.category }}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #4caf50">
                  {{ item.passed }}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #f44336">
                  {{ item.failed }}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd">
                  <div style="display: flex; align-items: center">
                    <div
                      style="
                        width: 100%;
                        background-color: #e0e0e0;
                        height: 8px;
                        border-radius: 4px;
                        margin-right: 8px;
                      "
                    >
                      <div
                        :style="{
                          height: '8px',
                          borderRadius: '4px',
                          width: `${item.passRate}%`,
                          backgroundColor:
                            item.passRate >= 70
                              ? '#4caf50'
                              : item.passRate >= 40
                                ? '#ff9800'
                                : '#f44336',
                        }"
                      ></div>
                    </div>
                    <span style="font-size: 0.875rem"> {{ item.passRate }}% </span>
                  </div>
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd">
                  <button
                    @click="setSelectedItemId(item.id)"
                    style="
                      color: #2196f3;
                      border: none;
                      background: none;
                      cursor: pointer;
                      padding: 5px;
                      text-decoration: underline;
                    "
                  >
                    상세보기
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else style="padding: 20px; text-align: center; color: #666">
          <p>항목별 검사 결과 데이터가 없습니다.</p>
        </div>
      </div>

      <!-- 선택된 항목 상세 정보 -->
      <div v-if="selectedItem" class="section">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #e3f2fd;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 4px;
          "
        >
          <div>
            <h2 class="section-title" style="margin-bottom: 5px">
              {{ selectedItem.name }} 상세 정보
            </h2>
            <p style="font-size: 0.875rem; color: #666">
              {{ selectedItem.description }}
            </p>
          </div>
          <button
            @click="setSelectedItemId(null)"
            style="
              color: #666;
              border: none;
              background: none;
              cursor: pointer;
              padding: 5px 10px;
              font-size: 0.875rem;
            "
          >
            닫기
          </button>
        </div>

        <!-- 항목 상세 로그 -->
        <div v-if="selectedItemLogs.length > 0" style="overflow-x: auto">
          <table style="width: 100%; border-collapse: collapse">
            <thead>
              <tr style="background-color: #f5f5f5">
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd">
                  검사 일시
                </th>
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd">결과</th>
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd">
                  실제 값
                </th>
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd">메모</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in selectedItemLogs" :key="log.log_id" style="background-color: white">
                <td style="padding: 10px; border-bottom: 1px solid #ddd">
                  {{ formatDate(log.checked_at) }}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd">
                  <span
                    :style="{
                      padding: '2px 8px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      borderRadius: '12px',
                      backgroundColor: log.passed === 1 ? '#e8f5e9' : '#ffebee',
                      color: log.passed === 1 ? '#2e7d32' : '#c62828',
                    }"
                  >
                    {{ log.passed === 1 ? '통과' : '실패' }}
                  </span>
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #666">
                  <div v-if="log.actual_value && typeof log.actual_value === 'object'">
                    <div v-for="[key, value] in Object.entries(log.actual_value)" :key="key">
                      {{ key }}: {{ value }}
                    </div>
                  </div>
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #666">
                  <pre
                    style="
                      font-size: 0.75rem;
                      background-color: #f5f5f5;
                      padding: 4px;
                      border-radius: 4px;
                      font-family: monospace;
                      white-space: pre-wrap;
                    "
                    >{{ log.notes }}</pre
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else style="padding: 20px; text-align: center; color: #666">
          <p>이 항목에 대한 상세 로그 데이터가 없습니다.</p>
        </div>
      </div>

      <!-- 관리자 연락처 -->
      <div class="section">
        <h2 class="section-title">관리자 연락처</h2>
        <p>보안 감사 결과에 대한 문의사항이 있는 경우 아래 담당자에게 문의하세요:</p>
        <p>보안 감사팀: 내선 5678 또는 security-audit@example.com</p>
      </div>
    </template>

    <!-- 공통 페이지 네비게이션 컴포넌트 사용 -->
    <PageNavigation :currentPath="route.path" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import PageNavigation from '@/components/PageNavigation.vue'

// StatsCard 컴포넌트를 별도로 분리하거나 여기서 정의
import StatsCard from '@/components/StatsCard.vue'

const route = useRoute()
const { user } = useAuth()

// 통계 데이터 상태
const stats = ref({
  totalChecks: 0,
  passedChecks: 0,
  failedChecks: 0,
  lastCheckedAt: '',
  score: 0,
})

// 보안 점검 항목 데이터
const checklistItems = ref([])

// 로그 데이터
const auditLogs = ref([])

// 선택된 항목 ID (상세 정보 표시용)
const selectedItemId = ref(null)

// 시간별로 그룹화된 로그 (최근 7일)
const dailyStats = ref([])

// 항목별 통과/실패 통계
const itemStats = ref([])

// 로딩 상태
const loading = ref(true)

// 에러 상태
const error = ref(null)

// 계산된 속성들
const selectedItemLogs = computed(() => {
  return selectedItemId.value ? getItemLogs(selectedItemId.value) : []
})

const selectedItem = computed(() => {
  return checklistItems.value.find((item) => item.id === selectedItemId.value)
})

// API 데이터 가져오기
const fetchData = async () => {
  loading.value = true
  try {
    // 병렬로 API 요청 보내기
    const [logsResponse, checklistResponse] = await Promise.all([
      fetch('/api/security-audit/logs', {
        credentials: 'include',
      }),
      fetch('/api/security-audit/checklist-items', {
        credentials: 'include',
      }),
    ])

    // 응답 확인
    if (!logsResponse.ok) {
      throw new Error(`Logs API error: ${logsResponse.status}`)
    }

    if (!checklistResponse.ok) {
      throw new Error(`Checklist API error: ${checklistResponse.status}`)
    }

    // 데이터 파싱
    const logsData = await logsResponse.json()
    const checklistData = await checklistResponse.json()

    console.log('로그 데이터:', logsData)
    console.log('체크리스트 데이터:', checklistData)

    // 체크리스트 데이터 변환 (API 응답 형식에 맞게 조정)
    const formattedChecklistItems = checklistData.map((item) => ({
      id: item.item_id,
      name: item.name,
      category: item.category,
      description: item.description,
    }))

    // 상태 업데이트
    auditLogs.value = logsData
    checklistItems.value = formattedChecklistItems
    error.value = null
  } catch (err) {
    console.error('Failed to fetch data:', err)
    error.value = '데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
  } finally {
    loading.value = false
  }
}

// 데이터가 로드되면 통계 계산
const calculateStats = () => {
  if (auditLogs.value.length > 0 && checklistItems.value.length > 0) {
    // 통계 계산
    const totalChecks = auditLogs.value.length
    const passedChecks = auditLogs.value.filter((log) => log.passed === 1).length
    const failedChecks = auditLogs.value.filter((log) => log.passed === 0).length

    // 가장 최근 검사 날짜
    const sortedLogs = [...auditLogs.value].sort(
      (a, b) => new Date(b.checked_at) - new Date(a.checked_at),
    )
    const lastCheckedAt = sortedLogs.length > 0 ? sortedLogs[0].checked_at : ''

    // 점수 계산 (통과율 * 100)
    const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0

    stats.value = {
      totalChecks,
      passedChecks,
      failedChecks,
      lastCheckedAt,
      score,
    }

    // 일별 통계 준비
    prepareDailyStats()

    // 항목별 통계 준비
    prepareItemStats()
  }
}

// 일별 통계 준비 함수
const prepareDailyStats = () => {
  // 날짜별로 로그를 그룹화
  const groupedByDate = {}

  auditLogs.value.forEach((log) => {
    const dateOnly = log.checked_at.split(' ')[0]
    if (!groupedByDate[dateOnly]) {
      groupedByDate[dateOnly] = { date: dateOnly, passed: 0, failed: 0 }
    }

    if (log.passed === 1) {
      groupedByDate[dateOnly].passed += 1
    } else if (log.passed === 0) {
      groupedByDate[dateOnly].failed += 1
    }
  })

  // 날짜순으로 정렬
  const sortedDates = Object.values(groupedByDate).sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  )

  // 차트에서 사용하기 쉽게 데이터 구조 조정
  const chartData = sortedDates.map((day) => {
    const total = day.passed + day.failed
    const passRate = total > 0 ? Math.round((day.passed / total) * 100) : 0

    return {
      ...day,
      passRate,
      total,
    }
  })

  dailyStats.value = chartData
}

// 항목별 통계 준비 함수
const prepareItemStats = () => {
  const itemStatsData = checklistItems.value.map((item) => {
    const itemLogs = auditLogs.value.filter((log) => log.item_id === item.id)
    const passedCount = itemLogs.filter((log) => log.passed === 1).length
    const failedCount = itemLogs.filter((log) => log.passed === 0).length
    const totalCount = passedCount + failedCount
    const passRate = totalCount > 0 ? (passedCount / totalCount) * 100 : 0

    return {
      id: item.id,
      name: item.name,
      category: item.category,
      description: item.description,
      total: totalCount,
      passed: passedCount,
      failed: failedCount,
      passRate: Math.round(passRate),
    }
  })

  itemStats.value = itemStatsData
}

// 항목 상세 로그 조회
const getItemLogs = (itemId) => {
  return auditLogs.value
    .filter((log) => log.item_id === itemId)
    .sort((a, b) => new Date(b.checked_at) - new Date(a.checked_at))
}

// 날짜 포맷 함수
const formatDate = (dateStr) => {
  if (!dateStr) return '데이터 없음'

  const date = new Date(dateStr)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 선택된 항목 ID 설정
const setSelectedItemId = (itemId) => {
  selectedItemId.value = itemId
}

// 페이지 새로고침
const reloadPage = () => {
  window.location.reload()
}

// 사용자가 로그인한 경우에만 데이터 로드
watch(
  user,
  (newUser) => {
    if (newUser) {
      fetchData()
    }
  },
  { immediate: true },
)

// 데이터 변경 감시
watch([auditLogs, checklistItems], () => {
  calculateStats()
})
</script>

<style scoped>
.section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 2rem;
}
</style>
