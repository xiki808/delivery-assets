#!/usr/bin/env python3
"""Build Create's icon and store-background SVGs from the standalone cup mark."""

from copy import deepcopy
from pathlib import Path
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parent
SVG = "http://www.w3.org/2000/svg"
ET.register_namespace("", SVG)
source = ET.parse(ROOT / "create.svg").getroot()
mark = [child for child in source if child.tag != f"{{{SVG}}}title"]


def add(parent, tag, **attributes):
    return ET.SubElement(parent, f"{{{SVG}}}{tag}", {key.replace("_", "-"): str(value) for key, value in attributes.items()})


def document(width, height, background):
    svg = ET.Element(f"{{{SVG}}}svg", {"viewBox": f"0 0 {width} {height}"})
    add(svg, "rect", width=width, height=height, fill=background)
    return svg


def cup(svg, x, y, scale, artwork=mark):
    group = add(svg, "g", transform=f"translate({x} {y}) scale({scale})")
    group.extend(deepcopy(child) for child in artwork)


def project_rows(svg, x, y, width, height, gap):
    for index in range(3):
        top = y + index * (height + gap)
        fill = "#6f8fe0" if index == 2 else "#26375e"
        add(svg, "rect", x=x, y=top, width=width, height=height, rx=height // 5, fill=fill)
        inset = height * .18
        if index == 0:  # A prompt and cursor.
            add(svg, "path", d=f"M{x + inset} {top + height * .34}l{height * .15} {height * .16}"
                f"-{height * .15} {height * .16}", fill="none", stroke="#dce2fb",
                stroke_width=height * .06, stroke_linecap="round", stroke_linejoin="round")
            add(svg, "rect", x=x + inset + height * .35, y=top + height * .44,
                width=width * .58, height=height * .11, rx=height * .055, fill="#dce2fb")
        elif index == 1:  # A layout being assembled.
            add(svg, "rect", x=x + inset, y=top + height * .28,
                width=height * .42, height=height * .44, rx=height * .05, fill="#aebced")
            add(svg, "rect", x=x + inset + height * .53, y=top + height * .28,
                width=height * .27, height=height * .18, rx=height * .04, fill="#dce2fb")
            add(svg, "rect", x=x + inset + height * .53, y=top + height * .54,
                width=width * .44, height=height * .11, rx=height * .05, fill="#dce2fb")
        else:  # A finished interface.
            add(svg, "rect", x=x + inset, y=top + height * .25,
                width=width * .27, height=height * .5, rx=height * .05, fill="#dce2fb")
            for offset, length in ((.36, .43), (.59, .31)):
                add(svg, "rect", x=x + width * .41, y=top + height * offset,
                    width=width * length, height=height * .1,
                    rx=height * .05, fill="#dce2fb")


def save(svg, name):
    ET.indent(svg, space="  ")
    (ROOT / name).write_text(ET.tostring(svg, encoding="unicode") + "\n")


light_source = deepcopy(source)
for node in light_source.iter():
    if node.get("stroke") in ("#fffdf8", "#0a0f0a"):
        node.set("stroke", "#242329")
    if node.get("fill") == "#0a0f0a":
        node.set("fill", "#fffdf8")
# The project cards stay blue in both modes, so their content remains white.
projects = next(child for child in light_source if child.tag == f"{{{SVG}}}g")
for node in projects:
    if node.tag == f"{{{SVG}}}path" and node.get("stroke") == "#242329":
        node.set("stroke", "#fffdf8")
title = light_source.find(f"{{{SVG}}}title")
if title is not None:
    title.text += " — light mode"
save(light_source, "create-light.svg")
light_mark = [child for child in light_source if child.tag != f"{{{SVG}}}title"]


# Center the shared cup-and-leaf bounds, excluding the handle and the
# Create workspaces below the cup. Their center is (128, 116).
icon_scale = 3.1
icon_x = 512 - 128 * icon_scale
icon_y = 512 - 116 * icon_scale
mark_canvas = ET.Element(f"{{{SVG}}}svg", {"viewBox": "0 0 1024 1024"})
cup(mark_canvas, icon_x, icon_y, icon_scale)
save(mark_canvas, "icon-mark.svg")

light_mark_canvas = ET.Element(f"{{{SVG}}}svg", {"viewBox": "0 0 1024 1024"})
cup(light_mark_canvas, icon_x, icon_y, icon_scale, light_mark)
save(light_mark_canvas, "icon-mark-light.svg")

icon = document(1024, 1024, "#0a0f0a")
cup(icon, icon_x, icon_y, icon_scale)
save(icon, "icon.svg")

light_icon = document(1024, 1024, "#f5f2eb")
cup(light_icon, icon_x, icon_y, icon_scale, light_mark)
save(light_icon, "icon-light.svg")

feature = document(1024, 500, "#0a0f0a")
add(feature, "circle", cx=55, cy=450, r=350, fill="#14223b")
add(feature, "rect", x=55, y=25, width=94, height=94, rx=20, fill="#0a0f0a")
add(feature, "rect", x=615, y=67, width=352, height=365, rx=34, fill="#1a2845")
project_rows(feature, 645, 107, 291, 74, 24)
save(feature, "feature-graphic.svg")

header = document(3840, 1646, "#0a0f0a")
add(header, "circle", cx=3420, cy=-130, r=1120, fill="#14223b")
add(header, "circle", cx=2300, cy=1760, r=840, fill="#14223b")
add(header, "rect", x=300, y=235, width=340, height=340, rx=64, fill="#0a0f0a")
add(header, "rect", x=2380, y=218, width=1220, height=1210, rx=92, fill="#1a2845")
project_rows(header, 2480, 339, 1020, 222, 97)
save(header, "app-store-header.svg")

search = document(3840, 2560, "#0a0f0a")
add(search, "circle", cx=3480, cy=280, r=1190, fill="#14223b")
add(search, "circle", cx=170, cy=2840, r=900, fill="#14223b")
add(search, "rect", x=290, y=310, width=350, height=350, rx=70, fill="#0a0f0a")
add(search, "rect", x=275, y=1440, width=3290, height=890, rx=92, fill="#1a2845")
project_rows(search, 395, 1545, 3050, 180, 60)
save(search, "app-store-search.svg")
