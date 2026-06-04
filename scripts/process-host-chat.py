from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

IMAGE_PATH = Path(__file__).resolve().parents[1] / "public" / "images" / "host-chat.png"


def is_background(r: int, g: int, b: int, a: int, threshold: int = 32) -> bool:
    if a < 20:
        return True
    return r <= threshold and g <= threshold and b <= threshold


def flood_remove_background(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size
    visited = [[False] * width for _ in range(height)]
    queue: deque[tuple[int, int]] = deque()

    def seed(x: int, y: int) -> None:
        if 0 <= x < width and 0 <= y < height and not visited[y][x]:
            queue.append((x, y))

    for x in range(width):
        seed(x, 0)
        seed(x, height - 1)
    for y in range(height):
        seed(0, y)
        seed(width - 1, y)

    while queue:
        x, y = queue.popleft()
        if visited[y][x]:
            continue
        visited[y][x] = True

        r, g, b, a = pixels[x, y]
        if not is_background(r, g, b, a):
            continue

        pixels[x, y] = (0, 0, 0, 0)
        seed(x + 1, y)
        seed(x - 1, y)
        seed(x, y + 1)
        seed(x, y - 1)

    return rgba


def trim_transparent(image: Image.Image, padding: int = 4) -> Image.Image:
    alpha = image.getchannel("A")
    bbox = alpha.getbbox()
    if not bbox:
        return image

    left, top, right, bottom = bbox
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(image.width, right + padding)
    bottom = min(image.height, bottom + padding)
    return image.crop((left, top, right, bottom))


def main() -> None:
    image = Image.open(IMAGE_PATH)
    processed = flood_remove_background(image)
    processed = trim_transparent(processed, padding=6)
    processed.save(IMAGE_PATH, optimize=True)
    print(f"Saved {IMAGE_PATH} at size {processed.size}")


if __name__ == "__main__":
    main()
