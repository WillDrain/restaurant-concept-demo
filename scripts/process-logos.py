from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ASSETS = Path(
    r"C:\Users\drain\.cursor\projects\c-Users-drain-OneDrive-Desktop-oves-restaurant\assets"
)
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "images"

BLUE = (0, 102, 203)
TOLERANCE = 42


def is_background(r: int, g: int, b: int, a: int, tolerance: int = TOLERANCE) -> bool:
    if a < 20:
        return True
    return (
        abs(r - BLUE[0]) <= tolerance
        and abs(g - BLUE[1]) <= tolerance
        and abs(b - BLUE[2]) <= tolerance
    )


def blue_distance(r: int, g: int, b: int) -> float:
    return ((r - BLUE[0]) ** 2 + (g - BLUE[1]) ** 2 + (b - BLUE[2]) ** 2) ** 0.5


def flood_remove_background(image: Image.Image, tolerance: int = TOLERANCE) -> Image.Image:
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
        if not is_background(r, g, b, a, tolerance):
            continue

        pixels[x, y] = (0, 0, 0, 0)
        seed(x + 1, y)
        seed(x - 1, y)
        seed(x, y + 1)
        seed(x, y - 1)

    return rgba


def remove_edge_blue_spill(
    image: Image.Image,
    *,
    passes: int = 3,
    spill_threshold: int = 18,
    blue_distance_threshold: float = 85,
) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size

    def neighbor_is_transparent(x: int, y: int) -> bool:
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < width and 0 <= ny < height:
                if pixels[nx, ny][3] < 20:
                    return True
            else:
                return True
        return False

    for _ in range(passes):
        to_clear: list[tuple[int, int]] = []
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                if a < 20:
                    continue

                spill = b - max(r, g)
                near_edge = neighbor_is_transparent(x, y)
                close_to_blue = blue_distance(r, g, b) < blue_distance_threshold

                if near_edge and (
                    is_background(r, g, b, a, tolerance=55)
                    or (spill > spill_threshold and close_to_blue)
                ):
                    to_clear.append((x, y))

        if not to_clear:
            break

        for x, y in to_clear:
            pixels[x, y] = (0, 0, 0, 0)

    return rgba


def is_logo_content(r: int, g: int, b: int) -> bool:
    if r > 205 and g > 205 and b > 205:
        return True
    if r < 55 and g < 55 and b < 55:
        return True
    if abs(r - g) < 20 and abs(g - b) < 20 and abs(r - b) < 20:
        return True
    return False


def remove_home_tab_fringe(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size

    # Remove any leftover backdrop pixels that flood fill missed.
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a < 20:
                continue
            if is_background(r, g, b, a, tolerance=60) or blue_distance(r, g, b) < 40:
                pixels[x, y] = (0, 0, 0, 0)
                continue

            spill = b - max(r, g)
            if not is_logo_content(r, g, b) and spill > 8:
                pixels[x, y] = (0, 0, 0, 0)

    rgba = remove_edge_blue_spill(
        rgba,
        passes=10,
        spill_threshold=8,
        blue_distance_threshold=120,
    )

    return rgba


def remove_blue_background(image: Image.Image, clean_fringe: bool = False) -> Image.Image:
    rgba = flood_remove_background(image)

    if clean_fringe:
        rgba = remove_edge_blue_spill(rgba)

    return rgba


def trim_transparent(image: Image.Image, padding: int = 2) -> Image.Image:
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


def apply_circular_mask(image: Image.Image) -> Image.Image:
    size = max(image.size)
    square = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    offset = ((size - image.width) // 2, (size - image.height) // 2)
    square.paste(image, offset)

    mask = Image.new("L", (size, size), 0)
    mask_pixels = mask.load()
    center = size / 2
    radius = size / 2 - 1

    for y in range(size):
        for x in range(size):
            if (x - center) ** 2 + (y - center) ** 2 <= radius**2:
                mask_pixels[x, y] = 255

    square.putalpha(mask)
    return trim_transparent(square)


def process_donut(source: Path, destination: Path) -> None:
    image = Image.open(source)
    processed = remove_blue_background(image, clean_fringe=True)
    processed = trim_transparent(processed)
    processed = apply_circular_mask(processed)
    processed.save(destination, optimize=True)


def process_main_logo(source: Path, destination: Path) -> None:
    image = Image.open(source)
    processed = remove_blue_background(image)
    processed = trim_transparent(processed, padding=4)
    processed.save(destination, optimize=True)


def process_home_tab_logo(source: Path, destination: Path) -> None:
    image = Image.open(source)
    # Keep only the sunburst badge on the left, not the "Home Page" text.
    cropped = image.crop((0, 0, 112, image.height))
    processed = flood_remove_background(cropped, tolerance=48)
    processed = remove_home_tab_fringe(processed)
    processed = trim_transparent(processed, padding=2)
    processed.save(destination, optimize=True)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)

    files = {path.name.split("_images_")[1].split("-")[0]: path for path in ASSETS.glob("*Oves*.png")}

    process_donut(files["OvesDonutLogo"], OUTPUT / "oves-donut-logo.png")
    process_main_logo(files["OvesMainHeaderLogo"], OUTPUT / "oves-main-logo.png")
    process_home_tab_logo(files["OvesHompageLogo"], OUTPUT / "oves-home-tab-logo.png")

    for path in OUTPUT.glob("oves-*.png"):
        with Image.open(path) as image:
            print(f"{path.name}: {image.size}")


if __name__ == "__main__":
    main()
