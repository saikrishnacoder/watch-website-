#!/usr/bin/env python3
"""Owned product-gallery stills: hero, dial close, case profile per line."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "gallery"
LINES = ("heritage", "chronograph", "diver", "imperial", "meridian")
W, H = 1600, 1200


def cover(im: Image.Image, width: int, height: int, bias: str = "center") -> Image.Image:
    im = im.convert("RGB")
    scale = max(width / im.width, height / im.height)
    resized = im.resize((int(im.width * scale), int(im.height * scale)), Image.Resampling.LANCZOS)
    if bias == "dial":
        left = (resized.width - width) // 2
        top = max(0, int((resized.height - height) * 0.22))
    elif bias == "profile":
        left = max(0, int((resized.width - width) * 0.12))
        top = (resized.height - height) // 2
    else:
        left = (resized.width - width) // 2
        top = (resized.height - height) // 2
    return resized.crop((left, top, left + width, top + height))


def grade(im: Image.Image, contrast: float, color: float, brightness: float) -> Image.Image:
    im = ImageEnhance.Contrast(im).enhance(contrast)
    im = ImageEnhance.Color(im).enhance(color)
    return ImageEnhance.Brightness(im).enhance(brightness)


def vignette(im: Image.Image, strength: float = 0.42) -> Image.Image:
    overlay = Image.new("L", im.size, 0)
    draw = ImageDraw.Draw(overlay)
    margin = int(min(im.size) * 0.08)
    draw.ellipse((-margin, -margin, im.width + margin, im.height + margin), fill=255)
    overlay = overlay.filter(ImageFilter.GaussianBlur(90))
    darkened = ImageEnhance.Brightness(im).enhance(1 - strength)
    return Image.composite(im, darkened, overlay)


def save(im: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "JPEG", quality=78, optimize=True, progressive=True)
    print(f"  wrote {path.relative_to(ROOT)} ({path.stat().st_size // 1024} KB)")


def main() -> None:
    print("Generating product gallery stills…")
    OUT.mkdir(parents=True, exist_ok=True)
    for line in LINES:
        src = ROOT / "public" / "lines" / f"{line}.jpg"
        if not src.exists():
            raise SystemExit(f"missing {src}")
        base = Image.open(src)
        hero = vignette(grade(cover(base, W, H, "center"), 1.06, 0.9, 0.97))
        dial = vignette(grade(cover(base, W, H, "dial"), 1.12, 0.88, 1.02), 0.28)
        profile = vignette(grade(cover(base, W, H, "profile"), 1.08, 0.85, 0.9), 0.5)
        save(hero, OUT / f"{line}-hero.jpg")
        save(dial, OUT / f"{line}-dial.jpg")
        save(profile, OUT / f"{line}-profile.jpg")
    print("done.")


if __name__ == "__main__":
    main()
