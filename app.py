from flask import Flask, render_template

app = Flask(__name__,
            static_url_path='',
            static_folder = 'static',
            template_folder='static')

@app.route("/")
def index():
    return render_template('index.html')