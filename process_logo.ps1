$code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class ImageProcessor {
    public static void ProcessLogo(string inPath, string outPath) {
        using (Bitmap src = new Bitmap(inPath)) {
            int minX = src.Width, minY = src.Height, maxX = 0, maxY = 0;
            
            for (int y = 0; y < src.Height; y++) {
                for (int x = 0; x < src.Width; x++) {
                    Color c = src.GetPixel(x, y);
                    bool isBg = (c.R < 40 && c.G < 80 && c.B > 20 && c.B < 140);
                    if (!isBg) {
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }
            
            int pad = 20;
            minX = Math.Max(0, minX - pad);
            minY = Math.Max(0, minY - pad);
            maxX = Math.Min(src.Width - 1, maxX + pad);
            maxY = Math.Min(src.Height - 1, maxY + pad);
            
            if (minX > maxX || minY > maxY) {
                minX = 0; minY = 0; maxX = src.Width - 1; maxY = src.Height - 1;
            }
            
            int width = maxX - minX + 1;
            int height = maxY - minY + 1;
            
            using (Bitmap dest = new Bitmap(width, height)) {
                for (int y = 0; y < height; y++) {
                    for (int x = 0; x < width; x++) {
                        Color c = src.GetPixel(x + minX, y + minY);
                        bool isBg = (c.R < 40 && c.G < 80 && c.B > 20 && c.B < 140);
                        if (isBg) {
                            dest.SetPixel(x, y, Color.Transparent);
                        } else {
                            dest.SetPixel(x, y, c);
                        }
                    }
                }
                dest.Save(outPath, ImageFormat.Png);
            }
        }
    }
}
"@

Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing
[ImageProcessor]::ProcessLogo("c:\Users\desmo\Herd\landing_page\assets\Agency Ahrefs, seo authority website logo.jpg", "c:\Users\desmo\Herd\landing_page\assets\logo_transparent.png")
Write-Host "Image extraction and transparency conversion complete!"
