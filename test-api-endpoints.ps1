#!/usr/bin/env pwsh

$BASE_URL = "http://localhost:5001/api"
$endpoints = @(
    @{ Method = "GET"; Path = "/health"; Name = "Health Check" },
    @{ Method = "GET"; Path = "/programs"; Name = "Programs List" },
    @{ Method = "GET"; Path = "/news"; Name = "News List" },
    @{ Method = "GET"; Path = "/faculty"; Name = "Faculty List" },
    @{ Method = "GET"; Path = "/research"; Name = "Research List" },
    @{ Method = "GET"; Path = "/infrastructure"; Name = "Infrastructure List" },
    @{ Method = "GET"; Path = "/events"; Name = "Events List" },
    @{ Method = "GET"; Path = "/collaborations"; Name = "Collaborations List" },
    @{ Method = "GET"; Path = "/content"; Name = "Content List" },
    @{ Method = "GET"; Path = "/gallery"; Name = "Gallery List" },
    @{ Method = "GET"; Path = "/slideshow"; Name = "Slideshow List" },
    @{ Method = "GET"; Path = "/settings"; Name = "Settings" },
    @{ Method = "GET"; Path = "/placement"; Name = "Placement List" },
    @{ Method = "GET"; Path = "/incubation"; Name = "Incubation List" }
)

Write-Host "🔍 Testing Backend API Endpoints..." -ForegroundColor Cyan
Write-Host "=" -ForegroundColor Gray -NoNewline; Write-Host ("=" * 79) -ForegroundColor Gray

$successful = 0
$failed = 0
$results = @()

foreach ($endpoint in $endpoints) {
    $url = $BASE_URL + $endpoint.Path
    
    try {
        $response = Invoke-WebRequest -Uri $url -Method $endpoint.Method -TimeoutSec 10 -ErrorAction Stop
        $statusIcon = "✅"
        $statusText = "SUCCESS"
        $successful++
        
        $contentLength = $response.Content.Length
        $contentType = "unknown"
        if ($response.Content.StartsWith("[")) { 
            $contentType = "array" 
        } elseif ($response.Content.StartsWith("{")) { 
            $contentType = "object" 
        } else { 
            $contentType = "string" 
        }
        
        Write-Host "$statusIcon $($endpoint.Method) $($endpoint.Path)" -ForegroundColor Green
        Write-Host "   Name: $($endpoint.Name)" -ForegroundColor White
        Write-Host "   Status: $($response.StatusCode) ($statusText)" -ForegroundColor Green
        Write-Host "   Content Length: $contentLength bytes" -ForegroundColor Gray
        Write-Host "   Content Type: $contentType" -ForegroundColor Gray
        
        $results += @{
            Name = $endpoint.Name
            Path = $endpoint.Path
            Method = $endpoint.Method
            Status = $response.StatusCode
            Success = $true
            ContentLength = $contentLength
        }
    }
    catch {
        $statusIcon = "❌"
        $statusText = "FAILED"
        $failed++
        
        $errorStatus = if ($_.Exception.Response) { $_.Exception.Response.StatusCode } else { "TIMEOUT/ERROR" }
        $errorMessage = $_.Exception.Message
        
        Write-Host "$statusIcon $($endpoint.Method) $($endpoint.Path)" -ForegroundColor Red
        Write-Host "   Name: $($endpoint.Name)" -ForegroundColor White
        Write-Host "   Status: $errorStatus ($statusText)" -ForegroundColor Red
        Write-Host "   Error: $errorMessage" -ForegroundColor Red
        
        $results += @{
            Name = $endpoint.Name
            Path = $endpoint.Path
            Method = $endpoint.Method
            Status = $errorStatus
            Success = $false
            Error = $errorMessage
        }
    }
    
    Write-Host ("-" * 80) -ForegroundColor Gray
}

# Summary
$total = $endpoints.Count
$successRate = [math]::Round(($successful / $total) * 100, 1)

Write-Host ""
Write-Host "📊 TEST SUMMARY" -ForegroundColor Cyan
Write-Host "=" -ForegroundColor Gray -NoNewline; Write-Host ("=" * 79) -ForegroundColor Gray
Write-Host "Total Endpoints Tested: $total" -ForegroundColor White
Write-Host "✅ Successful: $successful" -ForegroundColor Green
Write-Host "❌ Failed: $failed" -ForegroundColor Red
Write-Host "Success Rate: $successRate%" -ForegroundColor $(if ($successRate -ge 90) { "Green" } elseif ($successRate -ge 70) { "Yellow" } else { "Red" })

if ($failed -gt 0) {
    Write-Host ""
    Write-Host "🚨 FAILED ENDPOINTS:" -ForegroundColor Red
    foreach ($result in $results) {
        if (-not $result.Success) {
            Write-Host "   $($result.Method) $($result.Path) - Status: $($result.Status) - $($result.Error)" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "✨ API Endpoint Testing Complete!" -ForegroundColor Cyan
