#Alireza Rahimi
from flask import Flask, request, jsonify
from PIL import Image
from flask_cors import CORS
import json
import io
import base64

app = Flask(__name__)
CORS(app)

@app.route('/color_range', methods=['POST'])
def main():
    data = request.data
    json_object = json.loads(data.decode('utf8'))
    data_value = json_object["image"]["value"]
    print(data_value)

    image = Image.open(io.BytesIO(base64.b64decode(data_value[data_value.find(",") + 1:])))

    colors = sorted(image.getcolors(image.size[0] * image.size[1]), reverse=True)

    total_count = sum([count for count, color in colors])

    color_range_img = Image.new("RGB", (len(colors), 100))
    x_offset = 0
    for count, color in colors:
        width = int((count / total_count) * color_range_img.size[0])

        for x in range(x_offset, x_offset + width):
            for y in range(color_range_img.size[1]):
                color_range_img.putpixel((x, y), color)
        x_offset += width

    buffered = io.BytesIO()
    color_range_img.save(buffered, format="JPEG")
    return base64.b64encode(buffered.getvalue())

if __name__ == '__main__':
    app.run();
