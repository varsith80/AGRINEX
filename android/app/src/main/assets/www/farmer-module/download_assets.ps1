$urls = @{
    "tomato.jpg" = "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&auto=format&fit=crop&q=80"
    "onion.jpg" = "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=200&auto=format&fit=crop&q=80"
    "paddy.jpg" = "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&auto=format&fit=crop&q=80"
    "cotton.jpg" = "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=200&auto=format&fit=crop&q=80"
    "farmer-avatar.jpg" = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
    "farmer-banner.jpg" = "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80"
    "hero-field.jpg" = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80"
}

foreach ($key in $urls.Keys) {
    $outPath = "f:\AgriNex\farmer-module\assets\images\$key"
    try {
        Invoke-WebRequest -Uri $urls[$key] -OutFile $outPath -UserAgent "Mozilla/5.0"
        Write-Host "Downloaded: $key"
    } catch {
        Write-Host "Failed to download $key : $_"
    }
}
