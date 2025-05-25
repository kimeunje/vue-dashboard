<template>
  <button
    class="download-button auto-run-download"
    @click="handleDownload"
    :disabled="isDownloading"
  >
    {{ isDownloading ? '다운로드 중...' : '자동실행 제한 설정 도구' }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

const isDownloading = ref(false)

// 자동실행 제한 설정 스크립트 내용
const createAutoRunScript = () => {
  const scriptContent = `
@echo off
:: === 이동매체 자동실행 제한 설정 도구 ===
REM UTF-8 인코딩 설정
chcp 65001 > nul

echo ================================================
echo    이동매체 자동실행 제한 설정 도구
echo ================================================
echo.

:: 관리자 권한 확인
>nul 2>&1 "%SYSTEMROOT%\\system32\\cacls.exe" "%SYSTEMROOT%\\system32\\config\\system"
if '%errorlevel%' NEQ '0' (
    echo [오류] 관리자 권한이 필요합니다.
    echo 스크립트를 마우스 오른쪽 버튼으로 클릭하고 "관리자 권한으로 실행"을 선택하세요.
    pause
    exit /B 1
)

echo [정보] 관리자 권한 확인 완료
echo.

:: 현재 자동실행 설정 확인
echo === 현재 자동실행 설정 확인 ===
echo 레지스트리에서 현재 설정을 확인하는 중...
reg query "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer" /v NoDriveTypeAutoRun 2>nul
if %errorlevel% neq 0 (
    echo [경고] NoDriveTypeAutoRun 설정이 없습니다.
    echo 자동실행 제한 설정을 추가해야 합니다.
) else (
    echo [정보] 기존 NoDriveTypeAutoRun 설정이 발견되었습니다.
)
echo.

:: 사용자 확인
echo === 설정 변경 확인 ===
echo 이 스크립트는 다음 작업을 수행합니다:
echo - 모든 드라이브의 자동실행 기능을 비활성화합니다
echo - NoDriveTypeAutoRun 레지스트리 값을 255(0xFF)로 설정합니다
echo - 설정 후 시스템 재시작이 권장됩니다
echo.
set /p proceed="계속 진행하시겠습니까? (Y/N): "
if /i not "%proceed%"=="Y" (
    echo 작업이 취소되었습니다.
    pause
    exit /B 0
)

:: 백업 생성
echo.
echo === 현재 설정 백업 ===
echo 현재 설정을 백업하는 중...
reg export "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer" "%~dp0\\autorun_backup_%date:~0,4%%date:~5,2%%date:~8,2%.reg" /y 2>nul
if %errorlevel% eq 0 (
    echo [완료] 설정이 백업되었습니다: autorun_backup_%date:~0,4%%date:~5,2%%date:~8,2%.reg
) else (
    echo [경고] 백업 생성에 실패했습니다. 계속 진행합니다.
)
echo.

:: 자동실행 제한 설정 적용
echo === 자동실행 제한 설정 적용 ===
echo NoDriveTypeAutoRun 값을 255로 설정하는 중...

:: 레지스트리 키가 없는 경우 생성
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer" /f >nul 2>&1

:: NoDriveTypeAutoRun 값 설정 (255 = 모든 드라이브 자동실행 비활성화)
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer" /v NoDriveTypeAutoRun /t REG_DWORD /d 255 /f

if %errorlevel% eq 0 (
    echo [성공] 자동실행 제한 설정이 적용되었습니다.
) else (
    echo [오류] 설정 적용에 실패했습니다.
    pause
    exit /B 1
)

:: 설정 확인
echo.
echo === 설정 적용 확인 ===
echo 적용된 설정을 확인하는 중...
for /f "tokens=3" %%a in ('reg query "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer" /v NoDriveTypeAutoRun ^| findstr REG_DWORD') do (
    echo [확인] NoDriveTypeAutoRun 값: %%a
    if "%%a"=="0xff" (
        echo [성공] 모든 드라이브의 자동실행이 비활성화되었습니다.
    ) else if "%%a"=="0x5f" (
        echo [성공] 대부분 드라이브의 자동실행이 비활성화되었습니다.
    ) else (
        echo [경고] 예상과 다른 값이 설정되었습니다: %%a
    )
)

:: 추가 보안 설정 (선택사항)
echo.
echo === 추가 보안 설정 (선택사항) ===
set /p additional="CD/DVD 자동실행도 비활성화하시겠습니까? (Y/N): "
if /i "%additional%"=="Y" (
    echo CD/DVD 자동실행 비활성화 중...
    reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer" /v NoCDAutoRun /t REG_DWORD /d 1 /f
    if %errorlevel% eq 0 (
        echo [성공] CD/DVD 자동실행이 비활성화되었습니다.
    )
)

:: 그룹 정책 새로 고침
echo.
echo === 정책 새로 고침 ===
echo 그룹 정책을 새로 고치는 중...
gpupdate /force >nul 2>&1
if %errorlevel% eq 0 (
    echo [완료] 그룹 정책이 새로 고쳐졌습니다.
) else (
    echo [정보] 그룹 정책 새로 고침을 수동으로 실행하세요: gpupdate /force
)

:: 완료 메시지
echo.
echo ================================================
echo           설정 완료
echo ================================================
echo [완료] 이동매체 자동실행 제한 설정이 완료되었습니다.
echo.
echo [중요 사항]
echo - 일부 설정은 시스템 재시작 후 완전히 적용됩니다
echo - 백업 파일이 생성되었습니다 (필요시 복원 가능)
echo - USB, CD/DVD 등의 자동실행이 비활성화되었습니다
echo.
echo [권장 사항]
echo - 외부 저장매체 사용 시 수동으로 탐색기에서 확인하세요
echo - 정기적으로 백신 검사를 실시하세요
echo.

:: 재부팅 확인
set /p reboot="지금 시스템을 재시작하시겠습니까? (Y/N): "
if /i "%reboot%"=="Y" (
    echo 10초 후 시스템이 재시작됩니다...
    shutdown /r /t 10 /c "자동실행 제한 설정 적용을 위한 재시작"
) else (
    echo 설정 완료. 나중에 시스템을 재시작해주세요.
)

pause
`
  return scriptContent.replace(/\n/g, '\r\n')
}

// 다운로드 처리
const handleDownload = () => {
  isDownloading.value = true

  try {
    const scriptContent = createAutoRunScript()

    // UTF-8 BOM 추가
    const utf8BOM = new Uint8Array([0xef, 0xbb, 0xbf])
    const blob = new Blob([utf8BOM, scriptContent], {
      type: 'application/octet-stream',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = '자동실행제한설정.bat'
    document.body.appendChild(link)
    link.click()

    // 정리
    setTimeout(() => {
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      isDownloading.value = false
    }, 100)
  } catch (error) {
    console.error('자동실행 제한 스크립트 다운로드 오류:', error)
    alert('스크립트 다운로드 중 오류가 발생했습니다.')
    isDownloading.value = false
  }
}
</script>

<style scoped>
.download-button {
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  background-color: #e74c3c;
  color: white;
}

.download-button:hover {
  background-color: #c0392b;
  transform: translateY(-1px);
}

.auto-run-download:before {
  content: '🛑';
  font-size: 16px;
}

.download-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.download-button:disabled:hover {
  background-color: #e74c3c;
  transform: none;
}
</style>
