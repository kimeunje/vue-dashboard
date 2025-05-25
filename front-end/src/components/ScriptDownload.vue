<template>
  <button
    class="download-button secondary-download"
    @click="handleDownload"
    :disabled="isDownloading"
  >
    {{ isDownloading ? '다운로드 중...' : '고급 설정 스크립트' }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

const isDownloading = ref(false)

// 고급 스크립트 내용
const createAdvancedScript = () => {
  const scriptContent = `
@echo off
:: === 고급 시스템 설정 스크립트 ===
REM UTF-8 인코딩 설정
chcp 65001 > nul

echo ================================================
echo      나이스디앤비 고급 시스템 설정 도구
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

:: 현재 시스템 정보 표시
echo === 현재 시스템 정보 ===
powershell -Command "Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, TotalPhysicalMemory"
echo.

:: 메뉴 표시
:MENU
echo === 사용 가능한 옵션 ===
echo 1. 기본 컴퓨터 정보 설정
echo 2. 보안 정책 적용
echo 3. 네트워크 설정 확인
echo 4. 시스템 최적화
echo 5. 전체 보안 검사
echo 0. 종료
echo.
set /p choice="선택하세요 (0-5): "

if "%choice%"=="1" goto BASIC_SETUP
if "%choice%"=="2" goto SECURITY_POLICY
if "%choice%"=="3" goto NETWORK_CHECK
if "%choice%"=="4" goto SYSTEM_OPTIMIZE
if "%choice%"=="5" goto FULL_AUDIT
if "%choice%"=="0" goto EXIT
echo [오류] 잘못된 선택입니다.
goto MENU

:BASIC_SETUP
echo.
echo === 기본 컴퓨터 정보 설정 ===
set /p NEW_WORKGROUP="작업 그룹(부서명) 입력: "
set /p NEW_COMPUTERNAME="컴퓨터 이름 입력: "
set /p NEW_USERNAME="사용자 이름 입력: "

echo 설정을 적용하는 중...
powershell -Command "Add-Computer -WorkgroupName '%NEW_WORKGROUP%' -NewName '%NEW_COMPUTERNAME%' -Force"
powershell -Command "Rename-LocalUser -Name $env:USERNAME -NewName '%NEW_USERNAME%'"
echo [완료] 기본 설정이 완료되었습니다.
goto MENU

:SECURITY_POLICY
echo.
echo === 보안 정책 적용 ===
echo 화면 보호기 설정 중...
reg add "HKCU\\Control Panel\\Desktop" /v ScreenSaveActive /t REG_SZ /d 1 /f
reg add "HKCU\\Control Panel\\Desktop" /v ScreenSaverIsSecure /t REG_SZ /d 1 /f
reg add "HKCU\\Control Panel\\Desktop" /v ScreenSaveTimeOut /t REG_SZ /d 600 /f

echo 자동실행 제한 설정 중...
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer" /v NoDriveTypeAutoRun /t REG_DWORD /d 255 /f

echo [완료] 보안 정책이 적용되었습니다.
goto MENU

:NETWORK_CHECK
echo.
echo === 네트워크 설정 확인 ===
echo 방화벽 상태:
netsh advfirewall show allprofiles state
echo.
echo 네트워크 어댑터:
powershell -Command "Get-NetAdapter | Select-Object Name, Status, LinkSpeed"
echo.
pause
goto MENU

:SYSTEM_OPTIMIZE
echo.
echo === 시스템 최적화 ===
echo 임시 파일 정리 중...
del /q /f /s %TEMP%\\* 2>nul
echo 디스크 정리 실행 중...
cleanmgr /sageset:1 /verylowdisk
echo [완료] 시스템 최적화가 완료되었습니다.
goto MENU

:FULL_AUDIT
echo.
echo === 전체 보안 검사 ===
echo 보안 검사를 시작합니다...

:: 방화벽 확인
echo 1. 방화벽 상태 확인...
netsh advfirewall show allprofiles state | findstr /i "state"

:: 백신 확인
echo 2. 백신 상태 확인...
powershell -Command "Get-WmiObject -Namespace root/SecurityCenter2 -Class AntiVirusProduct"

:: 업데이트 확인
echo 3. 시스템 업데이트 확인...
powershell -Command "Get-WindowsUpdate -MicrosoftUpdate"

:: 공유 폴더 확인
echo 4. 공유 폴더 확인...
net share

echo [완료] 전체 보안 검사가 완료되었습니다.
pause
goto MENU

:EXIT
echo.
echo 스크립트를 종료합니다.
pause
exit /B 0
`
  return scriptContent.replace(/\n/g, '\r\n')
}

// 다운로드 처리
const handleDownload = () => {
  isDownloading.value = true

  try {
    const scriptContent = createAdvancedScript()

    // UTF-8 BOM 추가
    const utf8BOM = new Uint8Array([0xef, 0xbb, 0xbf])
    const blob = new Blob([utf8BOM, scriptContent], {
      type: 'application/octet-stream',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = '고급시스템설정.bat'
    document.body.appendChild(link)
    link.click()

    // 정리
    setTimeout(() => {
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      isDownloading.value = false
    }, 100)
  } catch (error) {
    console.error('스크립트 다운로드 오류:', error)
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
  border: 2px solid var(--primary-color);
  background-color: white;
  color: var(--primary-color);
}

.download-button:hover {
  background-color: var(--primary-color);
  color: white;
}

.secondary-download:before {
  content: '⚙️';
  font-size: 16px;
}

.download-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.download-button:disabled:hover {
  background-color: white;
  color: var(--primary-color);
}
</style>
