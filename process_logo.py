from PIL import Image

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()

    new_data = []
    for item in data:
        # Change all white (also shades of white) to transparent
        if item[0] > 230 and item[1] > 230 and item[2] > 230:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")

remove_white_bg("/Users/apple/.gemini/antigravity/brain/f0d29bff-ded5-4729-b9b4-1ad90bf64f2e/media__1781089552481.png", "client/public/logo.png")
